import { Routes } from '../../../feature/routing/routes'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Tabs from '../../../components/Tabs'

const ConnectionsTabs = () => {
  const location = useLocation()
  return (
    <Tabs
      activeKey={location.pathname}
      items={[
        {
          label: <Link to={Routes.Connections}>My Connections</Link>,
          key: Routes.Connections,
        },
        {
          label: (
            <Link to={Routes.ConnectionsSearch}>Search For Connections</Link>
          ),
          key: Routes.ConnectionsSearch,
        },
      ]}
    />
  )
}

export default ConnectionsTabs
