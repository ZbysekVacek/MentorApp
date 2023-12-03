import { createBrowserRouter } from 'react-router-dom'
import IndexPage from '../../pages/public/IndexPage'
import HomePage from '../../pages/restricted/homepage/HomePage'
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
import NotesPage from '../../pages/restricted/notes/NotesPage'
import ConnectionsPage from '../../pages/restricted/connections/ConnectionsPage'
import ConnectionsSearchPage from '../../pages/restricted/connections/ConnectionsSearchPage'
import NotificationsPage from '../../pages/restricted/notifications/NotificationsPage'
import MessagesPage from '../../pages/restricted/MessagesPage'
import ProfilePage from '../../pages/restricted/profile/ProfilePage'
import MentoringDetailPage from '../../pages/restricted/myMentoring/MentoringDetailPage'
import MeetingDetailPage from '../../pages/restricted/meetings/MeetingDetailPage'
import TasksDetailPage from '../../pages/restricted/tasks/TasksDetailPage'
import NotesDetailPage from '../../pages/restricted/notes/NotesDetailPage'
import MeetingsCreatePage from '../../pages/restricted/meetings/MeetingsCreate'
import TaskCreatePage from '../../pages/restricted/tasks/TasksCreate'
import NotesCreate from '../../pages/restricted/notes/NotesCreate'

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
        path: Routes.MeetingDetail,
        element: <MeetingDetailPage />,
      },
      {
        path: Routes.MeetingCreate,
        element: <MeetingsCreatePage />,
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
        path: Routes.MyMentoringDetail,
        element: <MentoringDetailPage />,
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
        path: Routes.TasksCreate,
        element: <TaskCreatePage />,
      },
      {
        path: Routes.TasksCreated,
        element: <TasksCreatedPage />,
      },
      {
        path: Routes.TaskDetail,
        element: <TasksDetailPage />,
      },
      {
        path: Routes.Notes,
        element: <NotesPage />,
      },
      {
        path: Routes.NoteCreate,
        element: <NotesCreate />,
      },
      {
        path: Routes.NoteDetail,
        element: <NotesDetailPage />,
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
