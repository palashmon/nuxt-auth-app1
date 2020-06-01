<template>
  <v-app>
    <v-content>
      <Navbar />
      <v-container>
        <nuxt />
        <modal v-if="loggedIn && isIdle">
          <idle-modal />
        </modal>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar'
import IdleModal from '~/components/IdleModal'

export default {
  components: {
    Navbar, IdleModal
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },

  onIdle () {
    this.$store.commit('idleVue/SET_IS_IDLE', true)
  },
  computed: {
    isIdle () {
      return this.$store.state.idleVue.isIdle
    },
    loggedIn () {
      return this.$store.state.auth.loggedIn
    }
  }
}
</script>
