export interface SupportTicket {
    id: number;
    imgBg: string;
    img: string;
    iconColor: string;
    icon: string;
    num: string;
    count: number;
    title: string;
  }    
    
    export const supporttickets: SupportTicket[]  = [
    {
        id: 1,
        imgBg: 'info',
        img: 'bx ph-ticket',
        iconColor: 'success',
        icon: 'ri-arrow-right-up-line',
        num: '',
        count: 0,
        title: 'Open Tickets'
    },
    {
        id: 2,
        imgBg: 'info',
        img: 'bx ph-pen',
        iconColor: 'danger',
        icon: 'ri-arrow-right-down-line',
        num: '',
        count: 0,
        title: 'Tickets in Progess'
    },
    {
        id: 3,
        imgBg: 'warning',
        img: 'bx ph-eye',
        iconColor: 'danger',
        icon: 'ri-arrow-right-down-line',
        num: '',
        count: 0,
        title: 'Tickets in Review'
    },
    {
        id: 4,
        imgBg: 'warning',
        img: 'bx bx-time',
        iconColor: 'danger',
        icon: 'ri-arrow-right-down-line',
        num: '',
        count: 0,
        title: 'Tickets in Resubmit'
    },
    {
        id: 5,
        imgBg: 'success',
        img: 'bx bx-check-square',
        iconColor: 'success',
        icon: 'ri-arrow-right-up-line',
        num: '',
        count: 0,
        title: 'Tickets Done'
    },

  ];

  export const assignesTickets = [
    {
        id: 1,
        assigneeImg: "assets/images/users/32/avatar-1.jpg",
        assigneeName: 'Stefanie Cartwright',
        checked:'0'
    },
    {
        id: 2,
        assigneeImg: "assets/images/users/32/avatar-2.jpg",
        assigneeName: 'Marisol Gaylord',
        checked:'0'
    },
    {
        id: 3,
        assigneeImg: "assets/images/users/32/avatar-3.jpg",
        assigneeName: 'Merlin Heaney',
        checked:'0'
    },
    {
        id: 4,
        assigneeImg: "assets/images/users/32/avatar-4.jpg",
        assigneeName: 'Alexys Collier',
        checked:'0'
    },
    {
        id: 5,
        assigneeImg: "assets/images/users/32/avatar-5.jpg",
        assigneeName: "Kyla O'Hara",
        checked:'0'
    },
    {
        id: 6,
        assigneeImg: "assets/images/users/32/avatar-6.jpg",
        assigneeName: 'Twila Stark',
        checked:'0'
    },
    {
        id: 7,
        assigneeImg: "assets/images/users/32/avatar-7.jpg",
        assigneeName: 'Bennett Rice',
        checked:'0'
    },
    {
        id: 8,
        assigneeImg: "assets/images/users/32/avatar-8.jpg",
        assigneeName: 'Dusty Hackett',
        checked:'0'
    },
    {
        id: 9,
        assigneeImg: "assets/images/users/32/avatar-9.jpg",
        assigneeName: 'Ines Stracke',
        checked:'0'
    },
    {
        id: 10,
        assigneeImg: "assets/images/users/32/avatar-10.jpg",
        assigneeName: 'Abner Wisozk',
        checked:'0'
    },
]


export const ticketList = [
    {
        id: 1,
        assignedto: [
            {
                id: 1,
                assigneeImg: "assets/images/users/32/avatar-1.jpg",
                assigneeName: "Stefanie Cartwright",
                checked:'0'
            }, {
                id: 2,
                assigneeImg: "assets/images/users/32/avatar-2.jpg",
                assigneeName: "Marisol Gaylord",
                checked:'0'
            }
        ],
        ticketTitle: "Webstorm does not recognize tags",
        clientName: "Domenic Dach",
        createDate: "17 Jan, 2023",
        dueDate: "23 Jan, 2023",
        priority: "Low",
        status: "Pending"
    },
    {
        id: 2,
        assignedto: [
            {
                id: 3,
                assigneeImg: "assets/images/users/32/avatar-3.jpg",
                assigneeName: "Merlin Heaney",
                checked:'0'
            }, {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'0'
            }, {
                id: 5,
                assigneeImg: "assets/images/users/32/avatar-5.jpg",
                assigneeName: "Kyla O'Hara",
                checked:'0'
            }
        ],
        ticketTitle: "Form error style for input addonAfter slot",
        clientName: "Prezy Mark",
        createDate: "29 Jan, 2023",
        dueDate: "06 Feb, 2023",
        priority: "Medium",
        status: "Open"
    },
    {
        id: 3,
        assignedto: [
            {
                id: 6,
                assigneeImg: "assets/images/users/32/avatar-6.jpg",
                assigneeName: "Twila Stark",
                checked:'0'
            }, {
                id: 7,
                assigneeImg: "assets/images/users/32/avatar-7.jpg",
                assigneeName: "Bennett Rice",
                checked:'0'
            }, {
                id: 8,
                assigneeImg: "assets/images/users/32/avatar-8.jpg",
                assigneeName: "Dusty Hackett",
                checked:'0'
            }, {
                id: 1,
                assigneeImg: "assets/images/users/32/avatar-1.jpg",
                assigneeName: "Stefanie Cartwright",
                checked:'0'
            }
        ],
        ticketTitle: "Not following the ReactJS folder structure",
        clientName: "Nelson Schaden",
        createDate: "01 Feb, 2023",
        dueDate: "07 Feb, 2023",
        priority: "High",
        status: "Pending"
    },
    {
        id: 4,
        assignedto: [
            {
                id: 2,
                assigneeImg: "assets/images/users/32/avatar-2.jpg",
                assigneeName: "Marisol Gaylord",
                checked:'0'
            }
        ],
        ticketTitle: "Error message when placing an orders?",
        clientName: "Deondre Huel",
        createDate: "13 Feb, 2023",
        dueDate: "19 Feb, 2023",
        priority: "Low",
        status: "New"
    },
    {
        id: 5,
        assignedto: [
            {
                id: 9,
                assigneeImg: "assets/images/users/32/avatar-9.jpg",
                assigneeName: "Ines Stracke",
                checked:'0'
            }, {
                id: 10,
                assigneeName: "Abner Wisozk",
                assigneeImg: "assets/images/users/32/avatar-10.jpg",
                checked:'0'
            }
        ],
        ticketTitle: "Forgetting to start a component name with a capital letter",
        clientName: "Sarai Schmidt",
        createDate: "20 Feb, 2023",
        dueDate: "26 Feb, 2023",
        priority: "Low",
        status: "Close"
    },
    {
        id: 6,
        assignedto: [
            {
                id: 1,
                assigneeImg: "assets/images/users/32/avatar-1.jpg",
                assigneeName: "Stefanie Cartwright",
                checked:'1'
            }, {
                id: 6,
                assigneeImg: "assets/images/users/32/avatar-6.jpg",
                assigneeName: "Twila Stark",
                checked:'1'
            }, {
                id: 5,
                assigneeImg: "assets/images/users/32/avatar-5.jpg",
                assigneeName: "Kyla O'Hara",
                checked:'1'
            }, {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'1'
            }
        ],
        ticketTitle: "Sending props as strings (instead of numbers)",
        clientName: "Ophelia Steuber",
        createDate: "06 Apr, 2023",
        dueDate: "12 Apr, 2023",
        priority: "High",
        status: "Open"
    },
    {
        id: 7,
        assignedto: [
            {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'1'
            }, {
                id: 6,
                assigneeImg: "assets/images/users/32/avatar-6.jpg",
                assigneeName: "Twila Stark",
                checked:'1'
            }
        ],
        ticketTitle: "Creating and using God components",
        clientName: "Nelson Schaden",
        createDate: "27 Feb, 2023",
        dueDate: "05 Mar, 2023",
        priority: "Medium",
        status: "Pending"
    },
    {
        id: 8,
        assignedto: [
            {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'1'
            }, {
                id: 6,
                assigneeImg: "assets/images/users/32/avatar-6.jpg",
                assigneeName: "Twila Stark",
                checked:'1'
            }, {
                id: 7,
                assigneeImg: "assets/images/users/32/avatar-7.jpg",
                assigneeName: "Bennett Rice",
                checked:'1'
            }
        ],
        ticketTitle: "Forgetting that setState is asynchronous",
        clientName: "Zachary Stokes",
        createDate: "16 Mar, 2023",
        dueDate: "05 Mar, 2023",
        priority: "Medium",
        status: "Close"
    },
    {
        id: 9,
        assignedto: [
            {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'1'
            }, {
                id: 3,
                assigneeImg: "assets/images/users/32/avatar-3.jpg",
                assigneeName: "Merlin Heaney",
                checked:'1'
            }
        ],
        ticketTitle: "Modifying the state directly",
        clientName: "Lloyd Vanburen",
        createDate: "21 Mar, 2023",
        dueDate: "26 Mar, 2023",
        priority: "Low",
        status: "New"
    },
    {
        id: 10,
        assignedto: [
            {
                id: 1,
                assigneeImg: "assets/images/users/32/avatar-1.jpg",
                assigneeName: "Stefanie Cartwright",
                checked:'1'
            }
        ],
        ticketTitle: "Not creating enough components",
        clientName: "Janet Guin",
        createDate: "28 Mar, 2023",
        dueDate: "06 Apr, 2023",
        priority: "High",
        status: "Open"
    },
    {
        id: 11,
        assignedto: [
            {
                id: 4,
                assigneeImg: "assets/images/users/32/avatar-4.jpg",
                assigneeName: "Alexys Collier",
                checked:'1'
            }, {
                id: 6,
                assigneeImg: "assets/images/users/32/avatar-6.jpg",
                assigneeName: "Twila Stark",
                checked:'1'
            }
        ],
        ticketTitle: "Creating and using God components",
        clientName: "Nelson Schaden",
        createDate: "27 Feb, 2023",
        dueDate: "05 Mar, 2023",
        priority: "Medium",
        status: "Pending"
    }
]
