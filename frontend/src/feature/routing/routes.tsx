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
}

export function assertIsRoute(path: string): asserts path is Routes {
  const allRoutes = Object.values(Routes) as string[]
  if (!allRoutes.includes(path)) {
    throw new Error(`Path ${path} is not part of Routes enum`)
  }
}
