const sellerOverview = [
    {
        id: '1',
        img: 'assets/images/products/img-7.png',
        name: 'Cotton Collar Tshirts For Men',
        category: 'Fashion',
        stock: '12',
        price: '$180.00',
        orders: '10',
        rating: '4.0',
        publishedDate: '15 May, 2021',
    },
    {
        id: '2',
        img: 'assets/images/products/img-4.png',
        name: 'Super Bass Blutooth Wireless Headphone',
        category: 'Headphones',
        stock: '23',
        price: '$180.00',
        orders: '19',
        rating: '4.1',
        publishedDate: '19 Apr, 2021',
    }, {
        id: '3',
        img: 'assets/images/products/img-12.png',
        name: 'MAG Back To The Future Shoes',
        category: 'Footwear',
        stock: '06',
        price: '$274.99	',
        orders: '06',
        rating: '4.2',
        publishedDate: '06 Jan, 2021',
    }, {
        id: '4',
        img: 'assets/images/products/img-11.png',
        name: 'Jeans Blue Men Boxer',
        category: 'Fashion',
        stock: '50',
        price: '$97.99',
        orders: '51',
        rating: '3.9',
        publishedDate: '12 Oct, 2021',
    },
    {
        id: '5',
        img: 'assets/images/products/img-9.png',
        name: 'Flip-Flops And House Slippers',
        category: 'Footwear',
        stock: '30',
        price: '$150.00	',
        orders: '10',
        rating: '4.2',
        publishedDate: '06 Jan, 2023',
    },
    {
        id: '6',
        img: 'assets/images/products/img-10.png',
        name: 'Men`s Round Neck Half Sleeves Solid T-Shirt',
        category: 'Fashion',
        stock: '21',
        price: '$160.00	',
        orders: '08',
        rating: ' 4.4',
        publishedDate: '15 Jan, 2021',
    },
    {
        id: '7',
        img: 'assets/images/products/img-8.png',
        name: 'Full Sleeve Solid Men Sweatshirt/Hoody',
        category: 'Fashion',
        stock: '20',
        price: '$260.00	',
        orders: '20',
        rating: '4.1',
        publishedDate: '21 Jun, 2021',
    },
    {
        id: '8',
        img: 'assets/images/products/img-7.png',
        name: 'Cotton Collar Tshirts For Men',
        category: 'Fashion',
        stock: '12',
        price: '$180.00	',
        orders: '10',
        rating: '4.0',
        publishedDate: '15 May, 2021',
    },
    {
        id: '9',
        img: 'assets/images/products/img-6.png',
        name: 'Blive Printed Men Round Neck',
        category: 'Fashion',
        stock: '35',
        price: '$250.00',
        orders: '02',
        rating: ' 3.8',
        publishedDate: '12 Oct, 2021',
    },
    {
        id: '10',
        img: 'assets/images/products/img-5.png',
        name: 'Willage Volleyball Ball Size 4',
        category: 'Sports',
        stock: '30',
        price: '$99.00',
        orders: '21',
        rating: '4.0',
        publishedDate: '30 Mar, 2021',
    },
    {
        id: '11',
        img: 'assets/images/products/img-4.png',
        name: 'Super Bass Blutooth Wireless Headphone',
        category: 'Headphones',
        stock: '23',
        price: '$180.00	',
        orders: '19',
        rating: '4.1',
        publishedDate: '19 Apr, 2021',
    },
    {
        id: '12',
        img: 'assets/images/products/img-3.png',
        name: 'Fossil Gen 5E Smart Watch',
        category: '	Watches',
        stock: '19',
        price: '$120.00 ',
        orders: '21',
        rating: '4.3',
        publishedDate: '26 Mar, 2021',
    },
    {
        id: '13',
        img: 'assets/images/products/img-2.png',
        name: 'Like Style Travel Black Handbag ',
        category: 'Luggage',
        stock: '06',
        price: '$160.00',
        orders: '02',
        rating: '4.3',
        publishedDate: '06 Jan, 2023',
    },
    {
        id: '14',
        img: 'assets/images/products/32/img-1.png',
        name: 'Cotton Collar Tshirts For Men',
        category: 'Fashion',
        stock: '12',
        price: '$215.00	',
        orders: '06',
        rating: '4.9',
        publishedDate: '12 Oct, 2022',
    }
]


import { ChartOptions } from "../../../app/store/Seller/seller.model"

// Seller-1 chart
const seller1Chart: ChartOptions = {
    series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    }],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#ff6c6c"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    }
};

// Seller-2 chart
const seller2Chart: ChartOptions = {
    series: [{
        data: [12, 14, 2, 47, 42, 15, 35, 75, 20, 67, 89],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#2dcb73"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-3 chart
const seller3Chart: ChartOptions = {
    series: [{
        data: [45, 20, 8, 42, 30, 5, 35, 79, 22, 54, 64],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#2dcb73"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return ""
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-4 chart
const seller4Chart: ChartOptions = {
    series: [{
        data: [26, 15, 48, 12, 47, 19, 35, 19, 85, 68, 50],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#2dcb73"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-5 chart
const seller5Chart: ChartOptions = {
    series: [{
        data: [60, 67, 12, 49, 6, 78, 63, 51, 33, 8, 16],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#ff6c6c"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-6 chart
const seller6Chart: ChartOptions = {
    series: [{
        data: [78, 63, 51, 33, 8, 16, 60, 67, 12, 49,],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#2dcb73"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-7 chart
const seller7Chart: ChartOptions = {
    series: [{
        data: [15, 35, 75, 20, 67, 8, 42, 30, 5, 35],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    colors: ["#2dcb73"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

// Seller-8 chart
const seller8Chart: ChartOptions = {
    series: [{
        data: [45, 32, 68, 55, 36, 10, 48, 25, 74, 54],
    },],
    chart: {
        type: "area",
        height: 43,
        sparkline: {
            enabled: true,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
        },
    },
    stroke: {
        curve: "smooth",
        width: 2,
    },
    // colors: ["--tb-danger"],
    tooltip: {
        fixed: {
            enabled: false,
        },
        x: {
            show: false,
        },
        y: {
            title: {
                formatter: function () {
                    return "";
                },
            },
        },
        marker: {
            show: false,
        },
    },
};

const sellerList = [
    {
        id: 1,
        img: "assets/images/companies/img-7.png",
        name: "Pich Hub",
        seller: "Lenna Labadie",
        email: "lennalabadie@dayrep.com",
        phone: "+(253) 12345 67890",
        stock: "451",
        revenue: "$253.32",
        chart: seller1Chart
    },
    {
        id: 2,
        img: "assets/images/companies/img-5.png",
        name: "Jorce Medicines",
        seller: "Dallin Schowalter",
        email: "dallinschowalter@rhyta.com",
        phone: "+(152) 32165 49873",
        stock: "1163",
        revenue: "$992.14",
        chart: seller2Chart
    },
    {
        id: 3,
        img: "assets/images/companies/img-2.png",
        name: "Rotic Fashion",
        seller: "Alvina Smitham",
        email: "alvinasmitham@dayrep.com",
        phone: "+(231) 14562 32165",
        stock: "1023",
        revenue: "$954.08",
        chart: seller3Chart
    },
    {
        id: 4,
        img: "assets/images/companies/img-6.png",
        name: "Terry & Jerry",
        seller: "Dallin Schowalter",
        email: "dallinschowalter@jourrapide.com",
        phone: "+(44) 98765 32104",
        stock: "357",
        revenue: "$346.35",
        chart: seller4Chart
    },
    {
        id: 5,
        img: "assets/images/companies/img-3.png",
        name: "Themesbrand",
        seller: "Kenyon Nienow",
        email: "kenyonnienow@dayrep.com",
        phone: "+(251) 25874 13690",
        stock: "841",
        revenue: "$654.78",
        chart: seller5Chart
    },
    {
        id: 6,
        img: "assets/images/companies/img-2.png",
        name: "Brand Infosys",
        seller: "Alexandrea Jacobi",
        email: "alexandreajacobi@jourrapide.com",
        phone: "+(92) 67890 12345",
        stock: "395",
        revenue: "$153.84",
        chart: seller6Chart
    },
    {
        id: 7,
        img: "assets/images/companies/img-7.png",
        name: "Pich Fashion",
        seller: "Jaylon McClure",
        email: "jaylonmcclure@armyspy.com",
        phone: "+(62) 35791 15935",
        stock: "792",
        revenue: "$357.44",
        chart: seller7Chart
    },
    {
        id: 8,
        img: "assets/images/companies/img-1.png",
        name: "Zibra Fashion",
        seller: "Lenna Labadie",
        email: "lennalabadie@dayrep.com",
        phone: "+(120) 15935 32165",
        stock: "451",
        revenue: "$253.32",
        chart: seller8Chart
    }
]

export { sellerOverview, sellerList, seller1Chart }