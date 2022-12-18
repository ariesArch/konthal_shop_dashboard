
// export default class Attribute {
//   constructor (
//     id = '',
//     shop_id = '',
//     name = '',
//     attribute_values = [
//       { id: 1, name: 'Red', meta: '#fff' },
//       { id: 2, name: 'Green', meta: '#fff' }
//     ]
//     // attribute_values = []
//   ) {
//     this.id = id
//     this.shop_id = shop_id
//     this.name = name
//     this.attribute_values = attribute_values
//   }
// }
const AttrPayload = {
  id: '',
  shop_id: '',
  name: '',
  attribute_values: [
    { id: 1, name: 'Red', meta: '#fff' },
    { id: 2, name: 'Green', meta: '#fff' }
  ]
}
export default class Attribute {
  constructor (paload = AttrPayload) {
    this.id = paload.id
    this.shop_id = paload.shop_id
    this.name = paload.name
    this.attribute_values = paload.attribute_values
  }
}
