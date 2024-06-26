import { Container, Links, Content } from "./style"

import { Header } from "../../components/header"
import { Button } from "../../components/button"
import { ButtonText } from "../../components/buttonText"
import { Section } from "../../components/section"
import { Tag } from "../../components/tag"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { api } from "../../services/api"

export function Details() {

  const [data, setData] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  function handleBack () {
    navigate(-1);
  }

  async function handleRemove () {

    const confirm = window.confirm("Você realmente deseja excluir essa nota?")
    //Função que vai verificar se o usuário realmente deseja excluir a nota.
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    //Função que carrega as informações da nota.
    async function loadData() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    loadData();
  }, []);

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>

            <ButtonText 
              title="Excluir a nota" 
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            {
              data.links &&
              <Section title="Links Úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={link.url} target="_blank">
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map( tag => (
                    <Tag
                      key={String(tag.id)} 
                      title={tag.name} 
                    />
                  ))
                }
              </Section>
            }

            <Button 
              title="Voltar"
              onClick={handleBack}
            />
          </Content>
        </main>
      }
    </Container>
  )
}
