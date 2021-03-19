export function getMinifiedUser(name: string) {
  if (name === "") {
    return "na";
  }
  let splitted = name.split(".");
  return splitted[0].charAt(0) + splitted[1].charAt(0);
}