import { SceneNode } from "../figma/types/v1";

/**
 * return if giveen node is a root node.
 * node that floats on root, e.g. A text floating on the page node is not handled as root node.
 * Only Frame node that has no parent, will be considered as root node.
 * @param node
 */
export function checkIfRoot(node: SceneNode) {
  // if no parent is provided, it means it is from api or manually generated data, and it is okay to be considered as root.
  // but we need caution to this logic. (WARNING)
  if (!node.parent) {
    return true;
  }
  if (node.parent.type == "PAGE" && node.type == "FRAME") {
    return true;
  }
  return false;
}
