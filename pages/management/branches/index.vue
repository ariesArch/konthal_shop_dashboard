<template>
  <div class="container-fluid">
    <v-card>
      <v-card-title>Branches</v-card-title>
      <v-btn color="primary" @click="()=>$router.push('branches/create')">
        Create
      </v-btn>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'dashboard'
}
</script>
