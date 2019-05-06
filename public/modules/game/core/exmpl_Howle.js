class B {
  constructor(a) {
    this.a = a;
  }

  give() {
    return this.a;
  }

  set(a) {
    this.a = a;
  }

  write() {
    console.log('B ');
    console.log(this.a);
  }
}
class A {
  constructor(a) {
    this.a = a;
    this.b = new B(this.a);
    this.b.set(this.a);
  }

  plus(q) {
    this.a.q += q;
  }

  set(a) {
    this.a = a;
  }

  give() {
    return this.a;
  }

  write() {
    console.log('A ');
    console.log(this.a);
  }

  bWrite() {
    this.b.write();
  }
}

let tmp = {q: 3};
const a = new A(tmp);
a.write();
a.bWrite();
tmp.q = 8;
// a.plus(2);
a.write();
a.bWrite();
