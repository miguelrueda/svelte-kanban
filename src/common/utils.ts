export function getMinifiedUser(name: string) {
  console.log(`Name ` + name);
  if (name === "" || name === "ua") {
    return "ua";
  }
  let splitted = name.split(".");
  return splitted[0].charAt(0) + splitted[1].charAt(0);
}