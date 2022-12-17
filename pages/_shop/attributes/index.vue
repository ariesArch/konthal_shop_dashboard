<template>
  <div>
    <h1>I am the second child view</h1>
    <p>My path is: {{ $route.path }}</p>
    <ListTable :headers="headers" :items="list" title="attributes" />
  </div>
</template>
<script>
export default {
  layout: 'shop',
  data: () => ({
    list: []
  }),
  async fetch () {
    await this.fetchList(this, '/branches')
  },
  computed: {
    headers () {
      return this.$tableHeaders.attributeValueHeaders
    }
  }
}
</script>
