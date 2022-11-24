<template>
  <div class="container-fluid">
    <!-- <ListTable
      :items="list"
      :headers="providerHeaders"
      title="Provider"
      @toggleCreateDialog="showCreateDialog"
      @toggleDetailDialog="showDetailDialog"
      @toggleEditDialog="showEditDialog"
    />
    <providerForm
      v-model="openProviderForm"
      :title="dialogTitle"
      :cities="cities"
      :townships="townships"
    />
    <DetailDialog v-model="openDetailDialog" :item="selectedItem" title="Provider" /> -->
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
// import localforage from 'localforage'
// import { providerHeaders } from '@/utils/tableHeaders'
// import providerForm from '@/components/FormDialog/providerForm'
// import ListTable from '@/components/ListTable/index'
// export default {
//   components: { providerForm, ListTable },
//   layout: 'dashboard',
//   data: () => ({
//     cities: [],
//     townships: [],
//     list: [],
//     search: '',
//     providerHeaders,
//     selectedItem: {},
//     dialogTitle: '',
//     openProviderForm: false,
//     openDetailDialog: false

//   }),
//   async fetch () {
//     await this.fetchList(this, '/providers')
//   },
//   async mounted () {
//     this.cities = await localforage.getItem('stored:cities')
//     this.townships = await localforage.getItem('stored:townships')
//   },
//   methods: {
//     showCreateDialog () {
//       this.openProviderForm = true
//       this.dialogTitle = 'Create Provider'
//     },
//     showDetailDialog (title, item) {
//       this.selectedItem = (({ name, city, township, phone, address, email }) => ({ name, city_name: city.name, township_name: township.name, phone, address, email }))(item)
//       this.dialogTitle = 'Provider'
//       this.openDetailDialog = true
//     },
//     showEditDialog (title, item) {
//       this.selectedItem = (({ id, name, city, township, phone, address, email }) => ({ id, name, city_id: city.id, township_id: township.id, phone, address, email }))(item)
//       this.$emit('openProviderForm', this.selectedItem)
//       this.openProviderForm = true
//       this.dialogTitle = 'Edit Provider'
//     },
//     showDialog (type, item = null) {
//       if (type === 'show') {
//         this.selectedItem = (({ name, name_mm, city, township }) => ({ name, name_mm, city_name: city.name, township_name: township.name }))(item)
//         this.openDetailDialog = !this.openDetailDialog
//       } else {
//         if (item !== null) {
//           this.selectedItem = (({ id, name, city, township, phone, address, email }) => ({ id, name, city_id: city.id, township_id: township.id, phone, address, email }))(item)
//           this.dialogTitle = 'Edit Provider'
//         } else {
//           this.dialogTitle = 'Create Provider'
//         }
//         this.$emit('openFormDialog', this.selectedItem)
//         this.openFormDialog = true
//       }
//     }
//   }
// }
</script>
