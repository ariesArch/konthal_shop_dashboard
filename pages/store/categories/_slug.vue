<template>
  <div class="container-fluid">
    <v-card>
      <v-card-title>Slug-{{ $route.params.slug }}</v-card-title>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'dashboard'
}
</script>
