import Vue from 'vue'
import formButton from '@/components/button/formButton.vue'
import createButton from '@/components/button/createButton.vue'

Vue.mixin({
  methods: {
    async fetchList (that, URL) {
    //   return that.$axios.get(URL)
    //   const { data, status, message } = (await that.$axios.get(URL)).data
    //   if (status === 1) {
    //     that.list = data
    //   } else {
    //     console.log(message)
    //   }
      that.isFetching = true
      try {
        const { data, status } = (await that.$axios.get(URL)).data
        if (status === 1) {
          that.list = data
        } else if (status === 3) {
          console.log('Auth Error')
          that.$router.push({
            name: 'inspire'
          })
        }
      } catch (error) {
        console.log('Handlingerror' + error.message)
      }
      that.isFetching = false
    },
    async fetchDetail (that, URL) {
      that.isFetching = true
      try {
        const { data, status } = (await that.$axios.get(URL)).data
        if (status === 1) {
          that.detail = data
          // that.prepareDetail(data)
          that.isFetching = false
        } else if (status === 3) {
          console.log('Auth Error')
          that.$router.push({
            name: 'login'
          })
        }
      } catch (error) {
        console.log('Handlingerror' + error.message)
      }
      that.isFetching = false
    },
    async postDialogData (that, URL, payload) {
      that.isSubmitting = true
      const isErrorFree = await that.$refs.observer.validate()
      if (!isErrorFree) {
        that.isSubmitting = false
        return
      }
      try {
        const url = payload.id ? `${URL}/${payload.id}` : `${URL}`
        delete payload.isOpenDialog
        const { data, status } = payload.id ? (await that.$axios.put(url, payload)).data : (await that.$axios.post(url, payload)).data
        if (status === 1) {
          that.model = {}
          that.isSubmitting = false
          if (payload.id) {
            that.$parent.$parent.$emit('updatedItem', data)
          } else {
            that.$parent.$parent.$emit('createdItem', data)
          }
        } else if (status === 3) {
          console.log('Auth Error')
          that.$router.push({
            name: 'login'
          })
        }
      } catch (error) {
        console.error(error.message)
      }
      that.isSubmitting = false
      this.closeDialog(that)
    },
    closeDialog (that) {
      that.$emit('input', { isOpenDialog: false })
    }
  }

})

Vue.component('FormButton', formButton)
Vue.component('CreateButton', createButton)
