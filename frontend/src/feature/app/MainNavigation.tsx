import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'
import { Routes } from '../routing/routes'
import Logo from './Logo'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'

const { Header } = Layout

const loggedInMenuItems = [
  {
    key: 'homepage',
    label: <NavLink to={Routes.HomePage}>Home</NavLink>,
  },
  {
    key: 'meetings',
    label: <NavLink to={Routes.Meetings}>Meetings</NavLink>,
  },
]

const notLoggedInMenuItems = [
  {
    key: 'about',
    label: <NavLink to={Routes.About}>About</NavLink>,
  },
  {
    key: 'login',
    label: <NavLink to={Routes.Login}>Sign in</NavLink>,
  },
]

const MainNavigation: React.FC = () => {
  const {
    isLoading: isLoadingUser,
    isError: isErrorLoadingUser,
    data: user,
  } = useUserRetrieve({})

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Logo />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ width: '100%' }}
        items={
          isLoadingUser || isErrorLoadingUser || !user || !user.id
            ? notLoggedInMenuItems
            : loggedInMenuItems
        }
      />
    </Header>
  )
}

export default MainNavigation
