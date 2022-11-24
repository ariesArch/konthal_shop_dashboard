// import axios from 'axios'
export default (req, res) => {
  console.log('Server....')
  //   axios.defaults.baseURL = 'http://localhost:8000/api/shop/v1'
  //   axios.defaults.headers = req.headers
  console.log(req.body)
  //   try {
  //     await axios.get('/shops')
  //   } catch (error) {
  //     console.error(error)
  //   }
  res.end(
    JSON.stringify({
      success: 'ok',
      message: 'Token verified'
    })
  )
}
