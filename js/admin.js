document.addEventListener('DOMContentLoaded', () => {
    loadAdminValues();
});

function showTab(tabName, btn) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

function updateFileName(input, targetId) {
    if (input.files && input.files[0]) {
        document.getElementById(targetId).innerText = "Seleccionado: " + input.files[0].name;
    }
}

function loadAdminValues() {
    const saved = localStorage.getItem('keviin_portfolio_cfg');
    if (!saved) return;
    try {
        const cfg = JSON.parse(saved);
        if (cfg.name) document.getElementById('cfgName').value = cfg.name;
        if (cfg.role) document.getElementById('cfgRole').value = cfg.role;
        if (cfg.bio) document.getElementById('cfgBio').value = cfg.bio;
        if (cfg.discordTag) document.getElementById('cfgDiscord').value = cfg.discordTag;
        if (cfg.songTitle) document.getElementById('cfgSongTitle').value = cfg.songTitle;
        if (cfg.songUrl) document.getElementById('cfgSongUrl').value = cfg.songUrl;
        if (cfg.avatarUrl) document.getElementById('cfgAvatarUrl').value = cfg.avatarUrl;
        if (cfg.communityDesc) document.getElementById('cfgCommunityDesc').value = cfg.communityDesc;
        if (cfg.communityMembers) document.getElementById('cfgCommunityMembers').value = cfg.communityMembers;
        if (cfg.communityLink) document.getElementById('cfgCommunityLink').value = cfg.communityLink;
        if (cfg.trajectory) document.getElementById('cfgTrajectory').value = JSON.stringify(cfg.trajectory, null, 2);
    } catch(e) {
        console.error("Error al cargar configuración en admin:", e);
    }
}

function saveFullConfig() {
    let saved = localStorage.getItem('keviin_portfolio_cfg');
    let cfg = saved ? JSON.parse(saved) : {};

    cfg.name = document.getElementById('cfgName').value;
    cfg.role = document.getElementById('cfgRole').value;
    cfg.bio = document.getElementById('cfgBio').value;
    cfg.discordTag = document.getElementById('cfgDiscord').value;
    cfg.songTitle = document.getElementById('cfgSongTitle').value;
    cfg.songUrl = document.getElementById('cfgSongUrl').value;
    cfg.avatarUrl = document.getElementById('cfgAvatarUrl').value;
    cfg.communityDesc = document.getElementById('cfgCommunityDesc').value;
    cfg.communityMembers = document.getElementById('cfgCommunityMembers').value;
    cfg.communityLink = document.getElementById('cfgCommunityLink').value;

    try {
        const trajText = document.getElementById('cfgTrajectory').value;
        if (trajText.trim()) cfg.trajectory = JSON.parse(trajText);
    } catch(e) {}

    const imgFile = document.getElementById('fileImgInput').files[0];
    const audFile = document.getElementById('fileAudioInput').files[0];

    const finalize = () => {
        localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(cfg));
        alert('¡Cambios guardados con éxito en la web!');
        window.location.href = 'index.html';
    };

    if (imgFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            cfg.avatarUrl = e.target.result;
            if (audFile) {
                const readerAud = new FileReader();
                readerAud.onload = (ev) => {
                    cfg.songUrl = ev.target.result;
                    finalize();
                };
                readerAud.readAsDataURL(audFile);
            } else { finalize(); }
        };
        reader.readAsDataURL(imgFile);
    } else if (audFile) {
        const readerAud = new FileReader();
        readerAud.onload = (ev) => {
            cfg.songUrl = ev.target.result;
            finalize();
        };
        readerAud.readAsDataURL(audFile);
    } else {
        finalize();
    }
}
