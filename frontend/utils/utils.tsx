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
