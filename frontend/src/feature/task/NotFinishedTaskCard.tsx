import React from 'react'
import { Task } from '../../api/generated/generatedApiSchemas'
import { Avatar, Card, Col, Divider, List, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { Routes, urlGenerator } from '../routing/routes'
import './NotFinishedTaskCard.css'
import { FileExclamationOutlined, FolderOutlined } from '@ant-design/icons'
import { formatDate } from '../../utils/utils'
import Button from '../../components/Button'

type Props = {
  tasks: Task[]
}
/** Component for displaying not finished tasks */
const NotFinishedTaskCard = ({ tasks }: Props) => {
  return (
    <Card
      className="TaskCard"
      actions={[<Link to={Routes.Tasks}>All Tasks</Link>]}
    >
      <Card.Meta
        avatar={<Avatar icon={<FolderOutlined />} />}
        title="Not finished tasks"
        description="Tasks that are not finished yet"
      />
      <br />
      <Divider />
      {!tasks.length && <Typography.Title level={5}>No tasks</Typography.Title>}
      {!!tasks.length && (
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<FileExclamationOutlined />} />}
                title={item.title}
                description={
                  <Row gutter={[20, 20]}>
                    <Col lg={12} sm={24}>
                      <Typography.Paragraph>
                        {formatDate(item.created_at)}
                      </Typography.Paragraph>
                    </Col>
                    <Col lg={12} sm={24}>
                      <Typography.Paragraph>
                        <Link to={urlGenerator.taskDetail(item.id)}>
                          <Button>Task detail</Button>
                        </Link>
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  )
}

export default NotFinishedTaskCard
