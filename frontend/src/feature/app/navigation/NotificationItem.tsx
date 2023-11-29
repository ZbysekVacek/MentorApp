import React from 'react'
import {
  useNotificationsGetUnseen,
  useUserCurrentRetrieve,
} from '../../../api/generated/generatedApiComponents'
import './MainNavigation.css'
import { BellOutlined } from '@ant-design/icons'
import { Badge } from 'antd'
import './NotificationItem.css'
const NotificationItem: React.FC = () => {
  const {
    isLoading: isLoadingUser,
    isError: isErrorLoadingUser,
    data: user,
  } = useUserCurrentRetrieve({})
  const { data: unseenNotifications } = useNotificationsGetUnseen(
    {},
    { enabled: !isErrorLoadingUser && !isLoadingUser && !!user }
  )

  return (
    <div className="MainNavigation__iconItem">
      <Badge
        count={unseenNotifications ? unseenNotifications.length : 0}
        size="small"
        styles={{ indicator: { fontSize: '10px !important' } }}
      >
        <BellOutlined className="NotificationItem" />
      </Badge>
    </div>
  )
}

export default NotificationItem
