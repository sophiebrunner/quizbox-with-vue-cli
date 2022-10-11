import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./router";
import "./styles/styles.css";

createApp(App).use(store).use(router).mount("#app");
