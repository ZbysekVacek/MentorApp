import React from 'react'
import { useMeetings } from '../api/meeting.api'

export function MeetingsList() {
  const { isLoading, error, data } = useMeetings()
  if (isLoading) {
    return <>loading meetings</>
  }

  if (error) {
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
