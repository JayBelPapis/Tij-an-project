import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"
import SeConnecter from "../views/SeConnecter.vue";
import FormInscription from "../views/FormInscription.vue";
import HomeConnected from "../views/HomeConnected.vue";
import EditProfile from "../views/EditProfile.vue";
import Profile from "../views/Profile.vue";
import ProfileInfo from "../views/ProfileInfo.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

  },
  {
    path: "/seconnecter",
    name: "SeConnecter",
    component: SeConnecter,

  },
  {
    path: "/formulaire-inscription",
    name: "formulaire-inscription",
    component: FormInscription,
  },
  {
    path: "/connected",
    name: "HomeConnected",
    component: HomeConnected,
    alias: "/"
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    component: EditProfile,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/profileInfo",
    name: "profileInfo",
    component: ProfileInfo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
