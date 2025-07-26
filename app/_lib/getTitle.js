export const getTitle = (sex, age) => {
  let suffix = "ة";
  if (sex === "ذكر") {
    suffix = "";
  }

  if (age < 12) {
    return "الطفل" + suffix;
  } else if (age >= 12 && age <= 20) {
    return sex === "ذكر" ? "الشاب" : "الانسة";
  } else {
    return "السيد" + suffix;
  }
};
