const xlsx = require('xlsx');
const fs = require('fs');
const siteConfig = require('./siteConfig');

// 比對兩個陣列中相同的元素
function findCommonElements(array1, array2) {
  // 使用filter方法過濾出在array1中的元素
  const commonElements = array1.filter(element => array2.includes(element));

  // 使用filter方法過濾出在array1中但不在commonElements中的元素，即未配對到的元素
  const unmatchedElementsInArray1 = array1.filter(element => !commonElements.includes(element));


  let logStr = `配對到的品牌:\n${JSON.stringify(commonElements, null, 2)}\n沒配對到的\n${JSON.stringify(unmatchedElementsInArray1, null, 2)}`
  fs.writeFile('log.txt', logStr, (err) => {
    if (err) {
      console.error('寫入檔案時發生錯誤：', err);
    } else {
      console.log('檔案成功創建並寫入內容。');
    }
  });
  // 返回配對到的元素
  return commonElements;
}

function lowActive(targetTitle, androidUrl = "", iosUrl = "") {

  // 找到title為目標標題的物件，並修改其屬性
  const targetSetting = siteConfig.find(setting => setting.title === targetTitle);
  if (targetSetting) {

    // 實際修改url的地方
    targetSetting.DLAndroidUrl = androidUrl === "" ? targetSetting.DLAndroidUrl : androidUrl;
    targetSetting.DLIOSUrl = iosUrl === "" ? targetSetting.DLIOSUrl : iosUrl;
    targetSetting.group = "lowActive"

    const fileContent = fs.readFileSync('./siteConfig.js', 'utf-8');
    const match = fileContent.match(/const jsVer = "(.*)";/);
    const jsVer = match && match[1];
    const updatedContent = `const jsVer = "${jsVer}";\nmodule.exports = ${JSON.stringify(siteConfig, null, 4)
      .replace(new RegExp(`"${jsVer}"`, 'g'), 'jsVer')
      .replace(new RegExp(`"guanwangHtmlModule"`, 'g'), 'guanwangHtmlModule')
      .replace(new RegExp(`"mengcengHtmlModule"`, 'g'), 'mengcengHtmlModule')
      .replace(new RegExp(`"jsModule"`, 'g'), 'jsModule')
      .replace(new RegExp(`"title"`, 'g'), 'title')
      .replace(new RegExp(`"siteName"`, 'g'), 'siteName')
      .replace(new RegExp(`"imgDate"`, 'g'), 'imgDate')
      .replace(new RegExp(`"jsVersion"`, 'g'), 'jsVersion')
      .replace(new RegExp(`"DLName"`, 'g'), 'DLName')
      .replace(new RegExp(`"DLNameOl"`, 'g'), 'DLNameOl')
      .replace(new RegExp(`"DLAndroidUrl"`, 'g'), 'DLAndroidUrl')
      .replace(new RegExp(`"DLIOSUrl"`, 'g'), 'DLIOSUrl')
      .replace(new RegExp(`"folderName"`, 'g'), 'folderName')
      .replace(new RegExp(`"group"`, 'g'), 'group')
      };\n`;
    fs.writeFileSync('./siteConfig.js', updatedContent, 'utf-8');
  } else {
    console.log(`${targetTitle}未找到`);
  }
}


let siteConfigArr = []
siteConfig.forEach(item => {
  siteConfigArr.push(item.title);
})

// 指定Excel檔案的路徑
const excelFilePath = './lowActive.xlsx';

// 讀取Excel檔案
const workbook = xlsx.readFile(excelFilePath);

let Excel_datas = [];
// 遍歷所有的工作表
workbook.SheetNames.forEach(sheetName => {
  // 獲取工作表
  const sheet = workbook.Sheets[sheetName];
  // 將工作表轉換為JSON物件
  datas = xlsx.utils.sheet_to_json(sheet);
});

datas.forEach(data => {
  Excel_datas.push(data.brand);
})

const matchedArr = findCommonElements(Excel_datas, siteConfigArr);

// 批量修改的Url
const androidUrl = 'https://mubao-channel.chappystar.com/b1e8d59a74ed325b7944b81173b0f145.apk'
const iosUrl = 'https://tren567.com/PAf4';

matchedArr.forEach(item => {
  lowActive(item, androidUrl, iosUrl);
})