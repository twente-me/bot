import { DnsRecord } from "./interfaces";

export const getEmailRecordsDelta = (
  currentRecords: DnsRecord[],
  newRecords: string[]
) => {
  const recordsToAdd: string[] = [];
  const recordsToKeep: string[] = [];
  const recordsToRemove: DnsRecord[] = [];

  newRecords.forEach(record => {
    const exists = currentRecords.filter(i => i.content === record).length > 0;
    if (exists) recordsToKeep.push(record);
    else recordsToAdd.push(record);
  });

  currentRecords.forEach(record => {
    const exists = newRecords.filter(i => i === record.content).length > 0;
    if (!exists) recordsToRemove.push(record);
  });

  return { recordsToAdd, recordsToKeep, recordsToRemove };
};

export const getCnameRecordsDelta = (
  currentRecords: DnsRecord[],
  newRecords: { [index: string]: string }
) => {
  const recordsToAdd: [string, string][] = [];
  const recordsToKeep: string[] = [];
  const recordsToRemove: DnsRecord[] = [];

  for (const recordSlug in newRecords) {
    const recordContent = newRecords[recordSlug];
    const exists =
      currentRecords.filter(
        i =>
          (i.name === recordSlug || i.name === `${recordSlug}.twente.me`) &&
          i.content === recordContent
      ).length > 0;
    if (exists) recordsToKeep.push(recordSlug);
    else recordsToAdd.push([recordSlug, recordContent]);
  }

  currentRecords.forEach(record => {
    let exists = false;
    for (const recordSlug in newRecords) {
      const recordContent = newRecords[recordSlug];
      if (
        (record.name === recordSlug ||
          record.name === `${recordSlug}.twente.me`) &&
        record.content === recordContent
      )
        exists = true;
    }
    if (!exists) recordsToRemove.push(record);
  });

  return { recordsToAdd, recordsToKeep, recordsToRemove };
};
