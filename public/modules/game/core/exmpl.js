class A {
  constructor(a) {
    this.a = a;
  }

  plus(q) {
    this.a += q;
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
}

class B {
  constructor() {
    this.a = 2;
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

const b = new B();
const a = new A(b.give());
a.write();
a.plus(10);
a.write();
b.write();
b.set(a.give());
b.write();
a.plus(10);
a.write();
b.write();
