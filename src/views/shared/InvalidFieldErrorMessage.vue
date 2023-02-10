<template>
  <span class="text-danger">{{ errorMessage && errorMessage[0] }}</span>
</template>

<script>
  export default {
    props: ['errorField', 'errorMessages'],
    computed: {
      errorMessage () {
        return this.errorMessages[this.errorField];
      }
    }
  }
</script>
