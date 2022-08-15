import Vue from "vue";
import VueRouter from "vue-router";

// pages
import Home from "@/pages/Home";
import Example from "@/pages/Example";
import notFound from "@/pages/404";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/example",
        name: "example",
        component: Example,
    },
    {
        path: "*",
        name: "404",
        component: notFound,
    },
];

const router = new VueRouter({
    routes,
    mode: "history", // что бы убрать решетку в ссылке
});

export default router;