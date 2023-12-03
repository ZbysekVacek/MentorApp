import React from 'react'
import { Layout, theme } from 'antd'
import MentorAppBreadcrumbs from '../routing/RouteBreadcrumbs'
import { Outlet } from 'react-router-dom'
import AppErrorBoundary from '../../components/errors/AppErrorBoundary'
import MainNavigation from './navigation/MainNavigation'
import './AppLayout.css'

const { Content, Footer } = Layout

/** Main application layout */
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
      <Footer style={{ textAlign: 'center' }}>
        MentorApp ©2023
        <br />
        Visit our{' '}
        <a
          href="https://github.com/ZbysekVacek/MentorApp"
          target="_blank"
          rel="noreferrer"
        >
          Github repository
        </a>
      </Footer>
    </Layout>
  )
}

export default AppLayout
