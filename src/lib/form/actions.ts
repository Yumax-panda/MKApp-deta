"use server"

import dayjs from "dayjs"
import { revalidatePath } from "next/cache"
import { CreateResultSchema, UpdateResultSchema } from "./schema"
import { DetaClient } from "@/repository/deta"

function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

export async function createResult(prevState: any, formData: FormData) {
  const parsed = CreateResultSchema.safeParse(formData)
  if (!parsed.success) {
    console.error("Invalid request body", parsed.error)
    return { message: "Invalid request body" }
  }

  try {
    const client = new DetaClient()
    const { guildId, result } = parsed.data
    result.date = formatDate(result.date)
    await client.result.add(guildId, result)
    revalidatePath(`/guild/${guildId}`)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return { message: e.message }
    }
  }

  return { message: "success" }
}

export async function updateResult(prevState: any, formData: FormData) {
  const parsed = UpdateResultSchema.safeParse(formData)
  if (!parsed.success) {
    console.error("Invalid request body", parsed.error)
    return { message: "Invalid request body" }
  }

  try {
    const client = new DetaClient()
    const { guildId, prev, next } = parsed.data
    await client.result.update(guildId, { prev, next })
    revalidatePath(`/guild/${guildId}`)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return { message: e.message }
    }
  }

  return { message: "success" }
}

export async function deleteResult(prevState: any, formData: FormData) {
  const parsed = CreateResultSchema.safeParse(formData)
  if (!parsed.success) {
    console.error("Invalid request body", parsed.error)
    return { message: "Invalid request body" }
  }

  try {
    const client = new DetaClient()
    const { guildId, result } = parsed.data
    await client.result.remove(guildId, result)
    revalidatePath(`/guild/${guildId}`)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return { message: e.message }
    }
  }

  return { message: "success" }
}
