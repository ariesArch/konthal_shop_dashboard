<template>
  <div class="container-fluid">
    <v-data-table
      :headers="headers"
      :items="cities"
      :search="search"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          />
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn color="primary" @click="()=>$router.push('create')">
            Create
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  auth: 'guest',
  data: () => ({
    cities: [],
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name'
      },
      {
        text: 'Name',
        align: 'start',
        value: 'name_mm'
      },
      {
        text: 'Region',
        align: 'start',
        value: 'region.name'
      }
    ]
  }),
  async fetch () {
    const { data, status } = (await this.$axios.get('/cities')).data
    console.log(status)
    this.cities = data
  }
}
</script>
<style>
.test{
  background-color: aquamarine;
  padding: 90px;
}
</style>
