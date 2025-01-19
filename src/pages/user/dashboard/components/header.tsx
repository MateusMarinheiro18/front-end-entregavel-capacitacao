import { useMatches } from "react-router-dom";
import styled from "styled-components";
import logo from "@/assets/logosf.png";

// Defina o tipo esperado para "handle"
interface MatchHandle {
    handle?: {
        breadcrumb: string;
    };
    pathname: string;
}

export function Header() {
    // Tipagem explícita para os "matches"
    const matches = useMatches() as MatchHandle[];

    return (
        <HeaderStyle>
            <div className="breadcrumbs-container">
                {matches
                    .filter((match) => match.handle?.breadcrumb) // Filtra rotas com breadcrumb definido
                    .map((match, index) => {
                        // Verifica se a rota atual é a rota de edição
                        const isEditEventRoute = match.pathname.includes("/edit-event/");
                        const breadcrumbLabel = isEditEventRoute
                            ? "Editar Evento" // Mostra "Editar Evento" para rotas com :id
                            : match.handle?.breadcrumb;

                        return (
                            <div key={index} className="breadcrumb-item">
                                <a href={match.pathname}>{breadcrumbLabel}</a>
                                {index < matches.length - 1 && <span className="separator"> &gt; </span>}
                            </div>
                        );
                    })}
            </div>
            <div className="user-container">
                <p>Bem-vindo(a)!</p>
            </div>
        </HeaderStyle>
    );
}

const HeaderStyle = styled.div`

  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #EECAEE;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .logo-container img {
    max-width: 100px;
  }

  .breadcrumbs-container {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;

    .breadcrumb-item {
      display: flex;
      align-items: center;

      a {
        text-decoration: none;
        color: #4A004A;
        font-weight: bold;

        &:hover {
          color: #555;
        }
      }

      .separator {
        margin: 0 5px;
        color: #4A004A;
        font-weight: bold;
      }
    }
  }

  .user-container {
    p {
      font-size: 14px;
      font-weight: bold;
      color: #4A004A;
    }
  }
`;
