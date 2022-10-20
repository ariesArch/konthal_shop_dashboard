<template>
  <div class="container-fluid">
    <div class="row">
      <div class="cols col-md-6">
        <v-card>
          <v-card-title>{{ shopInfo.name }}</v-card-title>
          <v-card-text>
            Here is Shop Info Detail
          </v-card-text>
        </v-card>
      </div>
      <div class="cols col-md-6">
        <v-card>
          <v-card-title>Branch Info</v-card-title>
          <v-card-text>
            Here is Branch Info
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data: () => ({
    shopId: '',
    shopInfo: '',
    branches: []
  }),
  async fetch () {
    this.shopId = this.$route.params.id
    const { data, status } = (await this.$axios.get(`/shops/${this.shopId}`)).data
    if (status === 1) {
      this.shopInfo = data
    }
  }
}
</script>
