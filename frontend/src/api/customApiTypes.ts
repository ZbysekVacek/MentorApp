import { Exception } from './generated/generatedApiSchemas'

export type ExpectedError =
  | GeneralExpectedError
  | ErrorInFetcher
  | ValidationError

export type GeneralExpectedError = {
  status: number
  payload: Exception
}

export type ErrorInFetcher = {
  status: 'unknown'
  payload: Exception
}

export type ValidationError = {
  status: number
  payload: { status_code?: number } & Record<string, string[]>
}
