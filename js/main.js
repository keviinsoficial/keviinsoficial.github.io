document.addEventListener('DOMContentLoaded', () => {
    const savedSong = localStorage.getItem('bg_music_url');
    const savedTitle = localStorage.getItem('bg_music_title');

    const songTitleEl = document.getElementById('current-song-title');
    const musicPill = document.getElementById('music-pill-toggle');

    if (savedTitle && songTitleEl) {
        songTitleEl.textContent = savedTitle;
    }

    let audio = null;
    let isPlaying = false;

    if (savedSong) {
        audio = new Audio(savedSong);
        audio.loop = true;
    }

    if (musicPill) {
        musicPill.addEventListener('click', () => {
            if (!audio) {
                alert('No hay música guardada. Ve al panel portal.html e ingresa la URL o archivo de audio.');
                return;
            }

            if (!isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    musicPill.classList.add('playing');
                }).catch(err => {
                    console.error('Error al reproducir audio:', err);
                    alert('No se pudo reproducir la música. Asegúrate de ingresar un enlace directo .mp3 válido.');
                });
            } else {
                audio.pause();
                isPlaying = false;
                musicPill.classList.remove('playing');
            }
        });
    }
});
