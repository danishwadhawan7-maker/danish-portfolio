import {
  DEFAULT_CERTIFICATES,
  DEFAULT_CV_ACHIEVEMENTS,
  DEFAULT_CV_EDUCATION,
  DEFAULT_CV_EXPERIENCE,
  DEFAULT_PROFILE_DATA,
  DEFAULT_PROJECTS,
} from '../data/defaultPortfolioData';
import type {
  CertificateItem,
  CVAchievementItem,
  CVEducationItem,
  CVExperienceItem,
  ProfileData,
  ProjectItem,
} from '../types/portfolio';

const DB_NAME = 'DanishPortfolioVaultDB';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_state';

export interface PersistedPortfolioState {
  profile: ProfileData;
  projects: ProjectItem[];
  certificates: CertificateItem[];
  experience: CVExperienceItem[];
  education: CVEducationItem[];
  achievements: CVAchievementItem[];
}

function openVaultDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadPortfolioState(): Promise<PersistedPortfolioState> {
  try {
    const db = await openVaultDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get('main_state');
      req.onsuccess = () => {
        const saved = req.result as Partial<PersistedPortfolioState> | undefined;
        if (!saved) {
          resolve({
            profile: DEFAULT_PROFILE_DATA,
            projects: DEFAULT_PROJECTS,
            certificates: DEFAULT_CERTIFICATES,
            experience: DEFAULT_CV_EXPERIENCE,
            education: DEFAULT_CV_EDUCATION,
            achievements: DEFAULT_CV_ACHIEVEMENTS,
          });
          return;
        }
        resolve({
          profile: {
            ...DEFAULT_PROFILE_DATA,
            ...(saved.profile || {}),
            portraitUrl: '/danish-photo.png',
            isCustomPortrait: true,
          },
          projects: saved.projects?.length ? saved.projects : DEFAULT_PROJECTS,
          certificates: saved.certificates?.length ? saved.certificates : DEFAULT_CERTIFICATES,
          experience: saved.experience?.length ? saved.experience : DEFAULT_CV_EXPERIENCE,
          education: saved.education?.length ? saved.education : DEFAULT_CV_EDUCATION,
          achievements: saved.achievements?.length ? saved.achievements : DEFAULT_CV_ACHIEVEMENTS,
        });
      };
      req.onerror = () => {
        resolve({
          profile: DEFAULT_PROFILE_DATA,
          projects: DEFAULT_PROJECTS,
          certificates: DEFAULT_CERTIFICATES,
          experience: DEFAULT_CV_EXPERIENCE,
          education: DEFAULT_CV_EDUCATION,
          achievements: DEFAULT_CV_ACHIEVEMENTS,
        });
      };
    });
  } catch {
    return {
      profile: DEFAULT_PROFILE_DATA,
      projects: DEFAULT_PROJECTS,
      certificates: DEFAULT_CERTIFICATES,
      experience: DEFAULT_CV_EXPERIENCE,
      education: DEFAULT_CV_EDUCATION,
      achievements: DEFAULT_CV_ACHIEVEMENTS,
    };
  }
}

export async function savePortfolioState(state: PersistedPortfolioState): Promise<void> {
  try {
    const db = await openVaultDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(state, 'main_state');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to persist state to IndexedDB:', err);
  }
}

export async function resetPortfolioState(): Promise<PersistedPortfolioState> {
  const fresh: PersistedPortfolioState = {
    profile: DEFAULT_PROFILE_DATA,
    projects: DEFAULT_PROJECTS,
    certificates: DEFAULT_CERTIFICATES,
    experience: DEFAULT_CV_EXPERIENCE,
    education: DEFAULT_CV_EDUCATION,
    achievements: DEFAULT_CV_ACHIEVEMENTS,
  };
  await savePortfolioState(fresh);
  return fresh;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
