import React from 'react'
import { Card } from 'antd'
import { urlGenerator } from '../../../feature/routing/routes'
import { useUserCurrentRetrieve } from '../../../api/generated/generatedApiComponents'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import { assertIsDefined } from '../../../utils/utils'
import Meta from 'antd/es/card/Meta'

const NotFilledProfile = () => {
  const { data: user } = useUserCurrentRetrieve({})
  const navigate = useNavigate()

  if (user && user.profile) {
    const missingFields = Object.values(user.profile).filter(
      (currValue) =>
        currValue === null ||
        currValue === undefined ||
        (typeof currValue === 'string' && currValue.length === 0)
    )
    if (missingFields.length > 0) {
      const userId = user.id
      assertIsDefined(userId)
      return (
        <Card
          actions={[
            <Button
              onClick={() => navigate(urlGenerator.profile(userId))}
              type="primary"
            >
              Edit my profile
            </Button>,
          ]}
        >
          <Meta
            title="Please fill your profile"
            description="
            Some of your profile fields are empty. Please fill them to be able
            to show your information to other users.
          "
          />
        </Card>
      )
    }
  }

  return <></>
}

export default NotFilledProfile
