import React from 'react'
import UserInfo from '../feature/user/UserInfo'
import { useUserRetrieve } from '../api/generated/generatedApiComponents'
import { Navigate } from 'react-router-dom'

import { Routes } from '../feature/routing/routes'

const IndexPage: React.FC = () => {
  const { data: userData } = useUserRetrieve({})

  if (userData?.id) {
    return <Navigate to={Routes.HomePage} />
  }

  return (
    <div>
      <UserInfo />
    </div>
  )
}

export default IndexPage
