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
export default {
  layout: 'dashboard',
  data: () => ({
    email: '',
    password: '',
    isSubmitting: false,
    showPassword: false
  }),
  methods: {
    async Login () {
      this.isSubmitting = true
      const isErrorFree = await this.$refs.observer.validate()
      if (!isErrorFree) {
        this.isSubmitting = false
      }
      const payload = { email: this.email, password: this.password }
      try {
        const { status, owner, message } = (await this.$auth.loginWith('laravelSanctum', { data: payload })).data
        if (status === 1) {
          console.log(owner)
          this.$router.push('/')
        } else {
          console.log(message)
        }
      } catch (err) {
        console.log(err.message)
      }

      this.isSubmitting = false
    }
  }
}
</script>
