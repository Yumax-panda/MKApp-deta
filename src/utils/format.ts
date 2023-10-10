type DetaPayload = {
  [key: string]: number | string | DetaPayload[] | null
}

function isDate(date: any) {
  return (
    new Date(date).toString() !== "Invalid Date" && !isNaN(Date.parse(date))
  )
}

export function format<T>(obj: Record<string, any>): T {
  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      delete obj[key]
    }

    if (isDate(value)) {
      obj[key] = new Date(value)
    }
  }

  return obj as T
}

export function toPayload(data: Record<string, any>): DetaPayload {
  const payload: DetaPayload = {}

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      payload[key] = value.toISOString()
    } else if (Array.isArray(value)) {
      payload[key] = value.map((item) => toPayload(item))
    } else {
      payload[key] = value
    }
  }

  return payload
}
