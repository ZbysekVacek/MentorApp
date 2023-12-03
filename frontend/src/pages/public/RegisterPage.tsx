import React, { useState } from 'react'

import { Routes } from '../../feature/routing/routes'
import { Alert, Form, Input, Typography } from 'antd'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { getRouteTitle } from '../../feature/routing/routeDocumentTitle'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useRegisterUser } from '../../api/generated/generatedApiComponents'
import ValidationErrorList from '../../components/errors/ValidationErrorList'
import './RegisterPage.css'

/** Register page */
const RegisterPage = () => {
  useDocumentTitle(getRouteTitle(Routes.Register))

  type FormValues = {
    username: string
    email: string
    password: string
    passwordAgain: string
    firstName: string
    lastName: string
  }
  const [form] = Form.useForm<FormValues>()
  const register = useRegisterUser()
  const [submittable, setSubmittable] = useState(false)

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

  if (register.isSuccess) {
    return (
      <>
        <Typography.Title level={1}>Registration successful</Typography.Title>
        <Typography.Paragraph>
          You have been successfully registered to the site with username{' '}
          {form.getFieldValue('username')}. You can now{' '}
          <Link to={Routes.Login}>login</Link> to the site.
        </Typography.Paragraph>
      </>
    )
  }

  const onFinish = (values: FormValues) => {
    register.mutate({
      body: {
        username: values.username,
        password: values.password,
        email: values.email,
        first_name: values.firstName,
        last_name: values.lastName,
      },
    })
  }

  let errorMessage = (
    <>
      There were some issues with your registration. Please check the values you
      provided
    </>
  )
  if (
    register.isError &&
    register.error &&
    typeof register.error === 'object'
  ) {
    errorMessage = <ValidationErrorList error={register.error} />
  }

  return (
    <>
      <Typography.Title level={1}>Register to the site</Typography.Title>
      <Typography.Title level={3}></Typography.Title>
      <div>
        {register.isError && (
          <Alert
            message="Registration failed"
            description={errorMessage}
            type="error"
            showIcon
            className="RegisterPage__alert"
          />
        )}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="login-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          disabled={register.isPending}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your Username!' },
              { type: 'email' },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="passwordAgain"
            label="Password again"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input your Password again!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The password that you entered do not match! Please use same passwords.'
                    )
                  )
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!submittable}
              loading={register.isPending}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}></Form.Item>
        </Form>
      </div>
    </>
  )
}

export default RegisterPage
