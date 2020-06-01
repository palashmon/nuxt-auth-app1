import Vue from 'vue'
import Modal from './Modal.vue'

const ModalProgrammatic = {
  open (params) {
    let parent
    const ModalComponent = Vue.extend(Modal)

    if (params.parent) {
      parent = params.parent
      delete params.parent
    }

    return new ModalComponent({
      parent,
      el: document.createElement('div'),
      propsData: {
        programmatic: true,
        ...params
      }
    })
  }
}

const Plugin = {
  install () {
    Vue.prototype.$modal = ModalProgrammatic
    Vue.component('modal', Modal)
  }
}

export default Plugin
