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

// Reemplazado avatar imgur roto con un avatarSVG / placeholder confiable local
const fallbackAvatar = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23121218'/><circle cx='150' cy='110' r='55' fill='%23ff2a4b'/><path d='M60 260 C60 200, 240 200, 240 260 Z' fill='%23ff2a4b'/></svg>";

const defaultConfig = {
    name: "Keviin",
    role: "SCREENSHARE & COMMUNITY MANAGER",
    bio: "Especialista en seguridad de servidores Minecraft, auditoría de jugadores (Screenshare) y gestión de comunidades masivas.",
    avatarUrl: fallbackAvatar,
    discordTag: "Keviin",
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

let appConfig = loadConfig();
let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    try {
        applyThemeColor(appConfig.themeColor || "#ff2a4b");
        initFunctionalVisitorCounter();
        initParticles();
        initAudioPlayer();
        renderApp();
    } catch (err) {
        console.error("Error al iniciar app:", err);
        appConfig = defaultConfig;
        renderApp();
    }
});

window.addEventListener('storage', (e) => {
    if (e.key === 'keviin_portfolio_cfg') {
        appConfig = loadConfig();
        applyThemeColor(appConfig.themeColor || "#ff2a4b");
        initAudioPlayer();
        renderApp();
    }
});

function applyThemeColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
    document.documentElement.style.setProperty('--accent-glow', color + '66');
}

function initParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        container.appendChild(p);
    }
}

function initAudioPlayer() {
    const audio = document.getElementById('bgMusic');
    const songLabel = document.getElementById('songTitleDisplay');
    if (!audio) return;

    if (appConfig.songUrl) {
        audio.src = appConfig.songUrl;
    }
    if (songLabel) {
        songLabel.innerText = appConfig.songTitle || "Música de fondo";
    }
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const widget = document.getElementById('musicPlayerBtn');
    const tooltip = document.getElementById('musicTooltip');
    if (!audio) return;

    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        widget.classList.remove('playing');
        if (tooltip) tooltip.innerText = 'Click para reproducir';
    } else {
        audio.play().then(() => {
            isPlaying = true;
            widget.classList.add('playing');
            if (tooltip) tooltip.innerText = 'Click para pausar';
        }).catch(err => {
            console.log("Auto-play prevenido por el navegador. Click para interactuar.");
            showToast('Haz click de nuevo para reproducir audio');
        });
    }
}

function initFunctionalVisitorCounter() {
    const counterEl = document.getElementById('visitorCounterNum');
    if (!counterEl) return;

    let localVisits = parseInt(localStorage.getItem('keviin_real_visits') || '1421');
    
    if (!sessionStorage.getItem('keviin_visit_counted')) {
        localVisits += 1;
        localStorage.setItem('keviin_real_visits', localVisits);
        sessionStorage.setItem('keviin_visit_counted', 'true');
    }
    
    counterEl.innerText = localVisits.toLocaleString();
}

function loadConfig() {
    try {
        const saved = localStorage.getItem('keviin_portfolio_cfg');
        if (!saved) return defaultConfig;
        let parsed = JSON.parse(saved);

        if (!parsed.bullets || !Array.isArray(parsed.bullets)) parsed.bullets = defaultBullets;
        if (!parsed.metrics || !Array.isArray(parsed.metrics)) parsed.metrics = defaultMetrics;
        if (!parsed.cards || !Array.isArray(parsed.cards)) parsed.cards = defaultCards;
        if (!parsed.trajectory || !Array.isArray(parsed.trajectory)) parsed.trajectory = defaultTrajectory;

        return parsed;
    } catch (e) {
        return defaultConfig;
    }
}

function renderApp() {
    const logoEl = document.getElementById('logoText');
    if (logoEl) logoEl.innerText = "Keviin";

    const navMenu = document.getElementById('navigationMenu');
    if (!navMenu) return;
    navMenu.innerHTML = '';

    const activeCards = (appConfig.cards || defaultCards).filter(c => c && c.enabled !== false);

    activeCards.forEach((card, index) => {
        const btn = document.createElement('button');
        btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
        btn.innerHTML = `<i class="fas ${card.icon || 'fa-star'}"></i> ${card.title || 'Sección'}`;
        btn.onclick = () => switchTab(card.id, btn);
        navMenu.appendChild(btn);
    });

    const stage = document.getElementById('cardsStage');
    if (!stage) return;
    stage.innerHTML = '';

    activeCards.forEach((card, index) => {
        const cardElem = document.createElement('div');
        cardElem.id = `card-${card.id}`;
        cardElem.className = `card-module ${index === 0 ? 'active' : ''}`;
        cardElem.innerHTML = buildCardHTML(card);
        stage.appendChild(cardElem);
    });
}

function buildCardHTML(card) {
    if (card.type === 'hero') {
        const bulletsList = (appConfig.bullets && appConfig.bullets.length > 0) ? appConfig.bullets : defaultBullets;
        const metricsList = (appConfig.metrics && appConfig.metrics.length > 0) ? appConfig.metrics : defaultMetrics;

        return `
            <div class="hero-layout">
                <div class="hero-text">
                    <div class="badge-role">${appConfig.role || 'SCREENSHARE & COMMUNITY MANAGER'}</div>
                    <h1 class="hero-title">${appConfig.name || 'Keviin'}</h1>
                    <p class="hero-subtitle">${appConfig.bio || ''}</p>
                    
                    <ul class="bullets-list">
                        ${bulletsList.map(b => `<li><i class="fas fa-check-circle"></i> ${b}</li>`).join('')}
                    </ul>

                    <div class="metrics-row">
                        ${metricsList.map(m => `
                            <div class="metric-card">
                                <span class="num">${m.num || ''}</span>
                                <span class="label">${m.label || ''}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div style="display:flex; gap:15px;">
                        <button class="btn btn-primary" onclick="copyDiscord()"><i class="fab fa-discord"></i> DISCORD: ${appConfig.discordTag || 'Keviin'}</button>
                    </div>
                </div>

                <div>
                    <div class="avatar-frame">
                        <div class="avatar-wrapper">
                            <img src="${appConfig.avatarUrl || fallbackAvatar}" alt="Avatar Keviin" onerror="this.src='${fallbackAvatar}'">
                            <div class="avatar-overlay-gradient"></div>
                        </div>
                        <div class="online-status"><span class="pulse"></span> DISPONIBLE PARA STAFF</div>
                    </div>
                </div>
            </div>
        `;
    } else if (card.type === 'trajectory') {
        const trayList = (appConfig.trajectory && appConfig.trajectory.length > 0) ? appConfig.trajectory : defaultTrajectory;
        return `
            <h2 style="font-family:'Outfit', sans-serif; font-size:24px; margin-bottom:6px; color:#fff;"><i class="fas fa-shield-alt" style="color:var(--accent-color);"></i> TRAYECTORIA Y SERVIDORES</h2>
            <p style="color:#8a8a9e; margin-bottom:20px; font-size:14px;">Proyectos principales donde he ejercido liderazgo, SS Management y control de calidad de usuarios.</p>
            
            <div class="trayectoria-grid">
                ${trayList.map(item => `
                    <div class="server-card">
                        <div class="server-icon">
                            <i class="fas ${item.icon || 'fa-server'}"></i>
                        </div>
                        <div class="server-info">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <h3 class="server-name">${item.server || 'Servidor'}</h3>
                                <span class="badge-status ${(item.status || 'ACTUAL').toLowerCase()}">${item.status || 'ACTUAL'}</span>
                            </div>
                            <div class="server-role">${item.role || 'Staff'}</div>
                            <div class="server-achievement">${item.achievement || ''}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (card.type === 'community') {
        const gamesList = (appConfig.chillGames && appConfig.chillGames.length > 0) ? appConfig.chillGames : defaultChillGames;
        return `
            <h2 style="font-family:'Outfit', sans-serif; font-size:24px; margin-bottom:10px; color:#fff;"><i class="fab fa-discord" style="color:var(--accent-color);"></i> MI COMUNIDAD Y VALIDACIÓN</h2>
            <p style="color:#8a8a9e; margin-bottom:20px; font-size:15px;">${appConfig.communityDesc || ''}</p>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; background:rgba(255,255,255,0.02); padding:16px; border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
                <div>
                    <span style="font-family:'Outfit'; font-size:26px; font-weight:800; color:var(--accent-color);">${appConfig.communityMembers || '1,250+'}</span>
                    <span style="color:#7a7a8c; font-size:13px; display:block;">Miembros Activos</span>
                </div>
                <a href="${appConfig.communityLink || 'https://discord.gg/'}" target="_blank" class="btn btn-primary"><i class="fab fa-discord"></i> UNIRSE AL DISCORD</a>
            </div>

            <h3 style="font-size:15px; color:#fff; font-family:'Outfit'; margin-top:15px;">LO QUE DICEN LOS OWNERS</h3>
            <div class="testimonials-grid">
                ${(appConfig.testimonials || []).map(t => `
                    <div class="testimonial-card">
                        <p class="testimonial-quote">"${t.text || ''}"</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">${(t.author || 'O').charAt(0)}</div>
                            <div class="author-info">${t.author || 'Owner'} <span>${t.role || 'Fundador'}</span></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h3 style="margin-top:20px; font-size:15px; color:#fff; font-family:'Outfit';">JUEGOS ACTIVOS EN COMUNIDAD</h3>
            <div class="chill-games-grid">
                ${gamesList.map(g => `
                    <div class="game-badge">
                        <span class="game-title"><i class="fas ${g.icon || 'fa-gamepad'}" style="color:var(--accent-color);"></i> ${g.name || 'Juego'}</span>
                        <span class="game-status"><span class="pulse"></span> ${g.status || 'Activo'}</span>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (card.type === 'contact') {
        return `
            <h2 style="font-family:'Outfit', sans-serif; font-size:24px; margin-bottom:15px; color:#fff;"><i class="fas fa-paper-plane" style="color:var(--accent-color);"></i> CONTACTO DIRECTO</h2>
            <p style="color:#8a8a9e; margin-bottom:25px;">¿Buscas Staff, SSers o Community Manager para tu servidor? Escríbeme por Discord.</p>
            <div class="box-item" style="display:flex; justify-content:space-between; align-items:center; padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(255,255,255,0.06);">
                <div>
                    <span style="font-size:12px; color:#7a7a8c; display:block; letter-spacing:1px; font-weight:700;">DISCORD USER</span>
                    <strong style="font-family:'Outfit'; font-size:22px; color:#fff;">${appConfig.discordTag || 'Keviin'}</strong>
                </div>
                <button class="btn btn-primary" onclick="copyDiscord()"><i class="fas fa-copy"></i> COPIAR</button>
            </div>
        `;
    } else {
        return `
            <h2 style="font-family:'Outfit', sans-serif; font-size:24px; margin-bottom:15px; color:#fff;">${(card.title || 'SECCIÓN').toUpperCase()}</h2>
            <div class="box-item" style="padding:20px; background:rgba(255,255,255,0.02); border-radius:12px; border:1px solid rgba(255,255,255,0.06); line-height:1.6;">
                ${card.content || 'Contenido personalizado de la sección.'}
            </div>
        `;
    }
}

function switchTab(cardId, btnElem) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.card-module').forEach(m => m.classList.remove('active'));

    if (btnElem) btnElem.classList.add('active');
    const target = document.getElementById(`card-${cardId}`);
    if (target) target.classList.add('active');
}

function copyDiscord() {
    navigator.clipboard.writeText(appConfig.discordTag || 'Keviin');
    showToast('¡Usuario de Discord copiado!');
}

function showToast(msg) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
