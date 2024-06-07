import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Button } from '../../components/button';
import { Input } from '../../components/input';

import {Container, Form, Avatar} from './style';

import { useAuth } from "../../hooks/auth";
import { useState } from 'react';

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { api } from "../../services/api";

export function Profile () {

  const { user, updateProfile } = useAuth();

  const [ name, setName ] = useState(user.name);
  const [ email, setEmail ] = useState(user.email);
  const [ oldPassword, setOldPassword ] = useState();
  const [ newPassword, setNewPassword ] = useState();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [ avatarPath, setAvatarPath ] = useState(avatarURL);
  const [ avatarFile, setAvatarFile ] = useState(null);

  async function handleUpdateProfile () {

    const user = {
      name,
      email,
      password : newPassword,
      old_password : oldPassword
    }

    await updateProfile({user, avatarFile});

  }

  function handleAvatarChange ( event ) {

    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatarPath(imagePreview);

  }

  return (
    <Container>

      <header>

        <Link to="/">

          <FiArrowLeft/>
          
        </Link>

      </header>

      <Form>

        <Avatar>
          
          <img 
          src={avatarPath} 
          alt="Foto do usuário" 
          />

          <label htmlFor="avatar">
            
            <FiCamera/>

            <input 
            id="avatar"
            type="file"
            onChange={handleAvatarChange} 
            />

          </label>

        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value = {name}
          onChange={event => setName(event.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value = {email}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={event => setOldPassword(event.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={event => setNewPassword(event.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdateProfile}/>

      </Form>

    </Container>
  )
}
