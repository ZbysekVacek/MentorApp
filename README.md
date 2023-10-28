# MentorApp

# Local development setup
* Go to the root folder
* Create a virtual environment
* Run `python -m venv mentorapp_env`
* Run `pip install`
## Development
### Required environment properties

| Property                | Description                                                                   |
|-------------------------|-------------------------------------------------------------------------------|
| DJANGO_SECRET_KEY       | Django secret key property                                                    |
| DJANGO_ALLOWED_HOSTS    | Which addresses or domain names may be used to connect to the Django instance |
| DJANGO_DEBUG            | Sets the debug mode                                                           |
| DJANGO_DEVELOPMENT_MODE | Toggles development mode and connection to SQLite / Postgres DB               |
| DJANGO_DATABASE_URL     | URL for DB connection                                                         |

### How to run BE dev server
* *Optional:* Activate your virtual env if you don't have it active yet (`source ./mentorapp_env/bin/activate`)
* Go to the root folder
* Run `python manage.py runserver`