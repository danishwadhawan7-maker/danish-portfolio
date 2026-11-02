import type {
  CertificateItem,
  CVAchievementItem,
  CVEducationItem,
  CVExperienceItem,
  ProfileData,
  ProjectItem,
  SkillGroup,
} from '../types/portfolio';

export const DEFAULT_PORTRAIT_SVG = '/danish-photo.png';

function makeCertificateSvg(
  title: string,
  issuer: string,
  idCode: string,
  date: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090B" />
        <stop offset="50%" stop-color="#050507" />
        <stop offset="100%" stop-color="#18181B" />
      </linearGradient>
      <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#A1A1AA" />
      </linearGradient>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
    <rect width="800" height="560" rx="20" fill="url(#bg)" />
    <rect width="800" height="560" rx="20" fill="url(#dots)" />
    <rect x="24" y="24" width="752" height="512" rx="14" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="1.5" />
    <rect x="38" y="38" width="724" height="484" rx="10" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
    <circle cx="680" cy="110" r="110" fill="#FFFFFF" opacity="0.05" />
    <text x="72" y="95" fill="#D4D4D8" font-family="monospace" font-size="13" letter-spacing="4" font-weight="bold">VERIFIED CREDENTIAL // ${issuer.toUpperCase()}</text>
    <line x1="72" y1="115" x2="360" y2="115" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
    <text x="72" y="175" fill="#71717A" font-family="sans-serif" font-size="13" letter-spacing="3">THIS CERTIFIES THAT</text>
    <text x="72" y="232" fill="#FFFFFF" font-family="sans-serif" font-size="40" font-weight="800" letter-spacing="1">DANISH</text>
    <text x="72" y="275" fill="#71717A" font-family="sans-serif" font-size="13" letter-spacing="2">HAS SUCCESSFULLY MASTERED &amp; COMPLETED</text>
    <text x="72" y="330" fill="url(#chrome)" font-family="sans-serif" font-size="25" font-weight="700">${title}</text>
    <rect x="72" y="410" width="220" height="64" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    <text x="90" y="435" fill="#71717A" font-family="monospace" font-size="11" letter-spacing="2">CREDENTIAL ID</text>
    <text x="90" y="458" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">${idCode}</text>
    <rect x="312" y="410" width="165" height="64" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    <text x="330" y="435" fill="#71717A" font-family="monospace" font-size="11" letter-spacing="2">ISSUED DATE</text>
    <text x="330" y="458" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">${date}</text>
    <circle cx="655" cy="435" r="44" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="6 4" />
    <circle cx="655" cy="435" r="32" fill="rgba(255,255,255,0.08)" />
    <text x="655" y="432" fill="#FFFFFF" font-family="monospace" font-size="10" text-anchor="middle" font-weight="bold">VERIFIED</text>
    <text x="655" y="447" fill="#A1A1AA" font-family="monospace" font-size="10" text-anchor="middle">SHA-256</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function makeProjectSvg(title: string, tag: string, indexStr: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#09090B" />
        <stop offset="50%" stop-color="#050507" />
        <stop offset="100%" stop-color="#121216" />
      </linearGradient>
      <radialGradient id="spot" cx="25%" cy="20%" r="70%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.16)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0)" />
      </radialGradient>
      <pattern id="pgrid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="750" fill="url(#g)" />
    <rect width="1200" height="750" fill="url(#pgrid)" />
    <rect width="1200" height="750" fill="url(#spot)" />
    <rect x="96" y="85" width="1008" height="580" rx="24" fill="rgba(9,9,11,0.9)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
    <circle cx="136" cy="124" r="6" fill="rgba(255,255,255,0.35)" />
    <circle cx="158" cy="124" r="6" fill="rgba(255,255,255,0.2)" />
    <circle cx="180" cy="124" r="6" fill="rgba(255,255,255,0.1)" />
    <line x1="96" y1="154" x2="1104" y2="154" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
    <circle cx="840" cy="405" r="155" fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="2" stroke-dasharray="12 8" />
    <circle cx="840" cy="405" r="105" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
    <polygon points="840,280 948,465 732,465" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" />
    <text x="155" y="250" fill="#A1A1AA" font-family="monospace" font-size="15" letter-spacing="4">SYSTEM MODULE // ${indexStr}</text>
    <text x="155" y="330" fill="#FFFFFF" font-family="sans-serif" font-size="50" font-weight="800">${title}</text>
    <text x="155" y="382" fill="#A1A1AA" font-family="monospace" font-size="18" letter-spacing="2">${tag}</text>
    <rect x="155" y="445" width="235" height="92" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    <text x="180" y="480" fill="#71717A" font-family="monospace" font-size="12">RENDER ENGINE</text>
    <text x="180" y="514" fill="#FFFFFF" font-family="monospace" font-size="22" font-weight="bold">WebGL 2.0 / 120FPS</text>
    <rect x="415" y="445" width="215" height="92" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
    <text x="440" y="480" fill="#71717A" font-family="monospace" font-size="12">ARCHITECTURE</text>
    <text x="440" y="514" fill="#E4E4E7" font-family="monospace" font-size="22" font-weight="bold">SPATIAL CLOUD</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const DEFAULT_PROFILE_DATA: ProfileData = {
  name: 'DANISH',
  firstName: 'DANISH',
  lastName: '',
  role: 'Creative Technologist, 3D WebGL & AI Systems Architect',
  tagline: 'ENGINEERING SPATIAL WEB EXPERIENCES & AI SYSTEMS THAT FEEL ALIVE.',
  subTagline:
    'Bring your UI to life with beautiful interactive 3D scenes, high-frequency full-stack engineering, and autonomous AI systems designed for precision.',
  bio: "I'm Danish — a multidisciplinary Full-Stack Engineer, 3D WebGL Architect, and AI Systems Developer crafting next-generation spatial web interfaces. Inspired by spacecraft command systems and monochrome precision, I build interactive 3D products and scalable cloud platforms.",
  philosophy:
    'Great software commands attention through clarity, spatial depth, and zero-latency responsiveness.',
  location: 'New Delhi / Remote Worldwide',
  timezone: 'IST (UTC +05:30)',
  email: 'danish.dev@portfolio.studio',
  phone: '+91 98765 43210',
  availability: 'SYS.ONLINE // AVAILABLE FOR SELECT ROLES & PROJECTS',
  yearsOfExperience: '4+',
  projectsCompleted: '35+',
  certificatesCount: '12+',
  clientSatisfaction: '100%',
  portraitUrl: DEFAULT_PORTRAIT_SVG,
  isCustomPortrait: true,
  portraitFrameStyle: 'hologram',
  portraitScale: 1,
  customModelUrl: null,
  customModelName: null,
  active3DPreset: 'gyro-core',
  wireframeMode: false,
  autoRotateSpeed: 1.0,
  particleDensity: 1.0,
  accentTheme: 'amber-cyan',
  cvPdfUrl: null,
  cvFileName: null,
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
    dribbble: 'https://dribbble.com',
    instagram: 'https://instagram.com',
  },
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-aether-engine',
    number: '01',
    title: 'AETHERIA // 3D SPATIAL OS',
    subtitle: 'WebGL Neural Interface & Real-Time Telemetry Cloud',
    category: '3D WebGL & AI Platform',
    year: '2026',
    description:
      'An interactive 3D spatial workspace rendering 50,000+ live data nodes in custom GLSL instanced meshes, paired with a sub-40ms streaming AI orchestration engine.',
    architectureNote:
      'Custom Three.js InstancedBufferGeometry pipeline + Spline WebGL runtime + WebSockets binary state sync.',
    metrics: [
      { label: 'Frame Rate', value: '120 FPS' },
      { label: 'Active Nodes', value: '50,000+' },
      { label: 'Latency', value: '< 18ms' },
    ],
    techStack: ['Spline 3D', 'Three.js', 'React 19', 'TypeScript', 'GLSL', 'WebSockets'],
    liveUrl: '#works',
    githubUrl: 'https://github.com',
    accentColor: '#FFFFFF',
    secondaryColor: '#A1A1AA',
    previewImage: makeProjectSvg(
      'AETHERIA 3D OS',
      'SPATIAL COMPUTING // WEBGL SHADERS',
      '01'
    ),
    featured: true,
  },
  {
    id: 'proj-kronos-fintech',
    number: '02',
    title: 'KRONOS QUANTUM LEDGER',
    subtitle: 'Algorithmic Liquidity Visualizer & Institutional Terminal',
    category: 'FinTech & Telemetry UI',
    year: '2026',
    description:
      'Next-generation institutional cockpit featuring real-time order-book depth heatmaps, GPU-accelerated canvas charts, and spacecraft-grade telemetry precision.',
    architectureNote:
      'Zero-allocation ring buffers in WebWorkers feeding a hardware-accelerated WebGL2 candlestick & depth renderer.',
    metrics: [
      { label: 'Throughput', value: '1.2M msg/s' },
      { label: 'UI Jitter', value: '0.0 ms' },
      { label: 'Conversion Lift', value: '+64%' },
    ],
    techStack: ['Next.js', 'TypeScript', 'WebGL2', 'Tailwind CSS', 'Framer Motion', 'Rust WASM'],
    liveUrl: '#works',
    githubUrl: 'https://github.com',
    accentColor: '#FFFFFF',
    secondaryColor: '#A1A1AA',
    previewImage: makeProjectSvg(
      'KRONOS TERMINAL',
      'HIGH-FREQUENCY FINTECH // WASM + WEBGL',
      '02'
    ),
    featured: true,
  },
  {
    id: 'proj-hyperion-studio',
    number: '03',
    title: 'HYPERION KINETIC STUDIO',
    subtitle: 'Generative 3D Product Configurator & Ray-Marched Showcase',
    category: 'Interactive 3D Commerce',
    year: '2025',
    description:
      'Bespoke 3D product customization engine allowing users to inspect physically-based materials, trigger mechanical animations on scroll, and export AR-ready GLB assets.',
    architectureNote:
      'PBR environment lighting with custom HDRI convolution, Draco-compressed GLTF streaming, and Lenis scroll-scrubbing.',
    metrics: [
      { label: 'Engagement Time', value: '4.8x Avg' },
      { label: 'Load Time', value: '0.9s' },
      { label: '3D Assets', value: 'Draco GLB' },
    ],
    techStack: ['Spline', 'Three.js', 'GLTF / Draco', 'GSAP ScrollTrigger', 'Lenis'],
    liveUrl: '#works',
    githubUrl: 'https://github.com',
    accentColor: '#FFFFFF',
    secondaryColor: '#A1A1AA',
    previewImage: makeProjectSvg(
      'HYPERION 3D LAB',
      'REAL-TIME CONFIGURATOR // GLTF PBR',
      '03'
    ),
    featured: true,
  },
  {
    id: 'proj-nexus-ai',
    number: '04',
    title: 'NEXUS AUTONOMOUS AGENT HUB',
    subtitle: 'Multi-Agent Workflow Canvas & Graph Execution Engine',
    category: 'Generative AI & Cloud',
    year: '2025',
    description:
      'Visual node-graph IDE for chaining autonomous LLM agents, vector memory stores, and live tool execution with real-time token telemetry.',
    architectureNote:
      'DAG execution scheduler backed by Google Cloud Run, Firestore real-time streams, and custom Canvas bezier node links.',
    metrics: [
      { label: 'Active Workflows', value: '12,400+' },
      { label: 'Token Latency', value: '32ms TTFT' },
      { label: 'Uptime', value: '99.98%' },
    ],
    techStack: ['React', 'Python FastAPI', 'Gemini API', 'Google Cloud', 'Docker', 'Redis'],
    liveUrl: '#works',
    githubUrl: 'https://github.com',
    accentColor: '#FFFFFF',
    secondaryColor: '#A1A1AA',
    previewImage: makeProjectSvg(
      'NEXUS AGENT IDE',
      'AUTONOMOUS AI GRAPH // CLOUD NATIVE',
      '04'
    ),
    featured: true,
  },
];

export const DEFAULT_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Google Cloud Professional Cloud Architect & AI Engineering',
    issuer: 'Google Cloud',
    issuerLogoText: 'GCP',
    issueDate: '2026',
    credentialId: 'GCP-ARCH-99482-DN',
    verifyUrl: 'https://cloud.google.com/certification',
    category: 'Cloud & AI',
    skills: ['Cloud Architecture', 'Vertex AI', 'Kubernetes', 'Distributed Systems'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'Professional Cloud & AI Architect',
      'Google Cloud',
      'GCP-ARCH-99482-DN',
      '2026'
    ),
    description:
      'Advanced certification covering enterprise cloud infrastructure design, high-availability microservices, and production generative AI deployment.',
    verified: true,
  },
  {
    id: 'cert-2',
    title: 'Three.js & Spline 3D — Masterclass in Interactive WebGL & Shaders',
    issuer: 'Three.js Journey / Spline',
    issuerLogoText: '3JS',
    issueDate: '2026',
    credentialId: 'TJS-GLSL-77410-DN',
    verifyUrl: 'https://threejs-journey.com',
    category: 'Full-Stack & WebGL',
    skills: ['Spline 3D', 'Three.js', 'GLSL Shaders', 'Blender to WebGL', 'Physics'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'Interactive 3D WebGL & GLSL Shaders',
      'Three.js Journey',
      'TJS-GLSL-77410-DN',
      '2026'
    ),
    description:
      'Comprehensive mastery of 3D mathematics, interactive Spline scenes, custom vertex/fragment shaders, and 60fps WebGL optimization.',
    verified: true,
  },
  {
    id: 'cert-3',
    title: 'Meta Certified Full-Stack Software Engineer Professional',
    issuer: 'Meta Engineering',
    issuerLogoText: 'META',
    issueDate: '2025',
    credentialId: 'META-FS-55821-DN',
    verifyUrl: 'https://www.coursera.org',
    category: 'Full-Stack & WebGL',
    skills: ['React Architecture', 'System Design', 'API Security', 'CI/CD Pipelines'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'Full-Stack Software Engineer Professional',
      'Meta Engineering',
      'META-FS-55821-DN',
      '2025'
    ),
    description:
      'Production-grade frontend and backend engineering, state management at scale, relational & NoSQL data modeling, and automated testing.',
    verified: true,
  },
  {
    id: 'cert-4',
    title: 'Awwwards Masterclass — Interactive Motion & Design Systems',
    issuer: 'Awwwards Academy',
    issuerLogoText: 'AWW',
    issueDate: '2025',
    credentialId: 'AWW-UX-33109-DN',
    verifyUrl: 'https://www.awwwards.com',
    category: 'UI/UX & Product',
    skills: ['GSAP ScrollTrigger', 'Spatial UI', 'Design Systems', 'Micro-Interactions'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'Interactive Motion & Design Systems',
      'Awwwards Academy',
      'AWW-UX-33109-DN',
      '2025'
    ),
    description:
      'Choreographing scroll-driven storytelling, spatial UI transitions, accessibility-first motion tokens, and editorial grid typography.',
    verified: true,
  },
  {
    id: 'cert-5',
    title: 'DeepLearning.AI — Generative AI with LLMs & Multi-Agent Systems',
    issuer: 'DeepLearning.AI & AWS',
    issuerLogoText: 'DL.AI',
    issueDate: '2025',
    credentialId: 'DLAI-GEN-88214-DN',
    verifyUrl: 'https://www.deeplearning.ai',
    category: 'Cloud & AI',
    skills: ['RAG Pipelines', 'Fine-Tuning (RLHF)', 'Agentic Workflows', 'Vector Databases'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'Generative AI & Multi-Agent Engineering',
      'DeepLearning.AI',
      'DLAI-GEN-88214-DN',
      '2025'
    ),
    description:
      'Transformer architecture internals, instruction fine-tuning, retrieval-augmented generation (RAG), and multi-agent tool orchestration.',
    verified: true,
  },
  {
    id: 'cert-6',
    title: 'AWS Certified Solutions Architect & Cloud Security Specialist',
    issuer: 'Amazon Web Services',
    issuerLogoText: 'AWS',
    issueDate: '2024',
    credentialId: 'AWS-SAA-60192-DN',
    verifyUrl: 'https://aws.amazon.com/certification',
    category: 'Cybersecurity & Architecture',
    skills: ['Zero-Trust IAM', 'Serverless Architecture', 'VPC Hardening', 'Edge CDN'],
    accentColor: '#FFFFFF',
    imageUrl: makeCertificateSvg(
      'AWS Solutions Architect & Cloud Security',
      'Amazon Web Services',
      'AWS-SAA-60192-DN',
      '2024'
    ),
    description:
      'Designing fault-tolerant, auto-scaling cloud topologies with strict encryption-at-rest, zero-trust IAM boundaries, and global edge delivery.',
    verified: true,
  },
];

export const DEFAULT_CV_EXPERIENCE: CVExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Creative Technologist & Full-Stack Architect',
    company: 'OBSIDIAN DIGITAL LABS',
    location: 'Remote / Hybrid',
    period: '2025 — PRESENT',
    type: 'Full-Time // Lead Role',
    summary:
      'Spearheading flagship interactive 3D web experiences, Spline & Three.js product configurators, and AI-powered SaaS applications.',
    highlights: [
      'Architected a custom Spline + Three.js + GSAP ScrollTrigger rendering pipeline achieving 120 FPS on modern displays.',
      'Engineered distributed Next.js & TypeScript microservices serving 500k+ monthly active sessions with 99.98% uptime.',
      'Led a cross-functional team of 6 designers and engineers, cutting design-to-production handoff time by 45%.',
    ],
    technologies: ['React 19', 'TypeScript', 'Spline 3D', 'Three.js / WebGL', 'GSAP', 'Next.js'],
  },
  {
    id: 'exp-2',
    role: 'Senior Frontend & Spatial UI Engineer',
    company: 'HYPERION INTERACTIVE STUDIO',
    location: 'Bengaluru / Remote',
    period: '2023 — 2025',
    type: 'Full-Time',
    summary:
      'Built high-converting interactive landing experiences, WebGL data visualizations, and component libraries for FinTech and AI startups.',
    highlights: [
      'Delivered 15+ bespoke interactive web applications recognized for fluid Lenis + GSAP scroll choreography and zero layout shift.',
      'Built an interactive 3D GLTF asset inspection pipeline with Draco compression, reducing 3D payload sizes by 78%.',
      'Integrated real-time LLM streaming interfaces and interactive canvas graphs with sub-30ms render latency.',
    ],
    technologies: ['TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'GraphQL'],
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Developer & UI/UX Designer',
    company: 'NEXUS VENTURE COLLECTIVE',
    location: 'New Delhi',
    period: '2022 — 2023',
    type: 'Full-Time / Contract',
    summary:
      'Designed and developed end-to-end web platforms from Figma & Spline prototypes to production cloud deployments.',
    highlights: [
      'Created responsive dashboard interfaces and REST/WebSocket APIs handling real-time analytics and role-based access control.',
      'Established automated Lighthouse performance gates ensuring 98+ Performance and Accessibility scores across all client releases.',
    ],
    technologies: ['React', 'JavaScript ES2024', 'Python', 'PostgreSQL', 'Figma', 'Docker'],
  },
];

export const DEFAULT_CV_EDUCATION: CVEducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology (B.Tech) — Computer Science & Engineering',
    institution: 'Institute of Engineering & Technology',
    location: 'India',
    period: '2020 — 2024',
    gpaOrHonors: 'First Class with Distinction // CGPA 9.1 / 10.0',
    coursework: [
      'Computer Graphics & WebGL',
      'Data Structures & Algorithms',
      'Artificial Intelligence & Deep Learning',
      'Distributed Cloud Computing',
      'Human-Computer Interaction (HCI)',
    ],
  },
];

export const DEFAULT_CV_ACHIEVEMENTS: CVAchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Winner — National Generative AI & Spatial Web Hackathon',
    organization: 'TechSummit Innovation Finals',
    year: '2025',
    detail: '1st Place among 420+ teams for building a real-time 3D voice-controlled agent workspace in 36 hours.',
  },
  {
    id: 'ach-2',
    title: 'Featured Showcase — Interactive WebGL & Motion Architecture',
    organization: 'Creative Dev Collective',
    year: '2025',
    detail: 'Recognized for pioneering zero-lag GSAP + Three.js + Spline scroll synchronization techniques.',
  },
  {
    id: 'ach-3',
    title: 'Open-Source Maintainer & Contributor',
    organization: 'GitHub WebGL & UI Ecosystem',
    year: '2024 — 2026',
    detail: 'Published reusable shader utilities, Spotlight 3D components, and smooth-scroll templates used by 1,500+ developers.',
  },
];

export const DEFAULT_SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'SPATIAL 3D, SPLINE & MOTION CHOREOGRAPHY',
    code: 'SYS // 01',
    accent: '#FFFFFF',
    skills: [
      { name: 'Spline 3D Interactive Scenes & Runtime', level: 98, tag: 'CORE' },
      { name: 'Three.js / WebGL 2.0 / GLSL Shaders', level: 96, tag: 'CORE' },
      { name: 'GSAP ScrollTrigger & Timelines', level: 98, tag: 'MASTER' },
      { name: 'Lenis Smooth Scroll & Physics UI', level: 95, tag: 'CORE' },
      { name: 'Blender 3D / GLTF & Draco Optimization', level: 88, tag: '3D PIPELINE' },
    ],
  },
  {
    category: 'FULL-STACK & FRONTEND ARCHITECTURE',
    code: 'SYS // 02',
    accent: '#D4D4D8',
    skills: [
      { name: 'React 19 / Next.js App Router', level: 98, tag: 'EXPERT' },
      { name: 'TypeScript (Strict Type Systems)', level: 97, tag: 'EXPERT' },
      { name: 'Tailwind CSS & Spotlight Design Systems', level: 99, tag: 'EXPERT' },
      { name: 'Node.js / Python FastAPI / GraphQL', level: 92, tag: 'BACKEND' },
      { name: 'WebSockets / WebWorkers / WASM', level: 89, tag: 'REALTIME' },
    ],
  },
  {
    category: 'AI SYSTEMS, CLOUD & PRODUCT DESIGN',
    code: 'SYS // 03',
    accent: '#A1A1AA',
    skills: [
      { name: 'Gemini API / LLM Agents & RAG', level: 94, tag: 'AI' },
      { name: 'Google Cloud / AWS / Docker CI-CD', level: 90, tag: 'CLOUD' },
      { name: 'PostgreSQL / Firestore / Redis', level: 91, tag: 'DATA' },
      { name: 'Figma Interactive Prototyping & UX', level: 95, tag: 'DESIGN' },
      { name: 'Web Performance (120FPS / Core Web Vitals)', level: 97, tag: 'PERF' },
    ],
  },
];
