import Vue from 'vue'

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
        const { data, status } = await that.$axios.get(URL)
        if (status === 200 && data.status === 1) {
          that.list = data.data
        } else if (status === 401) {
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
        const { data, status } = await that.$axios.get(URL)
        if (status === 200 && data.status === 1) {
          that.prepareDetail(data)
          that.isFetching = false
        } else if (status === 401) {
          console.log('Auth Error')
          that.$router.push({
            name: 'login'
          })
        }
      } catch (error) {
        console.log('Handlingerror' + error.message)
      }
    //   that.isFetching = false
    }
  }
})
