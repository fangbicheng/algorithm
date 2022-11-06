/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  // 找到相遇点
  while (
    slow != null &&
    slow.next !== null &&
    fast !== null &&
    fast.next !== null
  ) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      break;
    }
  }

  // 说明无环
  if (fast === null || fast.next === null) {
    return null;
  }

  // 相遇之后，slow回到head，同速前进，再次相遇即是环起点
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};
