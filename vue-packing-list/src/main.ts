import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router"; // Import the router configuration
import "./assets/tailwind.css";

// Create and mount the app, using the router and pinia
createApp(App).use(createPinia()).use(router).mount("#app");
