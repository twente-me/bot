export const generateEmailRecords = (emails: {
  [index: string]: string | string[];
}) => {
  const emailRecords: string[] = [];
  for (const slug in emails) {
    const email = emails[slug];
    if (typeof email === "string") {
      emailRecords.push(`forward-email=${slug}:${email}`);
    } else {
      email.forEach(i => emailRecords.push(`forward-email=${slug}:${i}`));
    }
  }
  return emailRecords;
};
