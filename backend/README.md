This is the express js backend for mern auth system

In .env file add below things - 

ACCESS_TOKEN_SECRET = ''
REFRESH_TOKEN_SECRET = ''
CONFIRM_CODE_TOKEN = ''
DATABASE_URI = 'mongodb://localhost:27017/database_name'

SITE_NAME = ''                     <---- To add site name in email
EMAIL_FROM= ''                     <---- Your email id
EMAIL_PASS = ''                    <--- Your email password
NODE_ENV = 'development'
FRONT_END_URL = 'http://localhost:3000'

---> To get the TOKEN_SECRET enter below code in terminal
> node
>require('crypto').randomBytes(64).toString('hex')

Above code will provide a token which you can use in .env file.
