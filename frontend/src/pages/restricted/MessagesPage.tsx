import React, { useState } from 'react'
import { Avatar, Card, Divider, Input, message, Select, Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { Routes } from '../../feature/routing/routes'
import {
  useConnectionsList,
  useMessagesAllList,
  useMessagesSendCreate,
  useUserCurrentRetrieve,
} from '../../api/generated/generatedApiComponents'
import PageLoader from '../../components/PageLoader'
import Button from '../../components/Button'
import { formatDateTime } from '../../utils/utils'
import { useQueryClient } from '@tanstack/react-query'

/** Messages page */
const MessagesPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Notifications))
  const { data: messages } = useMessagesAllList({})
  const { data: connections } = useConnectionsList({})
  const { data: currentUser } = useUserCurrentRetrieve({})
  const sendMessage = useMessagesSendCreate()
  const queryClient = useQueryClient()

  const [newMessage, setNewMessage] = useState('')

  const [selectedConnection, setSelectedConnection] = useState<
    number | undefined
  >(undefined)

  const connectionWhichIsSelected = connections?.find(
    (curr) => curr.id === selectedConnection
  )

  const handleSend = () => {
    sendMessage.mutate(
      {
        body: {
          recipient: connectionWhichIsSelected?.to?.id ?? -1,
          content: newMessage,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate: (query) =>
              Array.isArray(query.queryKey) &&
              query.queryKey.includes('messages'),
          })
          message.success('Message sent successfully')
        },
        onError: () => {
          message.error('Message cannot be sent')
        },
      }
    )
  }

  if (!messages || !connections || !currentUser) {
    return (
      <RestrictedRoute>
        <PageLoader />
      </RestrictedRoute>
    )
  }

  return (
    <RestrictedRoute>
      <Typography.Title>Messages</Typography.Title>
      {!selectedConnection && (
        <Typography.Text>Select a connection to view messages</Typography.Text>
      )}
      <Select<number>
        style={{ width: '100%', height: '50px' }}
        options={[...(connections ?? [])]
          ?.filter(Boolean)
          .map((currConnection) => ({
            value: currConnection.id,
            label: (
              <>
                <Avatar src={currConnection.to?.profile?.avatar} />
                {''}
                {''}
                {currConnection?.to?.first_name}&nbsp;
                {currConnection?.to?.last_name}
              </>
            ),
          }))}
        onChange={(value) => setSelectedConnection(value)}
      />
      <br />
      {!!selectedConnection && (
        <>
          <br />
          <br />
          <Typography.Paragraph>Send a message</Typography.Paragraph>
          <Input.TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autoSize={{ minRows: 10 }}
          />
          <br />
          <br />
          <Button type="primary" onClick={handleSend}>
            Send
          </Button>
          <Divider />
          <Typography.Title level={2}>Conversation</Typography.Title>
          {messages
            .filter(
              (currMessage) =>
                currMessage.sender === currentUser.id ||
                currMessage.recipient === selectedConnection
            )
            .map((currMessage) => (
              <Card
                key={currMessage.id}
                style={{ margin: '10px' }}
                title={
                  <>
                    Send by{' '}
                    {currMessage.sender === connectionWhichIsSelected?.to?.id
                      ? connectionWhichIsSelected.to.username
                      : 'you'}{' '}
                    on {formatDateTime(currMessage.send_at)}
                  </>
                }
              >
                <Typography.Text>{currMessage.content}</Typography.Text>
              </Card>
            ))}
        </>
      )}
    </RestrictedRoute>
  )
}

export default MessagesPage
