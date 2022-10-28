import { Octokit } from "@octokit/core";
import dotenv from "dotenv";
dotenv.config();

type Input = {
  projectId: string;
  itemId: string;
  fieldId: string;
  value: string;
};

export function changeFieldMutation(inputs: Input[]) {
  const mutations = inputs.map(
    (input) => `
    updateProjectV2ItemFieldValue(
      input: {
        projectId: "${input.projectId}",
        itemId: "${input.itemId}",
        fieldId: "${input.fieldId}",
        value: {
          text: "${input.value}"
        }
      }
    ) {
      projectV2Item {
        id
      }
    }
  `
  );

  const query = `
    mutation { 
      updateProjectV2ItemFieldValue(
        input: {
          projectId: "PVT_kwHOBRoGEs4AHdjI"
          itemId: "PVTI_lAHOBRoGEs4AHdjIzgDDA3I"
          fieldId: "PVTF_lAHOBRoGEs4AHdjIzgE1-kw"
          value: {
            text: "xulambs1"\n' +
          }
        }
      ) {
        projectV2Item {
          id
        }
      }
    

      updateProjectV2ItemFieldValue(
        input: {
          projectId: "PVT_kwHOBRoGEs4AHdjI"
          itemId: "PVTI_lAHOBRoGEs4AHdjIzgDHO3A"
          fieldId: "PVTF_lAHOBRoGEs4AHdjIzgE1-kw"
          value: {
            text: "xablau1"\n' +
          }
        }
      ) {
        projectV2Item {
          id
        }
      }
    }`;

  return query; //`mutation { ${mutations.join("\n")} }`;
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const inputs: Input[] = [
  {
    projectId: "PVT_kwHOBRoGEs4AHdjI",
    itemId: "PVTI_lAHOBRoGEs4AHdjIzgDDA3I",
    fieldId: "PVTF_lAHOBRoGEs4AHdjIzgE1-kw",
    value: "xulambs1",
  },
  {
    projectId: "PVT_kwHOBRoGEs4AHdjI",
    itemId: "PVTI_lAHOBRoGEs4AHdjIzgDHO3A",
    fieldId: "PVTF_lAHOBRoGEs4AHdjIzgE1-kw",
    value: "xablau1",
  },
];

async function mutateField() {
  const result = await octokit.graphql(changeFieldMutation(inputs));
  return result;
}

mutateField().then(console.log);
