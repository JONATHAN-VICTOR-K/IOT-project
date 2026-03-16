// Main Application Initialization

document.addEventListener('DOMContentLoaded', () => {
    // Set Current Date in Header
    const dateEl = document.getElementById('current-date');
    if(dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Request permissions for Device Notifications
    requestNotificationPermission();

    // Initialize Components
    initNavigation();
    initThemeToggle();
    initEnergyStats();
    initPrepaidModule();
    initChatbot();
    
    // Initialize standard dummy Chart
    initUsageChart();
});

function initUsageChart() {
    const ctx = document.getElementById('usageChart');
    if (!ctx || typeof Chart === 'undefined') return;

    // Get theme colors based on body class
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)';
    
    // Gradient fill
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // primary transparent
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [{
                label: 'Energy Consumption (kWh)',
                data: [12, 19, 15, 25, 32, 28, 14],
                borderColor: '#6366f1', // accent color
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6366f1',
                pointBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                tension: 0.4 // smooth curves
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { color: textColor }
                },
                y: {
                    grid: { color: gridColor, drawBorder: false, borderDash: [5, 5] },
                    ticks: { color: textColor }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
        }
    });
}
