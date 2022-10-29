<template>
  <div class="container-fluid">
    <v-data-table :headers="branchHeaders" :items="list">
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
          <!-- <createButton to="branches/create" /> -->
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
    <branchForm
      v-model="openFormDialog"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
    />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Branch" />
  </div>
</template>
<script>
import localforage from 'localforage'
import { branchHeaders } from '@/utils/tableHeaders'
import branchForm from '@/components/FormDialog/branchForm'
export default {
  components: { branchForm },
  // middleware: 'auth',
  layout: 'dashboard',
  data: () => ({
    cities: [],
    townships: [],
    list: [],
    search: '',
    branchHeaders,
    selectedItem: {
    },
    dialogTitle: '',
    openFormDialog: false,
    openDetailDialog: false

  }),
  async fetch () {
    await this.fetchList(this, '/branches')
  },
  async mounted () {
    this.cities = await localforage.getItem('stored:cities')
    this.townships = await localforage.getItem('stored:townships')
  },
  methods: {
    showDialog (type, item = null) {
      if (type === 'show') {
        this.selectedItem = (({ name, name_mm, city, township }) => ({ name, name_mm, city_name: city.name, township_name: township.name }))(item)
        this.openDetailDialog = !this.openDetailDialog
      } else {
        if (item !== null) {
          this.selectedItem = (({ id, name, name_mm, city, township, phone_number, address, description, shop, shop_type }) => ({ id, name, name_mm, city_id: city.id, township_id: township.id, phone_number, address, description, shop_id: shop.id, shop_type_id: shop_type.id }))(item)
          this.dialogTitle = 'Edit Branch'
        } else {
          this.dialogTitle = 'Create Branch'
        }
        this.$emit('openFormDialog', this.selectedItem)
        this.openFormDialog = true
      }
    }
  }
}
</script>
