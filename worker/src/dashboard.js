
// worker/src/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        const toggleSwitch = document.querySelector('.toggle-switch');
        if (toggleSwitch) {
            toggleSwitch.classList.toggle('active', theme === 'dark');
        }
    }

    // Motivational quotes
    const motivationalQuotes = [
        { text: "The most dangerous phrase in the language is, 'We've always done it this way.'", author: "Grace Hopper" },
        { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
        { text: "The best way to learn is by doing.", author: "Richard Branson" },
    ];

    function updateMotivationalQuote() {
        const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
        document.getElementById('motivational-quote').textContent = `"${quote.text}"`;
        document.querySelector('.quote-author').textContent = `— ${quote.author}`;
    }

    // Toast notifications
    function showToast(message, duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), duration);
    }

    // --- NEW SIMPLIFIED DASHBOARD LOGIC ---
    const STORAGE_KEY = 'rust-learning-progress';
    let phases = []; // This will hold our combined data
    let currentFilter = 'all';

    function initializeDashboard() {
        // 1. Get the plan data injected by the server
        const serverData = window.PLAN_DATA || [];

        // 2. Get saved progress from localStorage
        const savedProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

        // 3. Merge the server data with the saved progress
        phases = serverData.map((serverPhase, phaseIndex) => {
            const savedPhase = savedProgress.phases?.find(p => p.title === serverPhase.title);
            return {
                ...serverPhase,
                id: `phase-${phaseIndex}`,
                collapsed: savedPhase?.collapsed || false,
                tasks: serverPhase.tasks.map((serverTask, taskIndex) => {
                    const savedTask = savedPhase?.tasks.find(t => t.text === serverTask.text);
                    return {
                        ...serverTask,
                        id: `task-${phaseIndex}-${taskIndex}`,
                        completed: savedTask?.completed || serverTask.completed,
                        completedDate: savedTask?.completedDate || null,
                    };
                }),
            };
        });

        renderDashboard();
        setupEventListeners();
        updateMotivationalQuote();
        showDashboard();
        showToast('Dashboard loaded successfully! 🚀');
    }

    function saveProgress() {
        // Only save the data that changes: completion status, dates, and collapsed state
        const progressToSave = {
            phases: phases.map(p => ({
                title: p.title,
                collapsed: p.collapsed,
                tasks: p.tasks.map(t => ({
                    text: t.text,
                    completed: t.completed,
                    completedDate: t.completedDate,
                })),
            })),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToSave));
    }

    function renderDashboard() {
        const phasesContainer = document.getElementById('phases-container');
        phasesContainer.innerHTML = ''; // Clear any existing content

        let totalTasks = 0;
        let completedTasks = 0;

        phases.forEach((phase, phaseIndex) => {
            if (phase.tasks.length === 0) return;

            const phaseCompletedTasks = phase.tasks.filter(t => t.completed).length;
            const phaseProgress = (phaseCompletedTasks / phase.tasks.length) * 100;
            totalTasks += phase.tasks.length;
            completedTasks += phaseCompletedTasks;

            const phaseDiv = document.createElement('div');
            phaseDiv.className = `card phase-card ${phase.collapsed ? 'collapsed' : ''}`;
            phaseDiv.innerHTML = `
                <div class="card-header">
                    <div class="phase-header">
                        <h2 class="phase-title"><span class="phase-icon">📋</span><span>${phase.title}</span></h2>
                        <div class="phase-info">
                            <div class="phase-progress">
                                <span>${phaseCompletedTasks}/${phase.tasks.length}</span>
                                <div class="phase-progress-bar"><div class="phase-progress-fill" style="width: ${phaseProgress}%"></div></div>
                            </div>
                            <button class="collapse-btn">${phase.collapsed ? '▶️' : '▼️'}</button>
                        </div>
                    </div>
                </div>
                <div class="card-content"><div class="tasks-list"></div></div>
            `;

            const tasksList = phaseDiv.querySelector('.tasks-list');
            phase.tasks.forEach((task, taskIndex) => {
                if ((currentFilter === 'completed' && !task.completed) || (currentFilter === 'pending' && task.completed)) return;

                const taskItem = document.createElement('div');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.innerHTML = `
                    <div class="task-checkbox">${task.completed ? '✅' : '⭕'}</div>
                    <div class="task-text">${task.text}</div>
                    <div class="task-date">${task.completed && task.completedDate ? new Date(task.completedDate).toLocaleDateString() : ''}</div>
                `;
                taskItem.onclick = () => toggleTask(phaseIndex, taskIndex);
                tasksList.appendChild(taskItem);
            });

            phasesContainer.appendChild(phaseDiv);
            phaseDiv.querySelector('.collapse-btn').onclick = () => togglePhase(phaseIndex);
        });

        updateOverallProgress(totalTasks, completedTasks);
        updateStats(totalTasks, completedTasks, phases.length);
    }

    function togglePhase(phaseIndex) {
        phases[phaseIndex].collapsed = !phases[phaseIndex].collapsed;
        saveProgress();
        renderDashboard();
    }

    function toggleTask(phaseIndex, taskIndex) {
        const task = phases[phaseIndex].tasks[taskIndex];
        task.completed = !task.completed;
        task.completedDate = task.completed ? new Date().toISOString() : null;
        showToast(task.completed ? 'Great job! Task completed! 🎉' : 'Task marked as pending');
        saveProgress();
        renderDashboard();
    }

    function updateOverallProgress(total, completed) {
        const percentage = total > 0 ? (completed / total) * 100 : 0;
        document.getElementById('progress-bar').style.width = `${percentage}%`;
        document.getElementById('progress-percentage').textContent = `${Math.round(percentage)}%`;
        document.getElementById('progress-text').textContent = `Overall Progress: ${completed} / ${total} tasks completed`;
    }

    function updateStats(total, completed, phaseCount) {
        document.getElementById('stat-completed').textContent = completed;
        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-remaining').textContent = total - completed;
        document.getElementById('stat-phases').textContent = phaseCount;
    }

    function setupEventListeners() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                if (filter === 'expand-all' || filter === 'collapse-all') {
                    phases.forEach(phase => phase.collapsed = (filter === 'collapse-all'));
                } else {
                    currentFilter = filter;
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                }
                saveProgress();
                renderDashboard();
            });
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                localStorage.removeItem(STORAGE_KEY);
                initializeDashboard(); // Re-initialize to reset state
                showToast('Progress reset successfully!');
            }
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            const dataStr = JSON.stringify(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'), null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `rust-learning-progress-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
            showToast('Progress exported successfully! 📊');
        });
    }

    function showDashboard() {
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('error-state').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    }

    // Start the application
    initializeDashboard();
});
