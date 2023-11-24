import React from 'react'
import { Typography } from 'antd'
import UserInfo from '../feature/user/UserInfo'
import { NavLink } from 'react-router-dom'
import RestrictedRoute from '../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../feature/routing/routeDocumentTitle'
import { Routes } from '../feature/routing/routes'

const HomePage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.HomePage))

  return (
    <RestrictedRoute>
      <Typography.Title>Mentoring App</Typography.Title>
      <UserInfo />
      <NavLink to="/meetings">Meetings</NavLink>
    </RestrictedRoute>
  )
}

export default HomePage
