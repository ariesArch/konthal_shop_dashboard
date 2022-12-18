<template>
  <v-card>
    <ProductForm type="edit" @onSubmit="updateProduct" />
  </v-card>
</template>
<script>
import ProductForm from '@/components/form/ProductForm.vue'
export default {
  components: {
    ProductForm
  },
  data: () => ({
    detail: {}
  }),
  // async created () {
  //   const id = this.$route.params.id
  //   await this.fetchDetail(this, `/products/${id}`)
  // },
  methods: {
    async updateProduct (payload) {
      const { data, status } = await this.createRecord(this, 'products', payload)
      console.log(status)
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
.v-stepper__wrapper{
  padding-top:4px;
}
</style>
