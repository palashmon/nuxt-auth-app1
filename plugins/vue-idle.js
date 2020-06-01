import IdleVue from 'idle-vue'
import Vue from 'vue'

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: (process.env.IDLE_TIMEOUT || 20) * 60 * 1000, // default: 20 mins
  // idleTime: 3 * 1000, // 3 seconds,
  startAtIdle: false
})
