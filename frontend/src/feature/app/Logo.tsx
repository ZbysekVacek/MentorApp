import { useNavigate } from 'react-router-dom'
import { Routes } from '../routing/routes'
import logo from '../../logo.svg'
import React from 'react'
import './Logo.css'

const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate(Routes.Index)
  }

  return (
    <img
      src={logo}
      className="Logo"
      alt="MentorApp logo"
      onClick={handleLogoClick}
    />
  )
}

export default Logo
