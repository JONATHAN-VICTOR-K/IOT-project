// Prepaid Module Logic

function initPrepaidModule() {
    const btnRecharge = document.getElementById('btn-recharge');
    const rechargeInput = document.getElementById('recharge-input');
    const balanceAmount = document.getElementById('balance-amount');
    const estDays = document.getElementById('est-days');
    const rechargeToast = document.getElementById('recharge-toast');
    
    // State
    let currentBalance = 45.50;
    const burnRatePerDay = 3.25; // Example: $3.25 per day
    
    updateUI();
    
    if(btnRecharge) {
        btnRecharge.addEventListener('click', () => {
            const amount = parseFloat(rechargeInput.value);
            
            if(isNaN(amount) || amount <= 0) {
                alert("Please enter a valid recharge amount.");
                return;
            }
            
            // Animate button click (optional, handled by CSS active state mostly)
            btnRecharge.innerHTML = `<i data-lucide="loader-2" class="spin"></i> Processing...`;
            if (window.lucide) window.lucide.createIcons();
            
            // Simulate network request
            setTimeout(() => {
                currentBalance += amount;
                updateUI();
                
                // Show Success Toast
                rechargeToast.classList.add('show');
                
                // Reset Button
                btnRecharge.innerHTML = `<i data-lucide="credit-card"></i> Recharge Now`;
                if (window.lucide) window.lucide.createIcons();
                
                // Clear Input
                rechargeInput.value = '';
                
                // Hide Toast after 3 seconds
                setTimeout(() => {
                    rechargeToast.classList.remove('show');
                }, 3000);
                
            }, 800);
        });
    }
    
    function updateUI() {
        if(balanceAmount) {
            // Formatting with 2 decimal places
            balanceAmount.textContent = currentBalance.toFixed(2);
        }
        
        if(estDays) {
            const daysRemaining = Math.floor(currentBalance / burnRatePerDay);
            estDays.textContent = `${daysRemaining} Days`;
            
            // Simple color coding based on days
            if(daysRemaining < 3) {
                estDays.className = 'text-danger';
            } else if(daysRemaining < 7) {
                estDays.className = 'text-warning';
            } else {
                estDays.className = 'text-green';
            }
        }
    }
}
