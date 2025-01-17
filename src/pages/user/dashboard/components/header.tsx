import { useMatches } from "react-router-dom";
import styled from "styled-components";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../../../components/ui/breadcrumb";

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
                <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={match.pathname} style={{ fontWeight: "500" }}>
                      {breadcrumbLabel}
                    </BreadcrumbLink>
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
  grid-column: 1 / span 2; /* O Header ocupa as duas colunas */
  grid-row: 1;
  height: 100%;
  width: 100%;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  align-items: center;

  .breadcrumbs-container {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #007bff;
  }

  .user-container {
    display: flex;
    align-items: center;
    gap: 15px;

    p {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #0056b3;
    }
  }

  .breadcrumbs-container .separator {
    color: #ccc;
    font-size: 14px;
  }
`;
