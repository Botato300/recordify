<script>
    function startRecording() {
        console.log("comenzando!");
    }

    function stopRecording() {
        console.log("detenido");
    }
</script>

<h1>Recordify</h1>

<button onclick={startRecording}>Grabar</button>
<button onclick={stopRecording}>Detener</button>
