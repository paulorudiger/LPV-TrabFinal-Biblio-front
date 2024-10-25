import axios from "axios";
import { useUsuarioStore } from "src/stores/usuario";

export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const usuarioStore = useUsuarioStore(store).usuarioLogado; // usuariologado
    if (requiresAuth && !usuarioStore) {
      next("/login");
    } else if (to.path === "/login" && !!usuarioStore) {
      next("/");
    } else {
      next();
    }
  });
  axios.interceptors.response.use(null, (error) => {
    //  || error.response.status === 401
    if (error.response.status === 403) {
      router.push("/");
    }
    return Promise.reject(error);
  });
};
