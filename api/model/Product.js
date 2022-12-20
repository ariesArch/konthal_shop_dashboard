const productPayload = {
  id: '',
  name: '',
  name_mm: '',
  product_type: '',
  branch_id: '',
  main_category_id: '',
  brand_jd: '',
  description: '',
  category_id: '',
  product_attributes: []
}
export default class Product {
  constructor (payload = productPayload) {
    this.id = payload.id
    this.name = payload.name
    this.name_mm = payload.name_mm
    this.product_type = payload.product_type
    this.branch_id = payload.branch_id
    this.main_category_id = payload.main_category_id
    this.brand_id = payload.brand_id
    this.description = payload.description
    this.category_id = payload.category_id
    this.product_attributes = payload.product_attributes
  }
}
