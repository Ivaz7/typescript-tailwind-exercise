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

class UserImp implements Person {
  name: string;
  age: number;
  report: number[];
  status: boolean;
  related: string[];

  constructor(person: Person) {
    this.name = person.name;
    this.age = person.age;
    this.report = person.report;
    this.status = person.status;
    this.related = person.related;
  }

  logClassImp() {
    if (this.age === age) {
      console.log("Age is same");
    }
  
    if (this.name === name) {
      console.log("Name is same");
    }
  
    if (typeof this.report === typeof report) {
      console.log("report is same");
    }
  
    if (this.status === status) {
      console.log("Status is same")
    }
  
    if (typeof this.related === typeof related) {
      console.log("Related is same")
    }
  }
}

class UserDefault {
  name: string;
  age: number;
  status: boolean;
  report: number[];
  related: string[];

  constructor(name: string, age: number, status: boolean, report: number[], related: string[]) {
    this.name = name;
    this.age = age;
    this.status = status;
    this.report = report;
    this.related = related;
  }

  logClassDefault() {
    if (this.age === age) {
      console.log("Age is same");
    }
  
    if (this.name === name) {
      console.log("Name is same");
    }
  
    if (typeof this.report === typeof report) {
      console.log("report is same");
    }
  
    if (this.status === status) {
      console.log("Status is same")
    }
  
    if (typeof this.related === typeof related) {
      console.log("Related is same")
    }
  }
}

const user1 = new UserImp(user);
const user2 = new UserDefault("John", 40, false, [1,2,3], ["Bob", "Mark"]);

logClassic(age, name, report, status, related, user);
logModern(age, name, report, status, related, user);

user1.logClassImp();
user2.logClassDefault();