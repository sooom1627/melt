export const calculateElapsedTime = (start: Date, pauses?: { start: Date |null; end?: Date | null }[], end?: Date) => {
  const now = end || new Date();
  let duration = now.getTime() - start.getTime();

  // 中断時間を差し引く
  if (pauses) {
    pauses.forEach(pause => {
      if (pause.start && pause.end) {
        duration -= pause.end.getTime() - pause.start.getTime();
      } else if (pause.start) { // 中断中の場合
        duration -= now.getTime() - pause.start.getTime();
      }
    });
  }

  return duration;
};

export const formatElapsedTime = (elapsedTime: number) => {
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
};