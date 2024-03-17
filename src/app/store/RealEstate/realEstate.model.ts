// Property Model
export interface Property {
    id?: string;
    type: string;
    img: string;
    name: string;
    address: string;
    agentname: string;
    price: string;
    status: string;
}

// Feedback Model
export interface Feedback {
    id: string;
    img: string;
    name: string;
    content: string;
    time: string;
}

// Sale Property Model
export interface SaleProperty {
    id: string;
    img: string;
    name: string;
    bedroom: string;
    bathroom: string;
    sqft: string;
    rate: string;
}

// Rent Property Model
export interface RentProperty {
    id: string;
    img: string;
    name: string;
    bedroom: string;
    bathroom: string;
    sqft: string;
    rate: string;
}