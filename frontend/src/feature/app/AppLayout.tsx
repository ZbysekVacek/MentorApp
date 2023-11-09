import React from 'react'
import { Layout, Menu, theme } from 'antd'
import logo from '../../logo.svg'
import MentorAppBreadcrumbs from '../routing/RouteBreadcrumbs'
import { Outlet } from 'react-router-dom'
import AppErrorBoundary from '../../components/AppErrorBoundary'

const { Header, Content, Footer } = Layout

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ width: '100%' }}
          items={[{ key: 'homepage', label: 'Home' }]}
        />
      </Header>
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
