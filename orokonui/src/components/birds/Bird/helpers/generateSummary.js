/**
  Generates a summary string from a given bird.
  */
const generateSummary = (bird) => {
  var summary = [];

  bird.status === "Dead" && summary.push("Deceased");
  bird.life_stage &&
    bird.life_stage !== "Undetermined" &&
    summary.push(bird.life_stage);
  bird.sex && summary.push(bird.sex);
  bird.primary_band && summary.push(bird.primary_band);

  return summary.join(" · ");
};

export default generateSummary;
