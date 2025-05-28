import { createRouter, createWebHistory } from "vue-router";
import PackingList from "../components/PackingList.vue";
import PackingListPage from "../views/PackingListPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PackingListPage,
  },
  {
    path: "/packing-list/:id",
    name: "PackingList",
    component: PackingList,
    props: true,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Using HTML5 history mode
  routes, // Define routes
});

export default router;
