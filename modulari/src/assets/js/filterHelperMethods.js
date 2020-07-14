import { getLevelOfModule } from "./helper";

export function defaultSettings(filterOptions) {
  return (
    filterOptions.level === "No filter" &&
    filterOptions.faculty === "No filter" &&
    filterOptions.numOfMCs === "No filter" &&
    filterOptions.exams === "No filter"
  );
}

export function filterLevel(module, levelOfInterest) {
  if (levelOfInterest !== "No filter") {
    const levelOfModule = getLevelOfModule(module.moduleCode);
    return levelOfModule === levelOfInterest[0];
  }

  return true;
}

export function filterFaculty(module, facultyOfInterst) {
  if (facultyOfInterst !== "No filter") {
    return module.faculty === facultyOfInterst;
  }
  return true;
}

export function filterNumOfMCs(module, numOfMCsInterested) {
  if (numOfMCsInterested === "0-3 MCs") {
    return (
      module.moduleCredit === "0" ||
      module.moduleCredit === "1" ||
      module.moduleCredit === "2" ||
      module.moduleCredit === "3"
    );
  }

  if (numOfMCsInterested === "4 MCs") {
    return module.moduleCredit === "4";
  }

  if (numOfMCsInterested === "5-8 MCs") {
    return (
      module.moduleCredit === "5" ||
      module.moduleCredit === "6" ||
      module.moduleCredit === "7" ||
      module.moduleCredit === "8"
    );
  }

  if (numOfMCsInterested === "More than 8 MCs") {
    return parseInt(module.moduleCredit) > 8;
  }

  return true;
}

export function filterExam(module, examinable) {
  if (examinable === "No Exams") {
    if (module.semesterData.length !== 0) {
      const hasExam = "examDate" in module.semesterData[0];
      if (hasExam) {
        return false;
      }
    }
  }

  return true;
}
