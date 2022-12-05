/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  function reverseList(head) {
    let pre = null;
    let cur = head;

    while (cur !== null) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
  }

  let dummy = new ListNode(0);
  dummy.next = head;

  // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
  let pre = dummy;
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {
    rightNode = rightNode.next;
  }

  // 第 3 步：切断出一个子链表（截取链表）,注意：切断链接
  let leftNode = pre.next;
  let succ = rightNode.next;
  pre.next = null;
  rightNode.next = null;

  // 第 4 步：同第 206 题，反转链表的子区间
  reverseList(leftNode);

  // 第 5 步：接回到原来的链表中
  pre.next = rightNode;
  leftNode.next = succ;

  return dummy.next;
};
