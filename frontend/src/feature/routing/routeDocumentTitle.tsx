import { Routes } from './routes'

const routeByRoute: Record<Routes, string> = {
  // Public routes
  [Routes.Index]:
    'MentorApp - free opensource mentoring application for small and medium organizations',
  [Routes.About]: 'About the project - MentorApp',
  [Routes.Login]: 'Login in - MentorApp',
  [Routes.Register]: 'Registration - MentorApp',
  // Restricted routes
  [Routes.HomePage]: 'Home - MentorApp',
  [Routes.Meetings]: 'Meetings - MentorApp',
  [Routes.MyMentoring]: 'My Mentoring - MentorApp',
  [Routes.MyMentoringMyMentors]: 'My Mentors - MentorApp',
  [Routes.Posts]: 'Posts - MentorApp',
}

/**
 * Return the title of the page for the given route
 */
export const getRouteTitle = (route: Routes) => {
  return routeByRoute[route]
}
