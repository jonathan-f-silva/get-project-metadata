export function formatProjectMetadata(metadata: any) {
  const itens = metadata.organization.projectV2.items.nodes;
  return itens.map(({ fieldValues: { nodes } }: any) => {
    return {
      fields: nodes
        .filter((node: any) => node.field)
        .map((node: any) => ({
          name: node.field.name,
          value: node.text || node.name || "",
        })),
    };
  });
}
