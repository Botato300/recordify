<script>
    import Recorder from "@/components/Recorder.svelte";

    const currentYear = new Date().getFullYear();
</script>

<nav>
    <a href="/" class="logo">
        <img src="/assets/images/logo-128.webp" width="64" height="64" alt="Logo de Recordify" />
        Recordify
    </a>
</nav>

<main class="main_container">
    <h1 class="title">Graba tu pantalla fácilmente</h1>
    <Recorder />
</main>

<footer>
    Hecho por <a href="https://tomasbottari.com/" target="_blank">Tomás Bottari</a> - {currentYear}
</footer>

<style>
    nav {
        padding: 10px;
    }

    footer {
        text-align: center;
        padding: 20px;
        color: #666666;
        font-style: italic;
    }

    footer a {
        color: var(--secondary-color);
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
