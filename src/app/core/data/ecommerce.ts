const sales = [
    {
        id: '1',
        img: 'assets/images/users/48/avatar-2.jpg',
        name: 'Bethany Nienow',
        date: '03 Feb, 2023',
        price: '$630.73'
    },
    {
        id: '2',
        img: 'assets/images/users/48/avatar-7.jpg',
        name: 'Sonia Conn',
        date: '03 Feb, 2023',
        price: '$1,452.64'
    },
    {
        id: '3',
        img: 'assets/images/users/48/avatar-4.jpg',
        name: 'Talon Bradtke',
        date: '03 Feb, 2023',
        price: '$478.87'
    },
    {
        id: '4',
        img: 'assets/images/users/48/avatar-5.jpg',
        name: 'Tyrell Kerluke',
        date: '03 Feb, 2023',
        price: '$82.14'
    },
    {
        id: '5',
        img: 'assets/images/users/48/avatar-6.jpg',
        name: 'Ross Zieme',
        date: '03 Feb, 2023',
        price: '$79.00'
    },
    {
        id: '6',
        img: 'assets/images/users/48/avatar-1.jpg',
        name: 'Hollis Spencer',
        date: '03 Feb, 2023',
        price: '$849.05'
    },
    {
        id: '7',
        img: 'assets/images/users/48/avatar-8.jpg',
        name: 'Cordia Grady',
        date: '03 Feb, 2023',
        price: '$254.32'
    }
]

const orders = [
    {
        id: '1',
        date: '14 Feb, 2023',
        orderId: '#TBS250010',
        shop: 'assets/images/companies/img-1.png',
        customer: 'Jansh Brown',
        product: 'Kitchen Storage',
        amount: '$149.00',
        status: 'Pending',
        rating: '4.5'
    },
    {
        id: '2',
        date: '16 Jan, 2023',
        orderId: '#TBS250006',
        shop: 'assets/images/companies/img-5.png',
        customer: 'Vihan Hudda',
        product: 'Bags and Wallets',
        amount: '$745.11',
        status: 'Pending',
        rating: '4.6'
    },
    {
        id: '3',
        date: '19 Jan, 2023',
        orderId: '#TBS250007',
        shop: 'assets/images/companies/img-4.png',
        customer: 'Vihan Hudda',
        product: 'Bags and Wallets',
        amount: '$330.00',
        status: 'Delivered',
        rating: '4.7'
    },
    {
        id: '4',
        date: '15 Feb, 2023',
        orderId: '#TBS250011',
        shop: 'assets/images/companies/img-7.png',
        customer: 'Alex Smith',
        product: 'Clothes',
        amount: '$109.00',
        status: 'New',
    },
    {
        id: '5',
        date: '25 Jan, 2023',
        orderId: '#TBS250008',
        shop: 'assets/images/companies/img-3.png',
        customer: 'Prezy Mark',
        product: 'Furniture',
        amount: '$199.00',
        status: 'Shipping',
        rating: '4.3'
    },
    {
        id: '6',
        date: '30 Jan, 2023',
        orderId: '#TBS250009',
        shop: 'assets/images/companies/img-2.png',
        customer: 'Ayaan Bowen',
        product: 'Bike Accessories',
        amount: '$215.00',
        status: 'Out of Delivered',
        rating: '4.9'
    }
]

const products = [
    {
        id: '1',
        img: 'assets/images/products/img-1.png',
        title: 'Craft Women Black Sling Bag',
        star: '487',
        cart: '936',
        price: '$15.99'
    },
    {
        id: '2',
        img: 'assets/images/products/img-2.png',
        title: "Unique Men's Wrist Watch",
        star: '452',
        cart: '1420',
        price: '$84.99'
    },
    {
        id: '3',
        img: 'assets/images/products/img-3.png',
        title: 'Twiala Floral Dress',
        star: '562',
        cart: '1348',
        price: '$149.99'
    },
    {
        id: '4',
        img: 'assets/images/products/img-4.png',
        title: 'Tokyo Fancy Bomber Jacket',
        star: '644',
        cart: '1540',
        price: '$245.00'
    },
    {
        id: '5',
        img: 'assets/images/products/img-5.png',
        title: 'Aster Dress 2XL / Royal Blue',
        star: '841',
        cart: '985',
        price: '$74.63'
    },
    {
        id: '6',
        img: 'assets/images/products/img-6.png',
        title: 'Craft Women Black Sling Bag',
        star: '763',
        cart: '763',
        price: '$245.74'
    }
]

export { sales, orders, products }