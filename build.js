const fs = require('fs');
const UglifyJS = require('uglify-es');
const path = require('path');

const shell = require('shelljs');
const siteConfig = require('./siteConfig.js');
const cheerio = require('cheerio');

// 清除舊數據
shell.rm('-rf', 'dist/*');

// 新增推廣落地頁資料夾
shell.mkdir('-p', `dist/src/css`);
shell.mkdir('-p', `dist/src/img`);
shell.mkdir('-p', `dist/src/js`);

try {
    // USDT支付引导 image
    shell.cp('-R', `src/img/huobi`, `dist/src/img`);

    siteConfig.forEach((item, index) => {
        // console.log(item);
        const {
            guanwangHtmlModule, mengcengHtmlModule, jsModule, title, siteName,
            imgDate, jsVersion, DLName, DLNameOl,
            DLAndroidUrl, DLIOSUrl, folderName, group
        } = item;

        shell.echo(`${index + 1}. 官網：${title}`);

        shell.mkdir('-p', `dist/${folderName}`);

        // 複製相關 img, css, js
        shell.cp('-R', `src/img/common/`, `dist/${folderName}/img`);
        shell.cp('-R', `src/img/${siteName}`, `dist/${folderName}/img`);
        shell.cp('-R', 'src/css', `dist/${folderName}/css`);
        shell.cp('-R', 'src/js', `dist/${folderName}/js`);
        
        
        // guanwang
        shell.cp('-R', `src/guanwang/${guanwangHtmlModule}_guanwang.html`, `dist/${folderName}/${siteName}_guanwang.html`);
        shell.sed('-i', 'SCTitle', title, `dist/${folderName}/${siteName}_guanwang.html`);
        shell.sed('-i', 'SCSiteName', siteName, `dist/${folderName}/${siteName}_guanwang.html`);
        shell.sed('-i', 'SCJSVersion', jsVersion, `dist/${folderName}/${siteName}_guanwang.html`);
        shell.sed('-i', 'SCDLName', DLName, `dist/${folderName}/${siteName}_guanwang.html`);
        if (group === 'lowActive') shell.sed('-i', 'SCHint', '安装后名称显示为【庆幸棋牌】请放心使用', `dist/${folderName}/${siteName}_guanwang.html`);
        else shell.sed('-i', 'SCHint', '', `dist/${folderName}/${siteName}_guanwang.html`);
        // mengceng
        if (mengcengHtmlModule !== "") {
            shell.cp('-R', `src/guanwang/${mengcengHtmlModule}_mengceng.html`, `dist/${folderName}/${siteName}_mengceng.html`);
            shell.sed('-i', 'SCTitle', title, `dist/${folderName}/${siteName}_mengceng.html`);
            shell.sed('-i', 'SCSiteName', siteName, `dist/${folderName}/${siteName}_mengceng.html`);
            shell.sed('-i', 'SCJSVersion', jsVersion, `dist/${folderName}/${siteName}_mengceng.html`);
            shell.sed('-i', 'SCDLName', DLName, `dist/${folderName}/${siteName}_mengceng.html`);
            if (group === 'lowActive') shell.sed('-i', 'SCHint', '安装后名称显示为【庆幸棋牌】请放心使用', `dist/${folderName}/${siteName}_mengceng.html`);
            else shell.sed('-i', 'SCHint', '', `dist/${folderName}/${siteName}_mengceng.html`);
        }
    
        // js
        shell.cp('-R', `src/channel_${jsModule}.js`, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCIOSUrl', DLIOSUrl, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCAndriodUrl', DLAndroidUrl, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCSiteName', siteName, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCDLNameOl', DLNameOl, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCDLName', DLName, `dist/${folderName}/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCTitle', title, `dist/${folderName}/js/channel_${siteName}.js`);

        // 給推廣落地頁使用
        shell.cp('-R', `src/channel_${jsModule}.js`, `dist/src/js/channel_${siteName}.js`);
        shell.cp('-R', `src/img/${siteName}`, `dist/src/img`);
        shell.cp('-R', 'src/js/*.js', `dist/src/js`);
        shell.sed('-i', 'SCIOSUrl', DLIOSUrl, `dist/src/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCAndriodUrl', DLAndroidUrl, `dist/src/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCSiteName', siteName, `dist/src/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCDLNameOl', DLNameOl, `dist/src/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCDLName', DLName, `dist/src/js/channel_${siteName}.js`);
        shell.sed('-i', 'SCTitle', title, `dist/src/js/channel_${siteName}.js`);
    
        // prompt
        shell.cp('-R', `src/prompt.html`, `dist/${folderName}/prompt.html`);
    
        // image date
        shell.sed('-i', 'SCImgDate', imgDate, `dist/${folderName}/${siteName}_guanwang.html`);
        if (mengcengHtmlModule !== "") {
            shell.sed('-i', 'SCImgDate', imgDate, `dist/${folderName}/${siteName}_mengceng.html`);
        }
        shell.cp('-R', 'src/css/*.css', `dist/src/css`);
        shell.cp('-R', 'src/luodi/*.html', `dist/src`);

        if (guanwangHtmlModule === "module2") {
            shell.cp('-R', `src/guanwang/${guanwangHtmlModule}_guanwang_content.html`, `dist/${folderName}/${siteName}_guanwang_content.html`);
            shell.sed('-i', 'SCTitle', title, `dist/${folderName}/${siteName}_guanwang_content.html`);
            shell.sed('-i', 'SCSiteName', siteName, `dist/${folderName}/${siteName}_guanwang_content.html`);
            shell.sed('-i', 'SCJSVersion', jsVersion, `dist/${folderName}/${siteName}_guanwang_content.html`);
            shell.sed('-i', 'SCDLName', DLName, `dist/${folderName}/${siteName}_guanwang_content.html`);
            shell.sed('-i', 'SCImgDate', imgDate, `dist/${folderName}/${siteName}_guanwang_content.html`);
            if (group === 'lowActive') shell.sed('-i', 'SCHint', '安装后名称显示为【庆幸棋牌】请放心使用', `dist/${folderName}/${siteName}_guanwang_content.html`);
            else shell.sed('-i', 'SCHint', '', `dist/${folderName}/${siteName}_guanwang_content.html`);
        }
    })
    function uglifyFilesInDirectory(dirPath) {
        return new Promise((resolve, reject) => {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                const promises = [];
    
                files.forEach(file => {
                    const filePath = path.join(dirPath, file);
    
                    const promise = new Promise((resolve, reject) => {
                        fs.stat(filePath, (error, stats) => {
                            if (error) {
                                reject(error);
                                return;
                            }
    
                            if (stats.isDirectory()) {
                                resolve(uglifyFilesInDirectory(filePath));
                            } else {
                                if (path.extname(filePath) === '.js') {
                                    const code = fs.readFileSync(filePath, 'utf8');
                                    const result = UglifyJS.minify(code);
                                    fs.writeFileSync(filePath, result.code, 'utf8');
                                    console.log(`File compressed: ${filePath}`);
                                } else if (path.extname(filePath) === '.html') {
                                    const htmlContent = fs.readFileSync(filePath, 'utf8');
                                    const $ = cheerio.load(htmlContent);
    
                                    $('script').each(function () {
                                        const scriptContent = $(this).html();
                                        if (scriptContent) {
                                            const result = UglifyJS.minify(scriptContent);
                                            $(this).text(result.code);
                                        }
                                    });
    
                                    fs.writeFileSync(filePath, $.html(), 'utf8');
                                    console.log(`Scripts compressed in HTML: ${filePath}`);
                                }
                                resolve();
                            }
                        });
                    });
    
                    promises.push(promise);
                });
    
                Promise.all(promises)
                    .then(() => resolve())
                    .catch(error => reject(error));
            });
        });
    }
    const directoryPath = 'dist';
    uglifyFilesInDirectory(directoryPath)
        .then(() => {
            console.log('編譯成功');
        })
        .catch(error => {
            console.error('Error:', error);
        });
} catch (e) {
    shell.echo(`編譯失敗`);
}


