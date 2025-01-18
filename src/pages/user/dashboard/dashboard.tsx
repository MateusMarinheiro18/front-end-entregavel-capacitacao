import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Menu } from "./components/menu";

export const Dashboard = () => {
    return (
        <DashboardStyles>
            <Header />
            <Menu />
            <main className="main-content">
                <Outlet /> {/* Renderiza as rotas internas */}
            </main>
        </DashboardStyles>
    );
};

const DashboardStyles = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100px 1fr;
    height: 100%;

    .main-content {
        height: 100%;
        grid-column: 2;
        grid-row: 2;
        padding: 20px;
        background-color: #f9f9f9;
    }
`;
