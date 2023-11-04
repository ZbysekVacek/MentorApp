import React from 'react'
import { useRetrieveUser } from '../../api/generated/generatedApiComponents'

const UserInfo: React.FC = () => {
  const { isLoading, error, data } = useRetrieveUser({})

  if (isLoading) {
    return <div>Loading user</div>
  }

  if (error) {
    return <div>Getting user failed</div>
  }

  if (!data) {
    return <div>No user logged in</div>
  }

  return (
    <div>
      Email: {data.email}
      <br />
      Name: {data.first_name}
      <br />
      Surname: {data.last_name}
      <br />
    </div>
  )
}

export default UserInfo
