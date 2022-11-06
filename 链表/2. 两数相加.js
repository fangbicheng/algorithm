/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(-1);
  let p = dummy;
  let p1 = l1;
  let p2 = l2;
  let carry = 0;

  while (p1 !== null || p2 !== null || carry > 0) {
    let val = carry;

    if (p1 !== null) {
      val += p1.val;
      p1 = p1.next;
    }
    if (p2 !== null) {
      val += p2.val;
      p2 = p2.next;
    }

    carry = Math.floor(val / 10);

    p.next = new ListNode(val % 10);
    p = p.next;
  }

  return dummy.next;
};
