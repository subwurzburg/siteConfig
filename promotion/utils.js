const xlsx = require('xlsx');
const siteConfig = require('../siteConfig');
const fsExtra = require('fs-extra');

function xlsxBuild() {
  let siteConfigArr = []
  siteConfig.forEach(item => {
    siteConfigArr.push(
      {
        name: item.title,
        folderName: item.folderName
      }
    )
  })

  const workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(siteConfigArr);
  xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
  xlsx.writeFile(workbook, 'all.xlsx');
}

function getCurrentDate() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return year + month + day;
}

function moveFolderfile(from, to) {
  fsExtra.moveSync(from, to, { overwrite: true }, (err) => {
    if (err) {
      console.error(`移动文件夹时出错：${err}`);
    } else {
      console.log('文件夹内容移动成功。');
    }
  });
}
module.exports = { xlsxBuild, getCurrentDate, moveFolderfile }