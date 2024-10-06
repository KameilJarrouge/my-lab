export default function serologyValidation(result, fieldsCount) {
  if (Object.keys(result).length !== fieldsCount) return false;

  for (let key in result) {
    if (result[key] === "") return false;
  }
  return true;
}
