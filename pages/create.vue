<template>
  <div class="container-fluid">
    <v-card width="400" class="mx-auto">
      <v-card-title>Create City</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitCity">
          <v-autocomplete v-model="region_id" :items="regions" label="Region" item-text="name" item-value="id" />
          <v-text-field v-model="name" label="Name" outlined />
          <v-text-field v-model="name_mm" label="Name" outlined />
          <v-btn type="submit" color="primary">
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data: () => ({
    regions: [],
    name: '',
    name_mm: '',
    region_id: ''
  }),
  async mounted () {
    const { data, status } = (await this.$axios.get('/regions')).data
    if (status === 1) {
      this.regions = data
    }
  },
  methods: {
    async submitCity () {
      const payload = { name: this.name, name_mm: this.name_mm, region_id: this.region_id }
      const { status } = (await this.$axios.post('/cities', payload)).data
      if (status === 1) {
        // this.$router.push('management/branches')
        this.$router.push('/')
      }
    }
  }
}
</script>
