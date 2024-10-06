export default function cultureAndSensitivityValidation(result) {
  if (!result.isPositive) return true;
  if (
    result.specimen === "" ||
    result.growthOf === "" ||
    result.coloniesCount === "" ||
    result.selectedAA.length === 0
  )
    return false;

  return true;
}
