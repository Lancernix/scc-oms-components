import { exec, execSync } from 'node:child_process';
import path, { dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import inquirer from 'inquirer';

const MASTER_BRANCH = 'master';
const CLEAN_TEXT = 'nothing to commit, working tree clean';
const ZN_CLEAN_TEXT = '无文件要提交，干净的工作区';
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
    },
  ]);
  const res = answers.continue;
  return res;
}

/**
 * 获取当前发版号，让用户确认
 * @param {boolean} isMaster
 * @returns {Promise<boolean>}
 */
async function currentVersion(version) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: `当前发布版本号为 ${chalk.yellow.bold(version)}，是否继续？`,
      default: true,
    },
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
  if (!stdout.endsWith(CLEAN_TEXT) && !stdout.endsWith(ZN_CLEAN_TEXT)) {
    console.log(chalk.red.bold('❌ 工作区存在未提交的改动，请提交后再进行后续操作'));
    process.exit(0);
  }
}

// 获取远程分支列表
function getNpmPackageVersions(packageName) {
  return new Promise((resolve, reject) => {
    exec(`npm view ${packageName} versions --json`, (error, stdout, stderr) => {
      if (error) {
        console.error(`执行出错: ${error}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`标准错误输出: ${stderr}`);
        return reject(stderr);
      }
      try {
        const versions = JSON.parse(stdout);
        resolve(versions);
      } catch (parseError) {
        console.error(`JSON解析错误: ${parseError}`);
        reject(parseError);
      }
    });
  });
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
      if (behind) {
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
      if (behind) {
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
        { name: '向后兼容的问题修复-patch', value: 'patch' },
      ],
    },
  ]);
  const oldVersion = getOldVersion();
  const remoteVersion = await getNpmPackageVersions('scc-oms-components');
  let isBeta = false;
  if (oldVersion.includes('-')) {
    isBeta = true;
  }
  const type = answers.type;
  // 发包前需要切换到官方源
  execSync('npm config set registry https://registry.npmjs.org');

  let resultVersion = '';
  if (isMaster) {
    resultVersion = oldVersion.split('-beta.')[0];
  }
  // 如果本地是beta版本，如果有比本地新的版本，报错，否则更新beta版本
  if (isBeta) {
    const oldVersionNum = oldVersion.split('-beta.');
    let i = 0;
    while (i < remoteVersion.length) {
      const temp = remoteVersion[i].split('-beta.');
      if (temp[0] === oldVersionNum[0] && temp[1] > oldVersionNum[1]) {
        console.log(temp, oldVersionNum, temp[1], oldVersionNum[1]);
        console.log(chalk.red.bold('❌ 请合并最新提交后再进行操作'));
        process.exit(0);
      } else {
        i++;
      }
    }
    resultVersion = resultVersion ?? `${oldVersionNum[0]}-beta${oldVersionNum[1] + 1}`;
  } else {
    // 本地是正式版本
    const oldVersionNum = oldVersion.split('.');
    if (type === 'patch') {
      const start = `${oldVersionNum[0]}.${oldVersionNum[1]}`;
      let i = 0;
      while (i < remoteVersion.length) {
        const temp = remoteVersion[i].split('.');
        const tempPath = remoteVersion[i].includes('beta') ? temp[2].split('-') : [];
        // 如果有大于本地版本的正式版本，报错
        if (!remoteVersion[i].includes('beta') && (temp[0] > oldVersion[0] || temp[1] > oldVersion[1] || temp[2] > oldVersion[2])) {
          console.log(chalk.red.bold('❌ 请合并最新提交后再进行操作'));
          process.exit(0);
        } else if (remoteVersion[i].startsWith(start) && tempPath.length && tempPath[0] > oldVersionNum[2]) {
          // 如果path位有大于本地的测试版本，path在取稍大的值上+1
          resultVersion = `${start}.${tempPath[0] + 1}-beta.0`;
        } else {
          i++;
        }
      }
      resultVersion = resultVersion ?? `${start}${oldVersion[2] + 1}-beta.0`;
    } else if (type === 'minor') {
      let i = 0;
      while (i < remoteVersion.length) {
        const temp = remoteVersion[i].split('.');
        // 如果有大于本地版本的正式版本，报错
        if (!remoteVersion[i].includes('beta') && (temp[0] > oldVersion[0] || temp[1] > oldVersion[1])) {
          console.log(chalk.red.bold('❌ 请合并最新提交后再进行操作'));
          process.exit(0);
        } else if (remoteVersion[i].startsWith(oldVersion[0]) && remoteVersion[i].includes('beta') && temp[1] > oldVersionNum[1]) {
          // 如果path位有大于本地的测试版本，path在取稍大的值上+1
          resultVersion = `${temp[0]}.${temp[1] + 1}.0-beta.0`;
        } else {
          i++;
        }
      }
      resultVersion = resultVersion ?? `${oldVersion[0]}.${oldVersion[1] + 1}.0-beta.0`;
    } else if (type === 'major') {
      let i = 0;
      while (i < remoteVersion.length) {
        const temp = remoteVersion[i].split('.');
        // 如果有大于本地版本的正式版本，报错
        if (!remoteVersion[i].includes('beta') && temp[0] > oldVersion[0]) {
          console.log(chalk.red.bold('❌ 请合并最新提交后再进行操作'));
          process.exit(0);
        } else if (remoteVersion[i].includes('beta') && temp[0] > oldVersionNum[0]) {
          // 如果path位有大于本地的测试版本，path在取稍大的值上+1
          resultVersion = `${temp[0] + 1}.0.0-beta.0`;
        } else {
          i++;
        }
      }
      resultVersion = resultVersion ?? `${oldVersion[0] + 1}.0.0-beta.0`;
    }
  }
  console.log(resultVersion);
  const versionConfirm = await currentVersion(resultVersion);
  if (versionConfirm) {
    // const command = `npm version ${isMaster ? '' : 'pre'}${type}${isMaster ? '' : ' --preid beta'}`;
    const betaCommand = `npm version prerelease ${resultVersion}`;
    // const execCommand = resultVersion ? `${betaCommand} ${resultVersion}` : (!isMaster && isBeta ? betaCommand : command);
    const newVersion = execSync(betaCommand).toString().trim();
    console.log(chalk.blue(`版本号已更新为 ${chalk.green.bold(newVersion)}，开始发布...`));
    exec('npm publish', (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      };
      if (stderr) {
        console.log(stderr);
      }
      console.log(stdout);
    });
  }
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
