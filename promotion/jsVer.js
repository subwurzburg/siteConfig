const fs = require('fs');
const path = require('path');
const jsVerFilePath = path.join(__dirname, 'jsVer.json'); // 存儲上次運行日期的 JSON 文件路徑
const { getCurrentDate } = require('./utils')

function updateJsVer() {
  const currentDate = getCurrentDate();
  let jsVer = JSON.parse(fs.readFileSync(jsVerFilePath, 'utf8')).jsVersion;

  try {
    // 讀取上次運行的日期
    const lastRunData = JSON.parse(fs.readFileSync(jsVerFilePath, 'utf8'));

    // 如果上次運行日期與當前日期不同，則增加版本號
    if (lastRunData.lastRunDate !== currentDate) {
      jsVer = `3.0.${parseInt(lastRunData.jsVersion.split('.')[2]) + 1}`;
    }
  } catch (err) {
    // 如果讀取或解析失敗，可以忽略並使用初始版本號
  }

  // 將當前日期和版本號保存到 JSON 文件
  const newData = {
    lastRunDate: currentDate,
    jsVersion: jsVer,
  };

  fs.writeFileSync(jsVerFilePath, JSON.stringify(newData, null, 2), 'utf8');

  return jsVer;
}


module.exports = { updateJsVer };