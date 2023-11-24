import React from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { BadgeProps, CalendarProps } from 'antd'
import { Badge, Calendar } from 'antd'
import { Meeting } from '../../api/generated/generatedApiSchemas'

type Props = {
  meetings: Meeting[]
}
const MeetingsCalendar = (props: Props) => {
  const monthCellRender = (currMonth: Dayjs, allMeetings: Meeting[]) => {
    const startOfTheMonth = currMonth.startOf('month')
    const meetingsForTheMonth = allMeetings.filter((currMeeting) => {
      return dayjs(currMeeting.dateTime)
        .startOf('month')
        .isSame(startOfTheMonth)
    })

    return (
      <div className="notes-month">
        <section>{meetingsForTheMonth.length} meetings</section>
      </div>
    )
  }

  const dateCellRender = (currentDate: Dayjs, meetings: Meeting[]) => {
    const meetingsForTheDay = meetings
      .filter((currMeeting) => {
        const meetingDate = dayjs(currMeeting.dateTime).startOf('day')

        return currentDate.startOf('day').isSame(meetingDate)
      })
      .map((currMeeting) => ({ type: 'success', content: currMeeting.subject }))
    return (
      <ul className="events">
        {meetingsForTheDay.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current, props.meetings)
    if (info.type === 'month') return monthCellRender(current, props.meetings)
    return info.originNode
  }

  return <Calendar cellRender={cellRender} />
}

export default MeetingsCalendar
