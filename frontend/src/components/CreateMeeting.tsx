import React, { useRef } from 'react'
import { useCreateMeeting } from '../api/generated/generatedApiComponents'

export function CreateMeeting() {
  const createMeetingMutation = useCreateMeeting({})
  const subjectRef = useRef<HTMLInputElement | null>(null)
  const locationRef = useRef<HTMLInputElement | null>(null)
  const mentorEmailRef = useRef<HTMLInputElement | null>(null)
  const menteeEmailRef = useRef<HTMLInputElement | null>(null)

  if (createMeetingMutation.isPending) {
    return <>creating meeting</>
  }

  if (createMeetingMutation.error) {
    return <>meeting cannot be created</>
  }

  if (createMeetingMutation.isSuccess) {
    return (
      <>created meeting with subject {createMeetingMutation.data.subject}</>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createMeetingMutation.mutate({
          body: {
            menteeEmail: menteeEmailRef.current?.value ?? 'd',
            mentorEmail: menteeEmailRef.current?.value ?? 'da',
            subject: subjectRef.current?.value ?? 'sadsad',
            location: locationRef.current?.value ?? 'dsfsd',
          },
        })
      }}
    >
      <input name="subject" type="text" ref={subjectRef} />
      <input name="location" type="text" ref={locationRef} />
      <input name="mentorEmail" type="text" ref={mentorEmailRef} />
      <input name="menteeEmail" type="text" ref={menteeEmailRef} />
      <input type="submit" />
    </form>
  )
}
