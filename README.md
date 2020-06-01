# nuxt-auth-app1

Implementing Authentication in a Nuxt.js App using [`mevn-auth-api`](https://github.com/palashmon/mevn-auth-api).

## Spinning up a quick API

To save ourselves some time, we'll clone an API, which I have put together for this repo.
For detailed explanation on how to setup the api, check out [mevn-auth-api](https://github.com/palashmon/mevn-auth-api) repo.

Once all setup is done, we can start the API:

```bash
# launch API server
$ npm run start
```

## Run this Nuxt auth app

Once the API is up and running, we need to clone & install the dependencies for this app and then launch the app

```bash
# clone the app
git clone https://github.com/palashmon/nuxt-auth-app1.git
cd nuxt-auth-app1

# install dependencies
$ npm install

# serve with hot reload at localhost:3002
$ npm run dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Logic Implemented

- Home page `/`, register page `/register` and login page `/login` are public, anyone can view it.
- Only My profile page `/profile` is private, only logged in user can view it.
- If not logged in and user tries to go to `/profile`, they will be redirected to `/login` page automatically.
- If already logged in and user tries to go to `/register` or `/login` pages, they will be redirected to home `/` page automatically.
- Implemented the logic to check for the inactivity of the user in our app. If the user is inactive for a period of time, then we automatically log out the user or show a timer first. We can update the timeout value for `IDLE_TIMEOUT` in `.env` file. Right now it set to 30 minutes. So, after 30 minutes a modal will open letting the user know that "Your session is about to expire in 60 seconds"
