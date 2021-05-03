import { convertFigmaRemoteEffectsToFigma } from "../converters/effect.convert";
import { convertFigmaRemoteFillsToFigma } from "../converters/fills.convert";
import { convertFigmaRemoteLayoutConstraintsToFigmaConstraints } from "../converters/layout-constraints.convert";
import { convertFigmaRemoteStrokesToFigma } from "../converters/strokes.convert";
import { MappingBlendInput } from "./_in";

export function blendBaseNode(p: MappingBlendInput) {
  const { target, source } = p;
  target.id = source.id;
  target.name = source.name;
  target.visible = source.visible ?? true;
  target.opacity = source.opacity ?? 1;
  target.layoutAlign = source.layoutAlign;
  target.exportSettings = source.exportSettings;
  target.blendMode = source.blendMode ?? "NORMAL";
  target.isMask = source.isMask ?? false;

  target.strokes = convertFigmaRemoteStrokesToFigma(...source.strokes);
  target.strokeWeight = source.strokeWeight;
  target.strokeAlign = source.strokeAlign;

  target.fills = convertFigmaRemoteFillsToFigma(...source.fills);
  target.effects = convertFigmaRemoteEffectsToFigma(...source.effects);

  target.relativeTransform = source.relativeTransform as [
    [number, number, number],
    [number, number, number]
  ];

  target.constraints = convertFigmaRemoteLayoutConstraintsToFigmaConstraints(
    source.constraints
  );

  // for some reason, xywh is not available for some node types by figma rem api.
  target.x = source.absoluteBoundingBox.x;
  target.y = source.absoluteBoundingBox.y;
  target.width = source.absoluteBoundingBox.width;
  target.height = source.absoluteBoundingBox.height;

  // static override
  target.effectStyleId = undefined;
  target.strokeStyleId = undefined;
  target.fillStyleId = undefined;
  target.removed = false;
  target.locked = false;
  target.parent = undefined;
  target.strokeCap = undefined;
  target.strokeMiterLimit = undefined;
  target.strokeJoin = undefined;
  target.dashPattern = undefined;
  target.constrainProportions = undefined;
  target.layoutGrow = undefined;

  // TODO
  target.reactions = undefined;
  target.rotation = 0; // calculate with transform
  target.absoluteTransform = [
    [1, 0, 0],
    [0, 1, 0],
  ]; // calculate with transform
}