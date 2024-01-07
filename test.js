const { exec } = require('child_process');

// 要执行的 Git 命令
const gitCommands = [
  'git add .',
  'git commit -m "test"',
  'git push'
];

// 依次执行 Git 命令
gitCommands.forEach((command) => {
  const gitProcess = exec(command);

  // 监听子进程的标准输出和标准错误
  gitProcess.stdout.on('data', (data) => {
    console.log(`Git 命令输出:\n${data}`);
  });

  gitProcess.stderr.on('data', (data) => {
    console.error(`Git 命令返回错误信息: ${data}`);
  });

  // 监听子进程的关闭事件
  gitProcess.on('close', (code) => {
    if (code === 0) {
      console.log('Git 命令执行成功。');
    } else {
      console.error(`Git 命令执行失败，退出码: ${code}`);
    }
  });
});