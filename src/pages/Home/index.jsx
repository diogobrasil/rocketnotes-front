import { FiPlus, FiSearch } from 'react-icons/fi';

import { Container, Brand, Menu, Search, Content, NewNote} from './style';

import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Input } from '../../components/input';
import { Note } from '../../components/note';
import { ButtonText } from '../../components/buttonText';

export function Home () {
  return (
    <Container>
      <Brand>
        <h1>
          Rocketnotes
        </h1>
      </Brand>

      <Header/>

      <Menu>

        <li>
          <ButtonText title="Todos" />
        </li>

        <li>
          <ButtonText title="React"/>
        </li>

        <li>
          <ButtonText title="NodeJS"/>
        </li>

      </Menu>

      <Search>
        <Input placeholder="Pesquisar pelo título" icon={FiSearch}/>
      </Search>

      <Content>
        <Section title="Minhas Notas">

          <Note data={
            {
              title : 'React',
              tags : [
                {id : '1', name : 'react'},
                {id : '2', name : 'rocketseat'}
              ]
            }
          }/>

        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar Nota
      </NewNote>

    </Container>
  )
}
