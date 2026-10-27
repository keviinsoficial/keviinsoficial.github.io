const defaultConfig = {
    name: "Keviin",
    role: "SCREENSHARE & COMMUNITY MANAGER",
    bio: "Especialista en seguridad de servidores Minecraft, auditoría de jugadores (Screenshare) y gestión de comunidades masivas.",
    avatarUrl: "",
    discordTag: "Keviin",
    songTitle: "After Dark × Sweater Weather",
    songUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    communityDesc: "Unete a mi comunidad de discord, siempre estoy disponible para hablar o jugar.",
    communityMembers: "1,450+",
    communityLink: "https://discord.gg/",
    bullets: [
        "Especialista en Screenshare avanzado y revisión de memorias RAM / logs.",
        "Gestión estratégica de comunidades gamer y moderación de servidores HCF/Practice."
    ],
    metrics: [
        { num: "3+ Años", label: "Experiencia" },
        { num: "12+ Servidores", label: "Gestionados" },
        { num: "1.5K+", label: "Revisiones" }
    ],
    trajectory: [
        { server: "Screen Share Alliance", role: "Head Staff / Leader", status: "ACTUAL", icon: "fa-shield-alt", achievement: "Supervisión de un equipo de 15 SSers y auditoría de más de 400 revisiones mensuales." },
        { server: "Holypvp", role: "Staff Team", status: "ACTUAL", icon: "fa-crosshairs", achievement: "Rango Senior Mod. Moderación activa de modalidades competitivas y soporte técnico." },
        { server: "Vitalismc", role: "Staff Team", status: "ACTUAL", icon: "fa-search", achievement: "Rango Senior Mod. Detección de clientes modificados y control de cheaters." },
        { server: "Dynamicpvp", role: "Ss Team", status: "ACTUAL", icon: "fa-cube", achievement: "Rango Beginner. Protocolos de inspección rápida y auditoría de archivos temporales." },
        { server: "SoloLegends", role: "SS Manager", status: "ACTUAL", icon: "fa-gamepad", achievement: "Reducción estimada del 40% de cheaters en modalidades PvP competitivas." }
    ],
    testimonials: [
        { author: "Owner SoloLegends", role: "Fundador de Servidor", text: "Keviin elevó el estándar de revisión en nuestro servidor. Cero falsos baneos y total profesionalismo." },
        { author: "Manager PlayClub", role: "Administrador General", text: "Excelente organización en la comunidad y resolución rápida de reportes de cheaters." }
    ],
    chillGames: [
        { name: "Minecraft", icon: "fa-cube", status: "Activo" },
        { name: "Roblox", icon: "fa-gamepad", status: "Activo" },
        { name: "Valorant", icon: "fa-crosshairs", status: "Activo" },
        { name: "GTA V / RP", icon: "fa-car", status: "Noches" }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadAllAdminData();
});

function openTab(tabName, btn) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');
    btn.classList.add('active');
}

function showFileName(input, targetId) {
    if (input.files && input.files[0]) {
        document.getElementById(targetId).innerText = "✔ " + input.files[0].name;
    }
}

function loadAllAdminData() {
    let cfg = defaultConfig;
    const saved = localStorage.getItem('keviin_portfolio_cfg');
    if (saved) {
        try { cfg = Object.assign({}, defaultConfig, JSON.parse(saved)); } catch(e){}
    }

    document.getElementById('cfgName').value = cfg.name || "Keviin";
    document.getElementById('cfgRole').value = cfg.role || "";
    document.getElementById('cfgDiscord').value = cfg.discordTag || "Keviin";
    document.getElementById('cfgBio').value = cfg.bio || "";
    document.getElementById('cfgAvatarUrl').value = cfg.avatarUrl || "";

    document.getElementById('cfgSongTitle').value = cfg.songTitle || "";
    document.getElementById('cfgSongUrl').value = cfg.songUrl || "";

    document.getElementById('cfgCommDesc').value = cfg.communityDesc || "";
    document.getElementById('cfgCommMembers').value = cfg.communityMembers || "1,450+";
    document.getElementById('cfgCommLink').value = cfg.communityLink || "";

    renderBullets(cfg.bullets || []);
    renderMetrics(cfg.metrics || []);
    renderTrajectory(cfg.trajectory || []);
    renderTestimonials(cfg.testimonials || []);
    renderGames(cfg.chillGames || []);
}

/* RENDERIZADORES DE CAMPOS DINÁMICOS */
function renderBullets(list) {
    const box = document.getElementById('bulletsContainer');
    box.innerHTML = '';
    list.forEach((val) => addBulletField(val));
}

function addBulletField(val = '') {
    const box = document.getElementById('bulletsContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
        <i class="fas fa-check-circle" style="color:#ff2a4b;"></i>
        <input type="text" class="bullet-val" value="${val}" placeholder="Punto clave...">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
    `;
    box.appendChild(div);
}

function renderMetrics(list) {
    const box = document.getElementById('metricsContainer');
    box.innerHTML = '';
    list.forEach((m) => addMetricField(m.num, m.label));
}

function addMetricField(num = '', label = '') {
    const box = document.getElementById('metricsContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
        <input type="text" class="metric-num" value="${num}" placeholder="Número (Ej: 3+ Años)">
        <input type="text" class="metric-label" value="${label}" placeholder="Etiqueta (Ej: Experiencia)">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
    `;
    box.appendChild(div);
}

function renderTrajectory(list) {
    const box = document.getElementById('trajectoryContainer');
    box.innerHTML = '';
    list.forEach((s) => addServerField(s.server, s.role, s.status, s.achievement));
}

function addServerField(server = '', role = '', status = 'ACTUAL', achievement = '') {
    const box = document.getElementById('trajectoryContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'stretch';
    div.innerHTML = `
        <div style="display:flex; gap:10px;">
            <input type="text" class="srv-name" value="${server}" placeholder="Nombre del Servidor">
            <input type="text" class="srv-role" value="${role}" placeholder="Rango / Rol">
            <input type="text" class="srv-status" value="${status}" placeholder="ACTUAL o ANTERIOR" style="width:120px;">
            <button type="button" class="btn-remove" onclick="this.parentElement.parentElement.remove()"><i class="fas fa-trash"></i></button>
        </div>
        <input type="text" class="srv-achieve" value="${achievement}" placeholder="Descripción o logro en este servidor..." style="margin-top:6px;">
    `;
    box.appendChild(div);
}

function renderTestimonials(list) {
    const box = document.getElementById('testimonialsContainer');
    box.innerHTML = '';
    list.forEach((t) => addTestimonialField(t.author, t.role, t.text));
}

function addTestimonialField(author = '', role = '', text = '') {
    const box = document.getElementById('testimonialsContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'stretch';
    div.innerHTML = `
        <div style="display:flex; gap:10px;">
            <input type="text" class="tst-author" value="${author}" placeholder="Nombre del Owner/Manager">
            <input type="text" class="tst-role" value="${role}" placeholder="Cargo / Cargo">
            <button type="button" class="btn-remove" onclick="this.parentElement.parentElement.remove()"><i class="fas fa-trash"></i></button>
        </div>
        <input type="text" class="tst-text" value="${text}" placeholder="Cita o testimonio..." style="margin-top:6px;">
    `;
    box.appendChild(div);
}

function renderGames(list) {
    const box = document.getElementById('gamesContainer');
    box.innerHTML = '';
    list.forEach((g) => addGameField(g.name, g.status));
}

function addGameField(name = '', status = 'Activo') {
    const box = document.getElementById('gamesContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-item';
    div.innerHTML = `
        <input type="text" class="gm-name" value="${name}" placeholder="Nombre del Juego">
        <input type="text" class="gm-status" value="${status}" placeholder="Estado (Ej: Activo, Noches)">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
    `;
    box.appendChild(div);
}

/* GUARDADO MASTER INTEGRADO CON PROCESAMIENTO BASE64 DE ARCHIVOS LOCALES */
function saveEverything() {
    let saved = localStorage.getItem('keviin_portfolio_cfg');
    let cfg = saved ? JSON.parse(saved) : Object.assign({}, defaultConfig);

    cfg.name = document.getElementById('cfgName').value;
    cfg.role = document.getElementById('cfgRole').value;
    cfg.discordTag = document.getElementById('cfgDiscord').value;
    cfg.bio = document.getElementById('cfgBio').value;
    cfg.avatarUrl = document.getElementById('cfgAvatarUrl').value;

    cfg.songTitle = document.getElementById('cfgSongTitle').value;
    cfg.songUrl = document.getElementById('cfgSongUrl').value;

    cfg.communityDesc = document.getElementById('cfgCommDesc').value;
    cfg.communityMembers = document.getElementById('cfgCommMembers').value;
    cfg.communityLink = document.getElementById('cfgCommLink').value;

    // Recolectar Viñetas
    cfg.bullets = Array.from(document.querySelectorAll('.bullet-val')).map(i => i.value).filter(v => v.trim() !== '');

    // Recolectar Métricas
    const mNums = document.querySelectorAll('.metric-num');
    const mLabels = document.querySelectorAll('.metric-label');
    cfg.metrics = [];
    mNums.forEach((n, idx) => {
        if (n.value.trim()) cfg.metrics.push({ num: n.value, label: mLabels[idx].value });
    });

    // Recolectar Servidores
    const sNames = document.querySelectorAll('.srv-name');
    const sRoles = document.querySelectorAll('.srv-role');
    const sStatuses = document.querySelectorAll('.srv-status');
    const sAchieves = document.querySelectorAll('.srv-achieve');
    cfg.trajectory = [];
    sNames.forEach((sn, idx) => {
        if (sn.value.trim()) cfg.trajectory.push({
            server: sn.value,
            role: sRoles[idx].value,
            status: sStatuses[idx].value || 'ACTUAL',
            icon: 'fa-shield-alt',
            achievement: sAchieves[idx].value
        });
    });

    // Recolectar Testimonios
    const tAuthors = document.querySelectorAll('.tst-author');
    const tRoles = document.querySelectorAll('.tst-role');
    const tTexts = document.querySelectorAll('.tst-text');
    cfg.testimonials = [];
    tAuthors.forEach((ta, idx) => {
        if (ta.value.trim()) cfg.testimonials.push({
            author: ta.value,
            role: tRoles[idx].value,
            text: tTexts[idx].value
        });
    });

    // Recolectar Juegos
    const gNames = document.querySelectorAll('.gm-name');
    const gStatuses = document.querySelectorAll('.gm-status');
    cfg.chillGames = [];
    gNames.forEach((gn, idx) => {
        if (gn.value.trim()) cfg.chillGames.push({
            name: gn.value,
            icon: 'fa-gamepad',
            status: gStatuses[idx].value || 'Activo'
        });
    });

    const fileAvatar = document.getElementById('fileAvatarInput').files[0];
    const fileAudio = document.getElementById('fileAudioInput').files[0];

    const finish = () => {
        localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(cfg));
        alert('¡TODOS LOS CAMBIOS SE GUARDARON CORRECTAMENTE! Redirigiendo a la web...');
        window.location.href = 'index.html';
    };

    if (fileAvatar && fileAudio) {
        const r1 = new FileReader();
        r1.onload = (e1) => {
            cfg.avatarUrl = e1.target.result;
            const r2 = new FileReader();
            r2.onload = (e2) => {
                cfg.songUrl = e2.target.result;
                finish();
            };
            r2.readAsDataURL(fileAudio);
        };
        r1.readAsDataURL(fileAvatar);
    } else if (fileAvatar) {
        const r1 = new FileReader();
        r1.onload = (e1) => {
            cfg.avatarUrl = e1.target.result;
            finish();
        };
        r1.readAsDataURL(fileAvatar);
    } else if (fileAudio) {
        const r2 = new FileReader();
        r2.onload = (e2) => {
            cfg.songUrl = e2.target.result;
            finish();
        };
        r2.readAsDataURL(fileAudio);
    } else {
        finish();
    }
}
