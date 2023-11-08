import React from 'react'
import { useMeetingsList } from '../api/generated/generatedApiComponents'

export function MeetingsList() {
  const { isLoading, error, data } = useMeetingsList({})
  if (isLoading) {
    return <>loading meetings</>
  }

  if (error) {
    console.log({ error })
    return <>meeting cannot be loaded</>
  }

  return (
    <ul>
      {data?.map((currMeeting) => (
        <li key={currMeeting.subject}>{currMeeting.subject}</li>
      ))}
    </ul>
  )
}
