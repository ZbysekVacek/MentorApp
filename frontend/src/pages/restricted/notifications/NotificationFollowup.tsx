import React from 'react'
import { FollowupEnum } from '../../../api/generated/generatedApiSchemas'
import { Link } from 'react-router-dom'
import { Routes } from '../../../feature/routing/routes'

type Props = {
  followup?: FollowupEnum
  userId?: number
}
const NotificationFollowup = ({ followup, userId }: Props) => {
  if (!userId) {
    return <></>
  }

  if (followup === 'FILL_PROFILE') {
    return (
      <Link to={Routes.Profile.replace(':userId', String(userId))}>
        Fill in your profile
      </Link>
    )
  }

  return <></>
}

export default NotificationFollowup
