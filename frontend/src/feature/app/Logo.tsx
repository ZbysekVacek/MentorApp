import { useNavigate } from 'react-router-dom'
import { Routes } from '../routing/routes'
import logo from '../../images/logo.png'
import React from 'react'
import './Logo.css'
import { useAppSettingsList } from '../../api/generated/generatedApiComponents'

/** Logo component */
const Logo = () => {
  const navigate = useNavigate()
  const { data: appSettings } = useAppSettingsList({})
  const appName =
    appSettings?.find((curr) => curr.type === 'APP_NAME')?.content ||
    'MentorApp'

  const handleLogoClick = () => {
    navigate(Routes.Index)
  }

  return (
    <div className="Logo" onClick={handleLogoClick}>
      <img src={logo} className="Logo__image" alt="MentorApp logo" />
      <span className="Logo__text">{appName}</span>
    </div>
  )
}

export default Logo
