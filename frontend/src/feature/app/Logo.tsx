import { useNavigate } from 'react-router-dom'
import { Routes } from '../routing/routes'
import logo from '../../images/logo.png'
import React from 'react'
import './Logo.css'

const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate(Routes.Index)
  }

  return (
    <div className="Logo">
      <img
        src={logo}
        className="Logo__image"
        alt="MentorApp logo"
        onClick={handleLogoClick}
      />
      <span className="Logo__text">MentorApp</span>
    </div>
  )
}

export default Logo
