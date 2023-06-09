import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "element-plus/dist/index.css";
import '@fortawesome/fontawesome-free/css/all.css';
import "./assets/scss/app.scss";

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
