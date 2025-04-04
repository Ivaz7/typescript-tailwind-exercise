const age: number = 40;
const name: string = "John";
const report: number[] = [1, 2, 3];
const status: boolean = false;
const related: string[] = ["Bob", "Mark"];

interface Person {
  age: number,
  name: string,
  report: number[],
  status: boolean,
  related: string[],
}

const user: Person = {
  age: 40,
  name: "John",
  report: [1, 2, 3],
  status: true,
  related: ["Bob", "Mark"],
}

function logClassic(age:number, name:string, report:number[], status:boolean, related:string[], user:Person) {
  if (user.age === age) {
    console.log("Age is same");
  }

  if (user.name === name) {
    console.log("Name is same");
  }

  if (typeof user.report === typeof report) {
    console.log("report is same");
  }

  if (user.status === status) {
    console.log("Status is same")
  }

  if (typeof user.related === typeof related) {
    console.log("Related is same")
  }
}

const logModern = (age:number, name:string, report:number[], status:boolean, related:string[], user:Person) => {
  if (user.age === age) {
    console.log("Age is same");
  }

  if (user.name === name) {
    console.log("Name is same");
  }

  if (typeof user.report === typeof report) {
    console.log("report is same");
  }

  if (user.status === status) {
    console.log("Status is same")
  }

  if (typeof user.related === typeof related) {
    console.log("Related is same")
  }
}

logClassic(age, name, report, status, related, user);
logModern(age, name, report, status, related, user);