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
 * 检测当前分支工作区是否已经提交，没提交则中断后续操作
 */
function checkClean() {
  const stdout = execSync('git status').toString().trim();
  if (!stdout.endsWith(CLEAN_TEXT) && !stdout.endsWith(ZN_CLEAN_TEXT)) {
    console.log(chalk.red.bold('❌ 工作区存在未提交的改动，请提交后再进行后续操作'));
    process.exit(0);
  }
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

/**
 * 获取用户选择的发布类型（正式or测试）并进行确认
 * @param {boolean} isMaster
 * @returns {Promise<boolean>}
 */
async function confirmReleaseType(isMaster) {
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
 * 新的版本号二次确认
 * @param {string} version
 * @returns {Promise<boolean>}
 */
async function confirmNewVersion(version) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: `即将发布的新版本号为 ${chalk.yellow.bold(version)}，是否继续？`,
      default: true,
    },
  ]);
  const res = answers.continue;
  return res;
}

/**
 * 获取所有已发布的版本
 * @returns {Promise<string[]>}
 */
function getAllReleasedVersions() {
  return new Promise((resolve, reject) => {
    exec(`npm view scc-oms-components versions --json`, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red.bold(`❌ 执行出错: ${error}`));
        return reject(error);
      }
      if (stderr) {
        console.log(chalk.red.bold(`❌ 标准错误输出: ${stderr}`));
        return reject(stderr);
      }
      try {
        const versions = JSON.parse(stdout);
        resolve(versions);
      } catch (parseError) {
        console.log(chalk.red.bold(`❌ JSON解析错误: ${parseError}`));
        reject(parseError);
      }
    });
  });
}

/**
 * 获取当前分支的版本号
 * @returns {string}
 */
function getCurrentVersion() {
  const pkgPath = path.join(__dirname, 'package.json');
  const pkgData = readFileSync(pkgPath, { encoding: 'utf-8' });
  const version = JSON.parse(pkgData).version;
  return version;
}

/**
 * 获取用户要发布的版本类型（major/minor/patch）
 * @returns {Promise<string>}
 */
async function getVersionType() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: '选择你要发布的版本类型：',
      choices: [
        { name: '不兼容的版本更新-major', value: 'major' },
        { name: '向后兼容的新增特性-minor', value: 'minor' },
        { name: '向后兼容的问题修复-patch', value: 'patch' },
      ],
    },
  ]);
  const type = answers.type;
  return type;
}

/**
 * 分支比较，判断当前分支是否落后于远程master
 * @param {boolean} isMaster
 * @returns {void}
 */
// function compareWithOriginMaster(isMaster) {
//   console.log(chalk.blue('info - 分支commit检测：'));
//   const stdout = execSync('git remote -v').toString().trim();
//   const strArr = stdout.match(/^(.+?)\s/);
//   if (strArr) {
//     const remoteName = strArr[1];
//     execSync(`git fetch ${remoteName}`);
//     const behind = execSync(`git rev-list HEAD..${remoteName}/master`).toString().trim();
//     if (!isMaster) {
//       if (behind) {
//         console.log(chalk.red.bold('❌ 当前分支落后于master分支，请合并后再发版'));
//         process.exit(0);
//       }
//       const beyond = execSync(`git rev-list ${remoteName}/master..HEAD`).toString().trim();
//       if (!beyond) {
//         console.log(chalk.red.bold('❌ 当前分支commit记录与master分支相同，代码没有更新，不需要发版'));
//         process.exit(0);
//       } else {
//         console.log(chalk.green.bold('✅ 当前分支超前于master分支，可以发版'));
//       }
//     } else {
//       if (behind) {
//         console.log(chalk.red.bold('❌ 当前master分支落后于远程master分支，请merge后再发版'));
//         process.exit(0);
//       } else {
//         console.log(chalk.green.bold('✅ 符合要求，可以发版'));
//       }
//     }
//   }
// }

/**
 * 获取新的版本号
 * @param {boolean} isMaster
 * @returns {string}
 */
async function getNewVersion(isMaster) {
  const allVersions = await getAllReleasedVersions(); // 获取所有已发布的版本
  let allBetaVersions = []; // 所有测试版本
  let allFormalVersions = []; // 所有正式版本
  allVersions.forEach((ver) => {
    if (ver.includes('-beta') || ver.includes('-alpha')) {
      allBetaVersions.push(ver);
    } else {
      allFormalVersions.push(ver);
    }
  });
  const versionType = await getVersionType();
  // 如果当前是master分支，则发布的是正式版
  // 此时需要看一下远程分支最新的正式版本号是什么
  // 然后根据用户选择的versionType得出新的版本号
  let newVersion = '';
  if (isMaster) {
    // 拿到当前最大正式版本
    allFormalVersions.sort((aVer, bVer) => {
      let aArr = aVer.split('.');
      let bArr = bVer.split('.');
      let i = 0;
      while (true) {
        let aNum = Number(aArr[i]);
        let bNum = Number(bArr[i]);
        if (isNaN(aNum) && isNaN(bNum)) {
          return 0;
        } else if (isNaN(aNum)) {
          return 1;
        } else if (isNaN(bNum)) {
          return -1;
        } else if (aNum < bNum) {
          return 1;
        } else if (aNum > bNum) {
          return -1;
        }
        i++;
      }
    })
    const newVersionArr = allFormalVersions[0].split('.');
    // 在这个基础上+1
    switch (versionType) {
      case 'major':
        newVersionArr[0] += 1;
        newVersionArr[1] = 0;
        newVersionArr[2] = 0;
        break;
      case 'minor':
        newVersionArr[1] += 1;
        newVersionArr[2] = 0;
        break;
      case 'patch':
        newVersionArr[2] += 1;
        break;
      default:
        break;
    }
    newVersion = newVersionArr.join('.');
  } else {
    const curVersion = getCurrentVersion(); // 当前版本
    // 拆分成数组  1.0.1-beta.1 => [1, 0, 1, 'beta', 1]  1.0.1 => [1, 0, 1]
    const tempVersionArr = curVersion.split('-')
      .map((item) => item.split('.'))
      .flat(2)
      .map((item) => isFinite(item) ? Number(item) : item);
    // 判断当前分支的版本是beta还是正式
    let isBeta = false;
    if (tempVersionArr.includes('beta') || tempVersionArr.includes('alpha')) {
      isBeta = true;
    }
    newVersion = curVersion;
    if (!isBeta) {
      // 如果不是beta，先增加版本号（比如 1.1.0 -> 1.1.1）
      switch (versionType) {
        case 'major':
          tempVersionArr[0] += 1;
          tempVersionArr[1] = 0;
          tempVersionArr[2] = 0;
          break;
        case 'minor':
          tempVersionArr[1] += 1;
          tempVersionArr[2] = 0;
          break;
        case 'patch':
          tempVersionArr[2] += 1;
          break;
        default:
          break;
      }
      newVersion = tempVersionArr.join('.');
      const biggerVersions = allBetaVersions.filter((ver) => ver.startsWith(newVersion));
      // 判断是否已经有新版本的beta版本，有就退出流程并提示merge，没有则增加beta.0
      if (biggerVersions.length) {
        console.log(chalk.red.bold(`❌ 新的beta分支已发布，请合并后再进行操作`));
        process.exit(0);
      } else {
        newVersion = `${newVersion}-beta.0`;
      }
    } else {
      // 已经是beta了，就看一下是否有新的beta，有就退出流程并提示merge，没有则beta+1
      const newVersionArr = newVersion.split('-beta.');
      const biggerVersions = allBetaVersions.filter((ver) => ver.startsWith(newVersionArr[0]) && Number(ver.split('-beta.')[1]) > Number(newVersionArr[1]));
      if (biggerVersions.length) {
        console.log(chalk.red.bold(`❌ 新的beta分支已发布，请合并后再进行操作`));
        process.exit(0);
      } else {
        newVersion = `${newVersionArr[0]}-beta.${Number(newVersionArr[1]) + 1}`
      }
    }
  }

  return newVersion;
}

/**
 * 执行发版
 * @param {string} version
 */
async function doRelease(version) {
  // 发包前需要切换到官方源
  execSync('npm config set registry https://registry.npmjs.org');
  const command = `npm version ${version}`;
  const versionStr = execSync(command).toString().trim();
  console.log(chalk.blue(`版本号已更新为 ${chalk.green.bold(versionStr)}，开始发布...`));
  exec('npm run build && npm publish', (error, _stdout, stderr) => {
    if (error) {
      console.error(error);
    };
    if (stderr) {
      console.error(stderr);
    }
  });
}

async function main() {
  try {
    checkClean();
    const isMaster = isMasterBranch();
    const isContinue = await confirmReleaseType(isMaster);
    if (isContinue) {
      const newVersion = await getNewVersion(isMaster);
      const confirm = await confirmNewVersion(newVersion);
      if (confirm) {
        await doRelease(newVersion);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

main();
