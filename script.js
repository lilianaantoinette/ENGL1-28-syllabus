// Enhanced Custom Cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Cursor hover effects
const interactiveElements = document.querySelectorAll(
    'a, button, .resource-item, .card, .quick-nav a, .nav-links a, li'
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

// Scroll effects
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.syllabus-nav');
    if (window.scrollY > 50) {
        nav.classList.add('syllabus-nav-scrolled');
    } else {
        nav.classList.remove('syllabus-nav-scrolled');
    }
});

// Smooth scrolling
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

// Animate elements on scroll
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

// ==================== CHATBOT ====================
document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const chatbotContainer = document.querySelector('.chatbot-container');
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const closeChat = document.querySelector('.close-chat');
  const userInput = document.querySelector('.user-input');
  const sendButton = document.querySelector('.send-button');
  const messagesContainer = document.querySelector('.chatbot-messages');
  
  // Toggle chat visibility
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
  });
  
  closeChat.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
  });
  
  // Send message function
  function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, 'user');
      userInput.value = '';
      respondToMessage(message);
    }
  }
  
  // Click and Enter key handlers
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Bot responses (customize with your syllabus content)
  function respondToMessage(message) {
    let response = "I'm not sure about that. Please check the syllabus or contact the instructor.";
    const lowerMessage = message.toLowerCase();
    
    // Sample responses - update these!
    if (lowerMessage.includes('office hour') || lowerMessage.includes('office hours')) {
      response = "Office hours are listed in the 'Instructor Information' section of the syllabus.";
    } else if (lowerMessage.includes('textbook') || lowerMessage.includes('book') || lowerMessage.includes('reading')) {
      response = "The required textbook is listed in the 'Course Materials' section.";
    } else if (lowerMessage.includes('deadline') || lowerMessage.includes('due date') || lowerMessage.includes('assignment')) {
      response = "Check the 'Course Schedule' section for all assignment deadlines.";
    } else if (lowerMessage.includes('grade') || lowerMessage.includes('grading')) {
      response = "The grading policy is explained in the 'Grading' section.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('instructor')) {
      response = "Instructor contact info is in the 'Instructor Information' section.";
    } else if (lowerMessage.includes('prerequisite') || lowerMessage.includes('required')) {
      response = "Prerequisites are listed in the 'Course Description' section.";
    }
    
    // Simulate typing delay
    setTimeout(() => {
      addMessage(response, 'bot');
    }, 500);
  }
  
  // Initial greeting
  setTimeout(() => {
    addMessage("Hi! I can answer questions about the course. Try asking about office hours, textbooks, or assignments.", 'bot');
  }, 1000);
});
