const defaultConfig = {
    name: "Keviin",
    role: "SCREENSHARE & COMMUNITY MANAGER",
    bio: "Especialista en seguridad de servidores Minecraft, auditoría de jugadores (Screenshare) y gestión de comunidades masivas.",
    avatarUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23121218'/><circle cx='150' cy='110' r='55' fill='%23ff2a4b'/><path d='M60 260 C60 200, 240 200, 240 260 Z' fill='%23ff2a4b'/></svg>",
    discordTag: "Keviin",
    themeColor: "#ff2a4b",
    songTitle: "After Dark × Sweater Weather",
    songUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    communityDesc: "Unete a mi comunidad de discord, siempre estoy disponible para hablar o jugar.",
    communityMembers: "1,450+",
    communityLink: "https://discord.gg/",
    trajectory: [
        { server: "Screen Share Alliance", role: "Head Staff / Leader", status: "ACTUAL", icon: "fa-shield-alt", achievement: "Supervisión de un equipo de 15 SSers y auditoría de más de 400 revisiones mensuales." },
        { server: "Holypvp", role: "Staff Team", status: "ACTUAL", icon: "fa-crosshairs", achievement: "Rango Senior Mod. Moderación activa de modalidades competitivas y soporte técnico." },
        { server: "Vitalismc", role: "Staff Team", status: "ACTUAL", icon: "fa-search", achievement: "Rango Senior Mod. Detección de clientes modificados y control de cheaters." },
        { server: "Dynamicpvp", role: "Ss Team", status: "ACTUAL", icon: "fa-cube", achievement: "Rango Beginner. Protocolos de inspección rápida y auditoría de archivos temporales." },
        { server: "SoloLegends", role: "SS Manager", status: "ACTUAL", icon: "fa-gamepad", achievement: "Reducción estimada del 40% de cheaters en modalidades PvP competitivas." },
        { server: "Dinamic MC", role: "SSTeam Specialist", status: "ACTUAL", icon: "fa-search", achievement: "Desarrollo de protocolos de detección rápida de inyecciones y clientes privados." },
        { server: "PlayClub Network", role: "Community Manager", status: "ACTUAL", icon: "fa-users", achievement: "Coordinación de eventos con picos de +500 usuarios en simultáneo." },
        { server: "MineNight", role: "SS Manager", status: "ANTERIOR", icon: "fa-server", achievement: "Implementación de filtros antitrampas y entrenamiento de moderadores." }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadAdminValues();
});

function switchAdminTab(tabName, btn) {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

function updateFileName(input, targetId) {
    if (input.files && input.files[0]) {
        document.getElementById(targetId).innerText = "✔ Seleccionado: " + input.files[0].name;
    }
}

function loadAdminValues() {
    let cfg = defaultConfig;
    const saved = localStorage.getItem('keviin_portfolio_cfg');
    if (saved) {
        try {
            cfg = Object.assign({}, defaultConfig, JSON.parse(saved));
        } catch(e) {
            cfg = defaultConfig;
        }
    }

    document.getElementById('cfgName').value = cfg.name || "Keviin";
    document.getElementById('cfgRole').value = cfg.role || "SCREENSHARE & COMMUNITY MANAGER";
    document.getElementById('cfgBio').value = cfg.bio || "";
    document.getElementById('cfgDiscord').value = cfg.discordTag || "Keviin";
    document.getElementById('cfgSongTitle').value = cfg.songTitle || "After Dark × Sweater Weather";
    document.getElementById('cfgSongUrl').value = cfg.songUrl || "";
    document.getElementById('cfgAvatarUrl').value = cfg.avatarUrl || "";
    document.getElementById('cfgCommunityDesc').value = cfg.communityDesc || "";
    document.getElementById('cfgCommunityMembers').value = cfg.communityMembers || "1,450+";
    document.getElementById('cfgCommunityLink').value = cfg.communityLink || "";
    document.getElementById('cfgTrajectory').value = JSON.stringify(cfg.trajectory || [], null, 2);
}

function saveFullConfig() {
    let saved = localStorage.getItem('keviin_portfolio_cfg');
    let cfg = saved ? JSON.parse(saved) : Object.assign({}, defaultConfig);

    cfg.name = document.getElementById('cfgName').value || "Keviin";
    cfg.role = document.getElementById('cfgRole').value || "SCREENSHARE & COMMUNITY MANAGER";
    cfg.bio = document.getElementById('cfgBio').value || "";
    cfg.discordTag = document.getElementById('cfgDiscord').value || "Keviin";
    cfg.songTitle = document.getElementById('cfgSongTitle').value || "Música de Fondo";
    cfg.songUrl = document.getElementById('cfgSongUrl').value || cfg.songUrl;
    cfg.avatarUrl = document.getElementById('cfgAvatarUrl').value || cfg.avatarUrl;
    cfg.communityDesc = document.getElementById('cfgCommunityDesc').value || "";
    cfg.communityMembers = document.getElementById('cfgCommunityMembers').value || "1,450+";
    cfg.communityLink = document.getElementById('cfgCommunityLink').value || "";

    try {
        const trajText = document.getElementById('cfgTrajectory').value;
        if (trajText.trim()) cfg.trajectory = JSON.parse(trajText);
    } catch(e) {}

    const imgFile = document.getElementById('fileImgInput').files[0];
    const audFile = document.getElementById('fileAudioInput').files[0];

    const finishSave = () => {
        localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(cfg));
        alert('¡Cambios guardados con éxito en la web! Redirigiendo al portafolio...');
        window.location.href = 'index.html';
    };

    if (imgFile && audFile) {
        const rImg = new FileReader();
        rImg.onload = (e1) => {
            cfg.avatarUrl = e1.target.result;
            const rAud = new FileReader();
            rAud.onload = (e2) => {
                cfg.songUrl = e2.target.result;
                finishSave();
            };
            rAud.readAsDataURL(audFile);
        };
        rImg.readAsDataURL(imgFile);
    } else if (imgFile) {
        const rImg = new FileReader();
        rImg.onload = (e) => {
            cfg.avatarUrl = e.target.result;
            finishSave();
        };
        rImg.readAsDataURL(imgFile);
    } else if (audFile) {
        const rAud = new FileReader();
        rAud.onload = (e) => {
            cfg.songUrl = e.target.result;
            finishSave();
        };
        rAud.readAsDataURL(audFile);
    } else {
        finishSave();
    }
}

function resetDefaults() {
    if (confirm("¿Seguro que deseas restaurar todos los valores iniciales?")) {
        localStorage.removeItem('keviin_portfolio_cfg');
        loadAdminValues();
        alert("Valores restaurados.");
    }
}
