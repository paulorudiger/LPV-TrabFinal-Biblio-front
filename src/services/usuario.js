import { api } from "../boot/axios";

export default class Usuario {
  static async login(credentials) {
    return new Promise((res, rej) => {
      api
        .get("/tbUsuario", {
          params: { usuario: credentials.usuario, senha: credentials.senha }, // Busca por usuário e senha
        })
        .then((response) => {
          if (response.data.length === 0) {
            rej({ message: "Usuário ou senha inválidos" }); // Nenhum usuário encontrado
          } else {
            res(response.data[0]); // Retorna o primeiro usuário encontrado
          }
        })
        .catch((err) => {
          console.error("Erro ao fazer login:", err);
          rej(err.response || { message: "Erro no servidor" });
        });
    });
  }

  static async getUsuario(data) {
    return new Promise((res, rej) => {
      api
        .get("/table1", data)
        .then((response) => {
          console.log(response.data);
          res(response.data);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }

  static async getUsuarioFoto(id) {
    return new Promise((res, rej) => {
      api
        .get(`/tbUsuario/${id}`) // Busca o usuário pelo ID
        .then((response) => {
          console.log("Foto do Usuário:", response.data.avatarCaminho);
          res(response.data.avatarCaminho); // Retorna o caminho do avatar
        })
        .catch((err) => {
          console.error(`Erro ao buscar foto do usuário com ID ${id}:`, err);
          rej(err.response);
        });
    });
  }
  static async postCadastroUsuario(data) {
    return new Promise((res, rej) => {
      api
        .post("/tbUsuario", data)
        .then((response) => {
          console.log(response.data);
          res(response.data);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
  static async getAllIds() {
    return new Promise((res, rej) => {
      api
        .get("/tbUsuario")
        .then((response) => {
          // Extrai apenas os IDs de cada usuário
          const ids = response.data.map((usuario) => usuario.idusuario);
          console.log("IDs:", ids);
          res(ids);
        })
        .catch((err) => {
          console.log(err);
          rej(err.response);
        });
    });
  }
}
