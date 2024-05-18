export const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString("en-Us", {
      day: "2-digit",
      weekday: "short",
    })
    .split(" ")
    .reverse()
    .join(", ");
};

export const getTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
