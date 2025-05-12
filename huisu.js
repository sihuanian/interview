function permute(nums) {
    const res = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(path) {
        if (path.length === nums.length) {
            res.push([...path]); // 记录解
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue; // 剪枝：跳过已选元素
            used[i] = true;        // 选择
            path.push(nums[i]);
            backtrack(path);       // 递归
            path.pop();            // 撤销选择
            used[i] = false;
        }
    }

    backtrack([]);
    return res;
}

const nums = [1, 2, 3, 4];
const result = permute(nums); // [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log('result', result)

function permuteUnique(nums) {
    const res = [];
    nums.sort((a, b) => a - b); // 排序预处理
    const used = new Array(nums.length).fill(false);

    function backtrack(path) {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i - 1] && !used[i - 1])) {
                continue; // 剪枝：跳过重复元素
            }
            used[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return res;
}

function huisu(nums) {
    let res = []
    const used = Array.from({ length: nums.length }, () => false)
    function backtrack(path) {
        for (let i = 0; i < nums.length; i++) {
            if (path.length === nums.length) {
                res.push([...path])
                return
            }
            if (used[i]) continue
            path.push(nums[i])
            used[i] = true
            backtrack(path)
            used[i] = false
            path.pop()
        }
    }
    backtrack([]);

    return res;
}

const res = huisu(nums)
console.log('res', res)