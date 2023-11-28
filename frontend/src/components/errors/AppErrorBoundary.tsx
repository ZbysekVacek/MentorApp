import React, { PropsWithChildren } from 'react'
import { Button, Flex, Typography } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void | undefined
}
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Flex vertical justify="center" align="center">
      <Typography.Title level={3}>Something went wrong:</Typography.Title>
      <pre>{error.message}</pre>
      {!!resetErrorBoundary && (
        <Button onClick={resetErrorBoundary}>Try again</Button>
      )}
    </Flex>
  )
}

type AppErrorBoundaryProps = PropsWithChildren<{
  withResetOption?: false
}>
function AppErrorBoundary(props: AppErrorBoundaryProps) {
  const { withResetOption = true } = props
  const [resetKey, setResetKey] = React.useState(null)
  const onReset = withResetOption ? () => setResetKey(null) : undefined

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={onReset}
      resetKeys={[resetKey]}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default AppErrorBoundary
