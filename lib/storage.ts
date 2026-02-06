import { EMGStudy } from './emg';

const STORAGE_KEY = 'emg-studies';
const DEVICE_ID_KEY = 'emg-device-id';

export function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function saveStudy(study: EMGStudy): void {
  if (typeof window === 'undefined') return;
  
  const studies = getStudies();
  studies.unshift(study);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
}

export function getStudies(): EMGStudy[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored) as EMGStudy[];
  } catch {
    return [];
  }
}

export function getStudyById(id: string): EMGStudy | undefined {
  return getStudies().find(s => s.id === id);
}

export function deleteStudy(id: string): void {
  if (typeof window === 'undefined') return;
  
  const studies = getStudies().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
}

export function clearAllStudies(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}