import { Link, useNavigate } from 'react-router-dom';

import { Textarea } from '../../components/textarea';
import { NoteItem } from '../../components/noteitem';
import { Section } from '../../components/section';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { Container, Form } from './style';

import { useState } from "react";
import { api } from '../../services/api';

export function New () {

  const navigate = useNavigate();

  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");

  const [ links, setLinks ] = useState([]);
  const [ newLink, setNewLink ] = useState("");

  const [ tags, setTags ] = useState([]);
  const [ newTag, setNewTag ] = useState("");

  function handleAddLink () {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink (deletedLink) {
    setLinks(prevState => prevState.filter(link => link!== deletedLink));
  }

  function handleAddTag () {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag (deletedTag) {
    setTags(prevState => prevState.filter(tag => tag!== deletedTag));
  }

  async function handleNewNote () {

    if (!title) {
      return alert("Por favor, digite o título da nota.");
    }

    if (newLink) {
      return alert("Há um link esperando ser adicionado. Click em adicionar ou deixe o campo vazio.");
    }

    if (newTag) { 
      return alert("Há uma tag esperando ser adicionada. Click em adicionar ou deixe o campo vazio.");
    }

    await api.post("/notes", {
      title,
      description,
      links,
      tags
    });

    alert("Nota criada com sucesso!");
    navigate("/");

  }

  return (
    <Container>
      
      <Header/>

      <main>

        <Form>

          <header>

            <h1>Criar Nota</h1>

            <Link to="/">Voltar</Link>

          </header>

          <Input 
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
           
          <Textarea 
            placeholder="Observações"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <Section title="Links úteis">

            {
              links.map((link, index) => (
                <NoteItem 
                  key={index}
                  value={link}
                  onClick={ () => handleRemoveLink(link)}
                />
              ))
            }

            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={event => setNewLink(event.target.value)}
              onClick={handleAddLink}
            />

          </Section>
          
          <Section title="Marcadores">

            <div className='tags'>

            {
              tags.map((tag, index) => (
                <NoteItem 
                  key={index}
                  value={tag}
                  onClick={ () => handleRemoveTag(tag)}
                />
              ))
            }

            <NoteItem 
              isNew 
              placeholder="Nova tag"
              value={newTag}
              onChange={event => setNewTag(event.target.value)}
              onClick={handleAddTag}
            />

            </div>

          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />

        </Form>

      </main>

    </Container>
  )
}
