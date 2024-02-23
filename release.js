import { exec, execSync } from 'node:child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';

const MASTER_BRANCH = 'master';

/**
 * 获取用户选择的发版类型并进行确认
 * @param {boolean} isBeta
 * @returns {Promise<boolean>}
 */
async function checkReleaseType(isBeta) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: `当前分支为 ${chalk.yellow.bold(isBeta ? '开发/fix分支，可发布测试包' : 'master分支，可发布正式包')}，是否继续？`,
      default: true,
    }
  ]);
  const res = answers.continue;
  return res;
}

/**
 * 判断当前分支是否是master
 * @returns {boolean}
 */
function isMasterBranch() {
  const curBranch = execSync('git symbolic-ref --short HEAD').toString();
  let isMaster = false;
  if (curBranch === MASTER_BRANCH) {
    isMaster = true;
  }
  return isMaster;
}

/**
 * 判断当前分支是否超前master分支，超前才可以发版
 */
function checkCommitDiff() {
  console.log(chalk.blue('info - 分支commit检测：'));
  const stdout = execSync('git remote -v').toString();
  const strArr = stdout.match(/^(.+?)\s/);
  if (strArr) {
    const remoteName = strArr[1];
    execSync(`git fetch ${remoteName}`);
    const behind = execSync(`git rev-list HEAD..${remoteName}/master`).toString();
    if (!!behind) {
      console.log(chalk.red.bold('当前分支落后于master分支，请合并后再发版'));
      process.exit(1);
    }
    const beyond = execSync(`git rev-list ${remoteName}/master..HEAD`).toString();
    if (!beyond) {
      console.log(chalk.red.bold('当前分支commit记录与master分支相同，内容没有更新，不需要发版'));
      process.exit(1);
    } else {
      console.log(chalk.green.bold('当前分支超前于master分支，可以发版'));
    }
  }
}

// 获取库的最新版本，获取当前即将发布的版本

async function doRelease(isBeta) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择你要发布的版本类型：',
      default: true,
      choices: [
        { name: '不兼容的版本更新-major', value: 'major' },
        { name: '向后兼容的新增特性-minor', value: 'minor' },
        { name: '向后兼容的问题修复-patch', value: 'patch' }
      ]
    }
  ]);
  const type = answers.type;
  const command = `pnpm version ${isBeta ? 'pre' : ''}${type}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`无法执行此命令: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`执行命令出错: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}

async function main() {
  try {
    const isBeta = !isMasterBranch();
    const isContinue = await checkReleaseType(isBeta);
    if (isContinue) {
      if (isBeta) {
        checkCommitDiff();
      }
      await doRelease(isBeta);
    }
  } catch (error) {
    console.log(error);
  }
}

main();









