const widget2 = [
    {
        id: 1,
        label: "Total Tickets",
        icon: "bi bi-ticket",
        percentage: "+3.47 %",
        caption: "than last week",
        counters: 249,
        badge: "ri-arrow-right-up-line",
        suffix: "k",
        iconbg: "bg-success-subtle text-success",
        prefix: "",
        bgColor: "",
        textcolor: "text-muted",
        color: "success"
    },
    {
        id: 2,
        label: "Pending Tickets",
        icon: "bi bi-hourglass-split",
        percentage: " +6.33 %",
        caption: "than last week",
        counters: 3174,
        badge: "ri-arrow-right-down-line",
        suffix: "k",
        iconbg: "bg-warning-subtle text-warning ",
        prefix: "",
        textcolor: "text-muted",
        color: "danger"
    },
    {
        id: 3,
        label: "Closed Tickets",
        icon: "bi bi-lock",
        percentage: "+7.34 %",
        caption: "than last week",
        counters: 1596,
        badge: "ri-arrow-right-up-line",
        suffix: "k",
        iconbg: "bg-danger-subtle text-danger ",
        prefix: "",
        bgColor: "",
        textcolor: "text-muted",
        color: "success"
    },
    {
        id: 4,
        label: "New Tickets",
        icon: "bi bi-ticket",
        percentage: "+1.29 %",
        caption: "than last week",
        counters: 365,
        badge: "ri-arrow-right-up-line",
        suffix: "k",
        prefix: "",
        iconbg: "bg-primary-subtle text-primary",
        bgColor: "card-primary",
        textcolor: "text-white text-opacity-50",
        color: "danger"
    }
]
import { ChartOptions } from "../../../store/Analytics/analytics.model"

// Other-1 chart
const SessionChart: ChartOptions = {
    series: [{
        name: 'Total Sessions',
        data: [31, 40, 28, 51, 42, 109, 103]
    }],
    chart: {
        height: 114,
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




const widget = [
    {
        id: 1,
        label: "Total Sessions",
        labelClass: "muted",
        percentage: "06.41%",
        percentageClass: "success",
        percentageIcon: "bi bi-arrow-up",
        counter: 368.24,
        caption: "Last Month",
        iconClass: "success",
        suffix: "k",
        chart: SessionChart
    },
    {
        id: 2,
        label: "Avg. Visit Duration",
        labelClass: "muted",
        percentage: "13%",
        percentageClass: "success",
        percentageIcon: "bi bi-arrow-up",
        counter: 1.47,
        caption: "Last Month",
        iconClass: "success",
        suffix: "sec",
        chart: DurationChart
    },
    {
        id: 3,
        label: "Impressions",
        labelClass: "muted",
        percentage: "07.26%",
        percentageClass: "danger",
        percentageIcon: "bi bi-arrow-up",
        counter: 1647,
        caption: "Last Week",
        iconClass: "danger",
        suffix: "",
        chart: ImpressionChart
    },
    {
        id: 4,
        label: "Total Views",
        labelClass: "muted",
        percentage: "13%",
        percentageClass: "success",
        percentageIcon: "bi bi-arrow-up",
        counter: 291.32,
        caption: "Last Month",
        iconClass: "success",
        suffix: "k",
        chart: ViewChart
    },
]
export { widget2, widget }