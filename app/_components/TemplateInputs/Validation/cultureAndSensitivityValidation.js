export default function cultureAndSensitivityValidation(result) {
  if (!result.isPositive) {
    if (result.specimen === "") return false;

    return true;
  } else {
    if (
      result.specimen === "" ||
      result.growthOf === "" ||
      result.coloniesCount === "" ||
      result.selectedAA.length === 0
    )
      return false;
    return true;
  }
}
