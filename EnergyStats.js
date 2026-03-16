// Notifications Utility

function initEnergyStats() {
    const voltageVal = document.getElementById('voltage-val');
    const currentVal = document.getElementById('current-val');
    const usagePercent = document.getElementById('usage-percent');
    const usageBar = document.getElementById('usage-bar');
    const thresholdWarning = document.getElementById('threshold-warning');
    
    // Config: Maximum allowed current for the simulation (e.g. 30A)
    const MAX_CURRENT = 30;
    const THRESHOLD_PERCENT = 75;
    
    // Config: Free units logic for Tamil Nadu
    const FREE_UNITS_LIMIT = 100;
    const UNITS_ALERT_THRESHOLD = 75; // 75% of 100 units
    
    // State to avoid spamming notification
    let hasAlertedThisSpike = false;
    let monthlyUnits = 74.80; // Starting close to 75 to show the alert quickly
    let hasSentUnitsAlert = false;

    // Simulate real-time data updates every 2 seconds
    setInterval(() => {
        if(!voltageVal || !currentVal) return;
        
        // Simulate Monthly Units Consumption Increment
        const monthlyUnitsVal = document.getElementById('monthly-units-val');
        if (monthlyUnitsVal) {
            monthlyUnits += (Math.random() * 0.08); // slowly increment
            monthlyUnitsVal.textContent = monthlyUnits.toFixed(2);
            
            // Check for 75% threshold
            if (monthlyUnits >= UNITS_ALERT_THRESHOLD && !hasSentUnitsAlert) {
                hasSentUnitsAlert = true;
                if (typeof sendSMSAlert === 'function') {
                    sendSMSAlert("+91 9876543210", `Alert: You have consumed ${monthlyUnits.toFixed(1)} units, reaching the 75% threshold of your 100 free units limit.`);
                }
            }
        }
        if(!voltageVal || !currentVal) return;

        // Base 230V +/- 5V fluctuation
        const v = 225 + Math.random() * 10;
        voltageVal.textContent = v.toFixed(1);
        
        // Base 12A with occasional spikes to test the > 75% threshold
        let c = 12 + (Math.random() - 0.5) * 5;
        
        // 10% chance to artificially spike above threshold (e.g., > 22.5A)
        if(Math.random() > 0.9) {
            c = MAX_CURRENT * 0.8 + Math.random() * (MAX_CURRENT * 0.2);
        }

        currentVal.textContent = c.toFixed(2);
        
        // Calculate usage percentage relative to Max
        const percent = (c / MAX_CURRENT) * 100;
        const boundedPercent = Math.min(percent, 100).toFixed(1);
        
        usagePercent.textContent = `${boundedPercent}%`;
        usageBar.style.width = `${boundedPercent}%`;
        
        // Threshold Logic
        if(percent >= THRESHOLD_PERCENT) {
            // UI Alert
            thresholdWarning.style.display = 'flex';
            usageBar.classList.add('danger');
            usagePercent.classList.add('text-danger');
            
            // Device Alert (only once per spike)
            if(!hasAlertedThisSpike) {
                showDeviceNotification(
                    "High Energy Usage Alert", 
                    `Warning: Current load is at ${boundedPercent}%, exceeding safe threshold. Please reduce load.`
                );
                hasAlertedThisSpike = true;
            }
        } else {
            // Reset UI and state when back to normal
            thresholdWarning.style.display = 'none';
            usageBar.classList.remove('danger');
            usagePercent.classList.remove('text-danger');
            hasAlertedThisSpike = false;
        }

    }, 2000);
}
