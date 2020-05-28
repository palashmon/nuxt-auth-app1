export const getters = {

  // Return the authentication status of a user
  isAuthenticated (state) {
    return state.auth.loggedIn
  },

  // Return the details of the logged in user.
  loggedInUser (state) {
    return state.auth.user
  }
}
