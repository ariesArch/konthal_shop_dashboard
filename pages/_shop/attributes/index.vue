<template>
  <div>
    <h1>I am the child view of shop</h1>
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
    await this.fetchList(this, `/attributes?shop_id=${this.$auth.user.current_shop.id}`)
  },
  computed: {
    headers () {
      return this.$tableHeaders.attributeTable
    }
  }
}
</script>
