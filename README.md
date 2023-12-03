# MentorApp

## About
![MentorApp Screnshot](/mentorAppScreenshot.png)
MentorApp is an opensource mentoring platform which aims to support mentoring process in small to medium organisations.
It is possible to use it both for short term mentoring programmes and for long term mentoring projects.

# Local development setup
## Prerequisites
* You need to have Python 3.9 or compatible version installed
* You need to have Node v20.9.0 or compatible version installed
* Project doesn't use version specific features, so it should work with older versions as well
* You can switch Node.js for Bun or Deno if you prefer. In that case you need to update the scripts in package.json

## Installation
* Fork the project and checkout main branch in git
* Go to the root folder
* Create a virtual environment
  * Run `python -m venv mentorapp_env` (or some other name and location you prefer) in order to create venv
  * Run `source ./mentorapp_env/bin/activate ` (or if you used different in previous step, use that name) in order to activate venv
* Run `npm run buildProjectLocal`
  * Alternatively, you can run just subests of the command:
    * `pip install -r requirements.txt` - to install python dependencies
    * `npm ci ` - to install node dependencies
    * `npm run build` - to build frontend
  * Don't worry if you see some errors or warnings from code formatters and linters. It is just about code style and not about functionality
* Run `python manage.py createsuperuser` and follow the instructions to create a superuser
## Development
* You need to specify required environment properties. See the section below for details
* After that, you should run database migration by running `python manage.py migrate`
* When you have database migrated and environment properties set, you can run the dev server. See the section below for details
### Required environment properties

| Property                | Description                                                                   |
|-------------------------|-------------------------------------------------------------------------------|
| DJANGO_SECRET_KEY       | Django secret key property                                                    |
| DJANGO_ALLOWED_HOSTS    | Which addresses or domain names may be used to connect to the Django instance |
| DJANGO_DEBUG            | Sets the debug mode                                                           |
| DJANGO_DEVELOPMENT_MODE | Toggles development mode and connection to SQLite / Postgres DB               |
| DJANGO_DATABASE_URL     | URL for DB connection. Not needed for development mode when using SQLite      |

### How to run BE dev server
* *Optional:* Activate your virtual env if you don't have it active yet (`source ./mentorapp_env/bin/activate`)
* Go to the root folder
* Run `python manage.py runserver`

### How to run FE dev server
* Go to the frontend folder (`cd frontend`)
* Run `npm start`

### OpenApi
* Specification is available at `/openapi-schema.yml`
* Project uses code-first approach (we don't write schema manually but rather generate it from the code)
* drf-yasg is used to generate the specification
* Swagger is available (for local development) on url `/api/schema/swagger-ui/`
* You can enable Redoc in urls.py if you prefer it over Swagger
* You can update the specification file by running `npm run openApiGenerateSchema` in root folder
* You can generate frontend client by running `npm run generateOpenApiClient` in **frontend** folder