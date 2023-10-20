import Paper from "../Paper/Paper"
import WinLoseHistoryDetail from "../WinLoseHistoryDetail/WinLoseHistoryDetail"
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
      <WinLoseHistoryDetail history={history} />
      <WinLoseHistoryGraph history={history} />
    </Paper>
  )
}

export default WinLoseHistory
