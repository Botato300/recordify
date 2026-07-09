import { mount } from "svelte";

import "./normalize.css";
import "./global.css";

import App from "./App.svelte";

const appRoot = document.getElementById("app");

if (!appRoot)
    throw new Error("Could not find an element with the ID 'app'.");

const app = mount(App, { target: appRoot });

export default app;
