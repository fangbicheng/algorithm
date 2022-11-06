/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let p1 = head;
  // p1 先走 k 步
  for (let i = 0; i < k; i++) {
    p1 = p1.next;
  }

  // p1 和 p2 同时走 n - k 步
  let p2 = head;
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }

  // p2 现在指向第 n - k + 1 个节点，即倒数第 k 个节点
  return p2;
};
