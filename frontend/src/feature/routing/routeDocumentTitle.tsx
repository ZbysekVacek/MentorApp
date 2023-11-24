import { Routes } from './routes'

const routeByRoute: Record<Routes, string> = {
  [Routes.Index]:
    'MentorApp - free opensource mentoring application for small and medium organizations',
  [Routes.HomePage]: 'Home - MentorApp',
  [Routes.Meetings]: 'Meetings - MentorApp',
  [Routes.About]: 'About the project - MentorApp',
  [Routes.Login]: 'Login in - MentorApp',
  [Routes.Register]: 'Registration - MentorApp',
}

/**
 * Return the title of the page for the given route
 */
export const getRouteTitle = (route: Routes) => {
  return routeByRoute[route]
}
