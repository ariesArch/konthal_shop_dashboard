<template>
  <div>
    <AttributeForm :raw-data="{id:'1',name:'Yen'}" @onSubmit="createAttribute" />
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
  async created () {
    const id = this.$route.params.id
    await this.fetchDetail(this, `/branches/${id}`)
  },
  methods: {
    async createAttribute (pyaload) {
      const { status, data } = await this.createRecord(this, '/attributes', pyaload)
      alert(status)
      console.log(data)
    }
  }
}
</script>
