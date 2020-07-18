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

export function handlePrereqTree(
  tree,
  sourceId,
  modulesShown,
  nodes,
  links,
  type,
  index
) {
  if (tree.and) {
    tree.and.forEach((n) => {
      console.log(tree.and.indexOf(n));
      return handlePrereqTree(
        n,
        sourceId,
        modulesShown,
        nodes,
        links,
        "and",
        tree.and.indexOf(n)
      );
    });
  } else if (tree.or) {
    if (type === "and" || type === "andor") {
      tree.or.forEach((n) =>
        handlePrereqTree(
          n,
          sourceId,
          modulesShown,
          nodes,
          links,
          "andor",
          index
        )
      );
    } else {
      tree.or.forEach((n) =>
        handlePrereqTree(n, sourceId, modulesShown, nodes, links, "or", index)
      );
    }
  } else {
    getModuleInfo(tree)
      .then((moduleInfo) => {
        const moduleCode = moduleInfo.moduleCode;
        const exists = modulesShown.find(
          (module) => module.moduleCode === moduleCode
        );

        // Check if module is already present
        if (!exists) {
          modulesShown.push(moduleInfo);
          const moduleLevel = getLevelOfModule(moduleCode);
          nodes.push({ name: moduleCode, level: moduleLevel });
        }

        const targetId = nodes.findIndex((node) => node.name === moduleCode);
        const linkExists = links.find(
          (link) =>
            link.source.index == sourceId && link.target.index == targetId
        );

        // Check if link is already present
        if (!linkExists) {
          links.push({
            source: sourceId,
            target: targetId,
            type: type,
            num: index,
          });
        }

        const newSourceId = nodes.findIndex((node) => node.name === moduleCode);
        const newTree = moduleInfo.prereqTree;
        if (newTree) {
          handlePrereqTree(
            newTree,
            newSourceId,
            modulesShown,
            nodes,
            links,
            undefined,
            index
          );
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
