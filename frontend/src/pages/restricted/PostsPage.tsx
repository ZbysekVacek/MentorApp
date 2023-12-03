import React from 'react'
import { Avatar, Card, Divider, Flex, Input, message, Typography } from 'antd'
import RestrictedRoute from '../../feature/routing/RestrictedRoute'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import { Routes, urlGenerator } from '../../feature/routing/routes'
import {
  usePostsCreateCreate,
  usePostsDeleteDestroy,
  usePostsList,
  useUserCurrentRetrieve,
} from '../../api/generated/generatedApiComponents'
import Meta from 'antd/es/card/Meta'
import MarkdownDisplay from '../../components/markdown/MarkdownDisplay'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/utils'
import Button from '../../components/Button'
import { useQueryClient } from '@tanstack/react-query'
import MarkdownEditor from '../../components/markdown/MarkdownEditor'

/** Posts page */
const PostsPage: React.FC = () => {
  useDocumentTitle(getRouteTitle(Routes.Posts))
  const { data: userData } = useUserCurrentRetrieve({})
  const { data: posts } = usePostsList({})
  const createPost = usePostsCreateCreate({})
  const deletePost = usePostsDeleteDestroy({})
  const queryClient = useQueryClient()

  const [newPostTitle, setNewPostTitle] = React.useState('')
  const [newPostContent, setNewPostContent] = React.useState('')

  return (
    <RestrictedRoute>
      <Typography.Title>Posts</Typography.Title>
      <Typography.Title level={3}>Create Post</Typography.Title>
      <Flex vertical>
        <Typography.Title level={5}>Title</Typography.Title>
        <Input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <Typography.Title level={5}>Content</Typography.Title>
        <MarkdownEditor
          markdown={newPostContent}
          onChange={(newValue) => setNewPostContent(newValue)}
        />
      </Flex>

      <br />
      <Button
        type="primary"
        onClick={() => {
          createPost.mutate(
            {
              body: {
                title: newPostTitle,
                content: newPostContent,
              },
            },
            {
              onSuccess: () => {
                message.success('Post created successfully')
                queryClient.invalidateQueries({
                  queryKey: ['api', 'posts'],
                })
                setNewPostTitle('')
                setNewPostContent('')
              },
              onError: () => {
                message.error('Error while creating post')
              },
            }
          )
        }}
      >
        Create new post
      </Button>
      <Divider />
      <Typography.Title level={3}>All Post</Typography.Title>
      {posts
        ?.sort((first, second) => (second?.id ?? 0) - (first?.id ?? 0))
        .map((currPost) => (
          <Card
            key={currPost.id}
            actions={
              currPost.author.id === userData?.id
                ? [
                    <Button
                      onClick={() =>
                        deletePost.mutate(
                          { pathParams: { id: currPost?.id ?? -1 } },
                          {
                            onSuccess: () => {
                              message.success('Post deleted successfully')
                              queryClient.invalidateQueries({
                                queryKey: ['api', 'posts'],
                              })
                            },
                            onError: () => {
                              message.error('Error while deleting post')
                            },
                          }
                        )
                      }
                    >
                      Delete
                    </Button>,
                  ]
                : []
            }
          >
            {' '}
            <Meta
              avatar={<Avatar src={currPost.author.profile?.avatar} />}
              title={currPost.title}
              description={
                <span>
                  Written by{' '}
                  <Link to={urlGenerator.profile(currPost.author.id)}>
                    {currPost.author.first_name} {currPost.author.last_name}
                  </Link>{' '}
                  on {formatDate(currPost.created_at)}
                </span>
              }
            />
            <br />
            <MarkdownDisplay markdown={currPost.content} />
          </Card>
        ))}
    </RestrictedRoute>
  )
}

export default PostsPage
