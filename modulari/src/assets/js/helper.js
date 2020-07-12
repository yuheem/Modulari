import axios from "axios";
import academicCalendar from "./academicCalendar.js";

export function getModuleInfo(moduleCode) {
  return axios
    .get(
      "https://api.nusmods.com/v2/" +
        `${academicCalendar.getAcadYear(new Date())}` +
        `/modules/${moduleCode.toUpperCase()}.json`
    )
    .then((res) => res.data);
}

export function handlePrereqTree(tree, sourceId, modulesShown, nodes, links) {
  if (tree.and) {
    tree.and.forEach((n) =>
      handlePrereqTree(n, sourceId, modulesShown, nodes, links)
    );
  } else if (tree.or) {
    tree.or.forEach((n) =>
      handlePrereqTree(n, sourceId, modulesShown, nodes, links)
    );
  } else {
    getModuleInfo(tree)
      .then((moduleInfo) => {
        const moduleCode = moduleInfo.moduleCode;
        const exists = modulesShown.find(
          (module) => module.moduleCode === moduleCode
        );
        if (!exists) {
          modulesShown.push(moduleInfo);
          const moduleLevel = getLevelOfModule(moduleCode);
          nodes.push({ name: moduleCode, level: moduleLevel });
        }
        const targetId = nodes.findIndex((node) => node.name === moduleCode);
        links.push({ source: sourceId, target: targetId });

        const newSourceId = nodes.findIndex((node) => node.name === moduleCode);
        const newTree = moduleInfo.prereqTree;
        if (tree) {
          handlePrereqTree(newTree, newSourceId, modulesShown, nodes, links);
        }
      })
      .catch((e) => console.log(e));
  }
}

export function getLevelOfModule(moduleCode) {
  // Extract only the numbers in the module code
  const moduleCodeNumbers = moduleCode.match(/[0-9]/g);

  // First number in the module code indicates level of module
  return moduleCodeNumbers[0];
}
