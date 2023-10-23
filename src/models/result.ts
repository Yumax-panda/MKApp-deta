export type Result = {
  enemy: string
  enemyScore: number
  score: number
  date: string // YYYY-MM-DD HH:mm:ss
}

export const isSame = (a: Result, b: Result) => {
  return (
    a.enemy === b.enemy &&
    a.score === b.score &&
    a.enemyScore === b.enemyScore &&
    a.date === b.date
  )
}
