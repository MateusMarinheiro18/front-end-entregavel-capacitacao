import { menuItems } from "../constants/menu-items";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Menu = () => {
    return (
        <MenuStyles>
            <h1>Menu</h1>
            {menuItems.map((item, index) => (
                <Link key={index} to={item.href}>
                    {item.icon}
                    {item.label}
                </Link>
            ))}
        </MenuStyles>
    );
};

const MenuStyles = styled.div`
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #f9f9f9;
    padding: 20px;
    border-right: 1px solid #ddd;

    a {
        text-decoration: none;
        color: inherit;
        display: block;
        margin: 10px 0;
    }
`;
