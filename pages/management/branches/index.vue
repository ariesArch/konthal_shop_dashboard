<template>
  <div class="container-fluid">
    <v-data-table :headers="branchHeaders" :items="branches">
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
          <createButton to="branches/create" />
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import createButton from '@/components/button/createButton.vue'
import { branchHeaders } from '@/utils/tableHeaders'
export default {
  components: { createButton },
  layout: 'dashboard',
  // middleware: 'auth',
  data: () => ({
    branches: [],
    search: '',
    branchHeaders
  }),
  async fetch () {
    console.log(this.$axios.defaults)
    const { data, status, message } = (await this.$axios.get('/branches')).data
    if (status === 1) {
      this.branches = data
    } else {
      console.log(message)
    }
  }
}
</script>
