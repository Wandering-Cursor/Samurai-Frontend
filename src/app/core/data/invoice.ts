const invoicesList = [
    {
        id: 1,
        invoice_no: '24301901',
        customer: 'Themesbrand',
        email: "themesbrand@steex.com",
        createDate: "28 Mar, 2023",
        dueDate: "06 Apr, 2023",
        invoice_amount: '$381.76',
        status: 'Paid',
    }, {
        id: 2,
        invoice_no: '24301902',
        customer: 'Ayaan Bowen',
        email: "ayaan@steex.com",
        createDate: "21 Mar, 2023",
        dueDate: "21 Mar, 2023",
        invoice_amount: '$359.77',
        status: 'Unpaid',
    }, {
        id: 3,
        invoice_no: '24301903',
        customer: 'Zachary Stokes',
        email: "zachary@steex.com",
        createDate: "16 Mar, 2023",
        dueDate: "21 Mar, 2023",
        invoice_amount: '$276.18',
        status: 'Paid',
    }, {
        id: 4,
        invoice_no: '24301904',
        customer: 'Nelson Schaden',
        email: "nelson@steex.com",
        createDate: "27 Feb, 2023",
        dueDate: "05 Mar, 2023",
        invoice_amount: '$509.34',
        status: 'Pending',
    }, {
        id: 5,
        invoice_no: '24301905',
        customer: 'Ophelia Steuber',
        email: "ophelia@steex.com",
        createDate: "06 Apr, 2023",
        dueDate: "12 Apr, 2023",
        invoice_amount: '$170.58',
        status: 'Unpaid'
    }, {
        id: 6,
        invoice_no: '24301906',
        customer: 'Sarai Schmidt',
        email: "sarai@steex.com",
        createDate: "20 Feb, 2023",
        dueDate: "26 Feb, 2023",
        invoice_amount: '$254.18',
        status: 'Paid'
    }, {
        id: 7,
        invoice_no: '24301907',
        customer: 'Deondre Huel',
        email: "deondre@steex.com",
        createDate: "13 Feb, 2023",
        dueDate: "19 Feb, 2023",
        invoice_amount: '$86.99',
        status: 'Paid'
    }, {
        id: 8,
        invoice_no: '24301908',
        customer: 'Nelson Schaden',
        email: "nelson@steex.com",
        createDate: "01 Feb, 2023",
        dueDate: "07 Feb, 2023",
        invoice_amount: '$213.49',
        status: 'Unpaid'
    }, {
        id: 9,
        invoice_no: '24301909',
        customer: 'Prezy Mark',
        email: "prezy@steex.com",
        createDate: "29 Jan, 2023",
        dueDate: "06 Feb, 2023",
        invoice_amount: '$381.76',
        status: 'Paid',
    }, {
        id: 10,
        invoice_no: '24301910',
        customer: 'Domenic Dach',
        email: "domenic@steex.com",
        createDate: "17 Jan, 2023",
        dueDate: "23 Jan, 2023",
        invoice_amount: '$276.18',
        status: 'Refund'
    }, {
        id: 11,
        invoice_no: '24301911',
        customer: 'Paki Edwards',
        email: "sdwards@steex.com",
        createDate: "17 Jan, 2023",
        dueDate: "23 Jan, 2023",
        invoice_amount: '$170.58',
        status: 'Paid',
    }
]

const invoice = [
    {
        id: 1,
        color: 'primary',
        icon: 'bi bi-file-earmark-text',
        title: 'Total Invoices',
        statusIcon: 'bi bi-arrow-up',
        iconColor: 'success',
        amout: '12.09',
        count: 8956
    },
    {
        id: 2,
        color: 'success',
        icon: 'bi bi-patch-check-fill',
        title: 'Paid Invoices',
        statusIcon: 'bi bi-arrow-up',
        iconColor: 'success',
        amout: '6.57',
        count: 4519
    }, {
        id: 3,
        color: 'warning',
        icon: 'bi bi-clock-history',
        title: 'Pending Invoices',
        statusIcon: 'bi bi-arrow-up',
        iconColor: 'success',
        amout: '4.07',
        count: 2648
    }, {
        id: 4,
        color: 'danger',
        icon: 'bi bi-file-earmark-text',
        title: 'Overdue Invoices',
        statusIcon: 'bi bi-arrow-down',
        iconColor: 'danger',
        amout: '3.49',
        count: 871
    }
];

export { invoicesList, invoice }