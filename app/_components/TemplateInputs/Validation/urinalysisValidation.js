export default function urinalysisValidation(result) {
  for (let key in result) {
    if (key === "Dynamic") {
      for (let row of result["Dynamic"]) {
        if (row.name === "" || row.value === "") return false;
      }
    } else if (result[key] === "") return false;
  }
  return true;
}
