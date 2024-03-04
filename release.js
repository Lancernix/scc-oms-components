import { exec, execSync } from 'node:child_process';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

const MASTER_BRANCH = 'master';
const CLEAN_TEXT = 'nothing to commit, working tree clean';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * 获取用户选择的发版类型并进行确认
 * @param {boolean} isMaster
 * @returns {Promise<boolean>}
 */
async function checkReleaseType(isMaster) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: `当前分支为 ${chalk.yellow.bold(isMaster ? 'master分支，可发布正式包' : '开发/fix分支，可发布测试包')}，是否继续？`,
      default: true,
    }
  ]);
  const res = answers.continue;
  return res;
}

/**
 * 判断当前分支是否是master
 * @returns {boolean}
 * @returns {boolean}
 */
function isMasterBranch() {
  const curBranch = execSync('git symbolic-ref --short HEAD').toString().trim();
  let isMaster = false;
  if (curBranch === MASTER_BRANCH) {
    isMaster = true;
  }
  return isMaster;
}

function checkClean() {
  const stdout = execSync('git status').toString().trim();
  if (!stdout.endsWith(CLEAN_TEXT)) {
    console.log(chalk.red.bold('❌ 工作区存在未提交的改动，请提交后再进行后续操作'));
    process.exit(0);
  }
}

/**
 * 获取当前版本号
 * @returns {string}
 */
function getOldVersion() {
  const pkgPath = path.join(__dirname, 'package.json');
  const pkgData = readFileSync(pkgPath, { encoding: 'utf-8' });
  const version = JSON.parse(pkgData).version;
  return version;
}

/**
 * 分支比较，判断是否符合发版条件
 * @param {boolean} isMaster
 * @returns {void}
 */
function compareWithOriginMaster(isMaster) {
  console.log(chalk.blue('info - 分支commit检测：'));
  const stdout = execSync('git remote -v').toString().trim();
  const strArr = stdout.match(/^(.+?)\s/);
  if (strArr) {
    const remoteName = strArr[1];
    execSync(`git fetch ${remoteName}`);
    const behind = execSync(`git rev-list HEAD..${remoteName}/master`).toString().trim();
    if (!isMaster) {
      if (!!behind) {
        console.log(chalk.red.bold('❌ 当前分支落后于master分支，请合并后再发版'));
        process.exit(0);
      }
      const beyond = execSync(`git rev-list ${remoteName}/master..HEAD`).toString().trim();
      if (!beyond) {
        console.log(chalk.red.bold('❌ 当前分支commit记录与master分支相同，代码没有更新，不需要发版'));
        process.exit(0);
      } else {
        console.log(chalk.green.bold('✅ 当前分支超前于master分支，可以发版'));
      }
    } else {
      if (!!behind) {
        console.log(chalk.red.bold('❌ 当前master分支落后于远程master分支，请pull后再发版'));
        process.exit(0);
      } else {
        console.log(chalk.green.bold('✅ 符合要求，可以发版'));
      }
    }
  }
}


async function doRelease(isMaster) {
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
  const oldVersion = getOldVersion();
  let isBeta = false;
  if (oldVersion.includes('-')) {
    isBeta = true;
  }
  const type = answers.type;
  // 发包前需要切换到官方源
  execSync('npm config set registry https://registry.npmjs.org');
  const command = `npm version ${isMaster ? '' : 'pre'}${type}${isMaster ? '' : ' --preid beta'}`;
  const betaCommand = 'npm version prerelease';
  const execCommand = !isMaster && isBeta ? betaCommand : command;
  const newVersion = execSync(execCommand).toString().trim();
  console.log(chalk.blue(`版本号已更新为 ${chalk.green.bold(newVersion)}，开始发布...`));
  exec('npm publish');
}

async function main() {
  try {
    checkClean();
    const isMaster = isMasterBranch();
    const isContinue = await checkReleaseType(isMaster);
    if (isContinue) {
      compareWithOriginMaster(isMaster);
      await doRelease(isMaster);
    }
  } catch (error) {
    console.log(error);
  }
}

main();









