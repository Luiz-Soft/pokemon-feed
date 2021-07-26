export default [
  {
    path: "*",
    name: "notfound",
    component: () => import("../views/NotFound"),
    meta: {
      title: "Página não encontrada",
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home/Home"),
    meta: {
      title: "Feed de pokemons",
    },
  },
  {
    path: "/details",
    name: "details",
    component: () => import("../views/Details/Details"),
    props: (route) => ({
      id: route.params.uuid,
    }),
    meta: {
      title: "Detalhes",
    },
  },
];
