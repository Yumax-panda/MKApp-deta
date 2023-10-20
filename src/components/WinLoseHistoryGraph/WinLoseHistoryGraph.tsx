import { Box } from "@mui/material"
import { Chart as ChartJS, registerables } from "chart.js"
import { cumsum } from "mathjs"
import { Line } from "react-chartjs-2"
ChartJS.register(...registerables)

type Score = {
  score: number
  enemyScore: number
}

type Props = {
  history: Score[]
}

function WinLoseHistoryGraph({ history }: Props) {
  const points = history.map((result) => {
    if (result.score > result.enemyScore) {
      return 1
    } else if (result.score < result.enemyScore) {
      return -1
    }
    return 0
  })

  const winColor = "rgba(75,192,192,0.4)"
  const loseColor = "rgba(255,99,132,0.4)"

  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Wins - Loses",
        data: cumsum(points),
        fill: {
          target: "origin",
          above: winColor,
          below: loseColor,
        },
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  }
  const options = {
    plugins: {
      legend: { display: false },
    },
  }

  return (
    <Box sx={{ p: 3 }}>
      <Line data={data} options={options} style={{ width: "100%" }} />
    </Box>
  )
}

export default WinLoseHistoryGraph
