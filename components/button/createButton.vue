<template>
  <v-btn color="primary" @click="()=>$router.push(to)">
    Create
  </v-btn>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      default: '/'
    }
  }
}
</script>
