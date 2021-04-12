import { LineHeight } from "../types/v1";
export function convertLineHeightToReflect(origin: LineHeight): number {
  if (origin.unit === "PIXELS") {
    return origin.value;
  } else {
    return undefined;
  }
}
