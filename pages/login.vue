<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half-desktop is-one-third-widescreen">
          <h2 class="title has-text-centered">
            Welcome back!
          </h2>

          <Notification v-if="error" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  v-model="username"
                  type="text"
                  class="input"
                  name="username"
                  required
                >
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                  required
                >
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary is-fullwidth">
                Log In
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">
                Register
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification
  },

  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e?.response?.data?.message
      }
    }
  }
}
</script>
