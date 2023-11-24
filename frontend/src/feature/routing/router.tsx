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
import SearchMentorPage from '../../pages/restricted/myMentoring/SearchMentorPage'
import TasksPage from '../../pages/restricted/tasks/TasksPage'
import TasksCreatedPage from '../../pages/restricted/tasks/TasksCreatedPage'
import NotesPage from '../../pages/restricted/NotesPage'
import ConnectionsPage from '../../pages/restricted/connections/ConnectionsPage'
import ConnectionsSearchPage from '../../pages/restricted/connections/ConnectionsSearchPage'
import NotificationsPage from '../../pages/restricted/NotificationsPage'
import MessagesPage from '../../pages/restricted/MessagesPage'
import ProfilePage from '../../pages/restricted/ProfilePage'

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
        path: Routes.MyMentoringSearchMentor,
        element: <SearchMentorPage />,
      },
      {
        path: Routes.Posts,
        element: <PostsPage />,
      },
      {
        path: Routes.Tasks,
        element: <TasksPage />,
      },
      {
        path: Routes.TasksCreated,
        element: <TasksCreatedPage />,
      },
      {
        path: Routes.Notes,
        element: <NotesPage />,
      },
      {
        path: Routes.Connections,
        element: <ConnectionsPage />,
      },
      {
        path: Routes.ConnectionsSearch,
        element: <ConnectionsSearchPage />,
      },
      {
        path: Routes.Notifications,
        element: <NotificationsPage />,
      },
      {
        path: Routes.Messages,
        element: <MessagesPage />,
      },
      {
        path: Routes.Profile,
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
