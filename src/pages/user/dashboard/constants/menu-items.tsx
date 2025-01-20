import { House, Calendar, PencilSimple, Plus, DoorOpen } from '@phosphor-icons/react';
import { PlusIcon } from 'lucide-react';

export const menuItems = [
    {
        label: 'Meus Eventos',
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
    {
        label: 'Sair',
        icon: <DoorOpen size={24} weight="bold" />,
        href: '/auth/logout',

    }
];
