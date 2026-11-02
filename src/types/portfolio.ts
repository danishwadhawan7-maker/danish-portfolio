export type PortraitFrameStyle = 'hologram' | 'monolith' | 'neon-ring' | 'minimal';

export type Preset3DId =
  | 'gyro-core'
  | 'liquid-knot'
  | 'quantum-icosa'
  | 'dna-helix'
  | 'cyber-portal'
  | 'custom-glb';

export type CertificateCategory =
  | 'All'
  | 'Cloud & AI'
  | 'Full-Stack & WebGL'
  | 'UI/UX & Product'
  | 'Cybersecurity & Architecture';

export interface ProfileData {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  subTagline: string;
  bio: string;
  philosophy: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  availability: string;
  yearsOfExperience: string;
  projectsCompleted: string;
  certificatesCount: string;
  clientSatisfaction: string;
  portraitUrl: string; // Data URL or SVG default placeholder
  isCustomPortrait: boolean;
  portraitFrameStyle: PortraitFrameStyle;
  portraitScale: number;
  customModelUrl: string | null; // Blob URL / Data URL for uploaded .glb/.gltf
  customModelName: string | null;
  active3DPreset: Preset3DId;
  wireframeMode: boolean;
  autoRotateSpeed: number;
  particleDensity: number;
  accentTheme: 'amber-cyan' | 'emerald-violet' | 'crimson-gold';
  cvPdfUrl: string | null;
  cvFileName: string | null;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
    instagram: string;
  };
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  architectureNote: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  accentColor: string;
  secondaryColor: string;
  previewImage: string;
  featured: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogoText: string;
  issueDate: string;
  credentialId: string;
  verifyUrl: string;
  category: Exclude<CertificateCategory, 'All'>;
  skills: string[];
  accentColor: string;
  imageUrl: string;
  description: string;
  verified: boolean;
  isCustomUploaded?: boolean;
}

export interface CVExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface CVEducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpaOrHonors: string;
  coursework: string[];
}

export interface CVAchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  code: string;
  accent: string;
  skills: {
    name: string;
    level: number;
    tag: string;
  }[];
}
