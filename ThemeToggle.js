// Theme Toggle Component Logic

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const iconLight = document.getElementById('theme-icon-light');
    const iconDark = document.getElementById('theme-icon-dark');
    
    // Check initial state from LocalStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    // Apply initial theme
    applyTheme(isDark);

    // Event Listener for click
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isDark = !isDark;
            applyTheme(isDark);
            
            // Save preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Re-render chart if it exists to update grid colors
            if (typeof Chart !== 'undefined') {
                const chartInstance = Chart.getChart('usageChart');
                if(chartInstance) {
                    const textColor = isDark ? '#94a3b8' : '#64748b';
                    const gridColor = isDark ? 'rgba(51, 65, 85, 0.5)' : 'rgba(226, 232, 240, 0.8)';
                    
                    chartInstance.options.scales.x.ticks.color = textColor;
                    chartInstance.options.scales.y.ticks.color = textColor;
                    chartInstance.options.scales.y.grid.color = gridColor;
                    chartInstance.update();
                }
            }
        });
    }
    
    function applyTheme(dark) {
        if(dark) {
            document.documentElement.classList.add('dark');
            if(iconLight) iconLight.style.display = 'block';
            if(iconDark) iconDark.style.display = 'none';
        } else {
            document.documentElement.classList.remove('dark');
            if(iconLight) iconLight.style.display = 'none';
            if(iconDark) iconDark.style.display = 'block';
        }
    }
}
