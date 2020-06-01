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
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="$v.username.$model"
                  class="input is-medium"
                  type="text"
                  placeholder="Enter username"
                  :class="status($v.username)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user" />
                </span>
              </div>
              <p v-if="showErrorLabel($v.username)" class="help is-danger">
                Username is required
              </p>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="$v.password.$model"
                  class="input is-medium"
                  type="password"
                  placeholder="Enter password"
                  :class="status($v.password)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-lock" />
                </span>
              </div>
              <p v-if="showErrorLabel($v.password)" class="help is-danger">
                Password is required
              </p>
            </div>
            <div class="control">
              <button type="submit" class="button is-info is-medium is-fullwidth">
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
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification
  },
  mixins: [validationMixin],

  data () {
    return {
      // TODO: Remove these after Rnd
      username: 'testuser1',
      password: '123456',
      error: null
    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(1)
    },
    password: {
      required,
      minLength: minLength(1)
    }
  },

  methods: {
    async login () {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) { return }

        this.$nuxt.$loading.start()
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })

        this.$nuxt.$loading.finish()
        this.$router.push('/')
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.error = e?.response?.data?.message
      }
    },
    status (validation) {
      return {
        'is-danger': validation.$dirty && validation.$error
      }
    },
    showErrorLabel (validation) {
      return validation.$dirty && validation.$error
    }
  }
}
</script>
