export interface SupportModel {
    id?: any;
    imgBg?: any;
    img?: any;
    iconColor?: any;
    icon?: any;
    num?: any;
    count?: any;
    title?: any;
    label?: any;
}

export interface AssignModel {
    id?: any;
    assigneeImg?: any;
    assigneeName?: any;
}

export interface TicketModel {
    id?: any;
    assignedto: Array<{
        assigneeName?: string;
        assigneeImg?: string;
    }>;
    ticketTitle?: any;
    clientName?: any;
    createDate?: any;
    dueDate?: any;
    priority?: any;
    status?: any;
}