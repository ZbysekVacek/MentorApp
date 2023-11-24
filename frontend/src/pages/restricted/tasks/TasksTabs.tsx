import { Routes } from '../../../feature/routing/routes'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Tabs from '../../../components/Tabs'

const TasksTabs = () => {
  const location = useLocation()
  return (
    <Tabs
      activeKey={location.pathname}
      items={[
        {
          label: <Link to={Routes.Tasks}>Assigned To Me</Link>,
          key: Routes.Tasks,
        },
        {
          label: <Link to={Routes.MyMentoringMyMentors}>Created By Me</Link>,
          key: Routes.MyMentoringMyMentors,
        },
      ]}
    />
  )
}

export default TasksTabs
