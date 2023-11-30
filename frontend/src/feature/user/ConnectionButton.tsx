import React from 'react'
import './ProfileCard.css'
import Button from '../../components/Button'
import {
  useConnectionsDeleteDestroy,
  useConnectionsRequestsAcceptCreate,
  useConnectionsRequestsDestroy,
  useConnectionsRequestsMakeCreate,
} from '../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'
import { notification } from 'antd'

type Props = {
  isConnected: boolean
  isConnectionRequestedByMe: boolean
  isConnectionRequestedByOtherUser: boolean
  hasMentoring: boolean
  connectionRequestId?: number
  connectionId?: number
  currentUserId: number
  otherUserId: number
}
const ConnectionButton = (props: Props) => {
  const {
    isConnectionRequestedByMe,
    isConnectionRequestedByOtherUser,
    hasMentoring,
    isConnected,
    connectionRequestId,
    connectionId,
    currentUserId,
    otherUserId,
  } = props
  const queryClient = useQueryClient()
  const acceptConnection = useConnectionsRequestsAcceptCreate({})
  const deleteConnection = useConnectionsDeleteDestroy({})
  const deleteConnectionRequest = useConnectionsRequestsDestroy({})
  const createConnectionRequest = useConnectionsRequestsMakeCreate({})

  if (hasMentoring) {
    return <Button disabled>Connected</Button>
  }

  if (isConnected) {
    return (
      <Button
        disabled={deleteConnection.isPending}
        onClick={() => {
          if (connectionId) {
            deleteConnection.mutate(
              { pathParams: { id: connectionId } },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['api', 'connections'],
                  })
                  notification.success({
                    message: 'Connection was deleted',
                  })
                },
              }
            )
          }
        }}
      >
        Lose connection
      </Button>
    )
  }
  if (isConnectionRequestedByMe) {
    return (
      <Button
        disabled={deleteConnectionRequest.isPending}
        onClick={() => {
          if (connectionRequestId) {
            deleteConnectionRequest.mutate(
              { pathParams: { id: connectionRequestId } },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['api', 'connections'],
                  })
                  queryClient.invalidateQueries({
                    queryKey: ['api', 'connections', 'requests'],
                  })
                  notification.success({
                    message: 'Connection request was deleted',
                  })
                },
              }
            )
          }
        }}
      >
        Delete connection request
      </Button>
    )
  }
  if (isConnectionRequestedByOtherUser) {
    return (
      <Button
        disabled={acceptConnection.isPending}
        onClick={() => {
          if (connectionRequestId) {
            acceptConnection.mutate(
              { pathParams: { id: connectionRequestId } },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['api', 'connections'],
                  })
                  queryClient.invalidateQueries({
                    queryKey: ['api', 'connections', 'requests'],
                  })
                  notification.success({
                    message: 'Connection request was accepted',
                  })
                },
              }
            )
          }
        }}
      >
        Accept connection request
      </Button>
    )
  }

  return (
    <Button
      disabled={createConnectionRequest.isPending}
      onClick={() => {
        if (otherUserId) {
          createConnectionRequest.mutate(
            { body: { from_user: currentUserId, to_user: otherUserId } },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ['api', 'connections'],
                })
                queryClient.invalidateQueries({
                  queryKey: ['api', 'connections', 'requests'],
                })
                queryClient.invalidateQueries({
                  queryKey: [['api', 'user', 'search']],
                })
                notification.success({
                  message: 'Connection was requested',
                })
              },
            }
          )
        }
      }}
    >
      Connect
    </Button>
  )
}

export default ConnectionButton
