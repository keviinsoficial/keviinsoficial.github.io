function saveAdminConfig() {
    let saved = localStorage.getItem('keviin_portfolio_cfg');
    let cfg = saved ? JSON.parse(saved) : {};

    cfg.name = document.getElementById('cfgName').value;
    cfg.role = document.getElementById('cfgRole').value;
    cfg.songTitle = document.getElementById('cfgSongTitle').value;
    cfg.discordTag = document.getElementById('cfgDiscord').value;

    const fileImg = document.getElementById('fileAvatar').files[0];
    const fileAud = document.getElementById('fileAudio').files[0];

    const processSave = () => {
        localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(cfg));
        alert('¡Configuración y archivos guardados exitosamente!');
        window.location.href = 'index.html';
    };

    if (fileImg) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cfg.avatarUrl = e.target.result;
            if (fileAud) {
                const readerAud = new FileReader();
                readerAud.onload = function(ev) {
                    cfg.songUrl = ev.target.result;
                    processSave();
                };
                readerAud.readAsDataURL(fileAud);
            } else {
                processSave();
            }
        };
        reader.readAsDataURL(fileImg);
    } else if (fileAud) {
        const readerAud = new FileReader();
        readerAud.onload = function(ev) {
            cfg.songUrl = ev.target.result;
            processSave();
        };
        readerAud.readAsDataURL(fileAud);
    } else {
        processSave();
    }
}
