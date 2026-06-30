/**
 * Bright Automations — AI Helpdesk Chatbot
 * Comprehensive knowledge base. Answers anything about the company.
 */

(function () {
    'use strict';

    // ─── Company Knowledge Base ───────────────────────────────────────
    const KB = {
        name: "Bright Automations",
        email: "admin@brightautomations.net",
        phone: "(814) 400-2017",
        phoneTel: "+18144002017",
        smsCal: "https://cal.com/atesauro/strategy-call",
        founders: ["Jared", "Andrew"],
        priceSetup: "$0",
        priceMonthly: "$99.95",
        launchTime: "48 hours",
        deliverables: [
            "Custom website (designed for your trade, not a template)",
            "Hosting, SSL, and CDN",
            "Google Business Profile optimization",
            "Monthly SEO updates",
            "Speed & mobile optimization (Core Web Vitals tuned)",
            "AI review responses on Google",
            "Social media landing page (Instagram / Facebook bio link)",
            "Real-time lead tracking",
            "Monthly performance report — every 1st of the month"
        ]
    };

    // ─── Intents — pattern-matched, ordered by specificity ────────────
    const INTENTS = [
        // ── Greetings ─────────────────────────────────────────────────
        {
            patterns: [/^(hi|hey|hello|yo|sup|hola|good (morning|afternoon|evening))[\s!.?]*$/i],
            response: () => "Hey — welcome to Bright Automations. We build AI-powered revenue systems for businesses, free to start, $99.95/mo, live in 48 hours.\n\nWhat can I help with? Pricing, what's included, how it works, or something specific?"
        },

        // ── Pricing ───────────────────────────────────────────────────
        {
            patterns: [/pric(e|ing)|\bcost\b|how much|monthly|fee|charge|expensive|cheap|afford/i],
            response: () => `Simple, all-in pricing:\n\n• **Setup:** ${KB.priceSetup} — we build it, you pay nothing upfront\n• **Monthly:** ${KB.priceMonthly}/mo — starts the day your site goes live\n\nNo contract. Cancel anytime. No hidden fees, no add-on tiers.\n\nFor context, most agencies charge $1,600–3,800/mo for what we bundle into one $99.95/mo plan.\n\n👉 [Get your free preview](/contact)`
        },
        {
            patterns: [/(vs|versus|compared|other (agencies|companies)|why (you|bright))/i],
            response: () => "Most agencies invoice each line separately:\n\n• Custom website + hosting: $3.5k–8k build + $50–200/mo\n• Google Business Profile: $300–600/mo\n• Local SEO + content: $800–2,000/mo\n• AI review responses: $150–400/mo\n• Lead tracking + analytics: $100–300/mo\n• Performance reporting: $200–500/mo\n\n**Total at an agency: $1,600–3,800/mo.**\n**With us: $99.95/mo. Everything bundled. Free to start.**\n\n👉 [See the full breakdown](/services)"
        },

        // ── What's included / deliverables ────────────────────────────
        {
            patterns: [/what('s| is| does it)? include|what do (i|you) get|features|deliverable|in the plan|breakdown/i],
            response: () => "Every plan includes:\n\n• **Custom website** — designed for your business\n• **Hosting, SSL & CDN** — fast, secure infrastructure\n• **Google Business Profile** — fully optimized\n• **Monthly SEO updates** — Google rewards activity\n• **Speed & mobile optimization** — Core Web Vitals tuned\n• **AI review responses** — every Google review answered fast\n• **Social media landing page** — bio-link page for Instagram/Facebook\n• **Real-time lead tracking** — every call & form, attributed\n• **Monthly performance report** — plain-English email\n\nAll for $99.95/mo. Setup is free.\n\n👉 [Full list with details](/services)"
        },

        // ── Services / The Stack (4 layers) ───────────────────────────
        {
            patterns: [/the stack|four layers|layers|foundation|visibility (engine|layer)|ai layer|growth ops|growth operations/i],
            response: () => "Our system has 4 layers — all included:\n\n**01 — Foundation:** custom site, hosting, SSL, branded forms\n**02 — Visibility Engine:** Google Business Profile, local SEO, monthly content, Core Web Vitals\n**03 — AI Intelligence:** review responses, lead capture, smart forms, auto follow-up\n**04 — Growth Operations:** monthly reports, lead tracking, competitor scans, proactive recommendations\n\nEach layer compounds the one below it.\n\n👉 [See it laid out](/services)"
        },

        // ── Free preview ──────────────────────────────────────────────
        {
            patterns: [/free|preview|try|see (my|a) (site|website)|no commitment|demo|sample/i],
            response: () => "Yes — free preview, no payment, no contract.\n\n**Here's how it works:**\n1. Fill out 3 quick questions (name, services, style)\n2. Optionally upload your logo + photos\n3. We build a full preview site in **48 hours**\n4. We text you the link — you see it, then decide\n\nIf you love it, you go live for $99.95/mo. If not, no hard feelings.\n\n👉 [Start the build form](/contact)"
        },

        // ── Timeline ──────────────────────────────────────────────────
        {
            patterns: [/how long|timeline|when.*(ready|live|done)|48 hours|turnaround|first 90 days|day 1|day 7|day 30/i],
            response: () => "**Your first 90 days:**\n\n• **Day 0** — You fill out the 3-question intake form\n• **Day 2** — Free preview lands in your inbox (real site, not a mockup)\n• **Day 7** — Site live, GBP optimized, lead tracking on, AI review responses already firing\n• **Day 14** — First optimization pass based on real data\n• **Day 30** — First performance report (traffic, leads, what's converting)\n• **Day 60+** — Proactive mode: we watch the market and call you when something opens up\n\n👉 [See the full timeline](/services#timeline)"
        },

        // ── Industries / who we serve ─────────────────────────────────
        {
            patterns: [
                /industr(y|ies)|niche|vertical|\btrade\b/i,
                /(do|can|will) you (build|work|make|do|help|serve|design|create) (for|with|me|us|a|an|my)/i,
                /(what|which) (kind|type|sort|industries|businesses?|companies)/i,
                /\bfor (a |an |my |our )?(restaurant|gym|salon|barber|dentist|doctor|lawyer|law firm|real estate|realtor|hvac|plumb|electric|roof|paint|landscap|cleaning|cleaner|pest|handyman|remodel|floor|fenc|tree|garage|concrete|pool|pressure wash|junk|locksmith|appliance|solar|window|gutter|septic|moving|auto|detail|pet|vet|photographer|wedding|event|coach|tutor|fitness|yoga|spa|tattoo|nail|retail|store|shop|bakery|cafe|food)/i,
                /(my|our|the) (business|company|shop|store|practice|firm|studio) (is|isn'?t|will|works|does)/i,
                /(home service|service business|local business|small business)/i
            ],
            response: () => "We build for **any business** — not just home services.\n\nReal customers we've shipped sites for:\n• Plumbing, HVAC, Roofing, Electrical, Landscaping, Cleaning, Painting\n• Real Estate, Law Firms, Dental & Medical\n• Gyms, Salons, Restaurants, Photographers\n• Auto detailing, Pet services, Local retail, Coaches\n• Event planners, and more\n\nIf your business serves customers, we can build for you. Same plan, same price, same 48-hour turnaround.\n\n👉 [See the full list](/industries)"
        },

        // ── Hosting / domain / SSL ────────────────────────────────────
        {
            patterns: [/host(ing)?|\bdomain\b|ssl|server|maintenance|infrastructure|uptime/i],
            response: () => `Hosting, SSL, CDN, and security updates are all included in your ${KB.priceMonthly}/mo plan.\n\n• Premium hosting on enterprise infrastructure\n• Free SSL certificate (https://)\n• Global CDN for fast loading anywhere\n• Uptime monitoring + auto-recovery\n• Continuous security patches\n• No setup fee, no contracts\n\nWe can register a new domain for you or transfer your existing one. **Either way, you own the domain.**`
        },

        // ── Google Business Profile (GBP) ─────────────────────────────
        {
            patterns: [/google business|gbp|google profile|google listing|google maps|map pack|local pack/i],
            response: () => "**Google Business Profile** optimization is included from day one. We handle:\n\n• Categories, descriptions, attributes\n• Hours, service areas, Q&A\n• Photo uploads + ongoing additions\n• Keyword-rich descriptions\n• Local SEO so you rank in the map pack\n• Updates every month based on Google's changes\n\nThis is what gets you found when people search 'plumber near me' (or whatever you do, near them)."
        },

        // ── Reviews & reputation ──────────────────────────────────────
        {
            patterns: [/review|reputation|testimonial|rating|stars|respond|reply/i],
            response: () => "**AI Review Responses** are included. Every Google review you get is answered fast, in your voice, automatically.\n\nWhy that matters:\n• Google ranks active businesses higher\n• Prospects see an engaged, professional brand\n• You don't have to remember to respond at 9pm\n\nWe also display your real Google reviews on your site as live-style review cards (avatar, stars, date, the works)."
        },

        // ── SEO ───────────────────────────────────────────────────────
        {
            patterns: [/\bseo\b|search engine|google rank|ranking|traffic|keywords|content updates?/i],
            response: () => "**Monthly SEO updates** are included. Each month we work on:\n\n• Title tags + meta descriptions\n• Page content + keyword targeting\n• Local SEO signals (NAP consistency, schema, citations)\n• Core Web Vitals tuning\n• Fresh content (Google rewards activity)\n• Competitor monitoring\n\nNo extra fee. We don't bill SEO separately like other agencies."
        },

        // ── Speed / mobile ────────────────────────────────────────────
        {
            patterns: [/speed|fast|loading|core web vitals|mobile (optim|friendly|design)|responsive|lighthouse/i],
            response: () => "**Speed + mobile optimization** is built into every site.\n\n• Mobile-first responsive design\n• Image compression + WebP delivery\n• Code splitting, lazy loading, CDN cache\n• Core Web Vitals tuned (LCP, CLS, INP all green)\n• 90+ Lighthouse scores out of the box\n\nMost mobile traffic bounces if a site takes more than 3 seconds. We make sure it doesn't."
        },

        // ── Social media landing page ─────────────────────────────────
        {
            patterns: [/social|instagram|facebook|tiktok|linkedin|landing page|link in bio|bio link/i],
            response: () => "**Social media landing page** is included. A single mobile-first page that lives at your Instagram/Facebook bio link. It includes:\n\n• Click-to-call button\n• Service list\n• Reviews\n• Quote / contact form\n• Photos\n\nMatches your main site branding. Live within 48 hours of your build going up."
        },

        // ── Reports & lead tracking ───────────────────────────────────
        {
            patterns: [/report|monthly report|analytics|tracking|lead tracking|stats|metrics|performance|dashboard/i],
            response: () => "**Real-time lead tracking + monthly reports** — both included.\n\n• See every call, form, and lead the moment it comes in\n• Source attribution (which page/campaign drove it)\n• A plain-English performance report on the 1st of every month: traffic, leads, what's converting, what's not, and what we'll change next\n\nNo logins to hunt through. We email it to you."
        },

        // ── Proactive growth recommendations ──────────────────────────
        {
            patterns: [/proactive|recommend|new ai|ai (system|tool|update)|new feature|stay ahead|first.mover/i],
            response: () => "We watch your data and your local market for you. If a category opens up in your area, a lead pattern shifts, or a new AI tool is ready to plug in, **we call you first**.\n\nYou don't have to ask, research, or chase tech updates. That's our job.\n\n👉 [More about post-launch growth](/#post-launch-growth)"
        },

        // ── Founders / team ───────────────────────────────────────────
        {
            patterns: [/founders?|who (made|built|runs?|owns?)|team|jared|andrew|about (you|us|the team)|who are you/i],
            response: () => `Bright Automations is run by two people: **Jared** (Co-Founder · Build & Strategy) and **Andrew** (Co-Founder · Growth & AI).\n\nYou're not buying from a faceless agency — the same two people answer your calls, write your reports, and ship your AI updates.\n\n👉 [Meet the team](/about)`
        },

        // ── Contracts / cancel / guarantee ────────────────────────────
        {
            patterns: [/contract|cancel|cancellation|guarantee|risk|locked in|commit|trial|refund|money back/i],
            response: () => "Zero risk:\n\n• **No contract** — month-to-month\n• **No setup fee** — $0 to start\n• **Cancel anytime** — no fees, no hassle\n• **Free preview first** — you see the site before you pay anything\n\nWe earn the relationship every month. If we stop earning it, you walk."
        },

        // ── Revisions / changes ───────────────────────────────────────
        {
            patterns: [/revision|edit|change|update (my|the) (site|page|copy)|tweak|modif/i],
            response: () => "Once your site is live, **just text us what you want changed** — copy edits, new photos, new pages, color tweaks — and we'll handle it. No tickets, no project managers.\n\nMost edits ship the same day."
        },

        // ── Content / what they need to provide ───────────────────────
        {
            patterns: [/content|copy|provide|need from me|what do you need|materials|info|images?|photos|logo upload/i],
            response: () => "**Bare minimum:** your business name and what you do.\n\n**Helpful but optional:**\n• Logo (we have an upload field on the form — direct to our private cloud library)\n• Photos (truck, team, finished work — up to 10)\n• Anything specific you want featured\n\nIf you don't have a logo or great photos, we'll work without them or generate something clean to start. We can always swap them in later.\n\n👉 [Open the build form](/contact)"
        },

        // ── Logo / photo uploads (direct ask) ─────────────────────────
        {
            patterns: [/upload|how do i (send|share) (a |my )?(logo|photo|picture|image)|file/i],
            response: () => "Yes — the build form on the contact page has dedicated upload buttons for your **logo** and your **photos** (up to 10). Files go straight to our secure media library and we get an email with direct links to each one.\n\nNo email attachments, no Dropbox links, no size limits to fight with.\n\n👉 [Upload on the build form](/contact)"
        },

        // ── Ownership ─────────────────────────────────────────────────
        {
            patterns: [/own(ership)?|my (site|website|domain|content|data)|portable|take (it|with me)|export/i],
            response: () => "**You own:**\n• Your business content (text, photos, logos you provide)\n• Your domain (whether we registered it or you transferred it)\n• Your Google Business Profile\n• All your customer data + leads\n\n**We own:** the website code/template (you license it while you're a customer).\n\nIf you ever leave, you keep your domain and content. Nothing held hostage."
        },

        // ── Get started / next steps ──────────────────────────────────
        {
            patterns: [/get started|start|begin|sign up|ready|how do i|next step|onboard/i],
            response: () => "Fastest path:\n\n1. **Fill out the 3-question build form** (name, services, style)\n2. Optionally upload logo + photos\n3. **We build a free preview in 48 hours**\n4. We text you the link\n5. Love it? Go live for $99.95/mo. Don't love it? No hard feelings, no charge.\n\n👉 [Start the build form](/contact)"
        },

        // ── How it works (process) ────────────────────────────────────
        {
            patterns: [/how (does|do) (it|this) work|process|step|workflow|onboarding/i],
            response: () => "Three steps:\n\n**1. Free preview.** You fill out the form, we build a real preview site (not a mockup) in 48 hours.\n**2. You review it.** Love it → go live. Don't → no charge.\n**3. Live + improving.** Once live, we run hosting, GBP, SEO, AI reviews, and send you a real monthly report.\n\nNo deck, no proposal call, no quote process. We just build it.\n\n👉 [See the timeline](/services#timeline)"
        },

        // ── Existing website / replace / redesign ─────────────────────
        {
            patterns: [/already have|existing (website|site)|replace|redesign|migrate|switch|come from|move from/i],
            response: () => "Most clients come to us with an existing site that isn't generating leads.\n\nWe'll build you a free preview of what a better one looks like — no commitment. If you love it, **we handle the full transition** (domain, hosting, redirects, GBP, no downtime). If not, no hard feelings.\n\n👉 [Get the free preview](/contact)"
        },

        // ── AI growth systems / Enterprise Systems ────────────────────
        {
            patterns: [/enterprise|growth system|ai system|automation|chatbot|reputation engine|advanced|scale up/i],
            response: () => "Beyond the base $99.95/mo plan, we have **Enterprise AI Systems** — bigger, deeper automations for businesses ready to scale:\n\n• Reputation Engine (review automation)\n• Lead Capture Engine\n• AI Chatbots\n• Custom integrations\n\nThese stack on top of your base plan when you're ready.\n\n👉 [See Enterprise Systems](/systems)"
        },

        // ── Forms / Formspree / how submissions reach us ──────────────
        {
            patterns: [/form|submission|where do (forms|leads) go|email me|get notified|contact form/i],
            response: () => "Form submissions on the build page go directly to **admin@brightautomations.net** — Jared sees every one. Logo and photo uploads come through with clickable links to our secure media library.\n\nResponse time is usually under 4 hours, often within minutes during business hours."
        },

        // ── Contact info ──────────────────────────────────────────────
        {
            patterns: [/contact|reach|talk to (a )?human|speak|call|email|phone|number|how can i contact/i],
            response: () => `Three ways to reach us:\n\n• **Phone:** ${KB.phone}\n• **Email:** ${KB.email}\n• **Strategy call:** [Book a 15-min call](${KB.smsCal})\n\nResponse time usually under 4 hours.\n\n👉 [Or use the contact form](/contact)`
        },

        // ── Locations / service area ──────────────────────────────────
        {
            patterns: [/location|where (are|is) (you|bright)|service area|local|country|state|remote/i],
            response: () => "We're a remote team. We build websites for businesses **anywhere in the US** — your customers find you locally, but our team operates online.\n\nThe Google Business Profile + local SEO work we do is geo-targeted to wherever your customers actually live."
        },

        // ── Social proof / case studies ───────────────────────────────
        {
            patterns: [/proof|case stud|example|portfolio|client|customer|see (your|some) work|results|success/i],
            response: () => "Yep — **5.0 stars on Google** from real customers. You can see live-style review cards on the homepage (David Kowalski, Sarah Tillman, James Loretti, Mike Rennard, more).\n\nFor industry-specific examples or to see a preview of your business, the fastest way is to fill out the build form — you'll see what your site would look like, customized to your trade, in 48 hours.\n\n👉 [See the reviews →](/#testimonials)"
        },

        // ── SMS / texting ─────────────────────────────────────────────
        {
            patterns: [/text|sms|texting|message me|message you/i],
            response: () => `You can text us at ${KB.phone}. We use text for fast post-launch updates and quick changes — most edits get handled the same day.\n\nWhen you sign up, the form has SMS consent so we can text you the preview link the moment it's ready.`
        },

        // ── Tech stack / how the site is built ────────────────────────
        {
            patterns: [/tech stack|what.*built|wordpress|webflow|wix|shopify|framework|code|html|cms/i],
            response: () => "We build on a custom modern stack — handcoded HTML/CSS/JS, deployed on Vercel's global edge network, optimized for Core Web Vitals out of the box.\n\nNot WordPress (slow, vulnerable). Not Wix or Squarespace (bloated, generic). Not GoDaddy builders (just bad).\n\nResult: faster sites, better SEO, no plugins to break, and full control when you want changes."
        },

        // ── Compliance / privacy ──────────────────────────────────────
        {
            patterns: [/privacy|gdpr|ccpa|compliance|data|tcpa|consent/i],
            response: () => "We're TCPA-compliant on SMS, GDPR-aware on data, and we never sell your customer data — ever.\n\n👉 [Privacy policy](/privacy) · [Terms](/terms) · [SMS consent](/sms-consent)"
        },

        // ── Setup process / what happens after intake ─────────────────
        {
            patterns: [/after (i|sign up|submit|fill)|next|what happens|once i'?ve|then what/i],
            response: () => "After you submit the build form:\n\n1. **Within 15 minutes** — Jared or Andrew texts you to confirm we got it\n2. **Within 24 hours** — we send any clarifying questions (rare)\n3. **Within 48 hours** — your free preview site is live, you get the link\n4. **You decide** — go live for $99.95/mo, or walk away for $0\n\nNo strings, no high-pressure call."
        },

        // ── Confirmations & courtesy ──────────────────────────────────
        {
            patterns: [/^(thanks|thank you|thx|ty|appreciate|cool|nice|awesome|great|perfect)[\s!.?]*$/i],
            response: () => "You're welcome! Anything else you want to know? Pricing, timeline, what's included, the team — happy to dig into any of it."
        },
        {
            patterns: [/^(bye|goodbye|see you|ttyl|talk later|that'?s (all|it))[\s!.?]*$/i],
            response: () => "Talk soon — and if you decide to start, the build form's right here: [/contact](/contact). Have a good one."
        },
        {
            patterns: [/^(yes|yeah|yep|sure|ok|okay|sounds good)[\s!.?]*$/i],
            response: () => "Great. Do you want to (a) start the free build form, (b) hop on a 15-min strategy call, or (c) ask me a specific question first?"
        },
        {
            patterns: [/^no$|^nope$|^not (yet|interested|now)/i],
            response: () => "All good. If anything comes up later, I'm here. You can also reach the team directly at " + KB.phone + " or " + KB.email + "."
        }
    ];

    // Default fallback responses (random)
    const DEFAULT_RESPONSES = [
        `Good question — I want to give you the right answer. Some things I can dig into:\n\n• Pricing & what's included\n• How the 48-hour build works\n• Logo & photo uploads\n• Industries we work with\n• Reports, SEO, AI reviews\n\nOr reach the team: ${KB.phone} · ${KB.email}`,
        `Hmm, let me try a different angle. Can you rephrase, or pick one of these?\n\n• What's it cost?\n• How fast can it go live?\n• What's included?\n• Who's behind it?\n\nOr text us directly at ${KB.phone}.`,
        `That one might be better answered by a real human. Try ${KB.email} or ${KB.phone} — usually under 4-hour response.\n\nIn the meantime, want me to walk you through pricing, the 4-layer stack, or the first 90 days?`
    ];

    // Quick-action chips (shown above the input the first time chat opens)
    const QUICK_ACTIONS = [
        { label: "Pricing", value: "How much does it cost?" },
        { label: "What's Included", value: "What's included in the plan?" },
        { label: "How It Works", value: "How does the process work?" },
        { label: "Get Started", value: "I want to get started" }
    ];

    // ─── State ───────────────────────────────────────────────────────
    let isOpen = false;
    let messages = [];
    let isTyping = false;

    // ─── Build markup ────────────────────────────────────────────────
    function createChatbotHTML() {
        const chatbotHTML = `
            <div id="ba-chatbot" class="ba-chatbot">
                <button class="ba-chat-toggle" id="ba-chat-toggle" aria-label="Open chat">
                    <span class="ba-toggle-icon ba-icon-chat">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </span>
                    <span class="ba-toggle-icon ba-icon-close" style="display: none;">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </span>
                    <span class="ba-chat-badge" id="ba-chat-badge">1</span>
                </button>

                <div class="ba-chat-window" id="ba-chat-window" role="dialog" aria-label="Bright Automations chat">
                    <div class="ba-chat-header">
                        <div class="ba-header-info">
                            <div class="ba-avatar">
                                <img src="images/logo-final.png" alt="Bright Automations" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <span class="ba-avatar-fallback" style="display: none;">BA</span>
                            </div>
                            <div class="ba-header-text">
                                <span class="ba-header-title">Bright Automations</span>
                                <span class="ba-header-status">
                                    <span class="ba-status-dot"></span>
                                    Online · Replies instantly
                                </span>
                            </div>
                        </div>
                        <button class="ba-close-btn" id="ba-close-btn" aria-label="Close chat">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>

                    <div class="ba-chat-messages" id="ba-chat-messages"></div>

                    <div class="ba-quick-actions" id="ba-quick-actions">
                        ${QUICK_ACTIONS.map(a => `<button class="ba-quick-btn" data-value="${a.value}">${a.label}</button>`).join('')}
                    </div>

                    <div class="ba-chat-input-area">
                        <div class="ba-input-container">
                            <input type="text" class="ba-chat-input" id="ba-chat-input" placeholder="Type your message…" autocomplete="off" />
                            <button class="ba-send-btn" id="ba-send-btn" aria-label="Send">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"/>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ba-powered-by">Powered by Bright Automations AI</div>
                    </div>
                </div>
            </div>`;
        const c = document.createElement('div');
        c.innerHTML = chatbotHTML;
        document.body.appendChild(c.firstElementChild);
    }

    // ─── Intent matching ─────────────────────────────────────────────
    function getResponse(message) {
        const m = message.toLowerCase().trim();
        for (const intent of INTENTS) {
            for (const p of intent.patterns) {
                if (p.test(m)) return intent.response();
            }
        }
        return DEFAULT_RESPONSES[Math.floor(Math.random() * DEFAULT_RESPONSES.length)];
    }

    // ─── Render ──────────────────────────────────────────────────────
    function addMessage(content, isUser = false, showTyping = true) {
        if (!isUser && showTyping) {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                renderMessage(content, isUser);
            }, 700 + Math.random() * 600);
        } else {
            renderMessage(content, isUser);
        }
    }

    function renderMessage(content, isUser) {
        const c = document.getElementById('ba-chat-messages');
        const div = document.createElement('div');
        div.className = `ba-message ${isUser ? 'ba-user-message' : 'ba-bot-message'}`;
        const formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/👉 \[(.*?)\]\((.*?)\)/g, '<a href="$2" class="ba-chat-link">$1 →</a>')
            .replace(/(?<![">])\[(.*?)\]\((.*?)\)(?!")/g, '<a href="$2" style="color: var(--chat-primary); font-weight: 600; text-decoration: underline;">$1</a>')
            .replace(/• /g, '<span class="ba-bullet">•</span> ');
        div.innerHTML = `<div class="ba-message-content">${formatted}</div>`;
        c.appendChild(div);
        c.scrollTop = c.scrollHeight;
        messages.push({ content, isUser, ts: Date.now() });
    }

    function showTypingIndicator() {
        const c = document.getElementById('ba-chat-messages');
        const t = document.createElement('div');
        t.className = 'ba-message ba-bot-message ba-typing-indicator';
        t.id = 'ba-typing';
        t.innerHTML = `<div class="ba-message-content"><div class="ba-typing-dots"><span></span><span></span><span></span></div></div>`;
        c.appendChild(t);
        c.scrollTop = c.scrollHeight;
        isTyping = true;
    }

    function hideTypingIndicator() {
        const t = document.getElementById('ba-typing');
        if (t) t.remove();
        isTyping = false;
    }

    // ─── Input handling ──────────────────────────────────────────────
    function handleUserInput() {
        const input = document.getElementById('ba-chat-input');
        const msg = input.value.trim();
        if (!msg) return;
        // If bot is still typing a previous reply, dismiss it so the user message lands now
        if (isTyping) hideTypingIndicator();
        addMessage(msg, true, false);
        input.value = '';
        addMessage(getResponse(msg), false, true);
        const qa = document.getElementById('ba-quick-actions');
        if (qa && messages.length > 2) qa.style.display = 'none';
    }

    // ─── Toggle ──────────────────────────────────────────────────────
    function toggleChat() {
        const win = document.getElementById('ba-chat-window');
        const chatIcon = document.querySelector('.ba-icon-chat');
        const closeIcon = document.querySelector('.ba-icon-close');
        const badge = document.getElementById('ba-chat-badge');
        const toggle = document.getElementById('ba-chat-toggle');
        isOpen = !isOpen;
        if (isOpen) {
            win.classList.add('ba-open');
            toggle.classList.add('opened');
            chatIcon.style.display = 'none';
            closeIcon.style.display = 'flex';
            if (badge) badge.style.display = 'none';
            // Focus input — slight delay so the slide-in finishes first
            setTimeout(() => {
                const input = document.getElementById('ba-chat-input');
                if (input && window.innerWidth > 600) input.focus();
            }, 320);
            // First-time welcome
            if (messages.length === 0) {
                setTimeout(() => {
                    addMessage("Hey! I'm the Bright Automations assistant. We build AI-powered revenue systems for any business — free to start, $99.95/mo, live in 48 hours.\n\nWhat can I help with?", false, true);
                }, 380);
            }
        } else {
            win.classList.remove('ba-open');
            toggle.classList.remove('opened');
            chatIcon.style.display = 'flex';
            closeIcon.style.display = 'none';
        }
    }

    // ─── Init ────────────────────────────────────────────────────────
    function init() {
        createChatbotHTML();
        document.getElementById('ba-chat-toggle').addEventListener('click', toggleChat);
        document.getElementById('ba-close-btn').addEventListener('click', toggleChat);
        document.getElementById('ba-send-btn').addEventListener('click', handleUserInput);
        document.getElementById('ba-chat-input').addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserInput();
            }
        });
        document.querySelectorAll('.ba-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('ba-chat-input').value = btn.getAttribute('data-value');
                handleUserInput();
            });
        });
        // Pulse the badge after 4 seconds to invite engagement
        setTimeout(() => {
            const b = document.getElementById('ba-chat-badge');
            if (b && !isOpen) b.style.display = 'flex';
        }, 4000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
