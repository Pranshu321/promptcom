import Prompt from "@models/Prompt";
import { connect } from "@utils/database";

export const GET = async (request) => {
  try {
    await connect();

    const prompts = await Prompt.find({}).populate("creator");
    console.log("prompts", prompts);

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
export const revalidate = 0;
