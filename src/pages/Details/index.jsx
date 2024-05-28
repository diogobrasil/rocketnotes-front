import { Container, Links, Content} from "./style"

import { Header } from "../../components/header"
import { Button } from "../../components/button"
import { ButtonText } from "../../components/buttonText"
import { Section } from "../../components/section"
import { Tag } from "../../components/tag"

export function Details () {

  return (
    <Container>
      <Header/>
      <main>
        <Content>

          <ButtonText title="Excluir a nota"/>

          <h1>
            Introdução ao React
          </h1>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit quo a doloremque autem ratione nemo itaque obcaecati quae quaerat corrupti magnam ut, consequatur et exercitationem ipsa veritatis laborum quod ab. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti nulla officiis commodi repellat aperiam eos maiores nemo magnam dolor facilis repudiandae, ipsa voluptas? Eveniet architecto possimus atque, praesentium fugiat ab?
          </p>

          <Section title="Links Úteis">
            <Links>
              <li>
                <a href="#">https://www.rocketseat.com</a>
              </li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="express"/>
            <Tag title="nodejs"/>
          </Section>
          
          <Button title="Voltar" />
        </Content>
      </main>
    </Container>
  )
}
