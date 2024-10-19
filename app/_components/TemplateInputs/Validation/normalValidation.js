export default function normalValidation(result) {
  for (let key in result) {
    if (result[key] === "") return false;
  }
  return true;
}
