document.addEventListener('DOMContentLoaded', function() {
    // ====== CUSTOM CURSOR ======
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor hover effects (excludes chatbot buttons)
    const interactiveElements = document.querySelectorAll(
        'a:not(.chatbot-toggle):not(.send-button):not(.close-chat), button:not(.chatbot-toggle):not(.send-button):not(.close-chat), .resource-item, .card, .quick-nav a, .nav-links a, li'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            el.style.transform = 'translateY(-2px)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            el.style.transform = 'translateY(0)';
        });
    });

    // ====== SCROLL EFFECTS ======
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.syllabus-nav');
        if (window.scrollY > 50) {
            nav.classList.add('syllabus-nav-scrolled');
        } else {
            nav.classList.remove('syllabus-nav-scrolled');
        }
    });

    // ====== SMOOTH SCROLLING ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // ====== ANIMATIONS ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .section-title').forEach(el => {
        observer.observe(el);
    });

    // ====== CHATBOT ======
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const closeChat = document.querySelector('.close-chat');
    const userInput = document.querySelector('.user-input');
    const sendButton = document.querySelector('.send-button');
    const messagesContainer = document.querySelector('.chatbot-messages');
    
    // Toggle chat
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            userInput.value = '';
            respondToMessage(message);
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Add message to UI
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Bot responses (customize these!)
    function respondToMessage(message) {
        let response = "I'm not sure about that. Check the syllabus or contact the instructor.";
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('office hour')) {
            response = "Office hours: Tuesdays 10:30 AM - 12:30 PM (see 'Instructor Information').";
        } else if (lowerMessage.includes('textbook') || lowerMessage.includes('read')) {
            response = "All texts are Open Educational Resources posted on Canvas (see 'Course Materials').";
        } else if (lowerMessage.includes('deadline') || lowerMessage.includes('due')) {
            response = "Deadlines are in the 'Evaluation Methods' section. Major essays are worth 60% of your grade.";
        } else if (lowerMessage.includes('grade')) {
            response = "Grading breakdown: 30% Participation, 60% Essays (see 'Evaluation Methods').";
        } else if (lowerMessage.includes('contact')) {
            response = "Instructor: Firstname Lastname (see top of syllabus). Email via Canvas Inbox.";
        } else if (lowerMessage.includes('hybrid')) {
            response = "This is a hybrid course: 1 in-person meeting weekly + online work (see 'Course Structure').";
        }
        
        setTimeout(() => {
            addMessage(response, 'bot');
        }, 500);
    }
    
    // Initial greeting
    setTimeout(() => {
        addMessage("Hi! I can answer questions about ENGL 1+28. Try asking about office hours, deadlines, or grading.", 'bot');
    }, 1000);
});
