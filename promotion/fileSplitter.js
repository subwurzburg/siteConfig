// fileSplitter.js

const fs = require('fs');
const path = require('path');
function getCurrentDate() {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return year + month + day;
}

function renameFile(directoryPath, file, newName) {
  const oldPath = path.join(directoryPath, file);
  const newPath = path.join(directoryPath, newName);

  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        reject(`重命名失败: ${err}`);
      } else {
        resolve();
      }
    });
  });
}

function changePicName(directoryPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      console.log(files)
      if (err) {
        reject(`无法读取文件内容: ${err}`);
        return;
      }

      const promises = [];
      fs.rmSync(path.join(directoryPath, '__MACOSX'),{recursive: true, force: true});
      files = files.filter(item=> item !== '__MACOSX');
      files.forEach((file) => {
        if (/iOS官网信任页/.test(file)) {
          promises.push(renameFile(directoryPath, file, `trust_${getCurrentDate()}.jpg`));
        } else if (/官网保存下载蒙层/.test(file)) {
          promises.push(renameFile(directoryPath, file, `mengceng_${getCurrentDate()}.png`));
        } else if (/网落地页01/.test(file)) {
          promises.push(renameFile(directoryPath, file, `guanwang_${getCurrentDate()}.jpg`));
        } else if (/网落地页02-1/.test(file)) {
          promises.push(renameFile(directoryPath, file, `btn_${getCurrentDate()}.jpg`));
        } else if (/网落地页02-2/.test(file)) {
          promises.push(renameFile(directoryPath, file, `btn_co88_${getCurrentDate()}.jpg`));
        } else if (/网落地页02-3/.test(file)) {
          promises.push(renameFile(directoryPath, file, `btn_fun_${getCurrentDate()}.jpg`));
        } else if (/官网落地页03/.test(file)) {
          promises.push(renameFile(directoryPath, file, `prompt_${getCurrentDate()}.png`));
        } else {
          // 如果都不符合，则删除该文件
          promises.push(
            new Promise((resolveDelete, rejectDelete) => {
              fs.unlink(path.join(directoryPath, file), (err) => {
                if (err) {
                  rejectDelete(`删除失败: ${err}`);
                } else {
                  resolveDelete(`${file} 已删除`);
                }
              });
            })
          );
        }
      });

      // 使用 Promise.all 等待所有 Promise 完成
      Promise.all(promises)
        .then(() => {
          resolve();
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  });
}

module.exports = { changePicName, getCurrentDate };