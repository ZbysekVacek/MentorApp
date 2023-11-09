import React from 'react'
import { Typography } from 'antd'
import UserInfo from '../feature/user/UserInfo'
import { NavLink } from 'react-router-dom'
import RestrictedRoute from '../feature/routing/RestrictedRoute'

const HomePage: React.FC = () => {
  return (
    <RestrictedRoute>
      <Typography.Title>Mentoring App</Typography.Title>
      <UserInfo />
      <NavLink to="/meetings">Meetings</NavLink>
    </RestrictedRoute>
  )
}

export default HomePage
