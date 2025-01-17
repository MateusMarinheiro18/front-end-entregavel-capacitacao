import { House, Calendar, PencilSimple, Plus } from '@phosphor-icons/react';
import { PlusIcon } from 'lucide-react';

export const menuItems = [
    {
        label: 'Visão Geral',
        icon: <House size={24} weight="bold" />,
        href: '/user/dashboard',
    },
    {
        label: 'Calendário',
        icon: <Calendar size={24} weight="bold" />,
        href: '/user/dashboard/calendar',
    },
    {
        label: 'Criar Evento',
        icon: <Plus size={24} weight="bold" />,
        href: '/user/dashboard/create-event',
    },
];
