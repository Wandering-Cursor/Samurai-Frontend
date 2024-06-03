import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 0,
        label: 'ПАНЕЛЬ СТУДЕНТА',
        isTitle: true
    },
    {
        id: 1,
        label: 'МЕНЮ',
        isTitle: true
    },
    {
        id: 2,
        label: 'Список Задач',
        icon: 'bx bx-list-ul',
        link: '/tickets/list',
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