import { Link } from 'react-router-dom';

import { Textarea } from '../../components/textarea';
import { NoteItem } from '../../components/noteitem';
import { Section } from '../../components/section';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { Container, Form } from './style';

export function New () {
  return (
    <Container>
      
      <Header/>

      <main>

        <Form>

          <header>

            <h1>Criar Nota</h1>

            <Link to="/">Voltar</Link>

          </header>

          <Input placeholder="Título" />
           
          <Textarea placeholder="Observações"/>

          <Section title="Links úteis">

            <NoteItem value="https://github.com/diogobrasil" />

            <NoteItem isNew placeholder="Novo link" />

          </Section>
          
          <Section title="Marcadores">

            <div className='tags'>

            <NoteItem value="react" />

            <NoteItem isNew placeholder="Nova tag" />

            </div>

          </Section>

          <Button title="Salvar"/>

        </Form>

      </main>

    </Container>
  )
}
