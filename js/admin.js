document.addEventListener('DOMContentLoaded', () => {
    loadAdminData();
});

function loadAdminData() {
    const musicUrl = localStorage.getItem('bg_music_url') || '';
    const musicTitle = localStorage.getItem('bg_music_title') || '';

    const urlInput = document.getElementById('music-url-input');
    const titleInput = document.getElementById('music-title-input');

    if (urlInput && musicUrl && !musicUrl.startsWith('data:')) {
        urlInput.value = musicUrl;
    }
    if (titleInput && musicTitle) {
        titleInput.value = musicTitle;
    }
}

function updateFileName(input) {
    const display = document.getElementById('file-name-display');
    if (input.files && input.files[0]) {
        display.textContent = 'Archivo: ' + input.files[0].name;
    } else {
        display.textContent = 'Ningún archivo seleccionado';
    }
}

function saveAdminConfig() {
    const titleInput = document.getElementById('music-title-input');
    const urlInput = document.getElementById('music-url-input');
    const fileInput = document.getElementById('local-audio-file');

    let updated = false;

    if (titleInput && titleInput.value.trim() !== '') {
        localStorage.setItem('bg_music_title', titleInput.value.trim());
        updated = true;
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                localStorage.setItem('bg_music_url', e.target.result);
                alert('¡Música local guardada con éxito en el navegador!');
                window.location.reload();
            } catch (err) {
                alert('El archivo MP3 es demasiado grande para guardar localmente en el navegador. Por favor usa un enlace directo .mp3 en la casilla derecha.');
            }
        };
        reader.readAsDataURL(file);
        return;
    } else if (urlInput && urlInput.value.trim() !== '') {
        localStorage.setItem('bg_music_url', urlInput.value.trim());
        updated = true;
    }

    if (updated) {
        alert('¡Configuración guardada correctamente!');
        window.location.reload();
    } else {
        alert('Por favor ingresa un título o enlace de música antes de guardar.');
    }
}
