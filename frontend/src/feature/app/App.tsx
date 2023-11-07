import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppLayout from './AppLayout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider>
        <AppLayout />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
