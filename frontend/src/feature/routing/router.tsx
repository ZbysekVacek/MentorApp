import { createBrowserRouter } from 'react-router-dom'
import IndexPage from '../../pages/IndexPage'
import HomePage from '../../pages/HomePage'
import MeetingsPage from '../../pages/meetings/MeetingsPage'
import React from 'react'
import AppLayout from '../app/AppLayout'
import { Routes } from './routes'
import NotFoundPage from '../../pages/NotFoundPage'
import AboutPage from '../../pages/AboutPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: Routes.Index,
        element: <IndexPage />,
      },
      {
        path: Routes.HomePage,
        element: <HomePage />,
      },
      {
        path: Routes.Meetings,
        element: <MeetingsPage />,
      },
      {
        path: Routes.About,
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
