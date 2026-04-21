<script lang="ts">
    import Recorder from "@/components/Recorder.svelte";
    import Footer from "@/components/Footer.svelte";
</script>

<nav>
    <a href="/" class="logo">
        <img src="/images/logo-128.webp" width="64" height="64" alt="Logo de Recordify" />
        Recordify
    </a>
</nav>

<main class="main_container">
    <h1 class="title">Graba tu pantalla fácilmente</h1>
    <Recorder />
</main>

<Footer />

<style>
    nav {
        padding: 10px;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 2rem;
        text-decoration: none;
        font-weight: bold;
        color: inherit;
        width: max-content;
    }

    .title {
        font-size: 2.5rem;
        text-align: center;
    }
</style>
