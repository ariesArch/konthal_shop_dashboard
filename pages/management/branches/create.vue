<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <v-card>
          <v-card-title>Create Branch</v-card-title>
          <v-form @submit.prevent="onSubmit">
            <validation-observer ref="observer">
              <v-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="Region">
                      <v-autocomplete
                        v-model="form.region_id"
                        :items="regions"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Region"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="City">
                      <v-autocomplete
                        v-model="form.city_id"
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="City"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Township">
                      <v-autocomplete
                        v-model="form.township_id"
                        :items="townships"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Township"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Name">
                      <v-text-field v-model="form.name" outlined label="Name" :error-messages="errors" />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Name MM">
                      <v-text-field v-model="form.name_mm" outlined label="Name MM" :error-messages="errors" />
                    </validation-provider>
                  </div>
                  <v-divider inset vertical />
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="Phone Number">
                      <v-text-field v-model="form.phone_number" type="number" outlined label="Phone Number" :error-messages="errors" />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Address">
                      <v-textarea v-model="form.address" outlined label="Address" :error-messages="errors" />
                    </validation-provider>
                  </div>
                </div>
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
import localforage from 'localforage'
import formButton from '@/components/button/formButton.vue'

export default {
  components: {
    formButton
  },
  layout: 'dashboard',
  data: () => ({
    regions: [],
    cities: [],
    townships: [],
    form: {
      region_id: '',
      city_id: '',
      township_id: '',
      name: '',
      name_mm: '',
      phone_number: ''
    },
    isSubmitting: false
  }),
  async mounted () {
    const regions = await localforage.getItem('stored:regions')
    const cities = await localforage.getItem('stored:cities')
    const townships = await localforage.getItem('stored:townships')
    this.regions = regions
    this.cities = cities
    this.townships = townships
    console.log(regions)
  },
  methods: {
    async onSubmit () {
      this.isSubmitting = true
      const isErrorFree = await this.$refs.observer.validate()
      if (!isErrorFree) {
        this.isSubmitting = false
      }
      //
      const payload = { ...this.form }
      const { status } = (await this.$axios.post('/branches', payload)).data
      if (status === 1) {
        this.router.push('/management/branches')
      }
      // this.isSubmitting = false
    }
  }
}
</script>
