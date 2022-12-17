
export default class Attribute {
  constructor (
    id = '',
    shop_id = '',
    name = '',
    attribute_values = [
      { id: 1, name: 'Red', meta: '#fff' },
      { id: 2, name: 'Green', meta: '#fff' }
    ]
    // attribute_values = []
  ) {
    this.id = ''
    this.shop_id = shop_id
    this.name = name
    this.attribute_values = attribute_values
  }
}
