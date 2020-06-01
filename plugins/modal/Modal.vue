<template>
  <div
    :class="{ 'is-active': visible }"
    class="modal"
  >
    <div class="modal-background" />
    <!-- eslint-disable-next-line vue/require-component-is -->
    <div class="modal-card">
      <component
        :is="component"
        v-if="component"
        v-bind="props"
        @close="close"
      />
      <slot v-else />
      <!-- eslint-enable-next-line vue/require-component-is -->
    </div>
    <button class="modal-close is-large" aria-label="close" />
  </div>
</template>

<script>

export default {
  name: 'Modal',

  props: {
    component: {
      type: Object,
      default: () => {}
    },

    props: {
      type: Object,
      default: () => {}
    },

    programmatic: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      visible: true
    }
  },

  beforeMount () {
    // Insert the Modal component in body tag
    this.programmatic && document.body.appendChild(this.$el)
  },

  methods: {
    close () {
      if (this.programmatic) {
        this.visible = false
        setTimeout(() => {
          this.removeElement()
          this.$destroy()
        }, 150)
      }
    },

    removeElement () {
      // Removes Modal component in body tag, to stop duplications
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
