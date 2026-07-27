export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function getSubjectProgress(subject: string): number {
  try {
    const key = `progress_${getTodayKey()}_${subject}`;
    const val = localStorage.getItem(key);
    return val ? parseInt(val, 10) : 0;
  } catch (e) {
    return 0;
  }
}

export function incrementSubjectProgress(subject: string): number {
  try {
    const key = `progress_${getTodayKey()}_${subject}`;
    const current = getSubjectProgress(subject);
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next;
  } catch (e) {
    return 0;
  }
}
