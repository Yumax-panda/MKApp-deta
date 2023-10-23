/*
https://socket.dev/npm/package/mk8dx

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

import type { Player, PlayerDetails } from "./types"
export * from "./types"

const baseUrl = "https://www.mk8dx-lounge.com/api"

type GetPlayerProps = {
  discordId: string
  season?: number | null
}

type GetPlayerDetailsProps = {
  name: string
  season?: number | null
}

async function get<T>(path: string): Promise<T | null> {
  const url = `${baseUrl}/${path}`
  const res = await fetch(url)
  if (!res.ok) return null
  return (await res.json()) as T
}

function toQueryString(
  params: Record<string, string | number | boolean | undefined | null>,
) {
  return Object.keys(params)
    .filter((key) => Boolean(params[key]))
    .map((key) => `${key}=${params[key]}`)
    .join("&")
}

export async function getPlayer(
  params: GetPlayerProps,
): Promise<Player | null> {
  const url = `player?${toQueryString(params)}`
  return await get<Player>(url)
}

export async function getPlayerDetails(
  params: GetPlayerDetailsProps,
): Promise<PlayerDetails | null> {
  const url = `player/details?${toQueryString(params)}`
  return await get<PlayerDetails>(url)
}
