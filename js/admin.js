let defaultUsers = [
    { username: "keviin@admin.com", password: "mypassword123", name: "Keviin (Propietario)" }
];

let adminUsers = JSON.parse(localStorage.getItem('keviin_admin_users')) || defaultUsers;

const defaultBullets = [
    "Especialista en Screenshare avanzado y revisión de memorias RAM / logs.",
    "Gestión estratégica de comunidades gamer y moderación de servidores HCF/Practice."
];

const defaultMetrics = [
    { num: "3+ Años", label: "Experiencia" },
    { num: "12+ Servidores", label: "Gestionados" },
    { num: "1.5K+", label: "Revisiones" }
];

const defaultTrajectory = [
    { server: "Screen Share Alliance", role: "Head Staff / Leader", status: "ACTUAL", icon: "fa-shield-alt", achievement: "Supervisión de un equipo de 15 SSers y auditoría de más de 400 revisiones mensuales." },
    { server: "Holypvp", role: "Staff Team", status: "ACTUAL", icon: "fa-crosshairs", achievement: "Rango Senior Mod. Moderación activa de modalidades competitivas y soporte técnico." },
    { server: "Vitalismc", role: "Staff Team", status: "ACTUAL", icon: "fa-search", achievement: "Rango Senior Mod. Detección de clientes modificados y control de cheaters." },
    { server: "Dynamicpvp", role: "Ss Team", status: "ACTUAL", icon: "fa-cube", achievement: "Rango Beginner. Protocolos de inspección rápida y auditoría de archivos temporales." },
    { server: "SoloLegends", role: "SS Manager", status: "ACTUAL", icon: "fa-gamepad", achievement: "Reducción estimada del 40% de cheaters en modalidades PvP competitivas." },
    { server: "Dinamic MC", role: "SSTeam Specialist", status: "ACTUAL", icon: "fa-search", achievement: "Desarrollo de protocolos de detección rápida de inyecciones y clientes privados." },
    { server: "PlayClub Network", role: "Community Manager", status: "ACTUAL", icon: "fa-users", achievement: "Coordinación de eventos con picos de +500 usuarios en simultáneo." },
    { server: "MineNight", role: "SS Manager", status: "ANTERIOR", icon: "fa-server", achievement: "Implementación de filtros antitrampas y entrenamiento de moderadores." }
];

const defaultCards = [
    { id: "inicio", title: "INICIO", icon: "fa-home", enabled: true, type: "hero" },
    { id: "trayectoria", title: "TRAYECTORIA", icon: "fa-history", enabled: true, type: "trajectory" },
    { id: "comunidad", title: "COMUNIDAD", icon: "fa-users", enabled: true, type: "community" },
    { id: "contacto", title: "CONTACTO", icon: "fa-paper-plane", enabled: true, type: "contact" }
];

const defaultChillGames = [
    { name: "Minecraft", icon: "fa-cube", status: "Activo" },
    { name: "Roblox", icon: "fa-gamepad", status: "Activo" },
    { name: "Valorant", icon: "fa-crosshairs", status: "Activo" },
    { name: "GTA V / RP", icon: "fa-car", status: "Noches" }
];

const defaultTestimonials = [
    { author: "Owner SoloLegends", role: "Fundador de Servidor", text: "Keviin elevó el estándar de revisión en nuestro servidor. Cero falsos baneos y total profesionalismo." },
    { author: "Manager PlayClub", role: "Administrador General", text: "Excelente organización en la comunidad y resolución rápida de reportes de cheaters." }
];

let savedCfg = localStorage.getItem('keviin_portfolio_cfg');
let appConfig = savedCfg ? JSON.parse(savedCfg) : {
    name: "Keviin",
    role: "SCREENSHARE & COMMUNITY MANAGER",
    bio: "Especialista en seguridad de servidores Minecraft, auditoría de jugadores (Screenshare) y gestión de comunidades masivas.",
    avatarUrl: "https://i.imgur.com/8Qe8Z3o.jpeg",
    discordTag: "Keviin",
    stealthLabel: "v2.6.0",
    themeColor: "#ff2a4b",
    songTitle: "After Dark × Sweater Weather",
    songUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    bullets: defaultBullets,
    metrics: defaultMetrics,
    communityDesc: "Unete a mi comunidad de discord, siempre estoy disponible para hablar o jugar.",
    communityMembers: "1,450+",
    communityLink: "https://discord.gg/",
    chillGames: defaultChillGames,
    testimonials: defaultTestimonials,
    trajectory: defaultTrajectory,
    cards: defaultCards
};

let currentLoggedUser = null;

function verifyLogin() {
    const userIn = document.getElementById('loginUser').value.trim();
    const passIn = document.getElementById('loginPass').value.trim();

    const matched = adminUsers.find(u => (u.username === userIn || u.username.split('@')[0] === userIn) && u.password === passIn);

    if (matched) {
        currentLoggedUser = matched;
        document.getElementById('authBlock').style.display = 'none';
        document.getElementById('panelBlock').style.display = 'block';
        document.getElementById('loggedUserBadge').innerHTML = `<i class="fas fa-user-shield"></i> Sesión: ${matched.name}`;
        loadFormData();
    } else {
        alert('Credenciales incorrectas. Verifica tu usuario y contraseña.');
    }
}

function logout() {
    currentLoggedUser = null;
    document.getElementById('authBlock').style.display = 'block';
    document.getElementById('panelBlock').style.display = 'none';
    document.getElementById('loginPass').value = '';
}

function switchTab(secId, btnElement) {
    document.querySelectorAll('.atab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));

    if (btnElement) {
        btnElement.classList.add('active');
    }
    const targetSection = document.getElementById(`sec-${secId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadFormData() {
    document.getElementById('cfgName').value = appConfig.name || "";
    document.getElementById('cfgRole').value = appConfig.role || "";
    document.getElementById('cfgStealthLabel').value = appConfig.stealthLabel || "v2.6.0";
    document.getElementById('cfgBio').value = appConfig.bio || "";

    document.getElementById('cfgSongTitle').value = appConfig.songTitle || "";
    document.getElementById('cfgSongUrl').value = appConfig.songUrl || "";
    document.getElementById('cfgThemeColor').value = appConfig.themeColor || "#ff2a4b";

    document.getElementById('cfgCommDesc').value = appConfig.communityDesc || "";
    document.getElementById('cfgCommMembers').value = appConfig.communityMembers || "";
    document.getElementById('cfgCommLink').value = appConfig.communityLink || "";

    renderBulletsManager();
    renderMetricsManager();
    renderUsersManager();
    renderCardsManager();
    renderTrajectoryManager();
    renderChillGamesManager();
    renderTestimonialsManager();
}

function renderBulletsManager() {
    const list = document.getElementById('bulletsManagerList');
    if (!list) return;
    list.innerHTML = (appConfig.bullets || []).map((b, idx) => `
        <div class="card-editor-row" style="display:flex; gap:10px; align-items:center;">
            <i class="fas fa-check-circle" style="color:#ff2a4b;"></i>
            <input type="text" class="form-input" value="${b}" placeholder="Texto de la viñeta" oninput="appConfig.bullets[${idx}] = this.value">
            <button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeBulletRow(${idx})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function addBulletRow() {
    if (!appConfig.bullets) appConfig.bullets = [];
    appConfig.bullets.push("Nueva viñeta o característica relevante.");
    renderBulletsManager();
}

function removeBulletRow(idx) {
    appConfig.bullets.splice(idx, 1);
    renderBulletsManager();
}

function renderMetricsManager() {
    const list = document.getElementById('metricsManagerList');
    if (!list) return;
    list.innerHTML = (appConfig.metrics || []).map((m, idx) => `
        <div class="card-editor-row" style="display:flex; gap:10px; align-items:center;">
            <input type="text" class="form-input" style="flex:1;" value="${m.num || ''}" placeholder="Cifra (Ej: 3+ Años)" oninput="appConfig.metrics[${idx}].num = this.value">
            <input type="text" class="form-input" style="flex:2;" value="${m.label || ''}" placeholder="Etiqueta (Ej: Experiencia)" oninput="appConfig.metrics[${idx}].label = this.value">
            <button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeMetricRow(${idx})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function addMetricRow() {
    if (!appConfig.metrics) appConfig.metrics = [];
    appConfig.metrics.push({ num: "100+", label: "Nueva Métrica" });
    renderMetricsManager();
}

function removeMetricRow(idx) {
    appConfig.metrics.splice(idx, 1);
    renderMetricsManager();
}

function renderChillGamesManager() {
    const list = document.getElementById('chillGamesManagerList');
    if (!list) return;
    list.innerHTML = (appConfig.chillGames || []).map((g, idx) => `
        <div class="card-editor-row" style="display:flex; gap:10px; align-items:center;">
            <input type="text" class="form-input" style="flex:2;" value="${g.name || ''}" placeholder="Nombre del juego" oninput="appConfig.chillGames[${idx}].name = this.value">
            <input type="text" class="form-input" style="flex:1;" value="${g.icon || 'fa-gamepad'}" placeholder="fa-cube" oninput="appConfig.chillGames[${idx}].icon = this.value">
            <input type="text" class="form-input" style="flex:1;" value="${g.status || 'Activo'}" placeholder="Estado (Ej: Noches)" oninput="appConfig.chillGames[${idx}].status = this.value">
            <button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeChillGameRow(${idx})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function addChillGameRow() {
    if (!appConfig.chillGames) appConfig.chillGames = [];
    appConfig.chillGames.push({ name: "Nuevo Juego", icon: "fa-gamepad", status: "Activo" });
    renderChillGamesManager();
}

function removeChillGameRow(idx) {
    appConfig.chillGames.splice(idx, 1);
    renderChillGamesManager();
}

function renderTrajectoryManager() {
    const list = document.getElementById('trajectoryManagerList');
    if (!list) return;
    list.innerHTML = (appConfig.trajectory || []).map((item, idx) => `
        <div class="card-editor-row" style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; gap:10px;">
                <input type="text" class="form-input" style="flex:2;" value="${item.server || ''}" placeholder="Servidor" oninput="appConfig.trajectory[${idx}].server = this.value">
                <input type="text" class="form-input" style="flex:2;" value="${item.role || ''}" placeholder="Rango" oninput="appConfig.trajectory[${idx}].role = this.value">
                <input type="text" class="form-input" style="flex:1;" value="${item.icon || 'fa-server'}" placeholder="fa-shield-alt" oninput="appConfig.trajectory[${idx}].icon = this.value">
                <select class="form-input" style="flex:1;" onchange="appConfig.trajectory[${idx}].status = this.value">
                    <option value="ACTUAL" ${item.status === 'ACTUAL' ? 'selected' : ''}>ACTUAL</option>
                    <option value="ANTERIOR" ${item.status === 'ANTERIOR' ? 'selected' : ''}>ANTERIOR</option>
                </select>
                <button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeTrajectoryRow(${idx})"><i class="fas fa-trash"></i></button>
            </div>
            <input type="text" class="form-input" value="${item.achievement || ''}" placeholder="Logro alcanzado" oninput="appConfig.trajectory[${idx}].achievement = this.value">
        </div>
    `).join('');
}

function addTrajectoryRow() {
    if(!appConfig.trajectory) appConfig.trajectory = [];
    appConfig.trajectory.push({ server: "Nuevo Servidor", role: "Staff", status: "ACTUAL", icon: "fa-server", achievement: "Logro destacable." });
    renderTrajectoryManager();
}

function removeTrajectoryRow(idx) {
    appConfig.trajectory.splice(idx, 1);
    renderTrajectoryManager();
}

function renderTestimonialsManager() {
    const list = document.getElementById('testimonialsManagerList');
    if (!list) return;
    if(!appConfig.testimonials) appConfig.testimonials = [];
    list.innerHTML = appConfig.testimonials.map((t, idx) => `
        <div class="card-editor-row" style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; gap:10px;">
                <input type="text" class="form-input" value="${t.author || ''}" placeholder="Autor" oninput="appConfig.testimonials[${idx}].author = this.value">
                <input type="text" class="form-input" value="${t.role || ''}" placeholder="Rol" oninput="appConfig.testimonials[${idx}].role = this.value">
                <button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeTestimonialRow(${idx})"><i class="fas fa-trash"></i></button>
            </div>
            <input type="text" class="form-input" value="${t.text || ''}" placeholder="Testimonio" oninput="appConfig.testimonials[${idx}].text = this.value">
        </div>
    `).join('');
}

function addTestimonialRow() {
    if(!appConfig.testimonials) appConfig.testimonials = [];
    appConfig.testimonials.push({ author: "Owner", role: "Fundador", text: "Excelente trabajo." });
    renderTestimonialsManager();
}

function removeTestimonialRow(idx) {
    appConfig.testimonials.splice(idx, 1);
    renderTestimonialsManager();
}

function renderUsersManager() {
    const list = document.getElementById('usersManagerList');
    if (!list) return;
    list.innerHTML = adminUsers.map((u, idx) => `
        <div class="card-editor-row" style="display:flex; gap:10px; align-items:center;">
            <input type="text" class="form-input" value="${u.name || ''}" placeholder="Nombre" oninput="adminUsers[${idx}].name = this.value">
            <input type="text" class="form-input" value="${u.username || ''}" placeholder="Usuario" oninput="adminUsers[${idx}].username = this.value">
            <input type="password" class="form-input" value="${u.password || ''}" placeholder="Contraseña" oninput="adminUsers[${idx}].password = this.value">
            ${adminUsers.length > 1 ? `<button class="btn btn-secondary" style="color:#ff2a4b;" onclick="removeAdminUser(${idx})"><i class="fas fa-trash"></i></button>` : ''}
        </div>
    `).join('');
}

function addNewAdminUser() {
    adminUsers.push({
        username: `admin${adminUsers.length + 1}@mail.com`,
        password: "password123",
        name: `Admin ${adminUsers.length + 1}`
    });
    renderUsersManager();
}

function removeAdminUser(idx) {
    adminUsers.splice(idx, 1);
    renderUsersManager();
}

function renderCardsManager() {
    const list = document.getElementById('cardsManagerList');
    if (!list) return;
    list.innerHTML = (appConfig.cards || defaultCards).map((card, idx) => `
        <div class="card-editor-row" style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; gap:12px; align-items:center;">
                <input type="checkbox" ${card.enabled !== false ? 'checked' : ''} onchange="appConfig.cards[${idx}].enabled = this.checked">
                <input type="text" class="form-input" style="width:160px;" value="${card.title || ''}" oninput="appConfig.cards[${idx}].title = this.value">
                <input type="text" class="form-input" style="width:140px;" value="${card.icon || ''}" oninput="appConfig.cards[${idx}].icon = this.value" placeholder="fa-home">
                <span style="color:#a0a0ab; font-size:12px;">(${card.type})</span>
                <button class="btn btn-secondary" style="margin-left:auto; color:#ff2a4b;" onclick="removeCard(${idx})"><i class="fas fa-trash"></i></button>
            </div>
            ${card.type === 'custom' ? `<textarea class="form-input" rows="2" placeholder="Contenido HTML o texto" oninput="appConfig.cards[${idx}].content = this.value">${card.content || ''}</textarea>` : ''}
        </div>
    `).join('');
}

function addNewCustomCard() {
    const newId = 'card_' + Date.now();
    if(!appConfig.cards) appConfig.cards = defaultCards;
    appConfig.cards.push({
        id: newId,
        title: "NUEVA SECCIÓN",
        icon: "fa-star",
        enabled: true,
        type: "custom",
        content: "Contenido de tu nueva sección."
    });
    renderCardsManager();
}

function removeCard(idx) {
    appConfig.cards.splice(idx, 1);
    renderCardsManager();
}

function saveAllSettings() {
    try {
        appConfig.name = document.getElementById('cfgName').value;
        appConfig.role = document.getElementById('cfgRole').value;
        appConfig.stealthLabel = document.getElementById('cfgStealthLabel').value;
        appConfig.bio = document.getElementById('cfgBio').value;

        appConfig.songTitle = document.getElementById('cfgSongTitle').value;
        appConfig.songUrl = document.getElementById('cfgSongUrl').value;
        appConfig.themeColor = document.getElementById('cfgThemeColor').value;

        appConfig.communityDesc = document.getElementById('cfgCommDesc').value;
        appConfig.communityMembers = document.getElementById('cfgCommMembers').value;
        appConfig.communityLink = document.getElementById('cfgCommLink').value;

        localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(appConfig));
        localStorage.setItem('keviin_admin_users', JSON.stringify(adminUsers));

        alert('¡Configuración guardada correctamente con éxito!');
    } catch (e) {
        alert('Error al guardar la configuración.');
    }
}

function exportJSON() {
    const exportData = { config: appConfig, users: adminUsers };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "keviin_backup.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
}

function importJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            try {
                const imported = JSON.parse(readerEvent.target.result);
                if(imported.config) appConfig = imported.config;
                if(imported.users) adminUsers = imported.users;
                
                localStorage.setItem('keviin_portfolio_cfg', JSON.stringify(appConfig));
                localStorage.setItem('keviin_admin_users', JSON.stringify(adminUsers));
                loadFormData();
                alert('¡Respaldo importado con éxito!');
            } catch (err) {
                alert('Archivo JSON no válido.');
            }
        }
    }
    input.click();
}
