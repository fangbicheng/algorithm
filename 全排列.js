// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// traverse() {
//   for 选择 in 选择列表
//     做选择
//     traverse()
//     撤销选择
// }

var permute = function(nums) {
  // 结果
  const res = [];
  // 选择路径
  const path = [];
  // 选择列表
  const used = new Array(nums.length).fill(false);

  traverse(nums);
  return res;

  function traverse(nums) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }

      path.push(nums[i]);
      used[i] = true;
      traverse(nums);
      path.pop();
      used[i] = false;
    }
  }
};

const input = [1, 2, 3];
const output = permute([1,2,3])
console.log(output)

