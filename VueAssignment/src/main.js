import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  //   { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

createApp(App).use(router).mount("#app");
