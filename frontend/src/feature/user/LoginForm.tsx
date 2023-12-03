import React, { useState } from 'react'
import { useUserLoginCreate } from '../../api/generated/generatedApiComponents'
import { useQueryClient } from '@tanstack/react-query'
import { Alert, Form, Input } from 'antd'
import Button from '../../components/Button'
import './LoginForm.css'
import { Link } from 'react-router-dom'
import { Routes } from '../routing/routes'

/** Login form */
const LoginForm: React.FC = () => {
  const loginUser = useUserLoginCreate()
  const queryClient = useQueryClient()
  const [submittable, setSubmittable] = useState(false)

  type FormValues = {
    username: string
    password: string
  }
  const [form] = Form.useForm<FormValues>()
  const formValues = Form.useWatch([], form)
  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true)
      },
      () => {
        setSubmittable(false)
      }
    )
  }, [form, formValues])

  const onFinish = (values: FormValues) => {
    loginUser.mutate(
      {
        body: {
          username: values.username,
          password: values.password,
        },
      },
      {
        onSuccess: () =>
          queryClient.invalidateQueries({ queryKey: ['api', 'user'] }),
      }
    )
  }
  return (
    <div className="LoginForm">
      {loginUser.isError && (
        <Alert
          message="Wrong credentials"
          type="error"
          showIcon
          className="LoginForm__alert"
        />
      )}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        name="login-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        disabled={loginUser.isPending}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
            loading={loginUser.isPending}
          >
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{ offset: 0, span: 24 }}
          className="LoginForm__register"
        >
          Are you not using our application yet? <br />
          <Link to={Routes.Register}>Register now</Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
