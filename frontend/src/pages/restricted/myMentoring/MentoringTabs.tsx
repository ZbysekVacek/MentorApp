import { Routes } from '../../../feature/routing/routes'
import { Tabs } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MentoringTabs = () => {
  const location = useLocation()
  return (
    <Tabs
      activeKey={location.pathname}
      items={[
        {
          label: <Link to={Routes.MyMentoring}>Dashboard</Link>,
          key: Routes.MyMentoring,
        },
        {
          label: <Link to={Routes.MyMentoringMyMentors}>My Mentors</Link>,
          key: Routes.MyMentoringMyMentors,
        },
        {
          label: <Link to={Routes.MyMentoringMyMentees}>My Mentees</Link>,
          key: Routes.MyMentoringMyMentees,
        },
        {
          label: (
            <Link to={Routes.MyMentoringSearchMentor}>Search For Mentor</Link>
          ),
          key: Routes.MyMentoringSearchMentor,
        },
      ]}
    />
  )
}

export default MentoringTabs
