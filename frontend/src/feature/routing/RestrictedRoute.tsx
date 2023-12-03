import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserCurrentRetrieve } from '../../api/generated/generatedApiComponents'

import { Routes } from './routes'
import PageLoader from '../../components/PageLoader'
import { Typography } from 'antd'

/** Handles restricted routes and redirects if user is not logged in */
const RestrictedRoute = (props: PropsWithChildren) => {
  const { data: userData, isLoading, isError } = useUserCurrentRetrieve({})

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
