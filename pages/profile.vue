<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half-widescreen">
          <h2 class="title has-text-centered">
            My Profile
          </h2>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Full Name</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input
                  v-model.trim="name"
                  type="text"
                  class="input"
                  name="name"
                  required
                >
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input
                  v-model.trim="username"
                  type="text"
                  class="input"
                  name="username"
                  required
                >
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email</label>
            </div>
            <div class="field-body">
              <div class="field">
                <input
                  v-model.trim="email"
                  type="email"
                  class="input"
                  name="email"
                  required
                >
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <!-- Left empty for spacing -->
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button is-info">
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  // https://auth.nuxtjs.org/guide/middleware.html
  // Restricting the profile page to only logged in users
  middleware: 'auth',
  data () {
    return {
      name: '',
      username: '',
      email: '',
      error: null
    }
  },

  computed: {
    ...mapGetters(['loggedInUser'])
  },

  created () {
    this.name = this.loggedInUser.name
    this.username = this.loggedInUser.username
    this.email = this.loggedInUser.email
  }
}
</script>
