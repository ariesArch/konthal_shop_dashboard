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
  data: () => ({
    attributes: {}
  }),
  methods: {
    async createAttribute (payload) {
      const { data, status } = await this.createRecord(this, '/attributes', payload)
      alert(status)
      console.log(data)
    }
  }
}
</script>
