/**
 * Enum of all routes in the app.
 * It is required to add all new routes there.
 */
export enum Routes {
  Index = '/',
  HomePage = '/home',
  Meetings = '/meetings',
  About = '/about',
  Login = '/login',
  Register = '/register',
  Posts = '/posts',
  MyMentoring = '/my-mentoring',
  MyMentoringMyMentors = '/my-mentoring/my-mentors',
  MyMentoringMyMentees = '/my-mentoring/my-mentees',
  MyMentoringSearchMentor = '/my-mentoring/search-mentor',
  Tasks = '/tasks',
  TasksCreated = '/tasks/created',
  Notes = '/notes',
  Connections = '/connections',
  ConnectionsSearch = '/connections-search',
  Notifications = '/notifications',
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
