import React from 'react'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import { useParams } from 'react-router-dom'
import { useUserCurrentRetrieve } from '../../../api/generated/generatedApiComponents'
import MyProfile from './MyProfile'
import SeeProfile from './SeeProfile'

/** Displays profile of a user (logged or requested) */
const ProfilePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notifications))
  const params = useParams<{ userId: string }>()
  const { data: currentUser } = useUserCurrentRetrieve({})

  return (
    <RestrictedRoute>
      {!params.userId || currentUser?.id === Number(params.userId) ? (
        <MyProfile />
      ) : (
        <SeeProfile />
      )}
    </RestrictedRoute>
  )
}

export default ProfilePage
