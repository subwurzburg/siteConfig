const simpleGit = require('simple-git');

// 指定 Git 仓库的路径
const repoPath = './';

// 创建 simple-git 对象
const git = simpleGit(repoPath);

// 执行 Git add 操作
git.add('.')
  .then(() => {
    console.log('Git add 成功。');

    // 执行 Git commit 操作
    return git.commit('test: commit message');
  })
  .then(() => {
    console.log('Git commit 成功。');

    // 执行 Git push 操作
    return git.push('origin', 'main');
  })
  .then(() => {
    console.log('Git push 成功。');
  })
  .catch((err) => {
    console.error(`Git 操作失败：${err}`);
  });