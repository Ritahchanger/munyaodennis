export interface ApiEnvelope<T> {
  success: boolean
  data: T | null
  message: string | null
  errors: string[] | null
}

export function unwrap<T>(response: ApiEnvelope<T>): T {
  if (!response.success || response.data === null) {
    throw new Error(response.message ?? "Request failed")
  }
  return response.data
}

export interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}
