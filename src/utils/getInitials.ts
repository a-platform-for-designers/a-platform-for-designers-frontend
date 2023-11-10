const getInitials: (name: string) => string = (name) => {
  return name
    .split(" ")
    .map((word, idx) => {
      if (idx > 1) return;
      return word[0];
    })
    .join("")
    .toUpperCase();
};

export default getInitials;
