import React from 'react'
import { Layout, theme } from 'antd'
import MentorAppBreadcrumbs from '../routing/RouteBreadcrumbs'
import { Outlet } from 'react-router-dom'
import AppErrorBoundary from '../../components/AppErrorBoundary'
import MainNavigation from './MainNavigation'

const { Content, Footer } = Layout

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <MainNavigation />
      <Content style={{ padding: '0 50px' }}>
        <MentorAppBreadcrumbs />
        <Content
          style={{
            padding: '24px',
            margin: 0,
            minHeight: 280,
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
