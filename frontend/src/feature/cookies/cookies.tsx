/** function to parse cookies string and return object of all cookies */
const parseCookie = (str: string) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc: Record<string, string>, v) => {
      if (v.length === 2) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      }
      return acc
    }, {})

/** function to get CSRF token from cookies. Needed for FE to BE communication to work */
export const getCSRFToken = () => parseCookie(document.cookie)['csrftoken']
