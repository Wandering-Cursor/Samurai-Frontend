const ChannelsData = [
    {
        id: 1,
        name: 'Landing Design',
        messageCount: '7'
    },
    {
        id: 2,
        name: 'General'
    },
    {
        id: 3,
        name: 'Project Tasks',
        messageCount: '2'
    },
    {
        id: 4,
        name: 'Meeting'
    },
    {
        id: 5,
        name: 'Reporting'
    }
];

const chatData = [
    {
        id: 1,
        name: "Lisa Parker",
        status: "online",
        profile: "assets/images/users/48/avatar-2.jpg",
        desc: "me: ok, No problem ..."
    },
    {
        id: 2,
        name: "Frank Thomas",
        status: "online",
        profile: "assets/images/users/48/avatar-3.jpg",
        desc: "Let's start, Are you ...",
        messagecount: 8
    },
    {
        id: 3,
        name: "Clifford Taylor",
        status: "away",
        nickname: "CT",
        profile: "",
        desc: "me: i am busy now ..."
    },
    {
        id: 4,
        name: "Janette Caster",
        status: "online",
        profile: "assets/images/users/48/avatar-4.jpg",
        desc: "How are you ?"
    },
    {
        id: 5,
        name: "Sarah Beattie",
        status: "online",
        profile: "assets/images/users/48/avatar-5.jpg",
        desc: "I will go there, Can ...",
        messagecount: 5
    },
    {
        id: 6,
        name: "Nellie Cornett",
        status: "away",
        profile: "assets/images/users/48/avatar-6.jpg",
        desc: "me: only $120 for ...",
        messagecount: 2
    },
    {
        id: 7,
        name: "Chris Kiernan",
        status: "online",
        nickname: "CK",
        profile: "",
        desc: "me: ok, No problem ..."

    },
    {
        id: 8,
        name: "Edith Evans",
        status: "away",
        nickname: "EE",
        profile: "",
        desc: "Let's start, Are you ..."
    },
    {
        id: 9,
        name: "Joseph Siegel",
        status: "away",
        profile: "assets/images/users/48/avatar-7.jpg",
        desc: "Document sent",
        messagecount: 3
    },
    {
        id: 10,
        name: "Kelvin levhoota",
        status: "away",
        profile: "assets/images/users/48/avatar-8.jpg",
        desc: "Available for interview ?"
    },
    {
        id: 11,
        name: "Jene Cooper",
        status: "away",
        profile: "assets/images/users/48/avatar-9.jpg",
        desc: "Video call ended"
    }, {
        id: 12,
        name: "Aelene Mccoy",
        status: "away",
        profile: "assets/images/users/48/avatar-10.jpg",
        desc: "Hi, Jones new project ..."
    }
]


const chatContactData = [
    {
        title: 'A',
        contacts: [
            {
                id: 1,
                name: 'Alice Cruickshank',
                status: "offline",
                roomId: 5,
                isImg: true,
                profile: "AC"
            }
        ],
    },
    {
        title: 'B',
        contacts: [
            {
                id: 1,
                name: 'Barrett Brown',
                status: "offline",
                roomId: 1,
                image: "assets/images/users/avatar-4.jpg"
            }
        ],
    },
    {
        title: 'C',
        contacts: [
            {
                id: 1,
                name: 'Chris Kiernan',
                status: "offline",
                roomId: 3,
                isImg: true,
                profile: "CK"
            },
            {
                id: 2,
                name: 'Clifford Taylor',
                status: "offline",
                roomId: 4,
                isImg: true,
                profile: "CT"
            }
        ],
    },
    {
        title: 'E',
        contacts: [
            {
                id: 1,
                name: 'Edith Evans',
                status: "offline",
                roomId: 5,
                isImg: true,
                profile: "EE"
            }
        ],
    },
    {
        title: 'F',
        contacts: [
            {
                id: 1,
                name: 'Frank Thomas',
                status: "offline",
                roomId: 6,
                image: "assets/images/users/avatar-3.jpg"
            }
        ],
    },
    {
        title: 'G',
        contacts: [
            {
                id: 1,
                name: 'Gilbert Beer',
                status: "offline",
                roomId: 7,
                isImg: true,
                profile: "GB"
            }
        ],
    },
    {
        title: 'J',
        contacts: [
            {
                id: 1,
                name: 'Janette Caster',
                status: "offline",
                roomId: 8,
                image: "assets/images/users/avatar-4.jpg"
            },
            {
                id: 2,
                name: 'Joseph Siegel',
                status: "offline",
                roomId: 9,
                image: "assets/images/users/avatar-7.jpg"
            },
            {
                id: 3,
                name: 'Justyn Wisoky',
                status: "offline",
                roomId: 2,
                image: "assets/images/users/avatar-1.jpg"
            }
        ],
    },
    {
        title: 'K',
        contacts: [
            {
                id: 1,
                name: 'Keaton King',
                status: "offline",
                roomId: 11,
                image: "assets/images/users/avatar-5.jpg"
            }
        ],
    },
    {
        title: 'L',
        contacts: [
            {
                id: 1,
                name: 'Lisa Parker',
                status: "offline",
                roomId: 1,
                image: "assets/images/users/avatar-2.jpg"
            }
        ],
    },
    {
        title: 'M',
        contacts: [
            {
                id: 1,
                name: 'Marian Moen',
                status: "offline",
                roomId: 3,
                isImg: true,
                profile: "MM"
            }
        ],
    },
    {
        title: 'N',
        contacts: [
            {
                id: 1,
                name: 'Nellie Cornett',
                status: "offline",
                roomId: 4,
                image: "assets/images/users/avatar-6.jpg",
                isImg: true,
                profile: "NC"
            }
        ],
    },
    {
        title: 'R',
        contacts: [
            {
                id: 1,
                name: 'Ronald Downey',
                status: "offline",
                roomId: 5,
                isImg: true,
                profile: "RD"
            }
        ],
    },
    {
        title: 'S',
        contacts: [
            {
                id: 1,
                name: 'Sarah Beattie',
                status: "offline",
                roomId: 6,
                image: "assets/images/users/avatar-5.jpg"
            }
        ],
    },
    {
        title: 'V',
        contacts: [
            {
                id: 1,
                name: 'Victor Beahan',
                status: "offline",
                roomId: 7,
                image: "assets/images/users/avatar-10.jpg"
            }
        ],
    },
    {
        title: 'W',
        contacts: [
            {
                id: 1,
                name: 'Wayne Runte',
                status: "offline",
                roomId: 8,
                image: "assets/images/users/avatar-2.jpg"
            }
        ],
    },
];

const callsData = [
    {
        id: 1,
        name: 'Warren Hickey',
        date: '22 Feb, 06:49PM',
        time: '01:10',
        icon: 'bi bi-camera-video align-middle',
        image: "assets/images/users/avatar-2.jpg"
    },
    {
        id: 2,
        name: 'Angela Walls',
        date: '22 Feb, 03:23PM',
        time: '02:34',
        icon: 'bi bi-camera-video align-middle',
        isImg: true,
        profile: "AW"
    },
    {
        id: 3,
        name: 'Thomas Lane',
        date: '22 Feb, 10:31AM',
        time: '01:40',
        icon: 'bi bi-telephone align-middle',
        image: "assets/images/users/avatar-3.jpg"
    },
    {
        id: 4,
        name: 'Elisa Smith',
        date: '21 Feb, 07:05PM',
        time: '03:51',
        icon: 'bi bi-telephone align-middle',
        isImg: true,
        profile: "ES"
    },
    {
        id: 5,
        name: 'Ola Black',
        date: '21 Feb, 05:15PM',
        time: '05:15',
        icon: 'bi bi-camera-video align-middle',
        isImg: true,
        profile: "OB"
    },
    {
        id: 6,
        name: 'Victoria McBride',
        date: '21 Feb, 10:30AM',
        time: '00:42',
        icon: 'bi bi-telephone align-middle',
        image: "assets/images/users/avatar-3.jpg"
    },
    {
        id: 7,
        name: 'Carla Scott',
        date: '20 Feb, 05:20PM',
        time: '04:02',
        icon: 'bi bi-camera-video align-middle',
        image: "assets/images/users/avatar-5.jpg"
    },
    {
        id: 8,
        name: 'Waldo Smith',
        date: '20 Feb, 01:40PM',
        time: '02:34',
        icon: 'bi bi-camera-video align-middle',
        isImg: true,
        profile: "WS"
    },
    {
        id: 9,
        name: 'Mary Parker',
        date: '19 Feb, 11:29AM',
        time: '10:09',
        icon: 'bi bi-telephone align-middle',
        image: "assets/images/users/avatar-6.jpg"
    },
    {
        id: 1,
        name: 'Judith Morrow',
        date: '18 Feb, 02:05PM',
        time: '07:15',
        icon: 'bi bi-telephone align-middle',
        image: "assets/images/users/avatar-8.jpg"
    },
];

const bookmarkData = [
    {
        id: '1',
        icon: 'bi bi-file-earmark-richtext',
        fileName: 'design-phase-1-approved.pdf',
        size: '12.5 MB'
    },
    {
        id: '2',
        icon: 'bi bi-pin-angle',
        fileName: 'Bg Pattern',
        size: 'https://bgpattern.com/'
    },
    {
        id: '3',
        icon: 'bi bi-image',
        fileName: 'Image-001.jpg',
        size: '4.2 MB'
    },
    {
        id: '4',
        icon: 'bi bi-pin-angle',
        fileName: 'Images',
        size: 'https://images123.com/'
    },
    {
        id: '5',
        icon: 'bi bi-pin-angle',
        fileName: 'Bg Gradient',
        size: 'https://bggradient.com/'
    },
    {
        id: '6',
        icon: 'bi bi-image',
        fileName: 'Image-012.jpg',
        size: '3.1 MB'
    },
    {
        id: '7',
        icon: 'bi bi-file-earmark-richtext',
        fileName: 'analytics dashboard.zip',
        size: '6.7 MB'
    },
    {
        id: '8',
        icon: 'bi bi-image',
        fileName: 'Image-031.jpg',
        size: '4.2 MB'
    }
];

const attachementsData = [
    {
        id: 1,
        foldericon: "bi bi-file-earmark-richtext",
        foldername: "design-phase-1-approved.pdf",
        foldersize: "12.5 MB",
    },
    {
        id: 2,
        foldericon: "bx bx-image",
        foldername: "Image-1.jpg",
        foldersize: "4.2 MB",
    },
    {
        id: 3,
        foldericon: "bx bx-image",
        foldername: "Image-2.jpg",
        foldersize: "3.1 MB",
    },
    {
        id: 4,
        foldericon: "bi bi-file-earmark-richtext",
        foldername: "Landing-A.zip",
        foldersize: "6.7 MB",
    },
];

const messages = [
    {
        id: 1,
        roomId: 1,
        sender: "Lisa Parker",
        message: "Good morning 😊",
        createdAt: "09:07 am",
        isSender: false,
    },
    {
        id: 2,
        roomId: 1,
        sender: "Anna Adame",
        message: "Good morning, How are you? What about our next meeting?",
        createdAt: "09:08 am",
        isSender: true,
    },
    {
        id: 3,
        roomId: 1,
        sender: "Lisa Parker",
        message: "Yeah everything is fine. Our next meeting tomorrow at 10.00 AM",
        isSender: false,
    },
    {
        id: 4,
        roomId: 1,
        sender: "Lisa Parker",
        message: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.",
        createdAt: "09:10 am",
        isSender: false,
    },
    {
        id: 5,
        roomId: 1,
        sender: "Anna Adame",
        message: "Wow that's great",
        createdAt: "09:12 am",
        isSender: true,
    },
    {
        id: 6,
        roomId: 1,
        createdAt: '09:30 am',
        image: ['assets/images/small/img-1.jpg', 'assets/images/small/img-2.jpg'],
        isSender: false,
    },
];

export { messages, chatContactData, chatData, ChannelsData, attachementsData, callsData, bookmarkData };

