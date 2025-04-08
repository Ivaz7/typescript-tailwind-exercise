export const devUsernameFilter = (name: string) => {
  const val = name.trim();
  const lower = val.toLowerCase();
  const nick = ["i", "v", "a", "z" ,"d", "e", "v"];
  let inx = 0;
  let res = "";

  for (const letter of lower) {
    if (letter === nick[inx]) {
      res += letter;
      inx++;
    }
  }

  if (res === nick.join('')) {
    return true;
  }

  return false;
}