let log = "";

export const logEvent = (event: any, action?: any, description?: any) => {
  console.log(event, action, description);
  log += `${new Date().toISOString()} `;
  [action, event, description].forEach(item => {
    if (item) {
      if (typeof item === "object") {
        log += JSON.stringify(item);
      } else {
        log += item;
      }
    }
  });
  log += "\n";
};

export const getLog = () => log;
