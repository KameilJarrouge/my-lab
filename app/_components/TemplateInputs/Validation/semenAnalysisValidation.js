export default function semenAnalysisValidation(result) {
  for (let key in result) {
    if (result[key] === "") return false;
  }
  return true;
}
