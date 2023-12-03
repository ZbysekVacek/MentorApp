import React, { useEffect, useRef } from 'react'
import { Avatar, List, Tag, Typography } from 'antd'
import RestrictedRoute from '../../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../../feature/routing/routeDocumentTitle'
import { Routes } from '../../../feature/routing/routes'
import {
  useNotificationsGetAll,
  useNotificationsMarkAsSeen,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import PageLoader from '../../../components/PageLoader'
import { BellOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import './NotificationPage.css'
import { useQueryClient } from '@tanstack/react-query'
import NotificationFollowup from './NotificationFollowup'

/** Displays all notifications */
const NotificationsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notifications))
  const {
    data: allNotifications,
    isLoading,
    isError,
    isSuccess,
  } = useNotificationsGetAll({})
  const { data: user } = useUserCurrentRetrieve({})
  const wasNewNotificationInvalidated = useRef(false)
  const queryClient = useQueryClient()

  // Makr all notifications as seen
  useNotificationsMarkAsSeen({}, { enabled: !!allNotifications?.length })
  useEffect(() => {
    if (
      isSuccess &&
      allNotifications?.length &&
      !wasNewNotificationInvalidated.current
    ) {
      queryClient.invalidateQueries({
        queryKey: ['api', 'notifications', 'unseen'],
      })
    }
  })

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Typography.Title level={3}>Something went wrong</Typography.Title>
  }

  return (
    <RestrictedRoute>
      <Typography.Title>Notifications</Typography.Title>
      <Typography.Paragraph>
        Here is a list of all your notifications
      </Typography.Paragraph>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={allNotifications?.length ? allNotifications : []}
        className="NotificationPage"
        renderItem={(item) => (
          <List.Item
            actions={[
              <NotificationFollowup
                followup={item.followup}
                userId={user?.id}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size="large" icon={<BellOutlined />} />}
              title={item.title}
              description={item.content}
            />
            <div style={{ display: 'block' }}>
              <Typography.Text type="secondary">
                {dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}{' '}
              </Typography.Text>
              {item.seen ? <></> : <Tag color="green">New</Tag>}
            </div>
          </List.Item>
        )}
      />
    </RestrictedRoute>
  )
}

export default NotificationsPage
