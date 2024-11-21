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
          res(response.data);
        })
        .catch((err) => {
          console.log(err);
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

  static async getDadosUsuario(id) {
    return new Promise((res, rej) => {
      api
        .get(`/tbUsuario/${id}`) // Busca o usuário pelo ID
        .then((response) => {
          res(response.data); // Retorna os dados completos do usuário
        })
        .catch((err) => {
          console.error(`Erro ao buscar dados do usuário com ID ${id}:`, err);
          rej(err.response || { message: "Erro no servidor" });
        });
    });
  }

  static async excluirUsuario(id) {
    return new Promise((res, rej) => {
      api
        .delete(`/tbUsuario/${id}`) // Envia a requisição DELETE
        .then((response) => {
          console.log("Usuário excluído com sucesso:", response.data);
          res(response.data);
        })
        .catch((err) => {
          console.error(`Erro ao excluir o usuário com ID ${id}:`, err);
          rej(err.response || { message: "Erro ao excluir o usuário" });
        });
    });
  }
}
