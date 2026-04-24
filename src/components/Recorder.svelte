<script lang="ts">
    let recording = $state(false);
    let recordedTime = $state(0);

    let stream: MediaStream | null = $state(null);

    let intervalId = 0;
    let mediaRecorder: MediaRecorder | null = null;
    let chunks: Blob[] = [];

    const displayMediaOptions = {
        video: {
            displaySurface: "monitor",
            frameRate: 30,
        },
    };

    async function startRecording() {
        try {
            stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            stream.getVideoTracks()[0].onended = stopRecording;

            mediaRecorder = new window.MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) chunks.push(event.data);
            };

            mediaRecorder.onstop = downloadRecording;
            mediaRecorder.start();

            recording = true;

            intervalId = setInterval(() => (recordedTime += 1), 1000);
        } catch (error) {
            console.error("Error on startRecording:", error);
            if (error instanceof DOMException && error.name === "NotSupportedError") {
                showUnsupportedBrowserMessage();
            }

            stopRecording();
        }
    }

    function stopRecording() {
        recording = false;
        recordedTime = 0;
        chunks = [];

        if (stream) stream.getTracks().forEach((track) => track.stop());

        if (mediaRecorder) mediaRecorder.stop();

        clearInterval(intervalId);
    }

    function handleRecording() {
        if (!checkCompatibility()) {
            showUnsupportedBrowserMessage();
            return;
        }

        recording ? stopRecording() : startRecording();
    }

    function downloadRecording() {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);

        const videoLink = document.createElement("a");
        videoLink.href = url;
        videoLink.download = `recordify-${Date.now()}.webm`;
        videoLink.click();

        URL.revokeObjectURL(url);
    }

    function checkCompatibility() {
        try {
            if ("mediaDevices" in navigator && typeof navigator.mediaDevices.getDisplayMedia === "function") return true;

            return false;
        } catch (error) {
            console.error("Error checking compatibility:", error);
            return false;
        }
    }

    function showUnsupportedBrowserMessage() {
        alert("Your browser does not support screen recording.");
    }
</script>

<div class="container">
    <button class="btnPlay" onclick={handleRecording}>
        {recording ? "Detener" : "Grabar"}
    </button>

    {#if recording}
        <p>Grabando... {recordedTime}s</p>
    {/if}

    <!-- prevent the video from flickering by placing it in another conditional block -->
    {#if recording}
        <video srcobject={stream ?? undefined} width="800" height="500" autoplay></video>
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
