const fs = require('fs');
const path = require('path');

function findDirectoryWithFileName(currentDirectory, fileNames) {
    const files = fs.readdirSync(currentDirectory);

    for (const file of files) {
        const filePath = path.join(currentDirectory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 遞迴進入子目錄
            const foundPath = findDirectoryWithFileName(filePath, fileNames);

            if (foundPath) {
                // 如果在子目錄中找到，返回路徑
                return foundPath;
            }
        } else if (fileNames.some(fileName => file.includes(fileName))) {
            // 使用陣列中的每個檔案名片段進行匹配
            console.log('找到資料夾:', currentDirectory);
            return currentDirectory;
        }
    }
}

module.exports = { findDirectoryWithFileName };