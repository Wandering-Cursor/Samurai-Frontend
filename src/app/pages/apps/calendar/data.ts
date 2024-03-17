import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

const defaultevent = [
    {
        "id": 1,
        "title": "World Braille Day",
        "start": "2022-01-04T00:00:00.000Z",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },
    {
        "id": 2,
        "title": "World Leprosy Day",
        "start": "2022-01-30",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 3,
        "title": "International Mother Language Day",
        "start": "2022-02-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 4,
        "title": "International Women's Day",
        "start": "2022-03-08",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 5,
        "title": "World Thinking Day",
        "start": "2022-02-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 6,
        "title": "International Mother Language Day",
        "start": "2022-03-21",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 7,
        "title": "World Water Day",
        "start": "2022-03-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 8,
        "title": "World Health Day",
        "start": "2022-04-07",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 9,
        "title": "International Special Librarians Day",
        "start": "2022-04-16",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    },

    {
        "id": 10,
        "title": "Earth Day",
        "start": "2022-04-22",
        "className": "bg-soft-info",
        "allDay": true,
        "description": "N.A.",
        "location": "N.A."
    }
];

const events: EventInput[] = [
    {
        id: createEventId(),
        title: "All Day Event",
        date: new Date(y, m, 1),
        start:"12:00",
        end:"12:00",
        className: "bg-primary-subtle",
        location: "San Francisco, US",
        allDay: false,
        extendedProps: {
            department: "All Day Event",
        },
        description:
            "An all-day event is an event that lasts an entire day or longer",
    },
    {
        id: createEventId(),
        title: "Visit Online Course",
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2),
        allDay: false,
        className: "bg-warning-subtle",
        location: "San Francisco, US",
        extendedProps: {
            department: "Long Event",
        },
        description:
            "Long Term Event means an incident that last longer than 12 hours.",
    },
    {
        id: createEventId(),
        title: "Client Meeting with Alexis",
        start: new Date(y, m, d + 22, 20, 0),
        end: new Date(y, m, d + 23, 16, 0),
        allDay: false,
        className: "bg-danger-subtle",
        location: "California, US",
        extendedProps: {
            department: "Meeting with Alexis",
        },
        description:
            "A meeting is a gathering of two or more people that has been convened for the purpose of achieving a common goal through verbal interaction, such as sharing information or reaching agreement.",
    },
    {
        id: createEventId(),
        title: "Repeating Event",
        start: new Date(y, m, d + 4, 16, 0),
        end: new Date(y, m, d + 8, 16, 0),
        allDay: false,
        className: "bg-primary-subtle",
        location: "Las Vegas, US",
        extendedProps: {
            department: "Repeating Event",
        },
        description:
            "A recurring or repeating event is simply any event that you will occur more than once on your calendar. ",
    },
    {
        id: createEventId(),
        title: "Weekly Strategy Planning",
        start: new Date(y, m, d + 9),
        end: new Date(y, m, d + 11),
        allDay: false,
        className: "bg-danger-subtle",
        location: "Head Office, US",
        extendedProps: {
            department: "Lunch",
        },
        description: "Strategies for Creating Your Weekly Schedule",
    },
    {
        id: createEventId(),
        title: "Birthday Party",
        start: new Date(y, m, d + 1, 19, 0),
        allDay: false,
        className: "bg-success-subtle",
        location: "Los Angeles, US",
        extendedProps: {
            department: "Birthday Party",
        },
        description:
            "Family slumber party – Bring out the blankets and pillows and have a family slumber party! Play silly party games, share special snacks and wind down the fun with a special movie.",
    },
    {
        id: createEventId(),
        title: "Click for Google",
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: "http://google.com/",
        className: "bg-dark-subtle",
    },
    {
        id: createEventId(),
        title: "Steex Project",
        start: new Date(y, m, d + 23, 20, 0),
        end: new Date(y, m, d + 23, 16, 0),
        allDay: false,
        className: "bg-info-subtle",
        location: "Head Office, US",
        extendedProps: {
            department: "Discussion",
        },
        description: "Tell how to boost website traffic",
    },
];

const calenderDefaultCategories = [
    {
        id: 1,
        title: "New Event Planning",
        type: "success",

    },
    {
        id: 2,
        title: "Meeting",
        type: "info",
    },
    {
        id: 3,
        title: "Generating Reports",
        type: "warning",
    },
    {
        id: 4,
        title: "Create New theme",
        type: "danger",
    },
];

export { calenderDefaultCategories, events, defaultevent };