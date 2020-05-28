<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          Nuxt Auth
        </nuxt-link>
        <button class="button navbar-burger">
          <span />
          <span />
          <span />
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div v-if="isAuthenticated" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ loggedInUser.username }}
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/profile">
                My Profile
              </nuxt-link>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register">
              Register
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/login">
              Log In
            </nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },

  methods: {
    async logout () {
      // We call the logout() of the Auth module.
      // This will simply delete the user’s token from localstorage
      // and redirect the user to the homepage.
      await this.$auth.logout()
    }
  }
}
</script>
