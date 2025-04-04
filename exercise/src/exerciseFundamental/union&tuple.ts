type password = number | string;
type userInfo = [string, number, boolean];
type userPremium = [string, boolean, string];

type user = userInfo | userPremium;

const pass: password = "123ui";
const pass2: password = 199209;

const worker: user = ["John", 25, false];
const worker2: user = ["Bob", true, "Premium"];

console.log(pass, pass2, worker, worker2)