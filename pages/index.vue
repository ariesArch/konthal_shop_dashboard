<template>
  <div class="container-fluid">
    <v-row v-for="(shops,key) in shop_groups" :key="key">
      <v-col cols="12">
        {{ key }}
      </v-col>
      <v-col v-for="(shop,index) in shops" :key="index" md="3">
        <v-list-item
          class="elevation-3"
          @click="selectShop(shop)"
        >
          <v-list-item-avatar color="grey darken-3" size="60px">
            <v-img
              class="elevation-6"
              alt=""
              :src="shop.logo_image"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ shop.name }}</v-list-item-title>
            <v-list-item-title>{{ shop.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip
                color="green"
                outlined
              >
                {{ shop.status }}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  // middleware: 'auth'
  computed: {
    shop_groups () {
      // const cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }]
      const result = this.$auth.user.shops.reduce(function (r, a) {
        r[a.shop_type.name] = r[a.shop_type.name] || []
        r[a.shop_type.name].push(a)
        return r
      }, {})
      return result
    }
  },
  methods: {
    selectShop (shop) {
      this.$auth.user.current_shop = shop
      this.$router.push(shop.slug)
    }
  }
}
</script>
