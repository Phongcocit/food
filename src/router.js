import { createRouter, createWebHistory } from "vue-router";
import ViewFood from "./components/food/ViewFood.vue";
import ViewCart from "./components/cart/ViewCart.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/",  redirect: '/foods' },
    {path:'/foods',component: ViewFood },
    { path: "/cart", name: "cart", component: ViewCart },
    {
      path: "/:id",
      name: "food-id",
      component: () => import("./components/food/ShowDetail.vue"),
      props: true
    },
    {path:"/addfood", component:()=>import("./components/food/AddFood.vue")}
    
  ],
});
export default router;
