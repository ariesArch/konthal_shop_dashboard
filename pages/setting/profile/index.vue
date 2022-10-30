<template>
  <div class="container-fluid">
    <v-card>
      <v-card-title>Profle</v-card-title>
      <v-card-text>
        {{ $auth.user.username }}
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
