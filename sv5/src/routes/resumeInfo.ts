// Updated TO_PRINT array with adjusted speeds for smoother scrolling and swapped projects
export const TO_PRINT = [
    {
        initial:
            '<div class="font-ibm-bold bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl" style="color: var(--color-accent1);">' +
            '↓ Scroll to see my resume ↓' +
            '</div>',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@' +
            'Hello, I\'m @<br><span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl" style="color: var(--color-accent2);">@Donnie Winkelman!!@~</span>@' +
            '@</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            'Wanderer of @<span class="font-semibold" style="color: var(--color-accent1);">@systems @</span>@and @<span class="font-semibold" style="color: var(--color-accent3);">@science!@</span>@' +
            '@<div class="text-right mt-4">@' +
            '... and @<span class="font-semibold" style="color: var(--color-neutral);">@delving spots@</span>@         ' +
            '@<br>@' +
            '... and @<span class="font-semibold" style="color: var(--color-accent4);">@backwoods@</span>@          ' +
            '@<br>@' +
            '... and all things @<span class="font-semibold" style="color: var(--color-primary);">@blue@</span>@' +
            '@</div>@' +
            '@</div>@',
        speed: [10, 2],  // Slightly slower than original 5 for better readability
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Bio@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            'Hi I\'m Donnie! I\'m a @<span class="font-semibold" style="color: var(--color-accent1);">@CS Major @</span>@at @<span class="font-semibold" style="color: var(--color-accent2);">@UMass Amherst@</span>@ with a passion ' +
            'for exploring fields with wonderful people and inspiring works.' +
            '@<br><br>@' +
            'I\'m especially interested in the fields of @<span class="font-semibold" style="color: var(--color-accent3);">@Data Science@</span>@, @<span class="font-semibold" style="color: var(--color-primary);">@Machine Learning@</span>@, and ' +
            '@<span class="font-semibold" style="color: var(--color-accent5);">@Medical Software@</span>@.' +
            '@<br><br>@' +
            'Feel free to reach out to me to discuss any interesting discoveries!' +
            '@<br><br>@' +
            '@<div class="mt-6 pt-4" style="border-top: 1px solid var(--color-border);">@' +
            '@<span class="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold" style="color: var(--color-primary);">~@Contact Me@~</span>@' +
            '@<br><br>@' +
            '<a href="mailto:dwinkelman@umass.edu" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@dwinkelman (at) umass.edu@</a>@' +
            '@<br>@' +
            '@<span style="color: var(--color-neutral);">@(512) 705-6738@</span>@' +
            '@<br><br>@' +
            '@<span class="font-semibold">@Connect:@</span>@ ' +
            '<a href="https://linkedin.com/in/dmwink" class="hover:underline ml-2 font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@LinkedIn@</a>@ | ' +
            '<a href="https://github.com/TheWelcomer" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@</div>@' +
            '@</div>@',
        speed: [10, 1, 10, 1],  // Adjusted from 3, 1 for more proportional timing
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Technologies@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold" style="color: var(--color-accent2);">@ML/Deep Learning: @</span>@PyTorch, TensorFlow, HuggingFace, LangChain, W&B, RAGs, LLMs, ConvNets, Mamba' +
            '@<br><br>@' +
            '@<span class="font-semibold" style="color: var(--color-accent3);">@Data Science: @</span>@NumPy, Pandas, Sklearn, Mechanistic Interpretability, Feature Visualization, Integrated Gradients' +
            '@<br><br>@' +
            '@<span class="font-semibold" style="color: var(--color-primary);">@Languages: @</span>@Python, TypeScript/JavaScript, SQL, C/C++, Java, C#, Swift' +
            '@<br><br>@' +
            '@<span class="font-semibold" style="color: var(--color-accent1);">@Web/Cloud: @</span>@Linux, Docker, React, Next.js, Node.js, AWS, gRPC, Sockets, PostgreSQL, Tailwind, Svelte, Express.js' +
            '@<br><br>@' +
            '@<span class="font-semibold" style="color: var(--color-accent6);">@Methodologies: @</span>@Agile/Scrum, CI/CD, Kanban, Research Design' +
            '@</div>@',
        speed: [10, 1],  // Consistent with card 2
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Education@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@University of Massachusetts Amherst@</span>@ — GPA: 3.9' +
            '@<br>@' +
            '@<span class="italic" style="color: var(--color-accent1);">@M.S. Computer Science — Specialization in Data Science and Machine Learning@</span>@' +
            '@<br>@' +
            'Jan. 2025 - Dec. 2025' +
            '@<br>@' +
            'Relevant Coursework: Distributed Systems, Data Science for Decarbonization, Natural Language Processing' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@University of Massachusetts Amherst@</span>@ — GPA: 3.8' +
            '@<br>@' +
            '@<span class="italic" style="color: var(--color-accent1);">@B.S. Computer Science@</span>@' +
            '@<br>@' +
            'Sep. 2022 - Dec. 2024' +
            '@</div>@',
        speed: [10, 1],  // Slightly faster than the others to match content length
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Experience@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@MassAI@</span>@ | ' +
            '@<a href="https://umassai.com" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Website@</a>@ | ' +
            '@<a href="https://drive.google.com/drive/folders/1VfNmyicJShFuCoEYVMOLYh2JlEQm-0xN?usp=drive_link" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Public Resources@</a>@' +
            '@<br>@' +
            '@<span class="italic" style="color: var(--color-accent1);">@Co-President, Events and Marketing Coordinator@</span>@ — Aug. 2024 - Present' +
            '@<br>@' +
            '• Pioneered @<a href="https://docs.google.com/spreadsheets/d/11xSDUXISamYL7xZoZZhUM-FVDlsiR8LVN5sO5AzqG60/edit?usp=sharing" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@20+ club-led projects@</a>@ while personally leading 2 teams, engaging 100+ students' +
            '@<br>@' +
            '• Led recruitment and onboarding of 18 events, marketing, project, web, and treasury coordinators' +
            '@<br>@' +
            '• Implemented @<a href="https://umassai.com" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@umassai.com@</a>@ with SvelteKit, Tailwind, and Google Calendar API, achieving 600+ MAU' +
            '@<br>@' +
            '• Founded and led weekly @<a href="https://docs.google.com/spreadsheets/d/1IOpD45AzsHMJ_4i5vE1xt2t8s0ejw-KyQ4eBf-2xwZM/edit?usp=sharing" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@research reading group@</a>@, @<a href="https://drive.google.com/drive/u/0/folders/1z0agrdLdUp2aPWMWvZcES8WuadsheKq1?ths=true" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@ML workshops@</a>@, and @<a href="https://drive.google.com/drive/folders/1E6J2cl7Jh_uCL_es2TQSJEcpKjo1q4pT?usp=sharing" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@competitions@</a>@' +
            '@</div>@',
        speed: [10, 1],  // Consistent speed
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Experience Cont.@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@Secure, Private Internet (SPIN) Research Group@</span>@ | ' +
            '@<a href="https://umass-my.sharepoint.com/:p:/g/personal/atepal_umass_edu/EZXuPQJGZJdNixAaAVn4b1gBYUYDyfbgVgpYpoGchMZBlw?e=eQTqwk" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Poster@</a>@ | ' +
            '@<a href="https://github.com/TheWelcomer/T2V-Safety-Filter" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '@<span class="italic" style="color: var(--color-accent1);">@AI Safety Researcher@</span>@ — Dec. 2024 - Feb. 2025' +
            '@<br>@' +
            '• Built NSFW content filtering system for text-to-video prompts using phi4 and Deepseek-R1' +
            '@<br>@' +
            '• Analyzed 432 prompts, finding temporal risk filter gap (93% accuracy on non-temporal vs 61% on temporal)' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@UMass Computer Science Department@</span>@ | ' +
            '@<a href="https://drive.google.com/file/d/1WCo-ORjNIpSAQPUe93MOigFPBd11jm8L/view?usp=sharing" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Paper@</a>@ | ' +
            '@<a href="https://github.com/maxwell3025/CV-IS-Fall-2024" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '@<span class="italic" style="color: var(--color-accent1);">@Research Assistant@</span>@ — Aug. 2024 - Dec. 2024' +
            '@<br>@' +
            '• Led study revealing VGG16 develops progressive feature complexity with distinct pattern recognition' +
            '@<br>@' +
            '• Co-authored research showing Mamba\'s in-context learning improved accuracy by up to 40% on OCR' +
            '@<br>@' +
            '• Identified sentiment detection limitations using integrated gradients' +
            '@</div>@',
        speed: [10, 1],  // Consistent speed
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Projects@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@BeatCode.dev@</span>@ | SvelteKit, FastAPI, PostgreSQL, WebSockets | ' +
            '@<a href="https://beatcode.dev/" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Demo@</a>@ | ' +
            '@<a href="https://github.com/beatcode-official" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '• Built competitive coding platform with 900+ registered users using JWT auth and WebSockets' +
            '@<br>@' +
            '• Implemented real-time code execution with test cases, sabotage abilities, and ELO-based ranking' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@ClubberNaut@</span>@ | React, Next.js, Supabase | ' +
            '@<a href="https://github.com/TheWelcomer/clubbernaut" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '• Built full-stack platform with REST API endpoints to support UMass club community' +
            '@<br>@' +
            '• Led 7-person Agile team through implementation of authentication, club creation/discovery features' +
            '@</div>@',
        speed: [10, 1],  // Slightly adjusted for better pacing
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Projects Cont.@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@Self-Driving Car Vision@</span>@ | PyTorch, Computer Vision | ' +
            '@<a href="https://www.youtube.com/watch?v=9HHAOiQH_pA&t=78s" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Demo@</a>@ | ' +
            '@<a href="https://github.com/TheWelcomer/Self-Driving-Car-Vision" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '• Trained ResNet model on 11,110-image dataset to predict vehicle positioning, increasing accuracy by 1,300%' +
            '@<br>@' +
            '• Engineered data augmentation pipeline, reducing overfitting and resolving gradient instability issues' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@UMass CLog@</span>@ | React Native, Supabase, BeautifulSoup | ' +
            '@<a href="https://devpost.com/software/umass-clog" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Demo@</a>@' +
            '@<br>@' +
            '• Developed healthcare app analyzing 200+ ingredients with 37 attributes to predict IBD trigger foods' +
            '@<br>@' +
            '• Implemented automated data extraction system and real-time symptom tracking' +
            '@</div>@',
        speed: [10, 1],  // Matched with previous card
    },
    {
        initial: '',
        text:
            '@<div class="font-ibm-bold italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl" style="color: var(--color-primary);">@Awards & Recognition@~</div>@' +
            '@<br>@' +
            '@<div class="font-ibm italic text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl" style="color: var(--color-text);">@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@Best AI Hack@</span>@, HackHer413 (2025) | ' +
            '@<a href="https://www.youtube.com/watch?v=XfWcxHTRSsI" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@Demo@</a>@ | ' +
            '@<a href="https://github.com/Timmald/WoRLester" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '• Find a seat at Worcester gym and agents for the MassAI RLympics' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@Best Healthcare Hack@</span>@, HackUMass (2022) | ' +
            '@<a href="https://github.com/HackUMass-Allergens/mobile-app" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@GitHub@</a>@' +
            '@<br>@' +
            '• UMass SAFER meal ordering service, reduced processing time by 1,200% and added allergy-based filtering' +
            '@<br>@' +
            '• Later integrated into @<a href="https://umassdining.com/mobile-application" class="hover:underline font-semibold" style="color: var(--color-link); border-bottom: 2px solid var(--color-link-border);" target="_blank">@UMass Dining App 2.0@</a>@' +
            '@<br><br>@' +
            '@<span class="font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl" style="color: var(--color-accent2);">@Earned all 137 merit badges@</span>@, Scouts BSA (2021)' +
            '@<br>@' +
            '• Achieved by <500 scouts globally, Eagle Scout, 600+ volunteer hours' +
            '@</div>@',
        speed: [10, 1],  // Back to standard speed for final card
    },
];