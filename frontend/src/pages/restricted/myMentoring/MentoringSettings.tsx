import React from 'react'
import { Col, Input, message, Row, Typography } from 'antd'
import { useMentoringEditPartialUpdate } from '../../../api/generated/generatedApiComponents'
import MarkdownEditor from '../../../components/markdown/MarkdownEditor'
import MarkdownDisplay from '../../../components/markdown/MarkdownDisplay'
import Button from '../../../components/Button'
import { Mentoring } from '../../../api/generated/generatedApiSchemas'

type Props = {
  mentoring: Mentoring
  isCurrentUserMentor: boolean
}
/** Displays Mentoring settings */
const MentoringSettings = ({ mentoring, isCurrentUserMentor }: Props) => {
  const saveSettingsChange = useMentoringEditPartialUpdate({})
  const handleSave = () => {
    saveSettingsChange.mutate(
      {
        pathParams: { id: mentoring?.id ?? -1 },
        body: {
          frequency_days: selectedFrequency,
          objectives: objectives?.length > 0 ? objectives : '',
          settings: contract?.length > 0 ? contract : '',
        },
      },
      {
        onSuccess: () => {
          message.success('Settings saved')
        },
        onError: () => {
          message.error('Error while saving settings')
        },
      }
    )
  }

  const [objectives, setObjectives] = React.useState(
    mentoring?.objectives ?? ''
  )
  const [contract, setContract] = React.useState(mentoring?.settings ?? '')

  const [selectedFrequency, setSelectedFrequency] = React.useState(
    mentoring?.frequency_days
  )

  if (saveSettingsChange.isPending) {
    return <Typography.Title level={3}>Settings are saving</Typography.Title>
  }

  return (
    <Row gutter={[20, 20]}>
      <Col lg={12} sm={24}>
        <Typography.Title level={5}>
          {' '}
          Agreed frequency of contact
        </Typography.Title>
        <Typography.Paragraph>
          How often do you want to meet? Ideally, the frequency shouldn't be
          longer than 14 days
        </Typography.Paragraph>
        <Input
          type="number"
          min={1}
          value={selectedFrequency}
          onChange={(e) => setSelectedFrequency(Number(e.target.value))}
          disabled={!isCurrentUserMentor}
        />
      </Col>
      <Col span={24}>
        <Typography.Title level={5}>
          {' '}
          Objectives of the mentoring
        </Typography.Title>
        <Typography.Paragraph>
          What are the objectives of the mentoring? What do you both want to
          achieve? What do you both or mentee want to learn?
        </Typography.Paragraph>
        {isCurrentUserMentor ? (
          <MarkdownEditor
            markdown={objectives}
            onChange={(e) => setObjectives(e)}
          />
        ) : (
          <MarkdownDisplay markdown={objectives} />
        )}
      </Col>
      <Col span={24}>
        <Typography.Title level={5}> Mentoring contract</Typography.Title>
        <Typography.Paragraph>
          Here you can specify the mentoring contract. All settings and rules
          you want to follow during the mentoring.
        </Typography.Paragraph>
        {isCurrentUserMentor ? (
          <MarkdownEditor
            markdown={contract}
            onChange={(e) => setContract(e)}
          />
        ) : (
          <MarkdownDisplay markdown={contract} />
        )}
      </Col>
      {isCurrentUserMentor && (
        <Col span={24}>
          <Button onClick={handleSave} type="primary">
            Save
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default MentoringSettings
