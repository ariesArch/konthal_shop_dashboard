<template>
  <v-card>
    <v-card-title>
      {{ capitalized }}
      <v-spacer />
      <!-- <createDialogButton v-model="selectedItem.openBranchForm" /> -->
      <v-btn color="primary" @click="$router.push(`${title}/create`)">
        Create
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="items">
        <template #[`item.actions`]="{item}">
          <v-icon
            class="mr-2"
            color="info"
            @click="switchDetailDialog(item)"
          >
            mdi-eye
          </v-icon>
          <v-icon
            color="primary"
            @click="$router.push(`${title}/${item.id}/edit`)"
          >
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    headers: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    capitalized () {
      const capitalizedFirst = this.title[0].toUpperCase()
      const rest = this.title.slice(1)

      return capitalizedFirst + rest
    }
  },
  methods: {
    switchDetailDialog (item) {
      this.$emit('toggleDetailDialog', this.title, item)
    }
  }
}
</script>
