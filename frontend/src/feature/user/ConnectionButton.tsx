import React from 'react'
import './ProfileCard.css'
import Button from '../../components/Button'
import {
  useConnectionsDeleteDestroy,
  useConnectionsList,
  useConnectionsRequestsAcceptCreate,
  useConnectionsRequestsDestroy,
  useConnectionsRequestsList,
  useConnectionsRequestsMakeCreate,
  useMentoringAsMenteeList,
  useMentoringAsMentorList,
  useMentoringDeleteDestroy,
  useMentoringRequestsAcceptDestroy,
  useMentoringRequestsCreateCreate,
  useMentoringRequestsDeleteDestroy,
  useMentoringRequestsFromUserList,
  useMentoringRequestsToUserList,
  useUserCurrentRetrieve,
  useUserRetrieve,
} from '../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'
import { Col, Input, Modal, notification, Row, Typography } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

type Props = {
  connectionToUserId: number
}
const ConnectionButton = (props: Props) => {
  const { connectionToUserId } = props
  const queryClient = useQueryClient()

  const {
    data: allConnections,
    isLoading: isLoadingAllConnections,
    isError: isErrorAllConnections,
  } = useConnectionsList({})
  const {
    data: loggedUser,
    isLoading: isLoadingCurrentUser,
    isError: isErrorCurrentUser,
  } = useUserCurrentRetrieve({})
  const { data: mentoringRequestsFrom } = useMentoringRequestsFromUserList({})
  const { data: mentoringRequestsTo } = useMentoringRequestsToUserList({})
  const { data: mentoringsAsMentor } = useMentoringAsMentorList({})
  const { data: mentoringsAsMentee } = useMentoringAsMenteeList({})
  const {
    data: connectionRequests,
    isLoading: isLoadingConnectionRequests,
    isError: isErrorConnectionRequests,
  } = useConnectionsRequestsList({})
  const {
    data: connectToUser,
    isLoading: isLoadingConnectToUser,
    isError: isErrorConnectToUser,
  } = useUserRetrieve({
    pathParams: { id: connectionToUserId },
  })

  const allMentoring = [
    ...(mentoringsAsMentor ?? []),
    ...(mentoringsAsMentee ?? []),
  ]
  const allMentoringRequests = [
    ...(mentoringRequestsFrom ?? []),
    ...(mentoringRequestsTo ?? []),
  ]

  const connection = allConnections?.find(
    (cur) => cur.to?.id === connectionToUserId
  )
  const connectionRequest = connectionRequests?.find(
    (cur) =>
      cur.from_user?.id === connectionToUserId ||
      cur.to_user?.id === connectionToUserId
  )
  const mentoring = allMentoring.find(
    (currMentoring) =>
      currMentoring.mentor.id === connectionToUserId ||
      currMentoring.mentee.id === connectionToUserId
  )
  const mentoringRequest = allMentoringRequests.find(
    (curr) =>
      curr.to_user.id === connectionToUserId ||
      curr.from_user.id === connectionToUserId
  )

  const acceptConnection = useConnectionsRequestsAcceptCreate({})
  const deleteConnection = useConnectionsDeleteDestroy({})
  const deleteConnectionRequest = useConnectionsRequestsDestroy({})
  const createConnectionRequest = useConnectionsRequestsMakeCreate({})
  const deleteMentoringRequest = useMentoringRequestsDeleteDestroy({})
  const deleteMentoring = useMentoringDeleteDestroy({})
  const acceptMentoring = useMentoringRequestsAcceptDestroy({})
  const createMentoringRequest = useMentoringRequestsCreateCreate({})

  const isLoading =
    isLoadingAllConnections ||
    isLoadingCurrentUser ||
    isLoadingConnectionRequests ||
    isLoadingConnectionRequests ||
    isLoadingConnectionRequests ||
    isLoadingConnectionRequests ||
    isLoadingConnectToUser

  const isError =
    isErrorAllConnections ||
    isErrorCurrentUser ||
    isErrorConnectionRequests ||
    isErrorConnectionRequests ||
    isErrorConnectionRequests ||
    isErrorConnectionRequests ||
    isErrorConnectToUser

  const [mentoringRequestText, setMentoringRequestText] = React.useState('')

  const [modal, modalContextHolder] = Modal.useModal()

  const confirmCreateMentoringRequest = (userId: number) => {
    modal.confirm({
      title: 'Send mentoring request',
      content: (
        <>
          <Typography.Paragraph>
            You can attach some text for the mentor
          </Typography.Paragraph>
          <Input
            type="text"
            onChange={(e) => setMentoringRequestText(e.target.value)}
            maxLength={300}
            style={{ margin: '10px', maxWidth: '400px' }}
            placeholder="Message for mentor"
          />
        </>
      ),
      okText: 'Send mentoring request',
      icon: <InfoCircleOutlined />,
      cancelText: 'Cancel',
      onOk: () => {
        createMentoringRequest.mutate(
          {
            body: {
              text: mentoringRequestText,
            },
            pathParams: {
              toUserId: userId,
            },
          },
          {
            onSuccess: () => {
              queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
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
      },
    })
  }

  if (isLoading) {
    return <Button disabled>Loading...</Button>
  }

  if (isError) {
    return <Button disabled>Error</Button>
  }

  if (mentoring) {
    return (
      <Button
        disabled={deleteMentoringRequest.isPending}
        onClick={() => {
          if (mentoring) {
            deleteMentoring.mutate(
              { pathParams: { id: mentoring.id ?? -1 } },
              {
                onSuccess: () => {
                  queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
                  queryClient.invalidateQueries({
                    queryKey: [['api', 'mentoring']],
                  })
                  notification.success({
                    message: 'Mentoring was ended',
                  })
                },
                onError: () => {
                  notification.error({
                    message: 'Could not end mentoring',
                  })
                },
              }
            )
          }
        }}
      >
        Remove mentoring
      </Button>
    )
  }

  if (mentoringRequest) {
    return (
      <Row gutter={[20, 20]} justify="center">
        <Col>
          <Button
            disabled={deleteMentoringRequest.isPending}
            onClick={() => {
              if (mentoringRequest) {
                deleteMentoringRequest.mutate(
                  { pathParams: { id: mentoringRequest.id ?? -1 } },
                  {
                    onSuccess: () => {
                      queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
                      queryClient.invalidateQueries({
                        queryKey: [['api', 'mentoring', 'requests', 'to-user']],
                      })
                      queryClient.invalidateQueries({
                        queryKey: [
                          ['api', 'mentoring', 'requests', 'from-user'],
                        ],
                      })
                      notification.success({
                        message: 'Mentoring request was deleted',
                      })
                    },
                    onError: () => {
                      notification.error({
                        message: 'Mentoring request was not deleted',
                      })
                    },
                  }
                )
              }
            }}
          >
            {mentoringRequest.from_user.id === loggedUser?.id
              ? 'Cancel your request'
              : 'Reject request'}
          </Button>
        </Col>
        {mentoringRequest &&
          mentoringRequest?.to_user?.id === loggedUser?.id && (
            <Col>
              <Button
                disabled={acceptMentoring.isPending}
                onClick={() => {
                  if (mentoringRequest?.id) {
                    acceptMentoring.mutate(
                      {
                        pathParams: {
                          mentoringRequestId: mentoringRequest.id ?? -1,
                        },
                      },
                      {
                        onSuccess: () => {
                          queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
                          queryClient.invalidateQueries({
                            queryKey: [
                              ['api', 'mentoring', 'requests', 'to-user'],
                            ],
                          })
                          queryClient.invalidateQueries({
                            queryKey: [
                              ['api', 'mentoring', 'requests', 'from-user'],
                            ],
                          })
                          notification.success({
                            message: 'Mentoring was accepted',
                          })
                        },
                        onError: () => {
                          notification.error({
                            message: 'Mentoring request was not accepted',
                          })
                        },
                      }
                    )
                  }
                }}
              >
                Accept mentoring request
              </Button>
            </Col>
          )}
      </Row>
    )
  }

  if (connection) {
    return (
      <Row gutter={[20, 20]} justify="center">
        <Button
          disabled={deleteConnection.isPending}
          onClick={() => {
            if (connection) {
              deleteConnection.mutate(
                { pathParams: { id: connection.id ?? -1 } },
                {
                  onSuccess: () => {
                    queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
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
        {connectToUser?.profile?.accepts_mentees && (
          <Col>
            {modalContextHolder}
            <Button
              disabled={createMentoringRequest.isPending}
              onClick={() =>
                confirmCreateMentoringRequest(connectToUser?.id ?? -1)
              }
            >
              Request mentoring
            </Button>
          </Col>
        )}
      </Row>
    )
  }
  if (connectionRequest) {
    return (
      <Row gutter={[20, 20]} justify="center">
        <Col>
          <Button
            disabled={deleteConnectionRequest.isPending}
            onClick={() => {
              if (connectionRequest.id) {
                deleteConnectionRequest.mutate(
                  { pathParams: { id: connectionRequest?.id } },
                  {
                    onSuccess: () => {
                      queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
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
            {connectionRequest?.from_user?.id === loggedUser?.id
              ? 'Cancel your request'
              : 'Reject request'}
          </Button>
        </Col>
        {connectionRequest &&
          connectionRequest.to_user?.id === loggedUser?.id && (
            <Col>
              <Button
                disabled={acceptConnection.isPending}
                onClick={() => {
                  if (connectionRequest?.id) {
                    acceptConnection.mutate(
                      { pathParams: { id: connectionRequest.id } },
                      {
                        onSuccess: () => {
                          queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
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
            </Col>
          )}
      </Row>
    )
  }

  return (
    <Row gutter={[20, 20]} justify="center">
      <Col>
        <Button
          disabled={createConnectionRequest.isPending}
          onClick={() => {
            createConnectionRequest.mutate(
              {
                body: {
                  from_user: loggedUser?.id ?? -1,
                  to_user: connectionToUserId,
                },
              },
              {
                onSuccess: () => {
                  queryClient.clear() // TODO MentorApp: invalidate only the queries that are affected by this mutation
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
          }}
        >
          Connect
        </Button>
      </Col>
      {connectToUser?.profile?.accepts_mentees && (
        <Col>
          {modalContextHolder}
          <Button
            disabled={createMentoringRequest.isPending}
            onClick={() =>
              confirmCreateMentoringRequest(connectToUser?.id ?? -1)
            }
          >
            Request mentoring
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default ConnectionButton
