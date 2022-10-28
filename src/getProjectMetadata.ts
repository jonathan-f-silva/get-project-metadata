import { Octokit } from "@octokit/core";
import { changeFieldMutation } from "./queries/changeFieldMutation";
import { getMetadataQuery } from "./queries/getMetadataQuery";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getProjectMetadata(input: any) {
  const result = await octokit.graphql(getMetadataQuery(input));
  return result;
}

export async function mutateField() {
  const result = await octokit.graphql(changeFieldMutation());
  return result;
}
