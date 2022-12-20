<template>
  <v-row no-gutters>
    <v-col md="8">
      <!-- <v-card-text> -->
      <v-stepper
        v-model="steps"
        elevation="0"
      >
        <v-stepper-header>
          <v-stepper-step
            :complete="steps >1"
            step="1"
          >
            Product Info
            <small>Fill about product</small>
          </v-stepper-step>
          <v-stepper-step
            :complete="steps >2"
            step="2"
          >
            Product Variation
            <small>Fill about product variation</small>
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form @submit.prevent="submitForm">
              <validation-observer ref="observer">
                <v-row>
                  <v-col>
                    <h3>Description</h3>
                    <p>
                      Add your product description and necessary information from here
                    </p>
                  </v-col>
                  <v-col>
                    <validation-provider v-slot="{errors}" rules="required" name="Name">
                      <v-text-field
                        v-model="product.name"
                        outlined
                        :error-messages="errors"
                        label="Name"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Name">
                      <v-text-field
                        v-model="product.name_mm"
                        outlined
                        :error-messages="errors"
                        label="Name"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Description">
                      <v-textarea
                        v-model="product.description"
                        outlined
                        :error-messages="errors"
                        label="Description"
                        rows="3"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3>Group & Categories</h3>
                    <p>
                      Select product group and categories from here
                    </p>
                  </v-col>
                  <v-col>
                    <validation-provider v-slot="{errors}" rules="required" name="Category">
                      <v-autocomplete
                        v-model="product.main_category_id"
                        :items="main_categories"
                        item-text="name"
                        item-value="id"
                        outlined
                        :error-messages="errors"
                        label="Category"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Category">
                      <v-autocomplete
                        v-model="product.categories"
                        :items="categories"
                        item-text="name"
                        item-value="id"
                        outlined
                        :error-messages="errors"
                        label="Category"
                        multiple
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Brand">
                      <v-autocomplete
                        v-model="product.brand_id"
                        :items="brands"
                        item-text="name"
                        item-value="id"
                        outlined
                        :error-messages="errors"
                        label="Brand"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <div class="float-right">
                  <v-btn
                    color="primary"
                    outlined
                    @click="step = 2"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="steps = 2"
                  >
                    Containue
                  </v-btn>
                </div>
              </validation-observer>
            </v-form>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-form @submit.prevent="submitForm">
              <validation-observer ref="observer">
                <v-row>
                  <v-col>
                    <h3>Product Type</h3>
                    <p>
                      Select product type form here
                    </p>
                  </v-col>
                  <v-col>
                    <validation-provider v-slot="{errors}" rules="required" name="Product Type">
                      <v-autocomplete
                        v-model="product.product_type"
                        :items="product_types"
                        item-text="name"
                        item-value="value"
                        outlined
                        :error-messages="errors"
                        label="Product Type"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-divider class="my-2" />
                <v-row v-if="product.product_type===1">
                  <v-col md-6>
                    <h3>Simple Product Information</h3>
                    <p>
                      Edit your simple product description and necessary information from here
                    </p>
                  </v-col>
                  <v-col>
                    <validation-provider v-slot="{errors}" rules="required" name="Price">
                      <v-text-field
                        v-model="product.price"
                        outlined
                        :error-messages="errors"
                        label="Price"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Sale Price">
                      <v-text-field
                        v-model="product.sale_price"
                        outlined
                        :error-messages="errors"
                        label="Sale Price"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Quantity">
                      <v-text-field
                        v-model="product.qty"
                        outlined
                        :error-messages="errors"
                        label="Quantity"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="SKU">
                      <v-text-field
                        v-model="product.sku"
                        outlined
                        :error-messages="errors"
                        label="SKU"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Width">
                      <v-text-field
                        v-model="product.width"
                        outlined
                        :error-messages="errors"
                        label="Width"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Height">
                      <v-text-field
                        v-model="product.height"
                        outlined
                        :error-messages="errors"
                        label="Height"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Length">
                      <v-text-field
                        v-model="product.length"
                        outlined
                        :error-messages="errors"
                        label="Length"
                      />
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col>
                    <h3>Product Variation Information</h3>
                    <p>
                      Choose your product variation and necessary information from here
                    </p>
                    <v-btn color="primary" class="mb-3">
                      ADD OPTION
                    </v-btn>
                    <v-row>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Attributes">
                          <v-autocomplete
                            v-model="product.attribute_id"
                            :items="attributes"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Attributes"
                          />
                        </validation-provider>
                      </v-col>
                      <v-col>
                        <validation-provider v-for="attribute in attributes" :key="attribute.id" v-slot="{errors}" rules="required" name="Values">
                          <v-autocomplete
                            v-model="values[0]"
                            :items="attribute.attribute_values"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Values"
                            multiple
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-col>
                        <validation-provider v-slot="{errors}" rules="required" name="Attributes">
                          <v-autocomplete
                            v-model="product.attribute_id"
                            :items="attributes"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Attributes"
                          />
                        </validation-provider>
                      </v-col>
                      <v-col>
                        <validation-provider v-for="attribute in attributes" :key="attribute.id" v-slot="{errors}" rules="required" name="Values">
                          <v-autocomplete
                            v-model="values[0]"
                            :items="attribute.attribute_values"
                            item-text="name"
                            item-value="id"
                            outlined
                            :error-messages="errors"
                            label="Values"
                            multiple
                          />
                        </validation-provider>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <div class="float-right">
                  <v-btn
                    color="primary"
                    outlined
                    @click="steps = 1"
                  >
                    Back
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="steps = 2"
                  >
                    Containue
                  </v-btn>
                </div>
              </validation-observer>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
    <v-col>
      <v-card elevation="0">
        <v-card-title>
          INfo
        </v-card-title>
        <v-card-text>
          {{ product }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Product from '@/api/model/Product'
export default {
  props: {
    type: {
      type: String,
      default: 'create'
    }
  },
  data: () => ({
    product: {},
    steps: 1,
    product_types: [
      { id: 1, name: 'Simple Product', value: 'simple' },
      { id: 2, name: 'Variable Product', value: 'variable' }
    ],
    main_categories: [],
    categories: [],
    brands: [],
    attributes: [],
    values: [],
    attribute_values: [],
    attribute_names: []
  }),
  async created () {
    let data = {}
    if (this.type === 'edit') {
      const id = this.$route.params.id
      data = await this.fetchForRequest(this, `/products/${id}/edit`)
      this.product = new Product(data.product)
    } else {
      this.product = new Product()
      data = await this.fetchForRequest(this, '/products/create')
    }
    this.main_categories = data.main_categories
    this.categories = data.categories
    this.brands = data.brands
    this.attributes = data.attributes
  },
  methods: {
    async submitForm () {
      await this.validateForm(this, this.product)
    }
  }
}
</script>
