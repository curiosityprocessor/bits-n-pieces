import { error } from "@sveltejs/kit";
import { dummyData } from "../dummy-data";

export function load({ params }) {
  const prompt = dummyData.find((data) => data.id === parseInt(params.id));

  if (!prompt) {
    throw error(404, "Not found");
  }
  return {
    prompt,
  };
}
