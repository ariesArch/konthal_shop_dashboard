<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <v-card>
          <v-card-title>Create Category</v-card-title>
          <v-form @submit.prevent="onSubmit">
            <validation-observer ref="observer">
              <v-card-text>
                <validation-provider v-slot="{errors}" rules="required" name="Name">
                  <v-text-field v-model="form.name" outlined label="Name" :error-messages="errors" />
                </validation-provider>
                <validation-provider v-slot="{errors}" rules="required" name="Name_MM">
                  <v-text-field v-model="form.name_mm" outlined label="Name_MM" :error-messages="errors" />
                </validation-provider>
                <validation-provider v-slot="{errors}" rules="required" name="Detail">
                  <v-text-field v-model="form.detail" outlined label="Detail" :error-messages="errors" />
                </validation-provider>
              </v-card-text>
              <formButton :disabled="isSubmitting" />
            </validation-observer>
          </v-form>
        </v-card>
      </div>
      <div class="col-md-4" />
    </div>
  </div>
</template>
<script>
import formButton from '@/components/button/formButton.vue'

export default {
  components: {
    formButton
  },
  layout: 'dashboard',
  data: () => ({
    form: {
      name: '',
      name_mm: '',
      detail: ''
    },
    isSubmitting: false
  }),
  methods: {
    async onSubmit () {
      this.isSubmitting = true
      const isErrorFree = await this.$refs.observer.validate()
      if (!isErrorFree) {
        this.isSubmitting = false
        return
      }
      //
      const payload = { ...this.form }
      const { status } = (await this.$axios.post('/categories', payload)).data
      if (status === 1) {
        this.$router.push('/store/categories')
      }
      this.isSubmitting = false
    }
  }
}
</script>
