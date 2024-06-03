import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 0,
        label: 'ПАНЕЛЬ ЗАВІДУВАЧА КАФЕДРОЮ',
        isTitle: true
    },
    {
        id: 1,
        label: 'МЕНЮ',
        isTitle: true
    },
    {
        id: 2,
        label: 'Список Інструкторів',
        icon: 'bx bx-list-ul',
        link: '/learning/list-of-instructors',
        parentId: 34
    },
    {
        id: 4,
        label: 'Чат',
        icon: 'ph-chats',
        link: '/apps/chat',
        parentId: 8
    }
]