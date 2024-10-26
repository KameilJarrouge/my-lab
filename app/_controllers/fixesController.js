import {
  getSemenAnalysisArbitrary,
  updateSemenAnalysisArbitrary,
} from "./arbitraryController";

export async function fixDirectlSA() {
  const result = await getSemenAnalysisArbitrary();
  const parsed = JSON.parse(result.returned.SemenAnalysis);
  let temp = [];

  temp = parsed["Directl Motility Very Active"];
  delete parsed["Directl Motility Very Active"];
  parsed["Direct Motility Very Active"] = temp;

  temp = parsed["Directl Motility Active"];
  delete parsed["Directl Motility Active"];
  parsed["Direct Motility Active"] = temp;

  temp = parsed["Directl Motility Inactive"];
  delete parsed["Directl Motility Inactive"];
  parsed["Direct Motility Inactive"] = temp;

  await updateSemenAnalysisArbitrary(result.returned.id, parsed);
}

export async function checkDirectlSAIssue() {
  const result = await getSemenAnalysisArbitrary();
  const parsed = JSON.parse(result.returned.SemenAnalysis);
  for (let key in parsed) {
    if (key.includes("Directl")) return false;
  }
  return true;
}
