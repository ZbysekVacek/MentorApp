import React from 'react'
import { FollowupEnum } from '../../../api/generated/generatedApiSchemas'
import { Link } from 'react-router-dom'
import { urlGenerator } from '../../../feature/routing/routes'

type Props = {
  followup?: FollowupEnum
  userId?: number
}
/** Displays followup notification */
const NotificationFollowup = ({ followup, userId }: Props) => {
  if (!userId) {
    return <></>
  }

  // TODO MentorApp: Add more followups
  /** Handle notification followups there */
  if (followup === 'FILL_PROFILE') {
    return <Link to={urlGenerator.profile(userId)}>Fill in your profile</Link>
  }

  return <></>
}

export default NotificationFollowup
