const fs = require('fs');
const compressing = require('compressing');

function uncompress(dataName) {
  return new Promise((res, rej) => {
    const options = { zipFileNameEncoding: 'UTF-8' }; // 指定字符編碼為UTF-8
    compressing.zip.uncompress(`./picture/${dataName}`, `./picture/`, options).then(() => {
      console.log('解压完成')
      res()
    }).catch(() => {
      console.log('解压失败')
      rej()
    })
  })
}
module.exports = { compress, uncompress }