const fsExtra = require('fs-extra');
fsExtra.ensureDirSync('../src/img/laile');

try {
    // 清空資料夾內容
    fsExtra.emptyDir('../src/img/laile');
} catch (error) {
    console.error('清空及刪除資料夾失敗:', error);
}