const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // se der tempo validar para mudar o indexprincipal
      // ver metodo de beforeenter dentro do json path:
      // validar com pinia
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "estilos", component: () => import("pages/estilosPage.vue") },
      { path: "clubes", component: () => import("pages/clubesPage.vue") },
    ],
  },
  // {
  //   // path: '/:catchAll(.*)*',
  //   path: "/teste",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
  {
    path: "/estilos",
    component: () => import("pages/estilosPage.vue"),
  },
  {
    path: "/clubes",
    component: () => import("pages/clubesPage.vue"),
  },
  {
    path: "/meuperfil",
    component: () => import("pages/MeuPerfil.vue"),
  },
];

export default routes;
