// Utility for Browser Notifications

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.warn("This browser does not support desktop notifications");
        return;
    }

    if (Notification.permission !== "denied" && Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Notification permission granted.");
            }
        });
    }
}

function showDeviceNotification(title, body) {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
        const option = {
            body: body,
            icon: 'https://ui-avatars.com/api/?name=Alert&background=ef4444&color=fff', 
            vibrate: [200, 100, 200]
        };
        new Notification(title, option);
    } else if (Notification.permission !== "denied") {
        // Fallback or request if they ignored it initially
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body: body });
            }
        });
    } else {
        // Fallback to console if denied, though UI toast is also visible in-app
        console.warn(`[ALERT] ${title}: ${body}`);
    }
}

function sendSMSAlert(phone, message) {
    console.log(`[SMS/RCS to ${phone}]: ${message}`);
    
    // Also trigger UI toast
    const smsToast = document.getElementById('sms-toast');
    const smsToastMsg = document.getElementById('sms-toast-msg');
    if (smsToast && smsToastMsg) {
        smsToastMsg.textContent = `[SMS/RCS] ${message}`;
        smsToast.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            smsToast.classList.remove('show');
        }, 5000);
    }
    
    // Also send an OS level notification
    showDeviceNotification("SMS/RCS Alert", message);
}
