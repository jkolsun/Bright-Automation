/**
 * Bright Automations - AI Helpdesk Chatbot
 * Professional customer support chatbot with company knowledge
 */

(function() {
    'use strict';

    // Company Knowledge Base
    const KNOWLEDGE_BASE = {
        company: {
            name: "Bright Automations",
            email: "admin@brightautomations.net",
            phone: "(610) 256-9844",
            text: "(732) 228-3794"
        }
    };

    // Intent patterns and responses
    const INTENTS = [
        {
            patterns: [/hello|hi|hey|good (morning|afternoon|evening)|greetings|sup|what'?s up/i],
            response: () => "Hey! Welcome to Bright Automations. We build professional websites for businesses — live in 48 hours. What can I help you with?"
        },
        {
            patterns: [/what (do you|does .* company) do|about (your|the) company|tell me about|who (are|is) bright/i],
            response: () => "We build all-in-one lead capture systems for businesses. Your site and all services are live within 48 hours.\n\nWe handle everything — website, SEO, Google optimization, reviews, hosting, domain, SSL. You just tell us your business name and we do the rest.\n\nWant to know about pricing? Just ask!"
        },
        {
            patterns: [/services|what (can you|do you) offer|solutions|what do you (build|make)|add(-| )?on/i],
            response: () => "Everything is included in one plan:\n\n• **Professional Website** — up to 5 pages, mobile-friendly, live in 48 hours\n• **Hosting, SSL & Maintenance**\n• **Google Business Profile Optimization**\n• **Speed & Mobile Optimization**\n• **Monthly SEO Updates**\n• **Social Media Landing Page**\n\nFree setup + $100/month. No contracts. Cancel anytime."
        },
        {
            patterns: [/pric(e|ing)|cost|how much|package|plan|\$|money|budget|afford/i],
            response: () => "Simple, all-inclusive pricing:\n\n• **Setup:** FREE — we build your site at no cost\n• **Monthly Plan:** $100/month — starts when your site goes live\n\nEverything's included:\n✅ Professional website (up to 5 pages)\n✅ Google Business optimization\n✅ Speed & mobile optimization\n✅ Monthly SEO updates\n✅ Social media landing page\n✅ Hosting, SSL & maintenance\n\nNo contracts. Cancel anytime.\n\n👉 [Get started now](/preview)"
        },
        {
            patterns: [/free|preview|try|see (my|a) (site|website)|no commitment/i],
            response: () => "Yes! We'll build you a free preview of your website — no commitment, no credit card.\n\nJust tell us your business name and we'll put together a preview in 30 seconds.\n\n👉 [Get your free preview](/preview)"
        },
        {
            patterns: [/how long|timeline|when.*ready|when.*live|48 hours|turnaround/i],
            response: () => "Your site is live within **48 hours** of receiving your business info. After you sign up, a team member texts you within 15 minutes to get started.\n\nAdd-on services (GBP, social pages) are also live within 48 hours."
        },
        {
            patterns: [/what('s| is) included|what do (i|you) get|features|pages/i],
            response: () => "Your lead capture system includes:\n\n• Up to 5 pages\n• Mobile-friendly design\n• Click-to-call button\n• Contact form\n• Google Maps integration\n• Your real reviews displayed\n• Google Business optimization\n• Speed & mobile optimization\n• Monthly SEO updates\n• Social media landing page\n• Hosting, SSL & maintenance\n• 2 rounds of revisions\n• Live in 48 hours\n\nAll of this is included in your $100/month plan — and setup is free."
        },
        {
            patterns: [/host(ing)?|domain|ssl|maintenance|server/i],
            response: () => "Hosting is included in your $100/month plan.\n\nIncludes:\n• SSL certificate\n• Uptime monitoring\n• Security updates\n• Basic maintenance\n• No contracts — cancel anytime\n\nWe can register a new domain or transfer your existing one. Either way, we handle it."
        },
        {
            patterns: [/google business|gbp|google profile|google listing/i],
            response: () => "**Google Business Profile Optimization** is included in your plan.\n\nWe update your:\n• Business categories & description\n• Photos & hours\n• Keywords for local search\n• Service areas\n\nThis is set up during your first 48 hours — no extra charge."
        },
        {
            patterns: [/review|reviews|reputation|testimonial/i],
            response: () => "Want to grow your Google reviews on autopilot? Our **Reputation Engine** system automates review requests after every job and drafts responses for you.\n\nIt's available as an add-on through our Enterprise Systems.\n\n👉 [See all systems](/systems)\n\nYour base plan already includes your real reviews displayed on your website — that's included at no extra cost."
        },
        {
            patterns: [/seo|search engine|google rank|ranking|traffic/i],
            response: () => "**Monthly SEO Updates** are included in your plan.\n\nEach month we update your:\n• Meta tags & descriptions\n• Content & keywords\n• Local SEO signals\n\nThis helps your site rank higher in Google so more customers find you. No extra charge."
        },
        {
            patterns: [/social|instagram|facebook|landing page|link in bio/i],
            response: () => "**Social Media Landing Page** is included in your plan.\n\nA single-page site optimized for your Instagram/Facebook link-in-bio. Sends visitors to your services, reviews, and contact info.\n\nSet up within 48 hours — no extra charge."
        },
        {
            patterns: [/industr(y|ies)|business(es)?|who (do you|can you) (help|serve|work)|what (kind|type)/i],
            response: () => "We work with all kinds of businesses:\n\n• HVAC, Plumbing, Electrical, Roofing\n• Restoration, Remodeling, Painting\n• Landscaping, Cleaning, Pest Control\n• Law Firms, Charters, Real Estate\n• And many more\n\nIf your business needs a professional website, we've got you covered."
        },
        {
            patterns: [/refund|money back|not happy|cancel|guarantee/i],
            response: () => "Your setup is completely free — there's nothing to refund. If you're not satisfied before going live, just cancel at no cost.\n\nYour $100/month plan can be canceled anytime — no contracts, no cancellation fees.\n\nWe want you to love your site."
        },
        {
            patterns: [/change|revision|edit|update|modify/i],
            response: () => "Your website build includes **2 rounds of revisions**. After that, additional revision rounds are $25 each.\n\nOnce your site is live, just text us what you want changed and we'll handle it."
        },
        {
            patterns: [/contact|reach|talk to (a )?human|speak|call|email|text|phone/i],
            response: () => `You can reach us:\n\n• **Email:** ${KNOWLEDGE_BASE.company.email}\n• **Call:** ${KNOWLEDGE_BASE.company.phone}\n• **Text:** ${KNOWLEDGE_BASE.company.text}\n\nWe typically respond within 4 hours.\n\n👉 Or [fill out our contact form](/contact)`
        },
        {
            patterns: [/get started|start|begin|sign up|ready|buy|purchase|order/i],
            response: () => "Here's how it works:\n\n1. **Sign up** — it's free, no payment needed\n2. **A team member texts you within 15 minutes** to get your business info\n3. **Your site is live in 48 hours**\n\nNo hassle. We handle everything.\n\n👉 [Get your site now](/preview)"
        },
        {
            patterns: [/how (does|do) (it|this) work|process|step/i],
            response: () => "Three simple steps:\n\n1. **Free Preview** — We build a preview of your site. No commitment.\n2. **You Review It** — Love it? Go live. If not, no hard feelings.\n3. **Live in 48 Hours** — We handle design, hosting, domain, everything.\n\n👉 [Get your free preview](/preview)"
        },
        {
            patterns: [/already have a (website|site)|existing (website|site)|replace|redesign/i],
            response: () => "If your current website isn't getting you leads, it's costing you money. We'll build you a free preview of what a better site looks like — no commitment.\n\nIf you love it, we handle the transition. If not, no hard feelings.\n\n👉 [See your free preview](/preview)"
        },
        {
            patterns: [/content|copy|photos|logo|provide|need from me/i],
            response: () => "You don't need to provide anything! We pull your business info, reviews, and photos from Google.\n\nIf you have specific photos or a logo you want used, just send them over. But it's not required — we handle everything."
        },
        {
            patterns: [/own|ownership|my (site|website|domain)|take (it|my site)|portable/i],
            response: () => "You own your business content (text, photos, logos). We own the website template and code — your license is active as long as hosting is active.\n\nIf we register a domain for you, **you own the domain** regardless of hosting status."
        },
        {
            patterns: [/thank|thanks|awesome|great|perfect|cool|nice/i],
            response: () => "You're welcome! Anything else you'd like to know? I'm happy to help."
        },
        {
            patterns: [/bye|goodbye|see you|talk later|that'?s (all|it)/i],
            response: () => "Thanks for chatting! If you have more questions, I'm always here. Have a great day!"
        },
        {
            patterns: [/cheap|expensive|worth it|competitors|other companies|why you|why bright/i],
            response: () => "Most agencies charge $300-$500/month for what we include in our $100/month plan — and they still charge a setup fee. We've streamlined the process by building hundreds of sites, so we pass the savings to you.\n\nProfessional website + SEO + reviews + Google optimization + social landing page. All included. Free setup. Live in 48 hours.\n\nNo contracts. Cancel anytime."
        },
        {
            patterns: [/what happens after|after (i |I )?pay|next steps|what now/i],
            response: () => "After you sign up:\n\n1. A team member **texts you within 15 minutes**\n2. We collect your business info (name, services, photos)\n3. We build your site — free\n4. **Live within 48 hours**\n5. You review it and we make any changes (2 revision rounds included)\n\n$100/month starts once your site goes live. Simple as that."
        }
    ];

    // Default response when no intent matches
    const DEFAULT_RESPONSES = [
        "Good question! I can help with pricing, what's included, how the process works, or anything about our lead capture system. What would you like to know?",
        "I want to make sure I give you the right answer. You can also reach our team directly at admin@brightautomations.net or text us at (732) 228-3794.",
        "I'm not sure I understood that. Would you like to know about our pricing, how it works, or what's included?"
    ];

    // Quick action buttons
    const QUICK_ACTIONS = [
        { label: "Pricing", value: "How much does it cost?" },
        { label: "How It Works", value: "How does the process work?" },
        { label: "What's Included", value: "What's included in a website?" },
        { label: "Get Started", value: "I'm ready to get started" }
    ];

    // Chat state
    let isOpen = false;
    let messages = [];
    let isTyping = false;

    // Create chatbot HTML structure
    function createChatbotHTML() {
        const chatbotHTML = `
            <div id="ba-chatbot" class="ba-chatbot">
                <!-- Chat Toggle Button -->
                <button class="ba-chat-toggle" id="ba-chat-toggle" aria-label="Open chat">
                    <span class="ba-toggle-icon ba-icon-chat">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </span>
                    <span class="ba-toggle-icon ba-icon-close" style="display: none;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </span>
                    <span class="ba-chat-badge" id="ba-chat-badge">1</span>
                </button>

                <!-- Chat Window -->
                <div class="ba-chat-window" id="ba-chat-window">
                    <!-- Header -->
                    <div class="ba-chat-header">
                        <div class="ba-header-info">
                            <div class="ba-avatar">
                                <img src="images/Bright_AutoLOGO.png" alt="Bright Automations" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <span class="ba-avatar-fallback" style="display: none;">BA</span>
                            </div>
                            <div class="ba-header-text">
                                <span class="ba-header-title">Bright Automations</span>
                                <span class="ba-header-status">
                                    <span class="ba-status-dot"></span>
                                    Online | Typically replies instantly
                                </span>
                            </div>
                        </div>
                        <button class="ba-close-btn" id="ba-close-btn" aria-label="Close chat">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <!-- Messages Container -->
                    <div class="ba-chat-messages" id="ba-chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Quick Actions -->
                    <div class="ba-quick-actions" id="ba-quick-actions">
                        ${QUICK_ACTIONS.map(action => `
                            <button class="ba-quick-btn" data-value="${action.value}">${action.label}</button>
                        `).join('')}
                    </div>

                    <!-- Input Area -->
                    <div class="ba-chat-input-area">
                        <div class="ba-input-container">
                            <input
                                type="text"
                                class="ba-chat-input"
                                id="ba-chat-input"
                                placeholder="Type your message..."
                                autocomplete="off"
                            >
                            <button class="ba-send-btn" id="ba-send-btn" aria-label="Send message">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                        <div class="ba-powered-by">
                            Powered by Bright Automations AI
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = chatbotHTML;
        document.body.appendChild(container.firstElementChild);
    }

    // Find matching intent and get response
    function getResponse(message) {
        const lowerMessage = message.toLowerCase().trim();

        for (const intent of INTENTS) {
            for (const pattern of intent.patterns) {
                if (pattern.test(lowerMessage)) {
                    return intent.response();
                }
            }
        }

        // Return random default response
        return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
    }

    // Add message to chat
    function addMessage(content, isUser = false, showTyping = true) {
        const messagesContainer = document.getElementById('ba-chat-messages');

        if (!isUser && showTyping) {
            // Show typing indicator
            showTypingIndicator();

            // Delay response for natural feel
            setTimeout(() => {
                hideTypingIndicator();
                renderMessage(content, isUser);
            }, 800 + Math.random() * 700);
        } else {
            renderMessage(content, isUser);
        }
    }

    // Render message to DOM
    function renderMessage(content, isUser) {
        const messagesContainer = document.getElementById('ba-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ba-message ${isUser ? 'ba-user-message' : 'ba-bot-message'}`;

        // Convert markdown-style formatting
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/👉 \[(.*?)\]\((.*?)\)/g, '<a href="$2" class="ba-chat-link">$1 →</a>')
            .replace(/• /g, '<span class="ba-bullet">•</span> ');

        messageDiv.innerHTML = `
            <div class="ba-message-content">
                ${formattedContent}
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        messages.push({ content, isUser, timestamp: new Date() });
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('ba-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ba-message ba-bot-message ba-typing-indicator';
        typingDiv.id = 'ba-typing';
        typingDiv.innerHTML = `
            <div class="ba-message-content">
                <div class="ba-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        isTyping = true;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingEl = document.getElementById('ba-typing');
        if (typingEl) {
            typingEl.remove();
        }
        isTyping = false;
    }

    // Handle user input
    function handleUserInput() {
        const input = document.getElementById('ba-chat-input');
        const message = input.value.trim();

        if (!message || isTyping) return;

        // Add user message
        addMessage(message, true, false);
        input.value = '';

        // Get and add bot response
        const response = getResponse(message);
        addMessage(response, false, true);

        // Hide quick actions after first message
        const quickActions = document.getElementById('ba-quick-actions');
        if (quickActions && messages.length > 2) {
            quickActions.style.display = 'none';
        }
    }

    // Toggle chat window
    function toggleChat() {
        const chatWindow = document.getElementById('ba-chat-window');
        const chatIcon = document.querySelector('.ba-icon-chat');
        const closeIcon = document.querySelector('.ba-icon-close');
        const badge = document.getElementById('ba-chat-badge');

        isOpen = !isOpen;

        if (isOpen) {
            chatWindow.classList.add('ba-open');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'flex';
            badge.style.display = 'none';

            // Focus input
            setTimeout(() => {
                document.getElementById('ba-chat-input').focus();
            }, 300);

            // Send welcome message if first time
            if (messages.length === 0) {
                setTimeout(() => {
                    addMessage("Hey! I'm the Bright Automations assistant. We build professional websites for businesses — live in 48 hours. What can I help you with?", false, true);
                }, 500);
            }
        } else {
            chatWindow.classList.remove('ba-open');
            chatIcon.style.display = 'flex';
            closeIcon.style.display = 'none';
        }
    }

    // Initialize chatbot
    function init() {
        // Create HTML structure
        createChatbotHTML();

        // Event listeners
        document.getElementById('ba-chat-toggle').addEventListener('click', toggleChat);
        document.getElementById('ba-close-btn').addEventListener('click', toggleChat);

        document.getElementById('ba-send-btn').addEventListener('click', handleUserInput);

        document.getElementById('ba-chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });

        // Quick action buttons
        document.querySelectorAll('.ba-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.getAttribute('data-value');
                document.getElementById('ba-chat-input').value = value;
                handleUserInput();
            });
        });

        // Show badge after delay to attract attention
        setTimeout(() => {
            const badge = document.getElementById('ba-chat-badge');
            if (badge && !isOpen) {
                badge.style.display = 'flex';
            }
        }, 3000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
