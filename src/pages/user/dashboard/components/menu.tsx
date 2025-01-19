import { menuItems } from "../constants/menu-items";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "@/assets/logosf.png";

export const Menu = () => {
    return (
        <MenuStyles>
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <h1>Menu</h1>
            {menuItems.map((item, index) => (
                <Link key={index} to={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                </Link>
            ))}
        </MenuStyles>
    );
};

const MenuStyles = styled.div`
    font-family: "Poppins", sans-serif;
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #EECAEE;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo-container {
        margin-bottom: 20px;
        img {
            height: 8rem;
        }
    }

    h1 {
        font-size: 24px;
        font-weight: bold;
        color: #4a004a; /* Tom próximo ao tema principal */
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
        color: #4a004a; /* Tom consistente com o tema */
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0;
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        transition: background-color 0.3s;

        &:hover {
            background-color: #A68DA6; /* Cor de destaque ao passar o mouse */
        }

        span {
            font-size: 16px;
            font-weight: normal;
        }
    }
`;
