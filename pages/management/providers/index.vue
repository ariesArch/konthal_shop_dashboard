<template>
  <div class="container-fluid">
    <v-data-table :headers="providerHeaders" :items="providers">
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
          <createButton to="providers/create" />
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import createButton from '@/components/button/createButton.vue'
import { providerHeaders } from '@/utils/tableHeaders'
export default {
  components: { createButton },
  layout: 'dashboard',
  data: () => ({
    providers: [],
    search: '',
    providerHeaders
  }),
  async fetch () {
    console.log((await this.$axios.get('/providers')))
    const { data, status, message } = (await this.$axios.get('/providers')).data
    if (status === 1) {
      this.providers = data
    } else {
      console.log(message)
    }
  }
}
</script>
