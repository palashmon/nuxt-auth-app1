const state = () => ({
  isIdle: false
})

const mutations = {
  SET_IS_IDLE (state, data) {
    state.isIdle = data
  }
}

export default {
  state,
  mutations
}
