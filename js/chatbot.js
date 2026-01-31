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
            founded: "2020",
            founders: ["Jared Kolsun (Lead Developer/AI Specialist)", "Andrew Tesauro (COO)"],
            email: "admin@brightautomations.net",
            phone: "(610) 256-9844",
            responseTime: "Usually within 4 hours, guaranteed within 24 hours",
            hours: "Mon-Fri 9am-6pm EST",
            stats: {
                years: "3+",
                clients: "50+",
                projects: "70+",
                satisfaction: "99%"
            }
        },
        services: {
            voiceAgent: {
                name: "AI Voice Agent",
                description: "24/7 human-like AI phone answering. Qualifies leads, books appointments, and transfers hot leads.",
                features: ["Answers calls 24/7", "Qualifies leads with smart questions", "Books appointments directly", "Transfers hot leads", "Powered by ElevenLabs"]
            },
            chatbot: {
                name: "Website Chatbot",
                description: "Engage visitors instantly, answer FAQs, capture leads, and schedule appointments automatically.",
                features: ["Instant visitor engagement", "Intelligent FAQ answers", "Lead capture", "Auto-qualification", "Direct scheduling"]
            },
            adLeadCapture: {
                name: "Ad Lead Capture",
                description: "Capture leads instantly from Meta, Google, and other ad platforms with auto-sync to your CRM.",
                features: ["Meta & Google Ads integration", "Instant lead capture", "Auto CRM sync", "ROI tracking", "All major ad platforms"]
            },
            followUp: {
                name: "Automated Follow-Up",
                description: "Multi-channel sequences via SMS, Email, and WhatsApp. Never let leads go cold.",
                features: ["SMS sequences", "Email automation", "WhatsApp messaging", "Appointment reminders", "Review requests"]
            },
            booking: {
                name: "Smart Booking",
                description: "Online booking portal with calendar sync, confirmations, and no-show reduction.",
                features: ["Online booking portal", "Google/Outlook sync", "Automated confirmations", "Reschedule handling", "No-show reduction"]
            },
            invoicing: {
                name: "Invoice Automation",
                description: "Auto-generate invoices, send reminders, accept online payments, and get paid faster.",
                features: ["Auto-generated invoices", "Payment reminders", "Online payments", "Receivables tracking", "Faster payments"]
            }
        },
        pricing: {
            starter: {
                name: "Starter",
                includes: ["Website Chatbot", "Lead Capture Forms", "Basic Email Follow-Up", "CRM Integration", "Setup & Training"],
                price: "Contact for pricing"
            },
            professional: {
                name: "Professional",
                popular: true,
                includes: ["Everything in Starter", "AI Voice Agent (24/7)", "SMS Follow-Up Sequences", "Smart Booking System", "Invoice Automation", "Ad Lead Capture", "Priority Support"],
                price: "Contact for pricing"
            },
            enterprise: {
                name: "Enterprise",
                includes: ["Everything in Professional", "Multiple Voice Agent Lines", "Advanced Integrations", "Custom Workflows", "Dedicated Account Manager", "SLA & Uptime Guarantees"],
                price: "Custom pricing"
            }
        },
        integrations: [
            "HubSpot", "Salesforce", "GoHighLevel", "Twilio", "WhatsApp", "Slack",
            "Google Calendar", "Calendly", "Stripe", "Mailchimp", "Zapier",
            "ElevenLabs", "Make", "n8n", "Toast POS", "MongoDB"
        ],
        industries: [
            "HVAC", "Plumbing", "Electrical", "General Contracting", "Cleaning Services",
            "Landscaping", "Auto Services", "Dental", "Medical Spas", "Law Firms",
            "Real Estate", "Accounting", "Insurance", "Chiropractors", "Massage Therapy",
            "Optometrists", "Veterinarians", "Interior Design", "Pool Services", "Pest Control",
            "Locksmiths", "Appliance Repair", "Salon & Barbers", "Photography", "Moving Companies",
            "Painting", "Roofing", "Fitness Studios", "Pet Services"
        ],
        faqs: [
            {
                q: "How long does implementation take?",
                a: "Standard websites take less than 1 week. Automation projects typically take 1-2 weeks depending on complexity. We'll provide a detailed timeline during your consultation."
            },
            {
                q: "What's included in pricing?",
                a: "All plans include design, development, testing, deployment, setup, training, and initial support. No hidden fees. Ongoing maintenance is available separately."
            },
            {
                q: "Do you offer ongoing support?",
                a: "Yes! We offer various support and maintenance plans including updates, security patches, content updates, and technical support."
            },
            {
                q: "Can you integrate with my existing systems?",
                a: "Absolutely! We specialize in integrations with CRMs, email marketing tools, payment processors, and more. We work with your existing tech stack."
            },
            {
                q: "What if I need changes after launch?",
                a: "Easy! Existing clients use our Client Portal to submit change requests. We prioritize client requests and typically implement minor changes within 24-48 hours."
            }
        ]
    };

    // Intent patterns and responses
    const INTENTS = [
        {
            patterns: [/hello|hi|hey|good (morning|afternoon|evening)|greetings/i],
            response: () => "Hello! Welcome to Bright Automations. I'm here to help you learn about our AI-powered business automation solutions. How can I assist you today?"
        },
        {
            patterns: [/what (do you|does .* company) do|about (your|the) company|tell me about|who (are|is) bright/i],
            response: () => `Bright Automations helps service businesses automate their entire lead-to-invoice workflow. We combine AI voice agents, chatbots, and automation technology to run your business on autopilot 24/7.\n\nFounded in ${KNOWLEDGE_BASE.company.founded}, we've helped ${KNOWLEDGE_BASE.company.stats.clients} clients with a ${KNOWLEDGE_BASE.company.stats.satisfaction} satisfaction rate.`
        },
        {
            patterns: [/services|what (can you|do you) offer|solutions|features/i],
            response: () => `We offer 6 core automation services:\n\n• **AI Voice Agent** - 24/7 call answering & lead qualification\n• **Website Chatbot** - Instant visitor engagement\n• **Ad Lead Capture** - Meta & Google Ads integration\n• **Automated Follow-Up** - SMS, Email & WhatsApp sequences\n• **Smart Booking** - Online scheduling with calendar sync\n• **Invoice Automation** - Get paid faster\n\nWould you like details on any specific service?`
        },
        {
            patterns: [/voice agent|phone|call(s|ing)?|answer(ing)? (the )?phone/i],
            response: () => `Our **AI Voice Agent** answers your calls 24/7 with human-like AI:\n\n• Qualifies leads with smart questions\n• Books appointments directly into your calendar\n• Transfers hot leads to your team\n• Never misses a call, even at 2am\n• Powered by ElevenLabs technology\n\nWant to hear it in action? Book a demo!`
        },
        {
            patterns: [/chatbot|chat bot|website chat|live chat/i],
            response: () => `Our **Website Chatbot** engages visitors instantly:\n\n• Answers FAQs intelligently\n• Captures contact information\n• Qualifies leads automatically\n• Schedules appointments directly\n• Works 24/7 on your website\n\nYou're talking to one right now! Want to see more?`
        },
        {
            patterns: [/ad(s)?|lead capture|facebook|meta|google ads|advertising/i],
            response: () => `Our **Ad Lead Capture** system works with all major platforms:\n\n• Meta Ads, Google Ads, TikTok, LinkedIn, YouTube\n• Captures leads instantly from campaigns\n• Auto-syncs to your CRM\n• Tracks ROI per campaign\n• Never lose a lead from your ad spend\n\nWant to maximize your advertising ROI?`
        },
        {
            patterns: [/follow(-| )?up|sms|email|whatsapp|nurture|sequence/i],
            response: () => `Our **Automated Follow-Up** keeps leads warm:\n\n• Multi-channel sequences (SMS, Email, WhatsApp)\n• Personalized messages\n• Appointment reminders\n• Post-job review requests\n• Never lets leads go cold\n\nAutomated follow-up can increase conversions by 30%+!`
        },
        {
            patterns: [/book(ing)?|schedul(e|ing)|appointment|calendar/i],
            response: () => `Our **Smart Booking** system reduces no-shows:\n\n• Online booking portal for clients\n• Syncs with Google Calendar, Outlook, Calendly\n• Automated confirmations & reminders\n• Handles reschedules & cancellations\n• Reduces no-shows significantly\n\nReady to streamline your scheduling?`
        },
        {
            patterns: [/invoice|invoicing|payment|billing|get paid/i],
            response: () => `Our **Invoice Automation** gets you paid faster:\n\n• Auto-generates invoices after jobs complete\n• Sends payment reminders automatically\n• Accepts online payments (Stripe)\n• Tracks and manages receivables\n• Reduces time to payment\n\nStop chasing payments manually!`
        },
        {
            patterns: [/pric(e|ing)|cost|how much|package|plan/i],
            response: () => `We offer 3 pricing tiers:\n\n**Starter** - Website Chatbot, Lead Forms, Basic Follow-Up, CRM Integration\n\n**Professional** (Most Popular) - Everything in Starter PLUS AI Voice Agent, SMS Sequences, Smart Booking, Invoice Automation, Ad Lead Capture\n\n**Enterprise** - Everything plus multiple lines, advanced integrations, dedicated account manager\n\nAll plans include setup, training, and support. Would you like to schedule a consultation for a custom quote?`
        },
        {
            patterns: [/integration|integrate|connect|crm|hubspot|salesforce|zapier/i],
            response: () => `We integrate with 16+ popular tools:\n\n**CRMs:** HubSpot, Salesforce, GoHighLevel\n**Communication:** Twilio, WhatsApp, Slack\n**Scheduling:** Google Calendar, Calendly\n**Payment:** Stripe\n**Marketing:** Mailchimp, Zapier\n**Automation:** Make, n8n\n\nWe work with your existing tech stack!`
        },
        {
            patterns: [/industr(y|ies)|business(es)?|who (do you|can you) (help|serve|work with)/i],
            response: () => `We serve all service-based businesses including:\n\n• HVAC, Plumbing, Electrical, Contracting\n• Cleaning, Landscaping, Pool Services\n• Dental, Medical Spas, Chiropractors\n• Law Firms, Real Estate, Accounting\n• Salons, Fitness Studios, Pet Services\n• And many more!\n\nIf your business relies on leads and appointments, we can help.`
        },
        {
            patterns: [/how long|timeline|implementation|setup time/i],
            response: () => "Standard website implementations take less than 1 week. Full automation projects typically take 1-2 weeks depending on complexity. We'll provide a detailed timeline during your consultation."
        },
        {
            patterns: [/support|help|maintenance|after (launch|sale)/i],
            response: () => "Yes! All plans include setup, training, and ongoing support. We offer various maintenance plans including updates, security patches, and technical support. Existing clients can submit requests through our Client Portal."
        },
        {
            patterns: [/demo|see it|show me|try|test/i],
            response: () => `I'd love to show you our system in action! During a demo, you'll see:\n\n• Live AI voice agent demonstration\n• Chatbot walkthrough\n• Booking & invoicing features\n• How everything integrates together\n\n👉 [Book your free demo here](/demo.html) or call us at ${KNOWLEDGE_BASE.company.phone}`
        },
        {
            patterns: [/contact|reach|talk to (a )?human|speak|call|email/i],
            response: () => `You can reach our team:\n\n📧 **Email:** ${KNOWLEDGE_BASE.company.email}\n📞 **Phone:** ${KNOWLEDGE_BASE.company.phone}\n🕐 **Hours:** ${KNOWLEDGE_BASE.company.hours}\n\nWe typically respond within 4 hours, guaranteed within 24 hours.\n\n👉 Or [fill out our contact form](/contact.html)`
        },
        {
            patterns: [/get started|start|begin|sign up|ready/i],
            response: () => `Great! Here's how to get started:\n\n1. **Book a Demo** - See our AI in action\n2. **Consultation** - We'll design your custom solution\n3. **Implementation** - We set everything up (1-2 weeks)\n4. **Launch** - Your automation goes live!\n\n👉 [Schedule your free demo](/demo.html) to begin!`
        },
        {
            patterns: [/thank|thanks|awesome|great|perfect/i],
            response: () => "You're welcome! Is there anything else you'd like to know about Bright Automations? I'm happy to help with any other questions."
        },
        {
            patterns: [/bye|goodbye|see you|talk later/i],
            response: () => "Thanks for chatting! If you have more questions later, I'm always here. Have a great day! 👋"
        },
        {
            patterns: [/founder|team|who (built|made|created)|jared|andrew/i],
            response: () => `Bright Automations was founded in ${KNOWLEDGE_BASE.company.founded} by:\n\n• **Jared Kolsun** - Lead Developer & AI Specialist\n• **Andrew Tesauro** - COO\n\nOur team combines technical expertise with business operations knowledge to deliver solutions that actually work for service businesses.`
        },
        {
            patterns: [/results|roi|success|case stud(y|ies)|testimonial/i],
            response: () => `Our clients see real results:\n\n• **70% reduction** in admin time\n• **80% fewer** no-shows\n• **150%+ increase** in lead conversion\n• **24/7 availability** without extra staff\n\n👉 [See our case studies](/portfolio.html) for detailed success stories!`
        }
    ];

    // Default response when no intent matches
    const DEFAULT_RESPONSES = [
        "I'd be happy to help with that! Could you tell me more about what you're looking for? I can help with our services, pricing, integrations, or how to get started.",
        "That's a great question! For the most accurate answer, I'd recommend speaking with our team. You can reach us at admin@brightautomations.net or (610) 256-9844.",
        "I want to make sure I give you the right information. Could you rephrase that, or would you like to know about our services, pricing, or how we can help automate your business?"
    ];

    // Quick action buttons
    const QUICK_ACTIONS = [
        { label: "Our Services", value: "What services do you offer?" },
        { label: "Pricing", value: "What are your pricing plans?" },
        { label: "Book Demo", value: "I'd like to book a demo" },
        { label: "Contact Us", value: "How can I contact you?" }
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
                    addMessage("I'm the Bright Automations assistant. How can I help?", false, true);
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
