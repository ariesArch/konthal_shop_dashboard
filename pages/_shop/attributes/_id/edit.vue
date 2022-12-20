<template>
  <div>
    <AttributeForm type="edit" @onSubmit="updateAttribute" />
  </div>
</template>
<script>
import AttributeForm from '~/components/form/AttributeForm.vue'
export default {
  components: {
    AttributeForm
  },
  data: () => ({
    detail: {}
  }),
  // async created () {
  //   const id = this.$route.params.id
  //   await this.fetchDetail(this, `/attributes/${id}`)
  // },
  methods: {
    async updateAttribute (payload) {
      const { data, status } = await this.createRecord(this, '/attributes', payload)
      alert(status)
      console.log(data)
    }
  }
}
</script>
