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
              <validation-provider v-slot="{errors}" rules="required" name="Main Category">
                <v-autocomplete
                  v-model="model.main_category_id"
                  :items="mainCategories"
                  item-text="name"
                  item-value="id"
                  outlined
                  :error-messages="errors"
                  label="Main Category"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Product Category">
                <v-autocomplete
                  v-model="model.product_category_id"
                  :items="product_categories"
                  item-text="name"
                  item-value="id"
                  outlined
                  :error-messages="errors"
                  label="Product Category"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="Name">
                <v-text-field
                  v-model="model.name"
                  readonly
                  disabled
                  outlined
                  :error-messages="errors"
                  label="Name"
                />
              </validation-provider>
              <validation-provider v-slot="{errors}" rules="required" name="NameMM">
                <v-text-field
                  v-model="model.name_mm"
                  disabled
                  readonly
                  outlined
                  :error-messages="errors"
                  label="NameMM"
                />
              </validation-provider>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                outlined
                @click="cancelDialog"
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
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import localforage from 'localforage'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    mainCategories: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    isSubmitting: false,
    model: {},
    prd_categories: [],
    product_categories: []
  }),
  watch: {
    'model.main_category_id': {
      handler (newVal, oldVal) {
        this.product_categories = this.prd_categories.filter((prd_cat) => {
          return prd_cat.main_category_id === newVal
        })
      },
      deep: true
    },
    'model.product_category_id': {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.model.name = this.prd_categories.find(prd_cat => prd_cat.id === newVal).name
          this.model.name_mm = this.prd_categories.find(prd_cat => prd_cat.id === newVal).name_mm
        }
      },
      deep: true
    }
  },
  mounted () {
    // this.prd_categories = await localforage.getItem('stored:product_categories')
    this.$parent.$on('openCategoryForm', (item, prd_cat) => {
      this.model = item
      this.prd_categories = prd_cat
    })
  },
  methods: {
    async submitForm () {
      await this.postDialogData(this, 'categories', this.model, this.$parent.categorie)
    },
    async cancelDialog () {
      return await this.closeDialog(this)
    }
  }
}
</script>
