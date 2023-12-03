import React from 'react'
import { Spin, Typography } from 'antd'

/**
 * This component is shown as loader while some data is loading
 */
const PageLoader = () => {
  return (
    <Spin
      size="large"
      tip={<Typography.Title level={1}>Loading page</Typography.Title>}
    >
      <div style={{ height: '100vh' }}></div>
    </Spin>
  )
}

export default PageLoader
