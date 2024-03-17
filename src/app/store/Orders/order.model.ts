export interface OrderModel {
    id: any,
    order_date: any,
    delivery_date: any,
    product: any,
    customer: any,
    shop: [{
        img: any,
        name: any
    }],
    pay_method: any,
    price: any,
    ratings: any,
    delivery_status: any
}