<template>
  <v-card-actions>
    <v-spacer />
    <v-btn
      color="primary"
      outlined
      @click="$parent.$parent.$emit('input', { isOpenDialog: false })"
    >
      Cancel
    </v-btn>
    <v-btn
      color="primary"
      type="submit"
      :disabled="disabled"
    >
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
