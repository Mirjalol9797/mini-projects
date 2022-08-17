import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/Users";
import NotFound from "../views/404";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
    },
    {
        path: "*",
        name: "404",
        component: NotFound,
    },
];

const router = new VueRouter({
    routes,
});

export default router;