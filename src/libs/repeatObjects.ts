const repeatObject = (obj: any, repeatCount: number): any[] => {
  return Array.from({ length: repeatCount }, () => ({ ...obj }));
};

export default repeatObject;
