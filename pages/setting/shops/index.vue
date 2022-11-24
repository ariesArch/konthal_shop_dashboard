<template>
  <div class="container-fluid">
    <v-data-table :headers="shopHeaders" :items="list">
      <template #top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          />
          <v-divider vertical inset />
          <v-spacer />
          <createButton to="shops/create" />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="info"
          @click="$router.push(`/setting/shops/${item.slug}`)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { shopHeaders } from '@/utils/tableHeaders'
export default {
  layout: 'dashboard',
  data: () => ({
    list: [],
    isFetching: false,
    search: '',
    shopHeaders
  }),
  // async fetch () {
  //   console.log((await this.$axios.get('/shops')))
  //   const { data, status, message } = (await this.$axios.get('/shops')).data
  //   if (status === 1) {
  //     this.shops = data
  //   } else {
  //     console.log(message)
  //   }
  // }
  async fetch () {
    await this.fetchList(this, '/shops')
    // await this.$api.post('/api-get', this.$axios)
  }
}
</script>
