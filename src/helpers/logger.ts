let log = "";

export const logEvent = (p1: any, p2?: any, p3?: any) => {
  log += new Date().toISOString();
  [p1, p2, p3].forEach(item => {
    if (item) {
      if (typeof item === "object") {
        log += " " + JSON.stringify(item);
      } else {
        log += " " + item;
      }
    }
  });
  log += "\n";
};

export const getLog = () => log;
