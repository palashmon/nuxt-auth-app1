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
                  v-model.trim="$v.name.$model"
                  type="text"
                  class="input"
                  :class="status($v.name)"
                >
              </div>
              <p v-if="$v.name.alphaNum && showErrorLabel($v.name)" class="help is-danger">
                Full name is required
              </p>
              <p v-if="!$v.name.alphaNum && showErrorLabel($v.name)" class="help is-danger">
                Full name has non-alphanumeric characters.
              </p>
              <!-- <pre>{{ $v.name }}</pre> -->
            </div>
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  v-model.trim="$v.username.$model"
                  type="text"
                  class="input"
                  :class="status($v.username)"
                >
              </div>
              <p v-if="!$v.username.required && showErrorLabel($v.username)" class="help is-danger">
                Username is required
              </p>
              <p v-if="!$v.username.alphaNum && showErrorLabel($v.username)" class="help is-danger">
                Username has non-alphanumeric characters.
              </p>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model.trim="$v.email.$model"
                  type="email"
                  class="input"
                  :class="status($v.email)"
                >
              </div>
              <p v-if="showErrorLabel($v.email)" class="help is-danger">
                Please enter a valid email, ex - example@domain.com
              </p>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model.trim="$v.password.$model"
                  type="password"
                  class="input"
                  :class="status($v.password)"
                >
              </div>
              <p v-if="!$v.password.required && showErrorLabel($v.password)" class="help is-danger">
                Password is required
              </p>
              <p v-if="!$v.password.minLength && showErrorLabel($v.password)" class="help is-danger">
                Password must have at least {{ $v.password.$params.minLength.min }} letters
              </p>
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  v-model.trim="$v.confirmPassword.$model"
                  type="password"
                  class="input"
                  :class="status($v.confirmPassword)"
                >
              </div>
              <p v-if="!$v.confirmPassword.sameAsPassword && showErrorLabel($v.confirmPassword)" class="help is-danger">
                Passwords must be identical.
              </p>
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
import { validationMixin } from 'vuelidate'
import { required, minLength, email, alphaNum, sameAs } from 'vuelidate/lib/validators'
import Notification from '~/components/Notification'

export default {
  middleware: 'guest',
  components: {
    Notification
  },
  mixins: [validationMixin],
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

  validations: {
    name: {
      required,
      minLength: minLength(1),
      alphaNum
    },
    username: {
      required,
      minLength: minLength(1),
      alphaNum
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  },

  methods: {
    async register () {
      try {
        this.$v.$touch()
        if (this.$v.$invalid) { return }

        this.$nuxt.$loading.start()
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

        this.$nuxt.$loading.finish()
        this.$router.push('/')
      } catch (err) {
        this.$nuxt.$loading.finish()
        if (!err?.response?.data?.status) {
          if (err.response.data?.message) {
            this.error = err.response.data.message
          } else {
            // In case of multiple validation errors use map
            this.error = err.response.data.data.map(({ msg }) => msg).join(', ')
          }
        }
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
