import React from 'react'
import { Note } from '../../api/generated/generatedApiSchemas'
import { Avatar, Card, Col, Divider, List, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { Routes, urlGenerator } from '../routing/routes'
import './RelatedNotesCard.css'
import { ProfileOutlined } from '@ant-design/icons'
import { formatDate } from '../../utils/utils'
import Button from '../../components/Button'
import './RelatedNotesCard.css'

type Props = {
  notes: Note[]
}
/** Component for displaying related notes */
const RelatedNotesCard = ({ notes }: Props) => {
  return (
    <Card
      className="NotesCard"
      actions={[<Link to={Routes.Notes}>All Notes</Link>]}
    >
      <Card.Meta
        avatar={<Avatar icon={<ProfileOutlined />} />}
        title="Notes"
        description="Your notes related to the mentoring"
      />
      <br />
      <Divider />
      {!notes.length && (
        <Typography.Text>
          You have no notes related to the mentoring
        </Typography.Text>
      )}
      {!!notes.length && (
        <List
          itemLayout="horizontal"
          dataSource={notes}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
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
                        <Link to={urlGenerator.noteDetail(item.id)}>
                          <Button>Note detail</Button>
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

export default RelatedNotesCard
