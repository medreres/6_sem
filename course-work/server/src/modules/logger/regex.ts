export const objectPropertyRegex = (property: string) => {
  return new RegExp(`${property}: ".*?"`);
};
