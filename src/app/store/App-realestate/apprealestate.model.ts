export interface EstatelistModel {
    id?: any;
    type?: any;
    color?: any;
    title?: any;
    img?: any;
    imgalt?: any;
    location?: any;
    city?: any;
    bedroom?: any;
    bathroom?: any;
    area?: any;
    rating?: any;
    price?: any;
    starred?: any;
    agent?: any;
    requirement?: any;
}

export interface ListingModel {
    id?: any;
    border?: any;
    iconColor?: any;
    icon?: any;
    persent?: any;
    target?: any;
    title?: any;
}

export interface ListingGridModel {
    id: number;
    type: string;
    color: string;
    title: string;
    img: string;
    imgalt: string;
    location: string;
    city: string;
    bedroom: string;
    bathroom: string;
    area: string;
    rating: number;
    price: number;
    starred: boolean;
    agent: string;
    requirement: string;
}
export interface EarningdataModel {
    id?: any,
    icon?: any;
    transactionID?: any,
    date?: any,
    timestamp?: any;
    details?: any,
    type?: any,
    amount?: any
    status?: any
    color?: any
}
