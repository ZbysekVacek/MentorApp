import React from 'react'
import { useCompetencyAllList } from '../../api/generated/generatedApiComponents'
import { Profile } from '../../api/generated/generatedApiSchemas'
import { Tag } from 'antd'

type Props = {
  competencyIds: Profile['competencies']
}
const CompetenciesList = ({ competencyIds }: Props) => {
  const {
    data: competencies,
    isLoading: isLoadingCompetencies,
    isError: isCompetenciesError,
  } = useCompetencyAllList({})

  if (isLoadingCompetencies) {
    return <div>Loading competencies</div>
  }

  if (isCompetenciesError || !competencies) {
    return <div>Cannot load competencies</div>
  }

  return (
    <div>
      {competencyIds?.map((currId) => (
        <Tag color="blue" key={currId}>
          {competencies[currId]?.name}
        </Tag>
      ))}
    </div>
  )
}

export default CompetenciesList
