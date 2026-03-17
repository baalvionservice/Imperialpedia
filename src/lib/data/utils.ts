import { terms } from "./terms";

export const getTermsByLetter = (letter: string) => {
  if (letter === "num") {
    return terms.filter((t) => /^[0-9]/.test(t.title));
  }

  return terms.filter((t) =>
    t.title.toLowerCase().startsWith(letter.toLowerCase()),
  );
};

export const getTermBySlug = (slug: string) => {
  return terms.find((t) => t.slug === slug);
};
