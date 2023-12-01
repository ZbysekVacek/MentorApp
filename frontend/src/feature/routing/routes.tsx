/**
 * Enum of all routes in the app.
 * It is required to add all new routes there.
 */
export enum Routes {
  Index = '/',
  HomePage = '/home',
  Meetings = '/meetings',
  MeetingDetail = '/meetings/:id',
  About = '/about',
  Login = '/login',
  Register = '/register',
  Posts = '/posts',
  MyMentoring = '/my-mentoring',
  MyMentoringMyMentors = '/my-mentoring/my-mentors',
  MyMentoringMyMentees = '/my-mentoring/my-mentees',
  MyMentoringSearchMentor = '/my-mentoring/search-mentor',
  MyMentoringDetail = '/my-mentoring/detail/:id',
  Tasks = '/tasks',
  TaskDetail = '/tasks/:id',
  TasksCreated = '/tasks/created',
  Notes = '/notes',
  NoteDetail = '/notes/:id',
  Connections = '/connections',
  ConnectionsSearch = '/connections-search',
  Notifications = '/notifications',
  Messages = '/messages',
  Profile = '/profile/:userId',
}

/**
 * Routes that do not need special handling in the app.
 * They don't need breadcrumbs, document title and so on
 */
export enum ExternalRoutes {
  Admin = '/admin',
}

export function assertIsRoute(path: string): asserts path is Routes {
  const allRoutes = Object.values(Routes) as string[]
  if (!allRoutes.includes(path)) {
    throw new Error(`Path ${path} is not part of Routes enum`)
  }
}

export const urlGenerator = {
  profile: (userId?: number) =>
    Routes.Profile.replace(':userId', String(userId)),
  mentoringDetail: (mentoringId?: number) =>
    Routes.MyMentoringDetail.replace(':id', String(mentoringId)),
  meetingDetail: (meetingId?: number) =>
    Routes.MeetingDetail.replace(':id', String(meetingId)),
  taskDetail: (id?: number) => Routes.TaskDetail.replace(':id', String(id)),
  noteDetail: (id?: number) => Routes.NoteDetail.replace(':id', String(id)),
}
