import env from '@next/env';
import fs from 'fs';
import path from 'path';
import swagger2openapi from 'swagger2openapi';

const projectDir = process.cwd();
const outputDir = `${projectDir}/src/content/schemas`;

env.loadEnvConfig(projectDir);

async function downloadSchema(schemaUrl: string, fileName: string, versionAlias: string, convert: boolean = false) {

  console.log(`Fetching schema from ${schemaUrl}...`);

  const destination = path.resolve(outputDir, fileName);
  const response = await fetch(schemaUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let data = await response.text();
  
  if(convert) {
    console.log(`Converting schema...`);
    data = await convertSchema(data);
  }

  const json = JSON.parse(data);
  json.info.versionAlias = versionAlias;

  const formatted = JSON.stringify(json, null, 2);
  await fs.writeFileSync(destination, formatted, { encoding: 'utf-8' });

  console.log(`Schema saved to ${destination}`);
}

async function convertSchema(schema: string): Promise<string> {
  return new Promise((resolve, reject) => {
    swagger2openapi.convertObj(JSON.parse(schema), {}, (err, options) => {
      if (err) {
        reject(err);
        return;
      }
      if (!options.openapi) {
        reject(new Error('Conversion failed: no openapi property in result'));
        return;
      }
      resolve(JSON.stringify(options.openapi));
    });
  });
}

async function main() {
  await downloadSchema(process.env.CLOUDSMITH_API_V1_URL!, 'api-schema-v1.json', 'v1', true);
  await downloadSchema(process.env.CLOUDSMITH_API_V2_URL!, 'api-schema-v2.json', 'v2', false);
}

main();
