<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half-desktop is-one-third-widescreen">
          <h2 class="title has-text-centered">
            Register!
          </h2>

          <Notification v-if="error" :message="error" />

          <form method="post" @submit.prevent="register">
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input
                  v-model.trim="name"
                  type="text"
                  class="input"
                  name="name"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  v-model.trim="username"
                  type="text"
                  class="input"
                  name="username"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model.trim="email"
                  type="email"
                  class="input"
                  name="email"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model.trim="password"
                  type="password"
                  class="input"
                  name="password"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  v-model.trim="confirmPassword"
                  type="password"
                  class="input"
                  name="confirmPassword"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-info is-fullwidth">
                Register
              </button>
            </div>
          </form>

          <div class="has-text-centered" style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">
              Login
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification
  },

  data () {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },

  methods: {
    async register () {
      try {
        await this.$axios.post('/users/register', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })

        // Auto login the user to the app after registration
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (err) {
        if (!err?.response?.data?.status) {
          if (err.response.data?.message) {
            this.error = err.response.data.message
          } else {
            // In case of multiple validation errors use map
            this.error = err.response.data.data.map(({ msg }) => msg).join(', ')
          }
        }
      }
    }
  }
}
</script>
