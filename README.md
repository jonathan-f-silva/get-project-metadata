# Get Project Metadata

Script para buscar metadados dos projetos do Github.

## Requisitos

- Node 16 LTS
- Variável de ambiente `GITHUB_TOKEN` com um [token para acessar](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) a API do GitHub

## Como usar

- `npm install`
- crie o arquivo `.env` com as configurações da busca
- `npm start` gera dois arquivos na pasta `data`:
  - `raw.json` com os resultados da query de `getProjectMetadata`
  - `output.json` com os resultados de `formatProjectMetadata`

## Issues

- Ainda precisa de ajustes na query e formatação
