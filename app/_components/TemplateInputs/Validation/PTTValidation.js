export default function PTTValidation(result) {
  for (let key in result) {
    if (result[key] === "") return false;
  }
  return true;
}
