<template>
  <div class="container-fluid">
    <div class="row">
      <div class="cols col-md-6">
        <v-card>
          <v-card-title>
            {{ shopInfo.name }}
            <v-spacer />
            <v-icon
              class="mr-2"
              color="info"
              @click="isEditing=!isEditing"
            >
              {{ isEditing?'mdi-close':'mdi-pencil' }}
            </v-icon>
          </v-card-title>
          <v-card-text>
            <validation-observer v-if="isEditing" ref="observer">
              <v-form>
                <div class="row">
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" name="Name" rules="required">
                      <v-text-field v-model="shopInfo.name" outlined label="Name" name="Name" :error-messages="errors" />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="City">
                      <v-autocomplete
                        v-model="shopInfo.city_id"
                        outlined
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="City"
                      />
                    </validation-provider>
                  </div>
                  <div class="col-md-6">
                    <validation-provider v-slot="{errors}" rules="required" name="Township">
                      <v-autocomplete
                        v-model="shopInfo.township_id"
                        outlined
                        :items="townships"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Township"
                      />
                    </validation-provider>
                    <validation-provider v-slot="{errors}" rules="required" name="Type">
                      <v-autocomplete
                        v-model="shopInfo.shop_type_id"
                        outlined
                        :items="shop_types"
                        item-text="name"
                        item-value="id"
                        :error-messages="errors"
                        label="Type"
                      />
                    </validation-provider>
                  </div>
                </div>
              </v-form>
            </validation-observer>
            <v-list v-else dense>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-store</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ shopInfo.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </div>
      <div class="cols col-md-6">
        <v-card>
          <v-card-title>Branches</v-card-title>
          <v-card-text>
            <v-data-table :headers="branchHeaders" :items="shopInfo.branches">
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
      </div>
    </div>
  </div>
</template>
<script>
import localforage from 'localforage'
import { branchHeaders } from '@/utils/tableHeaders'

export default {
  layout: 'dashboard',
  data: () => ({
    cities: [],
    townships: [],
    shop_types: [],
    shopId: '',
    shopInfo: '',
    branchHeaders,
    isEditing: false
  }),
  async fetch () {
    this.shopId = this.$route.params.id
    const { data, status } = (await this.$axios.get(`/shops/${this.shopId}`)).data
    if (status === 1) {
      this.shopInfo = data
    }
  },
  async mounted () {
    this.cities = await localforage.getItem('stored:cities')
    this.townships = await localforage.getItem('stored:townships')
    this.shop_types = await localforage.getItem('stored:shop_types')
  }
}
</script>
