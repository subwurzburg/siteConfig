const { execSync } = require('child_process');

function build () {
    try {
        const result = execSync('cd ../ && node build.js', { stdio: 'inherit' });
    } catch (error) {
        console.error(`执行错误: ${error.message}`);
    } 
}

module.exports = { build }