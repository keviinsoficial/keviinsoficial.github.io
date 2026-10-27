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
                alert('No hay música configurada. Ve al panel portal.html para guardar una canción.');
                return;
            }

            if (!isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    musicPill.classList.add('playing');
                }).catch(err => {
                    console.error('Error de reproducción:', err);
                    alert('Error al reproducir el archivo de audio. Verifica el formato o el enlace.');
                });
            } else {
                audio.pause();
                isPlaying = false;
                musicPill.classList.remove('playing');
            }
        });
    }
});
