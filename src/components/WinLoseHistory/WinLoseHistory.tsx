import Paper from "../Paper/Paper"
import WinLoseHistoryGraph from "../WinLoseHistoryGraph/WinLoseHistoryGraph"

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
      <WinLoseHistoryGraph history={history} />
    </Paper>
  )
}

export default WinLoseHistory
