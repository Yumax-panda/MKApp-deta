/*
MIT License

Copyright 2023 sheat

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
*/

export type Player = {
  id: number
  name: string
  mkcId: number
  registryId?: number
  discordId?: string
  countryCode?: string
  switchFc?: string
  isHidden: boolean
  mmr?: number
  maxMmr?: number
}

export type PlayerDetails = {
  playerId: number
  name: string
  mkcId: number
  registryId?: number
  countryCode?: string
  countryName?: string
  switchFc?: string
  isHidden: boolean
  season: number
  mmr?: number
  maxMmr?: number
  overallRank?: number
  eventsPlayed: number
  winRate?: number
  winsLastTen: number
  lossesLastTen: number
  winLossLastTen: string
  gainLossLastTen?: number
  largestGain?: number
  largestGainTableId?: number
  largestLoss?: number
  largestLossTableId?: number
  averageScore?: number
  averageLastTen?: number
  partnerAverage?: number
  mmrChanges: MmrChange[]
  nameHistory: NameChange[]
  rank: string
  forumLink: string
  registryLink?: string
}

export type MmrChange = {
  changeId?: number
  newMmr: number
  mmrDelta: number
  reason: MmrChangeReason
  time: string
  score?: number
  partnerScores?: number[]
  partnerIds?: number[]
  rank?: number
  tier?: string
  numTeams?: number
}

export type MmrChangeReason =
  | "Placement"
  | "Table"
  | "Penalty"
  | "Strike"
  | "Bonus"
  | "TableDelete"
  | "PenaltyDelete"
  | "StrikeDelete"
  | "BonusDelete"

export type NameChange = {
  name: string
  changedOn: string
}

export type Season = 4 | 5 | 6 | 7 | 8 | 9 | 10

export type Division =
  | "Grandmaster"
  | "Master"
  | "Diamond"
  | "Ruby"
  | "Sapphire"
  | "Platinum"
  | "Gold"
  | "Silver"
  | "Bronze"
  | "Iron"
  | "Placement"

export type Rank = {
  division: Division
  level?: 1 | 2
  name: string
}

export type Bonus = {
  id: number
  season: number
  awardedOn: string
  prevMmr: number
  newMmr: number
  amount: number
  deletedOn?: string
  playerId: number
  playerName: string
}

export type Penalty = Bonus & { isStrike: boolean }

export type TableDetails = {
  id: number
  season: number
  createdOn: string
  verifiedOn?: string
  deletedOn?: string
  numTeams: number
  format: string
  url: string
  tier: string
  teams: Team[]
  tableMessageId?: string
  updateMessageId?: string
  authorId?: string
}

export type Team = {
  rank: number
  scores: TableScore[]
}

export type TableScore = {
  score: number
  multiplier: number
  prevMmr?: number
  newMmr?: number
  delta?: number
  playerId: number
  playerName: string
  playerDiscordId?: string
  playerCountryCode?: string
  isNewPeakMmr?: boolean
}

export type Leaderboard = {
  totalPlayers: number
  data: {
    id: number
    overallRank?: number
    countryCode?: string
    name: string
    mmr?: number
    maxMmr?: number
    winRate?: number
    winsLastTen: number
    lossesLastTen: number
    gainLossLastTen?: number
    eventsPlayed: number
    largestGain?: number
    largestLoss?: number
    mmrRank?: Rank
    maxMmrRank?: Rank
  }[]
}
