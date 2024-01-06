const fs = require('fs');
const compressing = require('compressing');
function compress(target, path) {
  let newPath = path.replace(/\/([^\/]+)$/, `/${target.folderName}`)
  return new Promise((resolve, reject) => {
    fs.rename(path, newPath, (err) => {
      if (err) {
        console.error('重新命名資料夾失敗:', err);
        reject(err); // 如果重新命名失敗，直接 reject
      } else {
        console.log('資料夾重新命名成功！');
        resolve(); // 如果重新命名成功，則進行下一步操作
      }
    });
  })
    .then(() => {
      // 這裡的代碼只有在 fs.rename 成功後才會執行
      const sourceDir = newPath; // 源文件夹路径
      const destinationFile = `./${target.name}.zip`; // 目标 ZIP 文件路径
      const options = { zipFileNameEncoding: 'UTF-8' };
      return compressing.zip.compressDir(sourceDir, destinationFile, options);
    })
    .then(() => {
      console.log('压缩完成');
    })
    .catch((err) => {
      console.log('操作失敗', err);
    });
}

function uncompress(dataName, target) {
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