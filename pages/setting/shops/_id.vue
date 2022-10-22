<template>
  <div class="container-fluid">
    <v-row v-if="isFetching">
      <v-col md="6">
        <v-skeleton-loader
          type="card"
          min-height="800"
        />
      </v-col>
      <v-col md-6>
        <v-skeleton-loader
          type="table"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col :md="`${isEditing?'6':'4'}`">
        <v-card>
          <v-card-title>
            {{ shopInfo.name }}
            <v-spacer />
            <v-icon
              class="mr-2"
              color="info"
              @click="isEditing = !isEditing"
            >
              {{ isEditing?'mdi-close':'mdi-pencil' }}
            </v-icon>
          </v-card-title>
          <validation-observer v-if="isEditing" ref="observer">
            <v-form @submit.prevent="updateForm">
              <v-card-text>
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" name="Name" rules="required">
                      <v-text-field
                        v-model="shopPayload.name"
                        dense
                        outlined
                        label="Name"
                        name="Name"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="NameMM" rules="required">
                      <v-text-field
                        v-model="shopPayload.name_mm"
                        dense
                        outlined
                        label="NameMM"
                        name="NameMM"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Phone" rules="required">
                      <v-text-field
                        v-model="shopPayload.phone_number"
                        dense
                        outlined
                        label="Phone"
                        name="Phone"
                        :error-messages="errors"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Description" rules="required">
                      <v-textarea
                        v-model="shopPayload.description"
                        dense
                        outlined
                        label="Description"
                        name="Description"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="Type">
                      <v-autocomplete
                        v-model="shopPayload.shop_type_id"
                        outlined
                        dense
                        :items="shop_types"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Type"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="City">
                      <v-autocomplete
                        v-model="shopPayload.city_id"
                        dense
                        outlined
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="City"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Township">
                      <v-autocomplete
                        v-model="shopPayload.township_id"
                        outlined
                        dense
                        :items="townships"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Township"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" name="Address" rules="required">
                      <v-textarea
                        v-model="shopPayload.address"
                        dense
                        outlined
                        label="Address"
                        name="Address"
                        :error-messages="errors"
                      />
                    </validation-provider>
                  </div>
                </div>
              </v-card-text>
              <formButton v-model="isEditing" :disabled="isSubmitting" />
            </v-form>
          </validation-observer>
          <v-card-text v-else>
            <v-list dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.name_mm }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.shop_type.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-city</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.city.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.township.name }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.phone_number }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-wrap">
                  {{ shopInfo.address }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="text-wrap">
                  {{ shopInfo.description }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols>
        <v-card>
          <v-card-title>Branches</v-card-title>
          <v-card-text>
            <v-data-table :headers="branchHeaders" :items="branches">
              <template #[`item.actions`]="{item}">
                <v-icon
                  class="mr-2"
                  color="info"
                  @click="editItem(item)"
                >
                  mdi-eye
                </v-icon>
                <v-icon
                  color="primary"
                  @click="deleteItem(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
  </div>
</template>
<script>
import localforage from 'localforage'
import { branchHeaders } from '@/utils/tableHeaders'
import formButton from '@/components/button/formButton.vue'

export default {
  components: {
    formButton
  },
  layout: 'dashboard',
  data: () => ({
    cities: [],
    townships: [],
    shop_types: [],
    shopId: '',
    shopInfo: {},
    branches: [],
    branchHeaders,
    isEditing: false,
    shopPayload: {},
    isSubmitting: false,
    isFetching: false
  }),
  async fetch () {
    this.isFetching = true
    this.shopId = this.$route.params.id
    const { data, status } = (await this.$axios.get(`/shops/${this.shopId}`)).data
    if (status === 1) {
      this.shopInfo = (({ id, name, name_mm, phone_number, address, description, owner, shop_type, city, township }) => ({ id, name, name_mm, phone_number, address, description, owner, shop_type, city, township }))(data)
      this.branches = data.branches
      this.shopPayload = (({ name, name_mm, phone_number, address, description, owner, shop_type, city, township }) => ({ name, name_mm, phone_number, address, description, owner_id: owner.id, shop_type_id: shop_type.id, city_id: city.id, township_id: township.id }))(data)
      this.isFetching = false
    }
  },
  async mounted () {
    this.cities = await localforage.getItem('stored:cities')
    this.townships = await localforage.getItem('stored:townships')
    this.shop_types = await localforage.getItem('stored:shop_types')
  },
  methods: {
    async updateForm () {
      this.isSubmitting = true
      try {
        const isErrorFree = await this.$refs.observer.validate()
        if (!isErrorFree) {
          this.isSubmitting = false
          return
        }
        const { data, status } = (await this.$axios.put(`shops/${this.shopId}`, this.shopPayload)).data
        if (status === 1) {
          this.shopInfo = data
          this.isEditing = false
        }
      } catch (error) {
        console.log(error.message)
      }
      this.isSubmitting = false
    }
  }
}
</script>
