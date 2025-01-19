import { RouteObject } from "react-router-dom";
import { Dashboard } from "./dashboard/dashboard";
import { Home } from "./dashboard/nested/home/homepage";
import { CreateEventPage } from "./dashboard/nested/create/createeventpage";
import { CalendarPage } from "./dashboard/nested/calendar/calendarpage";
import { EditEventPage } from "./dashboard/nested/update/updateevent";
import { ProtectedRoute } from "./protectedroute";
import { LoginPage } from "../user/login/loginpage";
import { RegisterPage } from "./register/registerpage";

export const userRoutes: RouteObject[] = [
    {
        path: "/user/dashboard",
        element: (
            <Dashboard />
        ),
        handle: { breadcrumb: "Dashboard" }, // Breadcrumb para Dashboard
        children: [
            {
                index: true,
                element: <Home />,
                handle: { breadcrumb: "Home" }, // Breadcrumb para Home
            },
            {
                path: "create-event",
                element: <CreateEventPage />,
                handle: { breadcrumb: "Criar Evento" }, // Breadcrumb para Criar Evento
            },
            {
                path: "calendar",
                element: <CalendarPage />,
                handle: { breadcrumb: "Calendário" }, // Breadcrumb para Calendário
            },
            {
                path: "edit-event/:id",
                element: <EditEventPage />,
                handle: { breadcrumb: "Editar Evento" }, // Breadcrumb para Editar Evento
            },
        ],
    },
    {
        path: "/auth/login",
        element: <LoginPage />,
    },
    {
        path: "/auth/register",
        element: <RegisterPage />,
    },
];
