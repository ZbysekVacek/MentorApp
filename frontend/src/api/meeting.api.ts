// api/github.api.ts
import { useQuery } from '@tanstack/react-query'

export type Meeting = {
  subject: string
  location: string
  dateTime: string
  mentorEmail: string
  menteeEmail: string
}

export const fetchMeetings = async (): Promise<Meeting[]> => {
  const res = await fetch('http://localhost:8000/api/meetings/')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await res.json()

  return data
}

export const useMeetings = () => {
  return useQuery({ queryKey: ['meetings'], queryFn: fetchMeetings })
}
