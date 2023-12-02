import dayjs from 'dayjs'

/**
 * Asserts that the given value is defined.
 * @param value
 * @param customErrorMessage
 */
export function assertIsDefined<T>(
  value: T,
  customErrorMessage?: string
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(
      customErrorMessage ? customErrorMessage : `${value} is not defined`
    )
  }
}

export function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return ''
  }

  return dayjs(date).format('DD/MM/YYYY')
}

export function formatDateTime(date: Date | string | undefined): string {
  if (!date) {
    return ''
  }

  return dayjs(date).format('D/MM/YYYY HH:mm')
}
