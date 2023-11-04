import React from 'react'
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd'
import logo from '../../logo.svg'
import { MeetingsList } from '../../components/MeetingsList'
import { CreateMeeting } from '../../components/CreateMeeting'

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
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: '24px',
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Typography.Title>Mentoring App</Typography.Title>
          <Typography.Title level={3}>Current meetings</Typography.Title>
          <MeetingsList />
          <CreateMeeting />
        </Content>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MentorApp ©2023</Footer>
    </Layout>
  )
}

export default AppLayout
