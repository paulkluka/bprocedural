<!-- CustomButton.vue -->
<template>
  <v-btn @click="handleClick">
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.onClick();
    }
  }
}
</script>

