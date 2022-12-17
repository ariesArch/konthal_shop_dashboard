<template>
  <div>
    <AttributeForm @onSubmit="createAttribute" />
  </div>
</template>
<script>
import AttributeForm from '~/components/form/AttributeForm.vue'
export default {
  components: {
    AttributeForm
  },
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
