import { RouteObject } from "react-router-dom";
import { Dashboard } from "./dashboard/dashboard";
import { Home } from "./dashboard/nested/home/homepage";
import { CreateEventPage } from "./dashboard/nested/create/createeventpage";
import { CalendarPage } from "./dashboard/nested/calendar/calendarpage";
import { EditEventPage } from "./dashboard/nested/update/updateevent";

export const userRoutes: RouteObject[] = [
    {
        path: "/user/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Home />, // Página de listagem de eventos como padrão
                id: "events",
            },
            {
                path: "create-event",
                element: <CreateEventPage />, // Página para criar eventos
                id: "create-event",
            },
            {
                path: "calendar",
                element: <CalendarPage />, // Página do calendário
                id: "calendar",
            },
            {
                path: "edit-event/:id", // Aceitando o parâmetro ID
                element: <EditEventPage />,
                id: "edit-event",
            }
            
        ],
    },
];
