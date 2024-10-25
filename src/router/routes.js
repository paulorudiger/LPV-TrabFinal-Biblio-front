import { useUsuarioStore } from "src/stores/usuario";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PaginaInicial.vue"),
        meta: { requiresAuth: true },
      },
      { path: "/login", component: () => import("pages/LoginUsuario.vue") },
      {
        path: "/cadastrousuario",
        component: () => import("pages/CadastroUsuario.vue"),
      },
      { path: "estilos", component: () => import("pages/estilosPage.vue") },
      { path: "clubes", component: () => import("pages/clubesPage.vue") },
      { path: "/meuperfil", component: () => import("pages/MeuPerfil.vue") },
    ],
  },
  // {
  //   // path: '/:catchAll(.*)*',
  //   path: "/teste",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;
