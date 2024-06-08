import { FiPlus, FiSearch } from 'react-icons/fi';

import { Container, Brand, Menu, Search, Content, NewNote } from './style';

import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { Input } from '../../components/input';
import { Note } from '../../components/note';
import { ButtonText } from '../../components/buttonText';

import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export function Home() {

  const [ notes, setNotes ] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [ search, setSearch ] = useState("");



  function handleTagsSelected(tagName) {
    /* Função que altera a cor dos buttons que servirão como filtros para as tags.
    * Se a tag já estiver selecionada, ela será removida.
    * Se não estiver, ela será adicionada.
    */
    if ( tagName === "all") {
      return setTagsSelected( [] );
    }
  
    if (tagsSelected.includes(tagName)) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    }
    else {
      setTagsSelected(prevState => [...prevState, tagName]);
    }

  }
  //useEffect que altera o nome dos filtros.
  useEffect(() => {
    //Função assíncrona que busca as tags no banco de dados.
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();

  }, []);
  //useEffect que busca as notas de acordo com o filtro selecionado e/ou com o titulo pesquisado.
  useEffect (() => {

    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();

  }, [search, tagsSelected]);

  return (
    <Container>
      <Brand>
        <h1>
          Rocketnotes
        </h1>
      </Brand>

      <Header />

      <Menu>

        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleTagsSelected("all")}
            isActive={tagsSelected.length === 0}
          />
        </li>

        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagsSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }

      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={event => setSearch(event.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {
            notes.map( note => (
                <Note 
                  key={String(note.id)}
                  data={note}
                />
              )
            )
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>

    </Container>
  )
}
