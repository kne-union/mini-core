import get from "lodash/get";
import isNil from "lodash/isNil";

const createTreeUtils = (mapping) => {
  const mappingList = Array.from(mapping.values());
  const rootNodes = mappingList.filter((item) => item.parentId === null);

  const delItem = (array, item) => {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  /**
   * 通过一个nodeId获取所有父级和所有子级的第一个元素，组成一个从最顶级到最子级的数组
   * */
  const getSelectedQueue = (id) => {
    const currentNode = mapping.get(id);
    if (!currentNode) {
      return [];
    }
    const getFirstChild = (target) => {
      if (target.children && target.children.length > 0) {
        return getFirstChild(target.children.find((item) => item.children && target.children.length > 0) || get(target.children, "0"));
      }

      const hasChildrenItem = getAllChildren(target.parentId).find((item) => item.children && item.children.length > 0);

      if (hasChildrenItem) {
        return getFirstChild(hasChildrenItem);
      }

      return target;
    };

    const getParentNodeIdList = (targetId, parents = []) => {
      const output = [targetId, ...parents];
      const node = mapping.get(targetId);
      if (!node || isNil(node.parentId)) {
        return output;
      }
      return getParentNodeIdList(node.parentId, output);
    };
    const lastLevelNode = getFirstChild(currentNode);

    return getParentNodeIdList(get(lastLevelNode, "id"));
  };

  /**
   * 通过一个nodeId获得该节点的所有子级后代的id数组
   * */
  const getAllChildren = (id) => {
    const output = [];
    const core = (id) => {
      const node = mapping.get(id);
      if (!node) {
        return;
      }
      if (Array.isArray(node.children) && node.children.length > 0) {
        output.push(...node.children);
        node.children.forEach((item) => {
          core(item.id);
        });
      }
    };
    core(id);
    return output;
  };

  /**
   * 从自身节点开始向父级查找callback返回为true的node，找到第一个返回结果
   * */
  const findInParents = (id, callback) => {
    const core = (id) => {
      const currentNode = mapping.get(id);
      if (!currentNode) {
        return null;
      }
      if (callback(currentNode)) {
        return currentNode;
      }
      if (!isNil(currentNode.parentId)) {
        return core(currentNode.parentId);
      }
      return null;
    };
    return core(id);
  };

  const getSiblingNode = (id) => {
    const currentNode = mapping.get(id);
    if (!currentNode) {
      return [];
    }
    const parentId = currentNode.parentId;
    if (isNil(parentId)) {
      return rootNodes;
    }
    const parentNode = mapping.get(parentId);
    return parentNode.children;
  };

  const setNodeChecked = (id, value = []) => {
    const newValue = value.slice(0);
    const core = (id) => {
      const node = mapping.get(id);
      if (!node) {
        return;
      }
      newValue.push(id);
      getAllChildren(id).forEach((node) => {
        delItem(newValue, node.id);
      });
      const siblingNode = getSiblingNode(id);
      const siblingNodeIsAllChecked = siblingNode.every((node) => newValue.indexOf(node.id) > -1);
      if (node.parentId && siblingNodeIsAllChecked) {
        siblingNode.forEach((node) => {
          delItem(newValue, node.id);
        });
        core(node.parentId);
      }
    };
    core(id);
    return newValue;
  };

  const setNodeUnchecked = (id, value = []) => {
    const newValue = value.slice(0);
    const core = (id) => {
      const node = mapping.get(id);
      if (!node) {
        return;
      }
      if (newValue.indexOf(node.id) > -1) {
        delItem(newValue, node.id);
        return;
      }
      const siblingNode = getSiblingNode(id);
      if (node.parentId) {
        siblingNode.forEach((node) => {
          if (id !== node.id) {
            newValue.push(node.id);
          }
        });
        core(node.parentId);
      }
    };
    core(id);
    return newValue;
  };

  const computedCheckboxStatus = (id, value = []) => {
    if (!!findInParents(id, (node) => {
      return value.indexOf(node.id) > -1;
    })) {
      return {
        checked: true, indeterminate: false,
      };
    }
    const indeterminate = ((id, callback) => {
      const core = (id) => {
        const currentNode = mapping.get(id);
        if (!currentNode) {
          return null;
        }
        if (callback(currentNode)) {
          return currentNode;
        }
        if (Array.isArray(currentNode.children) && currentNode.children.length > 0) {
          return currentNode.children.find((item) => !!core(item.id));
        }
      };

      return !!core(id);
    })(id, (node) => value.indexOf(node.id) > -1);
    if (indeterminate) {
      return {
        checked: false, indeterminate: true,
      };
    }

    return {checked: false, indeterminate: false};
  };

  const transformToTreeData = () => {
    const core = (nodeList) => {
      if (Array.isArray(nodeList) && nodeList.length > 0) {
        return nodeList.map((node) => {
          const children = mappingList.filter((item) => item.parentId === node.id);
          return Object.assign({}, node, {children: core(children)});
        });
      }
      return null;
    };
    return core(rootNodes);
  };

  const treeData = transformToTreeData();

  return {
    mapping,
    getSelectedQueue,
    getAllChildren,
    computedCheckboxStatus,
    getSiblingNode,
    findInParents,
    setNodeChecked,
    setNodeUnchecked,
    treeData,
    treeMapping: new Map(treeData.map((item) => [item.id, item]))
  };
};

export default createTreeUtils;
