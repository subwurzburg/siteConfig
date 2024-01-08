const directoryPath = './picture';
const TGbot = require('node-telegram-bot-api')
// const token = '6565784767:AAH6sScYU8g_Dt290ZZQNdcOc9Cimy-ip50'
const token = '6935420858:AAHEvRScKx45vxy-UnfdCaXClBC9MRJymow' // lazy_bot
const fs = require('fs');
const fsExtra = require('fs-extra');
const { pushFileToRep } = require("../git")


const xlsx = require('xlsx');
const bot = new TGbot(token, {
  polling: true, // 啟用Long Polling模式
  webhook: {
    enabled: false // 停用Webhooks
  }
});

const { moveFolderfile } = require("./utils")

function checkPictureFolder() {
  const folderName = './picture';
  if (!fs.existsSync(folderName)) {
      // 如果不存在，則創建資料夾
      fs.mkdirSync(folderName);
      console.log(`成功創建資料夾: ${folderName}`);
  } else {
      console.log(`資料夾已存在: ${folderName}`);
  }
}

function ExcelReader() {
  // 指定Excel檔案的路徑
  const excelFilePath = './all.xlsx';

  // 讀取Excel檔案
  const workbook = xlsx.readFile(excelFilePath);

  let ExcelData;
  // 遍歷所有的工作表
  workbook.SheetNames.forEach(sheetName => {
    // 獲取工作表
    const sheet = workbook.Sheets[sheetName];
    // 將工作表轉換為JSON物件
    ExcelData = xlsx.utils.sheet_to_json(sheet);
  });
  return ExcelData
}

async function clearAndRemoveDirectory(directory) {
  try {
    // 清空資料夾內容
    await fsExtra.emptyDir(directory);
    console.log(`清空資料夾 ${directory} 成功`);
  } catch (error) {
    console.error('清空及刪除資料夾失敗:', error);
  }
}


const fileQueue = []; // 佇列
let fileId;
const chatId = 6514210893;

const fileNames = [
  'iOS官网信任页',
  '官网保存下载蒙层',
  '网落地页01',
  '网落地页02-1',
  '网落地页02-2',
  '网落地页02-3',
  '官网落地页03'
];

// 修改單一圖片
bot.on('document', async (msg) => {
  const caption = msg.caption; // 獲取用戶發送的文字
  const regex = /修改/;
  if (regex.test(caption)) {

    const brandNameRegex = /包网(.*?)棋牌/g;
    const brandNameMatch = brandNameRegex.exec(caption)[1];
    const ExcelData = ExcelReader()
    ExcelData.forEach(item => {
      item["folderName"] = item["folderName"]
    })
    let target;
    target = ExcelData.find(item => item.name === brandNameMatch);
    fileId = msg.document.file_id;
    checkPictureFolder()
    try {
      const fileData = await bot.getFile(fileId);
      await bot.sendMessage(chatId, '已收到圖片！！圖片處理中....');
      await bot.sendMessage(chatId, `folderName：${target.folderName}`);
      // 將處理檔案的函數推入佇列
      fileQueue.push(() => processFile(fileData, target));
      // 檢查是否有其他檔案在處理中，如果沒有，開始處理佇列
      if (fileQueue.length === 1) {
        await processQueue();
      }
    } catch (error) {
      console.log('處理文件時出錯：', error);
      await bot.sendMessage(chatId, '處理文件時出現錯誤，請稍後再試。');
    }
  }
})


bot.on('document', async (msg) => {
  const messageText = msg.caption;
  const regex = /建置/;
  if (regex.test(messageText)) {
    // brandName
    const brandNameRegex = /包网(.*?)棋牌/g;
    const brandNameMatch = brandNameRegex.exec(messageText)[1];
    // androidUrl
    const androidRegex = /安卓：(.*?)\n/g;
    const androidMatch = androidRegex.exec(messageText)[1];
    // iosUrl
    const iosRegex = /IOS：(.*?)$/gi;
    const iosMatch = iosRegex.exec(messageText)[1];
    console.log(brandNameMatch);
    await addConfig(brandNameMatch, androidMatch, iosMatch);

    const fileData = await bot.getFile(fileId);
    await bot.sendMessage(chatId, '----新增：收到圖片----');
    // 將處理檔案的函數推入佇列
    fileQueue.push(() => processFile(fileData, target));
    // 檢查是否有其他檔案在處理中，如果沒有，開始處理佇列
    if (fileQueue.length === 1) {
      await processQueue();
    }

    await bot.sendMessage(chatId, '新增完成');
  }
})

bot.onText(/替换/, async (msg) => {
  const messageText = msg.text;
  // brandName
  const brandNameRegex = /包网(.*?)棋牌/g;
  const brandNameMatch = brandNameRegex.exec(messageText)[1];
  console.log(brandNameMatch)
  // androidUrl
  const androidRegex = /安卓：(.*?)\.apk/g;
  const androidMatch = androidRegex.exec(messageText)
  let androidUrl = androidMatch ? androidMatch[1] : "";
  if (androidUrl !== "") androidMatch = androidMatch + ".apk"
  console.log(androidUrl)
  // iosUrl
  const iosRegex = /IOS：(.*?)$/gi;
  const iosMatch = iosRegex.exec(messageText);
  const iosUrl = iosMatch ? iosMatch[1] : ""
  console.log(iosUrl)
  await editConfig(brandNameMatch, androidUrl, iosUrl)
  await bot.sendMessage(chatId, '編輯完成');
})

const { changePicName } = require('./fileSplitter');
const { addConfig, editConfig, PYingArray } = require('./siteConfigHandler');
const { uncompress } = require('./compressFile');
const { findDirectoryWithFileName } = require('./findDirtory')


async function processFile(fileData, target) {
  await bot.downloadFile(fileId, directoryPath);
  await uncompress(fileData.file_path.split('/')[1], target);
  let path = await findDirectoryWithFileName(directoryPath, fileNames)
  path = `./${path}`
  await changePicName(path);

  let fullName = await PYingArray(target.name.split('')).join('')
  console.log("fullName" + fullName)
  let destinationPath = `../src/img/${fullName}`
  fsExtra.ensureDirSync(destinationPath);
  await clearAndRemoveDirectory(destinationPath)
  console.log("創建完畢")
  moveFolderfile(path, destinationPath)
  await clearAndRemoveDirectory('./picture')
  pushFileToRep('yy修改')
}



async function processQueue() {
  if (fileQueue.length > 0) {
    const nextFileHandler = fileQueue[0];
    await nextFileHandler(); // 執行檔案處理函數
    fileQueue.shift(); // 從佇列中移除已處理的函數
    await processQueue(); // 遞迴處理下一個檔案
  }
}
