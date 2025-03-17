// 版本号比较算法
function formateVersion(version) {
  const arr = version.split('.');
  while (arr.length < 3) {
    arr.push('0')
  }
  return arr
}

function compareVersion(version1, version2) {
  const v1 = formateVersion(version1);
  const v2 = formateVersion(version2);
  console.log('v1', v1)
  console.log('v2', v2)
  for (let i = 0; i < v1.length; i++) {
    if (Number(v1[i]) > Number(v2[i])) {
      return 1
    } else if (Number(v1[i]) < Number(v2[i])) {
      return -1
    }
  }
  return 0
}

const con1 = compareVersion('1.2.4', '1.1.5') // 1
const con2 = compareVersion('1.2', '1.10.5') // -1
const con3 = compareVersion('1.00.03', '1.0.03') // 0
console.log('flag', { con1, con2, con3 })
