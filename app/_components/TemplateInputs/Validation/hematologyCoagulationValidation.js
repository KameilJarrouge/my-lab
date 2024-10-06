export default function hematologyCoagulationValidation(result) {
  for (let i = 0; i < Object.keys(result).length; i++) {
    if (result[i] === "") return false;
  }
  return true;
}
