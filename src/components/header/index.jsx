import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./style";

import { useAuth } from "../../hooks/auth";

export function Header () {

  const { signOut } = useAuth();

  return (
    <Container>
      <Profile to="/profile">

        <img 
          src="http://github.com/diogobrasil.png" 
          alt="Foto do Usuário" 
        />

        <div>
          <span>Bem-Vindo</span>
          <strong>Diogo Brasil</strong>
        </div>
      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}
