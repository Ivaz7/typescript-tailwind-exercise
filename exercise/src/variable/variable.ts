const age: number = 40;
const name: string = "John";
const report: number[] = [1, 2, 3];

interface Person {
  age: number,
  name: string,
  report: number[],
}

const user: Person = {
  age: 40,
  name: "John",
  report: [1, 2, 3],
}

console.log(age, name, report, user)