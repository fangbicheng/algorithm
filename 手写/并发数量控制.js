class Scheduler {
  constructor(maxNum) {
    this.workNum = 0;
    this.maxNum = maxNum;
    this.queue = [];
  }

  add() {
    const promiseCreator = (time) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    }

    this.queue.push(promiseCreator);
  }

  start() {
    for (let i = 0; i < this.maxNum; i++) {
      this.request();
    }
  }

  request() {
    if (this.queue.length > 0 && this.workNum < this.maxNum) {
      this.workNum++;
      this.queue.shift()().then((res) => {
        this.workNum--;
        this.request();
      });
    }
  }
}

const scheduler = new Scheduler();
scheduler.add(1000);
scheduler.add(100);
scheduler.add(500);

scheduler.start();