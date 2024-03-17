import { ChartOptions } from "./analytics.model"

// Other-1 chart
const SessionChart: ChartOptions = {
    series: [{
        name: 'Total Sessions',
        data: [31, 40, 28, 51, 42, 109, 103]
    }],
    chart: {
        height: 124,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    colors: ['#3762ea', '#1e1a22'],
    xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        labels: {
            style: {
                fontSize: '10px',
            },
        }
    },
    yaxis: {
        show: false,
    },
};

const DurationChart: ChartOptions = {
    series: [{
        name: 'Avg. Visit Duration',
        data: [29, 43, 71, 58, 99, 93, 130]
    }],
    chart: {
        height: 124,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    colors: ['#3762ea', '#1e1a22'],
    xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        labels: {
            style: {
                fontSize: '10px',
            },
        }
    },
    yaxis: {
        show: false,
    },
};

const ImpressionChart: ChartOptions = {
    series: [{
        name: 'Impressions',
        data: [50, 18, 47, 32, 84, 110, 93]
    }],
    chart: {
        height: 124,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    colors: ["#1e1a22"],
    xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        labels: {
            style: {
                fontSize: '10px',
            },
        }
    },
    yaxis: {
        show: false,
    },
};

const ViewChart: ChartOptions = {
    series: [{
        name: 'Total Views',
        data: [72, 58, 30, 51, 42, 95, 119]
    }],
    chart: {
        height: 124,
        type: 'line',
        toolbar: {
            show: false
        }
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        show: false,
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    colors: ["#3762ea"],
    xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        labels: {
            style: {
                fontSize: '10px',
            },
        }
    },
    yaxis: {
        show: false,
    },
};

const statData = [
    {
        title: 'Total Sessions',
        count: '368.24',
        counttyyp: 'k',
        avg: '06.41% Last Month',
        icon: 'bi bi-arrow-up',
        color: 'success',
        chart: SessionChart,
    },
    {
        title: 'Avg. Visit Duration',
        count: '1.47',
        counttyyp: 'sec',
        avg: '13% Last Month',
        icon: 'bi bi-arrow-up',
        color: 'success',
        chart: DurationChart
    },
    {
        title: 'Impressions',
        count: '1647',
        avg: '07.26% Last Week',
        icon: 'bi bi-arrow-down',
        color: 'danger',
        chart: ImpressionChart
    },
    {
        title: 'Total Views',
        count: '291.32',
        counttyyp: 'k',
        avg: '13% Last Month',
        icon: 'bi bi-arrow-up',
        color: 'success',
        chart: ViewChart
    }
]

const browserData = [
    {
        id: '1',
        img: 'assets/images/brands/chrome.png',
        browsers: 'Google Chrome',
        click: '640',
        rate: '86.01%'
    },
    {
        id: '2',
        img: 'assets/images/brands/firefox.png',
        browsers: 'Firefox',
        click: '274',
        rate: '59.22%'
    },
    {
        id: '3',
        img: 'assets/images/brands/safari.png',
        browsers: 'Safari',
        click: '591',
        rate: '71.36%'
    },
    {
        id: '4',
        img: 'assets/images/brands/opera.png',
        browsers: 'Opera',
        click: '456',
        rate: '63.82%'
    },
    {
        id: '5',
        img: 'assets/images/brands/microsoft.png',
        browsers: 'Microsoft Edge',
        click: '312',
        rate: '57.48%'
    },
    {
        id: '6',
        img: 'assets/images/brands/microsoft2.png',
        browsers: 'Internet Explorer',
        click: '164',
        rate: '77.21%'
    },
    {
        id: '7',
        img: 'assets/images/brands/chromium.png',
        browsers: 'Chromium',
        click: '36',
        rate: '18.90%'
    }
]

const topPageData = [
    {
        activepage: '/themesbrand/velzon',
        active: '299',
        users: '25.3%'
    },
    {
        activepage: '/skote/index.html',
        active: '240',
        users: '22.7%'
    },
    {
        activepage: '/hybrix/timeline',
        active: '190',
        users: '18.7%'
    },
    {
        activepage: '/themesbrand/minia',
        active: '135',
        users: '14.2%'
    },
    {
        activepage: '/dashon/dashboard',
        active: '118',
        users: '12.6%'
    },
    {
        activepage: '/doot/chats',
        active: '90',
        users: '10.9%'
    },
    {
        activepage: '/steex/learning',
        active: '75',
        users: '07.3%'
    }
]

export { statData, browserData, topPageData }