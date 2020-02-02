export const generateRestrictedList = (data: string[]) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("(")) {
      const item = data[i];
      const withoutParentheses = item.split("(")[0];
      data.push(withoutParentheses);
      const inParentheses = item
        .replace(")", "")
        .split("(")[1]
        .split("/");
      inParentheses.forEach(i => data.push(`${withoutParentheses}${i}`));
      data[i] = undefined;
    }
  }
  return data.filter(i => i);
};
