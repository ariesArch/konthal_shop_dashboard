<template>
  <v-card-actions class="justify-end">
    <v-btn type="button" color="primary" outlined>
      Cancel
    </v-btn>
    <v-btn type="submit" color="primary" class="my-1" :disabled="disabled">
      Submit
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
