import React from 'react'
import logo from './logo.svg'
import './App.css'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MeetingsList } from './components/MeetingsList'
import { Typography } from 'antd'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CreateMeeting } from './components/CreateMeeting'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfigProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Typography.Title>Mentoring App</Typography.Title>
            <Typography.Title level={3}>Current meetings</Typography.Title>
            <MeetingsList />
            <CreateMeeting />
          </header>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
