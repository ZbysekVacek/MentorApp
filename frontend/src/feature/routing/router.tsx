import { createBrowserRouter } from 'react-router-dom'
import IndexPage from '../../pages/public/IndexPage'
import HomePage from '../../pages/restricted/HomePage'
import MeetingsPage from '../../pages/restricted/meetings/MeetingsPage'
import React from 'react'
import AppLayout from '../app/AppLayout'
import { Routes } from './routes'
import NotFoundPage from '../../pages/public/NotFoundPage'
import AboutPage from '../../pages/public/AboutPage'
import LoginPage from '../../pages/public/LoginPage'
import RegisterPage from '../../pages/public/RegisterPage'
import PostsPage from '../../pages/restricted/PostsPage'
import MyMentoringPage from '../../pages/restricted/myMentoring/MyMentoringPage'
import MyMentorsPage from '../../pages/restricted/myMentoring/MyMentorsPage'
import MyMenteesPage from '../../pages/restricted/myMentoring/MyMenteesPage'

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
        path: Routes.About,
        element: <AboutPage />,
      },
      {
        path: Routes.Login,
        element: <LoginPage />,
      },
      {
        path: Routes.Register,
        element: <RegisterPage />,
      },
      {
        path: Routes.Meetings,
        element: <MeetingsPage />,
      },
      {
        path: Routes.MyMentoring,
        element: <MyMentoringPage />,
      },
      {
        path: Routes.MyMentoringMyMentors,
        element: <MyMentorsPage />,
      },
      {
        path: Routes.MyMentoringMyMentees,
        element: <MyMenteesPage />,
      },
      {
        path: Routes.Posts,
        element: <PostsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
