export interface Order {
  id: String,
  customer_email: String,
  customer_name: String,
  store_name: String,
  store_url: String,
  store_email: String,
  sub_total: String,
  payment_type: String,
  discount: String,
  total: String,
  date: String | undefined,
  time: String | undefined,
  status: String,
  rejected_reasons: String,
  products: [{
    id: String,
    item_name: String,
    price: String,
    quantity: String,
    url: String,
    product_total: String
  }]
}
