import Paper from "../../Paper/Paper"
import Detail from "./Detail"
import Graph from "./Graph"

type Score = {
  score: number
  enemyScore: number
}

type Props = {
  history: Score[]
}

function WinLoseHistory({ history }: Props) {
  return (
    <Paper>
      <Detail history={history} />
      <Graph history={history} />
    </Paper>
  )
}

export default WinLoseHistory
