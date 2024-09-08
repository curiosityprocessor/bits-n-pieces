import { dummyData } from "./dummy-data";

export function load() {
  return {
    prompts: dummyData.map((data) => ({ id: data.id, alias: data.alias })),
  };
}
