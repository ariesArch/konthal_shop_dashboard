<template>
  <div class="text-center">
    <v-dialog
      v-model="isOpenForm"
      width="800"
      persistent
    >
      <v-card>
        <v-card-title>
          {{ title }} - {{ model.name }}
        </v-card-title>

        <v-form @submit.prevent="submitForm">
          <validation-observer ref="observer">
            <v-card-text>
              <v-row>
                <v-col md="6">
                  <validation-provider v-slot="{errors}" rules="required" name="Name">
                    <v-text-field v-model="model.name" outlined :error-messages="errors" label="Name" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="NameMM">
                    <v-text-field v-model="model.name_mm" outlined :error-messages="errors" label="NameMM" />
                  </validation-provider>
                  <validation-provider v-slot="{errors}" rules="required" name="Detail">
                    <v-text-field v-model="model.detail" outlined :error-messages="errors" label="Detail" />
                  </validation-provider>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                outlined
                @click="$emit('input',false)"
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
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isSubmitting: false,
    model: {}
  }),
  mounted () {
    this.$parent.$on('openFormDialog', (item) => {
      this.model = item
    })
  },
  methods: {
    async submitForm () {
      await this.postDialogData(this, 'categories', this.model)
    }
  }
}
</script>
