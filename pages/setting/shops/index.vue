<template>
  <div class="container-fluid">
    <v-data-table :headers="shopHeaders" :items="shops">
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
      <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        class="mr-2"
        color="info"
        @click="$router.push(`/setting/shops/${item.id}`)"
      >
        mdi-eye
      </v-icon>
      <v-icon
        color="primary"
        @click="deleteItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    </v-data-table>
  </div>
</template>
<script>
import createButton from '@/components/button/createButton.vue'
import { shopHeaders } from '@/utils/tableHeaders'
export default {
  components: { createButton },
  layout: 'dashboard',
  data: () => ({
    shops: [],
    search: '',
    shopHeaders
  }),
  async fetch () {
    console.log((await this.$axios.get('/shops')))
    const { data, status, message } = (await this.$axios.get('/shops')).data
    if (status === 1) {
      this.shops = data
    } else {
      console.log(message)
    }
  }
}
</script>
