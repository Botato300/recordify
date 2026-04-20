<script>
    let recording = $state(false);
    let recordedTime = $state(0);

    let intervalId = null;

    function startRecording() {
        console.log("starting!");

        recording = true;

        intervalId = setInterval(() => {
            if (recordedTime >= 10) {
                stopRecording();
                return;
            }

            recordedTime += 1;
        }, 1000);
    }

    function stopRecording() {
        console.log("stopping!");

        recording = false;
        recordedTime = 0;
        clearInterval(intervalId);
    }

    function handleRecording() {
        recording ? stopRecording() : startRecording();
    }
</script>

<div class="container">
    <button class="btnPlay" onclick={handleRecording}>
        {recording ? "Detener" : "Grabar"}
    </button>

    {#if recording}
        <p>Grabando... {recordedTime}s</p>
    {/if}
</div>

<style>
    .container {
        text-align: center;
        font-size: 1.5rem;
    }

    .btnPlay {
        background-color: var(--primary-color);
        color: #ffffff;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 10px;
        font-size: 2rem;
        display: block;
        margin: 0 auto;
        margin-top: 50px;
    }
</style>
