import React, { useState } from 'react'
import {
  useCreateUserLogout,
  useRetrieveUser,
  useUserLogin,
} from '../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'

const UserInfo: React.FC = () => {
  const { isLoading, error, data } = useRetrieveUser({})
  const loginUser = useUserLogin()
  const logoutUser = useCreateUserLogout()
  const queryClient = useQueryClient()
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const handleLogin = async () => {
    if (!data?.id) {
      loginUser.mutate(
        {
          body: {
            username: loginUsername,
            password: loginPassword,
          },
        },
        {
          onSuccess: (d) =>
            queryClient.invalidateQueries({ queryKey: ['api', 'user'] }),
        }
      )
    }
  }

  const handleLogout = () => {
    if (data?.id) {
      logoutUser.mutate(
        {},
        {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ['api', 'user'] }),
        }
      )
    }
  }

  if (isLoading) {
    return <div>Loading user</div>
  }

  if (error) {
    return <div>Getting user failed</div>
  }

  if (!data || !data.id) {
    return (
      <div>
        <p>No user logged in</p>
        <label>Username</label>
        <input
          type="text"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.currentTarget.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.currentTarget.value)}
        />
        <br />
        <button
          disabled={!loginUsername.length || !loginPassword.length}
          onClick={handleLogin}
        >
          Login
        </button>
        {loginUser.isError && <p>Wrong credentials</p>}
      </div>
    )
  }

  return (
    <div>
      Email: {data.email}
      <br />
      Name: {data.first_name}
      <br />
      Surname: {data.last_name}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default UserInfo
