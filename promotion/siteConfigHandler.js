// siteConfigHandler.js

const fs = require('fs');
const pinyin = require('tiny-pinyin')
const { getCurrentDate } = require('./fileSplitter');
const siteConfig = require('../siteConfig');
const { xlsxBuild } = require('./utils')
const { updateJsVer } = require('./jsVer')

async function addConfig(brandName, android = "", ios = "") {
  const jsVer = updateJsVer();
  const siteName = PYingArray(brandName.split('')).join('');
  const first = PYingArray(brandName.split(''))[0][0]
  const second = PYingArray(brandName.split(''))[1][0]
  const originalFolderName = first + second
  let folderName = originalFolderName
  let counter = 1;
  while (siteConfig.some(item => item.folderName === folderName)) {
    // 如果存在相同的 folderName，追加计数器
    folderName = `${originalFolderName}${counter}`;
    counter++;
  }

  let newSetting = {
    guanwangHtmlModule: "module1",
    mengcengHtmlModule: "module1",
    jsModule: "module1",
    title: brandName,
    siteName: siteName,
    imgDate: getCurrentDate(),
    jsVersion: jsVer,
    DLName: `download_${siteName}`,
    DLNameOl: `download_${siteName}_ol`,
    DLAndroidUrl: android,
    DLIOSUrl: ios,
    folderName: folderName
  }
  siteConfig.push(newSetting)
  const previousVersion = jsVer.replace(/\d+$/, match => parseInt(match) - 1);

  const updatedContent = `const jsVer = "${jsVer}";\nmodule.exports = ${JSON.stringify(siteConfig, null, 4)
    .replace(new RegExp(`"${jsVer}"`, 'g'), 'jsVer')
    .replace(new RegExp(`"${previousVersion}"`, 'g'), 'jsVer')
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
  fs.writeFileSync('../siteConfig.js', updatedContent, 'utf-8');
  xlsxBuild();
}
function PYingArray(inputArray) {
  if (pinyin.isSupported()) {
    const resultArray = inputArray.map(item => {
      return pinyin.convertToPinyin(item).toLowerCase();
    });

    return resultArray;
  } else {
    // 处理拼音不受支持的情况
    console.error('拼音出现问题');
    return [];
  }
}

async function editConfig(brandName, android = "", ios = "") {
  const jsVer = updateJsVer();
  const previousVersion = jsVer.replace(/\d+$/, match => parseInt(match) - 1);
  const matchConfig  = siteConfig.find(item=> item.title === brandName);

  matchConfig.DLAndroidUrl = android === "" ? matchConfig.DLAndroidUrl : android
  matchConfig.DLIOSUrl = ios === "" ? matchConfig.DLIOSUrl : ios

  const updatedContent = `const jsVer = "${jsVer}";\nmodule.exports = ${JSON.stringify(siteConfig, null, 4)
    .replace(new RegExp(`"${jsVer}"`, 'g'), 'jsVer')
    .replace(new RegExp(`"${previousVersion}"`, 'g'), 'jsVer')
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
  fs.writeFileSync('../siteConfig.js', updatedContent, 'utf-8');
}
module.exports = { addConfig, editConfig };