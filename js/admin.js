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

    if (titleInput && titleInput.value.trim() !== '') {
        localStorage.setItem('bg_music_title', titleInput.value.trim());
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('bg_music_url', e.target.result);
            alert('¡Configuración guardada e información del audio local actualizada!');
            window.location.reload();
        };
        reader.readAsDataURL(file);
    } else if (urlInput && urlInput.value.trim() !== '') {
        localStorage.setItem('bg_music_url', urlInput.value.trim());
        alert('¡Configuración guardada correctamente!');
        window.location.reload();
    } else {
        alert('¡Configuración de título guardada correctamente!');
        window.location.reload();
    }
}
