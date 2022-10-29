<template>
  <div class="container-fluid">
    <v-data-table :headers="categoryHeaders" :items="categories">
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
          <createButton to="categories/create" />
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="info"
          @click="$router.push(`/store/categories/${item.slug}`)"
        >
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import createButton from '@/components/button/createButton.vue'
import { categoryHeaders } from '@/utils/tableHeaders'
export default {
  components: { createButton },
  layout: 'dashboard',
  // middleware: 'auth',
  data: () => ({
    categories: [],
    search: '',
    categoryHeaders
  }),
  async fetch () {
    const { data, status, message } = (await this.$axios.get('/categories')).data
    if (status === 1) {
      this.categories = data
    } else {
      console.log(message)
    }
  }
}
</script>
