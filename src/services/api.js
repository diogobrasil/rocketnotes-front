import axios from "axios";//Permite que o frontend consuma o backend.

export const api = axios.create(
  {
    baseURL: "http://localhost:3333"
  }
);
