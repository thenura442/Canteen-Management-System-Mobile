export interface Item {
  customer_email: String,
  store_email: String,
  sub_total: String,
  products: [{
    id: String,
    item_name: String,
    price: String,
    quantity: String,
    url: String,
    product_total: String
  }]
}
