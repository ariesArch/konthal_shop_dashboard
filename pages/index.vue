<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8" />
      <div class="col-md-4">
        <v-card class="mx-auto mt-10">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
            >
              <v-form @submit.prevent="Login">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field v-model="email" outlined label="Email" :error-messages="errors" />
                </validation-provider>
                <validation-provider v-slot="{errors}" name="Password" rules="required">
                  <v-text-field
                    v-model="password"
                    :type="`${showPassword?'text':'password'}`"
                    outlined
                    label="Password"
                    :error-messages="errors"
                    :append-icon="`${showPassword?'visibility':'visibility_off'}`"
                    @click:append="showPassword=!showPassword"
                  />
                </validation-provider>
                <v-btn color="primary" block type="submit" :disabled="isSubmitting">
                  {{ `${isSubmitting ? 'Please Wait...': 'Login'}` }}
                </v-btn>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script>
import localforage from 'localforage'
export default {
  layout: 'dashboard',
  data: () => ({
    email: '',
    password: '',
    isSubmitting: false,
    showPassword: false
  }),
  async fetch () {
    const { data, status } = (await this.$axios.get('/initial_fetch')).data
    if (status === 1) {
      const { regions, cities, townships } = data
      localforage.setItem('stored:regions', regions)
      localforage.setItem('stored:cities', cities)
      localforage.setItem('stored:townships', townships)
    }
  },

  methods: {
    async Login () {
      this.isSubmitting = true
      const isErrorFree = await this.$refs.observer.validate()
      if (!isErrorFree) {
        this.isSubmitting = false
      }
      const payload = { email: this.email, password: this.password }
      // const { owner, status } = (await this.$axios.post('/auth/login', payload)).data
      const { owner, status } = await this.$auth.loginWith('local', {
        data: payload,
        methods: 'POST'
      }).data
      if (status === 1) {
        console.log(owner)
      }
      this.isSubmitting = false
    }
  }
}
</script>
