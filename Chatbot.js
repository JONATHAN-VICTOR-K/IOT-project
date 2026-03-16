// Chatbot Logic

function initChatbot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const btnSendMsg = document.getElementById('btn-send-msg');
    
    // Toggle Chat window
    if(chatToggle && chatWindow && closeChat) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.add('open');
            // Animate toggle button out
            chatToggle.style.transform = 'scale(0)';
            chatToggle.style.pointerEvents = 'none';
        });
        
        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('open');
            // Animate toggle button back in
            chatToggle.style.transform = 'scale(1)';
            chatToggle.style.pointerEvents = 'all';
        });
    }
    
    // Handle Enter Key
    if(chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Handle Click
    if(btnSendMsg) {
        btnSendMsg.addEventListener('click', sendMessage);
    }
    
    function sendMessage() {
        const text = chatInput.value.trim();
        if(!text) return;
        
        // Add User Message
        appendMessage('user', text);
        chatInput.value = '';
        
        // Simulate AI Typing
        setTimeout(() => {
            const aiResponse = generateResponse(text);
            appendMessage('ai', aiResponse);
        }, 800 + Math.random() * 500); // 0.8 - 1.3s delay
    }
    
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        
        const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        msgDiv.innerHTML = `
            <div class="msg-bubble">${escapeHTML(text)}</div>
            <span class="msg-time">${timeStr}</span>
        `;
        
        chatMessages.appendChild(msgDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateResponse(input) {
        const lowercaseInput = input.toLowerCase();
        
        // Simple heuristic response logic
        if(lowercaseInput.includes('recharge') || lowercaseInput.includes('balance') || lowercaseInput.includes('money')) {
            return "You can recharge your account easily using the 'Prepaid Balance' widget on your dashboard. Simply enter the amount and click Recharge.";
        } else if(lowercaseInput.includes('high') || lowercaseInput.includes('usage') || lowercaseInput.includes('alert')) {
            return "Our system sends a device notification when your energy usage exceeds the 75% capacity threshold. Please ensure you turn off heavy appliances when an alert triggers to avoid blackout.";
        } else if(lowercaseInput.includes('dark') || lowercaseInput.includes('light') || lowercaseInput.includes('theme')) {
            return "You can toggle between Dark and Light mode using the Sun/Moon icon in the top right corner of the dashboard.";
        } else if(lowercaseInput.includes('help')) {
            return "I can help you understand your dashboard features! Try asking about 'Recharge', 'Alerts', or 'Themes'.";
        } else {
            return "I am a simple Smart Energy simulated assistant. I can help answer queries about how to use this dashboard's features!";
        }
    }
    
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
}
