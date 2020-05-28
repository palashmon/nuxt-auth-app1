/**
 * Creating a guest middleware
 * We check if the user is logged in then redirect the user to the homepage from login & register pages.
 * Otherwise, we allow the normal execution of the request.
 */
export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    return redirect('/')
  }
}
