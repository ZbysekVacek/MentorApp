import React from 'react'
import { useListMeetings } from '../api/generated/generatedApiComponents'

export function MeetingsList() {
  const { isLoading, error, data } = useListMeetings({})
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
