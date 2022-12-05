/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var deleteNode = function (head, val) {
  let dummy = new ListNode(0);
  let q = dummy;
  let p = head;

  while (p !== null) {
    if (p.val !== val) {
      q.next = p;
      q = q.next;
    }
    // 断开原链表中的每个节点的 next 指针
    let temp = p.next;
    p.next = null;
    p = temp;
  }

  return dummy.next;
};
