/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  let dummy1 = new ListNode(0);
  let dummy2 = new ListNode(0);
  let p1 = dummy1;
  let p2 = dummy2;
  let p = head;

  while (p !== null) {
    if (p.val < x) {
      p1.next = p;
      p1 = p1.next;
    } else {
      p2.next = p;
      p2 = p2.next;
    }

    p = p.next;
  }

  p2.next = null;
  p1.next = dummy2.next;

  return dummy1.next;
};
