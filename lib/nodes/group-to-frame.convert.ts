import { ReflectSceneNode, ReflectFrameNode, ReflectGroupNode } from "./mixin";

export function convertGroupToFrame(node: ReflectGroupNode): ReflectFrameNode {
  const newNode = new ReflectFrameNode();

  newNode.id = node.id;
  newNode.name = node.name;

  newNode.x = node.x;
  newNode.y = node.y;
  newNode.width = node.width;
  newNode.height = node.height;
  newNode.rotation = node.rotation;

  newNode.fills = [];
  newNode.strokes = [];
  newNode.effects = [];
  newNode.cornerRadius = 0;

  newNode.layoutMode = "NONE";
  newNode.counterAxisSizingMode = "AUTO";
  newNode.clipsContent = false;
  newNode.layoutGrids = [];
  newNode.gridStyleId = "";
  newNode.guides = [];

  newNode.parent = node.parent;

  // update the children's x and y position. Modify the 'original' node, then pass them.
  updateChildrenXY(node) as ReflectFrameNode;
  newNode.children = node.children;

  newNode.children.forEach((d) => {
    // update the parent of each child
    d.parent = newNode;
  });

  // don't need to take care of newNode.parent.children because method is recursive.
  // .children =... calls convertGroupToFrame() which returns the correct node

  return newNode;
};

/**
 * Update all children's X and Y value from a Group.
 * Group uses relative values, while Frame use absolute. So child.x - group.x = child.x on Frames.
 * This isn't recursive, because it is going to run from the inner-most to outer-most element. Therefore, it would calculate wrongly otherwise.
 *
 * This must be called with a GroupNode. Param accepts anything because of the recurison.
 * Result of a Group with x,y = (250, 250) and child at (260, 260) must be child at (10, 10)
 */
function updateChildrenXY(node: ReflectSceneNode): ReflectSceneNode {
  // the second condition is necessary, so it can convert the root
  if (node.type === "GROUP") {
    node.children.forEach((d) => {
      d.x = d.x - node.x;
      d.y = d.y - node.y;
    });
    return node;
  } else {
    return node;
  }
}
