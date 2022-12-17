<template>
  <v-row>
    <v-col md="3">
      <h3>Attribute</h3>
      <p>
        Add your attribute name and necessary information from here
      </p>
    </v-col>
    <v-col md="6">
      <v-card>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <validation-observer ref="observer">
              <validation-provider v-slot="{errors}" rules="required" name="Attribute Name">
                <v-text-field
                  v-model="attribute.name"
                  :error-messages="errors"
                  label="Name"
                  outlined
                />
              </validation-provider>
              <v-data-table
                :headers="headers"
                :items="attribute.attribute_values"
                hide-default-footer
              >
                <template #top>
                  <v-toolbar flat>
                    <v-btn
                      depressed
                      color="primary"
                      :disabled="editedValue.id"
                      @click="addNew"
                    >
                      <v-icon dark>
                        mdi-plus
                      </v-icon>Add Values
                    </v-btn>
                    <v-spacer />
                  </v-toolbar>
                </template>
                <template #[`item.name`]="{ item,index }">
                  <validation-provider
                    v-show="item.id===editedValue.id"
                    v-slot="{errors}"
                    rules="required"
                    :name="`Value Name- ${index}`"
                  >
                    <v-text-field
                      v-model="item.name"
                      :hide-details="true"
                      dense
                      single-line
                      outlined
                      :error-messages="errors"
                    />
                  </validation-provider>

                  <span v-show="item.id!==editedValue.id">{{ item.name }}</span>
                </template>
                <template #[`item.meta`]="{ item }">
                  <v-text-field
                    v-show="item.id===editedValue.id"
                    v-model="item.meta"
                    :hide-details="true"
                    dense
                    single-line
                    outlined
                  />
                  <span v-show="item.id!==editedValue.id">{{ item.meta }}</span>
                </template>
                <template #[`item.actions`]="{ item }">
                  <div v-show="item.id===editedValue.id">
                    <v-icon color="red" class="mr-3" @click="closeItem(item)">
                      mdi-window-close
                    </v-icon>
                    <v-icon v-show="editedValue.id" color="info" :disabled="disabledButton" @click="saveItem">
                      mdi-content-save
                    </v-icon>
                  </div>
                  <div v-show="item.id!==editedValue.id">
                    <v-icon color="info" class="mr-3" :disabled="Object.keys(editedValue).length>0" @click="editItem(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </div>
                </template>
              </v-data-table>
              <formButton :disabled="isSubmitting" />
            </validation-observer>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col md="3">
      Info
      {{ attribute }}
    </v-col>
  </v-row>
</template>
<script>
import Attribute from '@/api/model/Attribute'
export default {
  data: () => ({
    isSubmitting: false,
    attribute: {},
    editedIndex: -1,
    // selectedItem: {},
    editedValue: {},
    addObj: { },
    defaultItem: {
      name: '',
      meta: ''
    },
    disabledButton: false
  }),
  computed: {
    headers () {
      return this.$tableHeaders.attributeValueHeaders
    }
  },
  beforeMount () {
    this.attribute = new Attribute()
    this.attribute.shop_id = this.$auth.user.current_shop.id
  },
  methods: {
    closeItem (item) {
      setTimeout(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.selectedItem = {}
        this.editedValue = {}
        this.editedIndex = -1
        if (!item.id) { this.removeAddedObj(item) }
      }, 300)
    },
    addNew () {
      this.addObj = Object.assign({}, this.defaultItem)
      // this.addObj.id = this.attribute.attribute_values.length + 1
      this.attribute.attribute_values.unshift(this.addObj)
      this.initiateItem(this.addObj)
    },
    editItem (item) {
      this.initiateItem(item)
    },
    initiateItem (item) {
      this.editedIndex = this.attribute.attribute_values.indexOf(item)
      // this.selectedItem = Object.assign({ ...this.selectedItem }, (({ id, name, meta }) => ({ id, name, meta }))(item))
      this.editedValue = Object.assign({}, (({ id, name }) => ({ id, name }))(item))
    },
    removeAddedObj (item) {
      if (Object.keys(item).length > 0) {
        const addedIndex = this.attribute.attribute_values.indexOf(item)
        this.attribute.attribute_values.splice(addedIndex, 1)
        // this.addObj = {}
      }
    },
    async onSubmit () {
      // const isErrorFree = await this.$refs.observer.validate()
      // if (!isErrorFree) {
      //   return false
      //   // this.$emit('onSubmit', this.attribute)
      // }
      // const emptyInput = this.attribute.attribute_values.find(val => val.name === '')
      // if (emptyInput) {
      //   return false
      // }
      await this.validateForm(this, this.attribute)
    },
    saveItem () {
      alert('hi')
    },
    deleteItem (item) {
      alert(item)
    }
  }
}
</script>
