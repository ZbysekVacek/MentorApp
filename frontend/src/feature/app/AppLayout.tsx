import React from 'react'
import { Layout, theme } from 'antd'
import MentorAppBreadcrumbs from '../routing/RouteBreadcrumbs'
import { Outlet } from 'react-router-dom'
import AppErrorBoundary from '../../components/AppErrorBoundary'
import MainNavigation from './MainNavigation'
import './AppLayout.css'

const { Content, Footer } = Layout

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="AppLayout">
      <MainNavigation />
      <Content className="AppLayout__contentWrapper">
        <MentorAppBreadcrumbs />
        <Content
          className="AppLayout__content"
          style={{
            background: colorBgContainer,
          }}
        >
          <AppErrorBoundary>
            <Outlet />
          </AppErrorBoundary>
        </Content>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MentorApp ©2023</Footer>
    </Layout>
  )
}

export default AppLayout
