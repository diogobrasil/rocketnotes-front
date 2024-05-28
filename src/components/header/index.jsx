import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./style";

export function Header () {
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

      <Logout>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}
