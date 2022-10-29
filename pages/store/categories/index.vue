<template>
  <div class="container-fluid">
    <v-data-table :headers="categoryHeaders" :items="list">
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
          <!-- <createButton to="categories/create" /> -->
          <v-btn color="primary" @click="showDialog('create')">
            Create
          </v-btn>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon
          class="mr-2"
          color="info"
          @click="showDialog('show',item)"
        >
          mdi-eye
        </v-icon>
        <v-icon
          class="mr-2"
          color="info"
          @click="showDialog('edit',item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <categoryForm
      v-model="openFormDialog"
      :title="dialogTitle"
    />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Branch" />
  </div>
</template>
<script>
// import createButton from '@/components/button/createButton.vue'
import { categoryHeaders } from '@/utils/tableHeaders'
import categoryForm from '@/components/FormDialog/categoryForm'

export default {
  components: { categoryForm },
  layout: 'dashboard',
  // middleware: 'auth',
  data: () => ({
    list: [],
    search: '',
    categoryHeaders,
    selectedItem: {
    },
    dialogTitle: '',
    openFormDialog: false,
    openDetailDialog: false
  }),
  // async fetch () {
  //   const { data, status, message } = (await this.$axios.get('/categories')).data
  //   if (status === 1) {
  //     this.list = data
  //   } else {
  //     console.log(message)
  //   }
  // }
  async fetch () {
    await this.fetchList(this, '/categories')
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.selectedItem = (({ name, name_mm, detail }) => ({ name, name_mm, detail }))(item)
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (item !== null) {
          this.selectedItem = (({ id, name, name_mm, detail }) => ({ id, name, name_mm, detail }))(item)
          this.dialogTitle = 'Edit Category'
        } else {
          this.dialogTitle = 'Create Category'
        }
        this.$emit('openFormDialog', this.selectedItem)
        this.openFormDialog = true
      }
    }
  }
}
</script>
