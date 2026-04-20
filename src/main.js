import { mount } from "svelte";

import "./normalize.css";
import "./global.css";

import App from "./App.svelte";

const appRoot = document.getElementById("app");

if (!appRoot)
    throw new Error("No se pudo encontrar un elemento con el id 'app'.");

const app = mount(App, { target: appRoot });

export default app;
