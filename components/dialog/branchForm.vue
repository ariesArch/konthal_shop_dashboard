<template>
  <div class="text-center">
    <!-- <v-btn
      color="primary lighten-2"
      dark
      @click="model.isOpenDialog=true"
    >
      Click Me
    </v-btn> -->
    <v-dialog
      v-model="model.isOpenDialog"
      width="800"
    >
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>

        <v-form @submit.prevent="submitForm">
          <validation-observer ref="observer">
            <v-card-text>
              <v-row>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="City">
                    <v-autocomplete
                      v-model="model.city_id"
                      :items="cities"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="City"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Township">
                    <v-autocomplete
                      v-model="model.township_id"
                      :items="townships"
                      item-text="name"
                      item-value="id"
                      outlined
                      :error-messages="errors"
                      label="Township"
                    />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Name">
                    <v-text-field v-model="model.name" outlined :error-messages="errors" label="Name" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="NameMM">
                    <v-text-field v-model="model.name_mm" outlined :error-messages="errors" label="NameMM" />
                  </validation-provider>
                </v-col>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="Phone Number">
                    <v-text-field v-model="model.phone_number" outlined label="Phone Number" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Address">
                    <v-textarea v-model="model.address" outlined label="Address" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Description">
                    <v-textarea v-model="model.description" outlined label="Description" :error-messages="errors" />
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                outlined
                @click="$emit('input', { isOpenDialog: false })"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
                :disabled="isSubmitting"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </validation-observer>
        </v-form>

        <v-divider />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        isOpenDialog: false
      })
    },
    title: {
      type: String,
      default: ''
    },
    cities: {
      type: Array,
      default: () => ([])
    },
    townships: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    isSubmitting: false
  }),
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        return this.$emit('input', { ...this.value, isOpenDialog: value })
      }
    }
  },
  methods: {
    async submitForm () {
      await this.postDialogData(this, 'branches', this.model)
    }
  }
}
</script>
