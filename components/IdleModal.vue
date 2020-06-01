<template>
  <div class="text-center">
    <header class="modal-card-head">
      <h1 class="modal-card-title h2 mb-0">
        {{ title }}
      </h1>
    </header>
    <section class="modal-card-body">
      <p v-if="!isLoggedOut">
        Your session is about to expire in {{ seconds }} seconds
      </p>
      <p v-else>
        Your session has expired.
      </p>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons is-right width-100">
        <template v-if="!isLoggedOut">
          <button
            class="button mr-2"
            type="button"
            @click="logOut"
          >
            Log out
          </button>
          <button
            class="button is-info"
            type="button"
            @click="continueSession"
          >
            Continue session
          </button>
        </template>
        <button
          v-else
          class="button is-info"
          type="button"
          @click="close"
        >
          OK
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
const TIME = 60
export default {
  name: 'IdleModal',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      timer: '',
      seconds: TIME,
      isLoggedOut: false
    }
  },
  computed: {
    isIdle () {
      return this.$store.state.idleVue.isIdle
    },
    title () {
      return this.isLoggedOut ? 'Session expired' : 'Session about to expire'
    }
  },
  created () {
    this.timer = setInterval(this.countDown, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.$store.commit('idleVue/SET_IS_IDLE', false)
  },
  methods: {
    countDown () {
      this.seconds -= 1
      if (!this.isIdle) {
        clearInterval(this.timer)
      }
      if (this.seconds < 1) {
        this.logOut()
      }
    },
    close () {
      this.$emit('close')
    },
    continueSession () {
      this.seconds = TIME
      this.$store.commit('idleVue/SET_IS_IDLE', false)
      clearInterval(this.timer)
    },
    logOut (event) {
      clearInterval(this.timer)
      this.isLoggedOut = true
      this.$auth.logout()
    }
  }
}
</script>
