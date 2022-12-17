<template>
  <v-app>
    <v-main>
      <NavDrawer />
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import NavDrawer from '@/components/base/NavDrawer.vue'
export default {
  components: {
    NavDrawer
  },
  created () {
    if (!this.$auth.user.current_shop) {
      const shop_slug = this.$route.params.shop
      this.$auth.user.current_shop = this.$auth.user.shops.find(shop => shop.slug === shop_slug)
    }
  }
}
</script>
