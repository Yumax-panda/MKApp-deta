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

function WinLoseHistory({ history }: Props) {
  const points = history.map((result) => {
    if (result.score > result.enemyScore) {
      return 1
    } else if (result.score < result.enemyScore) {
      return -1
    }
    return 0
  })

  // 0で境界線を引く
  const data = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "Wins - Loses",
        data: cumsum(points),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  }

  return <Line data={data} />
}

export default WinLoseHistory
