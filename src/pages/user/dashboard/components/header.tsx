import { useMatches } from "react-router-dom";
import styled from "styled-components";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../../components/ui/breadcrumb";
import logo from "@/assets/logosf.png";

export function Header() {
  const matches = useMatches();

  return (
    <HeaderStyle>
      <div className="breadcrumbs-container">
        <Breadcrumb>
          <BreadcrumbList>
            {matches.map((match, index) => {
              const breadcrumbLabel = match.pathname.split("/").pop();
              return (
                <div key={index} className="breadcrumb-item">
                  <BreadcrumbItem>
                    <BreadcrumbLink href={match.pathname}>{breadcrumbLabel}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < matches.length - 1 && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="user-container">
        <p>Bem-vindo(a), Usuário!</p>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  font-family: "Poppins", sans-serif;
  grid-column: 2; /* O Header ocupa as duas colunas */
  grid-row: 1;
  height: 100%;
  width: auto;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 2rem;

  .logo-container {
    display: flex;
    align-items: center;

    img {
      max-width: 100px;
      height: auto;
    }
  }

  .breadcrumbs-container {
    flex-grow: 1; /* Faz os breadcrumbs ocuparem o espaço entre a logo e o usuário */
    display: flex;
    align-items: center;

    ol, ul {
      display: flex;
      list-style: none; /* Remove os marcadores de lista */
      padding: 0;
      margin: 0;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;

      a {
        color: #4A004A; /* Ajusta os links para a mesma cor do separador */
        text-decoration: none;
        font-weight: 600;
        font-size: 18px;

        &:hover {
          color: #555; /* Cor ao passar o mouse */
        }
      }

      .separator {
        margin: 0 5px; /* Espaçamento entre os breadcrumbs */
        color: #4A004A; /* Cor do separador */
      }
    }
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 15px;

    p {
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;
