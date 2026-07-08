type ClassValue = string | number | null | undefined | false | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const flatten = (value: ClassValue) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach(flatten);
      return;
    }

    classes.push(String(value));
  };

  inputs.forEach(flatten);
  return classes.join(" ");
}
