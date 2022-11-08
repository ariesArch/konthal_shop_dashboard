<template>
  <div class="container-fluid">
    <v-card>
      <v-card-title>Profle</v-card-title>

      <!-- <v-list-item v-for="item in $auth.user" :key="item.id" class="card-container">
        {{ item }}
      </v-list-item> -->

      <v-card-text>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $auth.user.username }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-email
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $auth.user.email }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $auth.user.phone_number }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $auth.user.viber_number }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-map-marker
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $auth.user.address }}
          </v-list-item-title>
        </v-list-item>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" @click="logout">
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  methods: {
    async logout () {
      await this.$auth.logout()
      // const { status } = (await this.$axios.get('/auth/logout')).data
      // if (status === 1) {
      //   this.$router.push('/login')
      // }
    }
  }
}
</script>
