export const calculateElapsedTime = (start: Date, end?: Date) => {
  if(end){
    return end.getTime() - start.getTime();
  }else{
    const now = end || new Date();
    return now.getTime() - start.getTime();
  }
  
};

export const formatElapsedTime = (elapsedTime: number) => {
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
  return `${hours}h ${minutes}m ${seconds}s`;
};