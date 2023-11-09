import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserRetrieve } from '../../api/generated/generatedApiComponents'

import { Routes } from './routes'
import PageLoader from '../../components/PageLoader'
import { Typography } from 'antd'

const RestrictedRoute = (props: PropsWithChildren) => {
  const { data: userData, isLoading, isError } = useUserRetrieve({})

  if (!isLoading && !userData?.id) {
    return <Navigate to={Routes.Index} />
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <Typography.Title level={1}>Could not load user</Typography.Title>
  }

  return <>{props.children}</>
}

export default RestrictedRoute
