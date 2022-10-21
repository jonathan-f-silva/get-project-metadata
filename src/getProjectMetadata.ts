import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

type Input = {
  org: string;
  projectNumber: string;
  fieldsQty: number;
  itemsQty: number;
};

export async function getProjectMetadata(input: Input) {
  const result = await octokit.graphql(`
    {
      organization(login: "${input.org}") {
        projectV2(number: ${input.projectNumber}) {
          items(first: ${input.itemsQty}) {
            nodes {
              id
              fieldValues(first: ${input.fieldsQty}) {
                nodes {
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    date
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldNumberValue {
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                    number
                  }
                }
              }
              content {
                ... on PullRequest {
                  id
                  url
                }
                ... on Issue {
                  id
                  url
                }
                ... on DraftIssue {
                  id
                }
              }
            }
          }
        }
      }
    }
  `);
  return result;
}
