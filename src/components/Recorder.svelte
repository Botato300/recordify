<script>
    let recording = $state(false);
    let recordedTime = $state(0);

    let stream = $state(null);

    let intervalId = null;
    let mediaRecorder = null;
    let chunks = [];

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

            intervalId = setInterval(() => {
                if (recordedTime >= 10) {
                    stopRecording();
                    return;
                }

                recordedTime += 1;
            }, 1000);
        } catch (error) {
            console.error("Error on startRecording:", error);
            stopRecording();
        }
    }

    function stopRecording() {
        recording = false;
        recordedTime = 0;

        stream.getTracks().forEach((track) => track.stop());
        mediaRecorder.stop();

        clearInterval(intervalId);
    }

    function handleRecording() {
        if (!checkCompatibility()) {
            alert("Browser not compatible with screen recording.");
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
            if ("mediaDevices" in navigator && navigator.mediaDevices.getDisplayMedia) return true;

            return false;
        } catch (error) {
            console.error("Error checking compatibility:", error);
            return false;
        }
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
        <video srcobject={stream} width="800" height="500" autoplay></video>
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
