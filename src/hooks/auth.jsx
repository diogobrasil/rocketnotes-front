import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider ( { children}) {

  const [ data, setData] = useState( {} );

  async function signIn ( { email, password}) {

    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes : token", token);
      localStorage.setItem("@rocketnotes : user", JSON.stringify(user));
      //O localstorage salva as informações de autenticação no navegador do usuário.

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token });
    }
    catch ( error ) {

      if ( error.response ) {
        alert ( error.response.data.message );
      }
      else {
        alert ("Não foi possível autenticar o usuário");
      }
    }

  }

  function signOut () {
    localStorage.removeItem("@rocketnotes : token");
    localStorage.removeItem("@rocketnotes : user");
    setData({});
  }

  async function updateProfile ( { user, avatarFile }) {

    try {

      if (avatarFile) {

        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
        
      }
      
      await api.put("/users", user);

      localStorage.setItem("@rocketnotes : user", JSON.stringify(user));
      setData({ user, token : data.token });
      alert("Perfil atualizado!");
    }
    catch ( error ) {

      if ( error.response ) {
        alert ( error.response.data.message );
      }
      else {
        alert ("Não foi possível atualizar o perfil");
      }
    }
  }

  useEffect ( () => {

    const token = localStorage.getItem("@rocketnotes : token");
    const user = JSON.parse(localStorage.getItem("@rocketnotes : user"));

    if ( token && user ) {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({ user, token });
    }
  }, []);//Esse useEffect disapra sempre que a página é recarregada buscando os valores no localstorage e armazenando dentro do state data.

  return (
    <AuthContext.Provider value={
      { signIn, 
        signOut,
        updateProfile, 
        user : data.user 
      }}>
        
      {children}
    </AuthContext.Provider>
  )
}


function useAuth () {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }
