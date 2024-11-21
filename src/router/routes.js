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
      { path: "/cadlivro", component: () => import("pages/CadastroLivro.vue") },
      {
        path: "/manterreserva",
        component: () => import("pages/ManterReserva.vue"),
      },
      {
        path: "/detalhes-livro/:id",
        component: () => import("pages/DetalhesLivro.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("pages/DashboardBiblio.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/resultados",
        component: () => import("pages/ResultadosPesquisa.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  // {
  //   // path: '/:catchAll(.*)*',
  //   path: "/teste",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;
