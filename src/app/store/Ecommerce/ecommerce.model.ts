export interface salesModel {
    id?: any,
    img?: any,
    name?: any,
    date?: any,
    price?: any
}

export interface ordersModel {
    id?: any,
    date?: any,
    orderId?: any,
    shop?: any,
    customer?: any,
    product?: any,
    amount?: any,
    status?: any,
    rating?: any
}

export interface productsModel {
    id?: any,
    img?: any,
    title?: any,
    star?: any,
    cart?: any,
    price?: any
}
