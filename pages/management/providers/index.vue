<template>
  <div class="container-fluid">
    <v-data-table :headers="providerHeaders" :items="list">
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
          <!-- <createButton to="providers/create" /> -->
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
          color="primary"
          @click="showDialog('edit',item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <providerForm
      v-model="openFormDialog"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
    />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Provider" />
  </div>
</template>
<script>
import localforage from 'localforage'
import { providerHeaders } from '@/utils/tableHeaders'
import providerForm from '@/components/FormDialog/providerForm'
export default {
  components: { providerForm },
  layout: 'dashboard',
  data: () => ({
    cities: [],
    townships: [],
    list: [],
    search: '',
    selectedItem: {

    },
    dialogTitle: '',
    openDetailDialog: '',
    openFormDialog: '',
    providerHeaders
  }),
  async fetch () {
    await this.fetchList(this, '/providers')
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
          this.selectedItem = (({ id, name, name_mm, city, township, phone, address, email }) => ({ id, name, name_mm, city_id: city.id, township_id: township.id, phone, address, email }))(item)
          this.dialogTitle = 'Edit Provider'
        } else {
          this.dialogTitle = 'Create Provider'
        }
        this.$emit('openFormDialog', this.selectedItem)
        this.openFormDialog = true
      }
    }
  }
}
</script>
