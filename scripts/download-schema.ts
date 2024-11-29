import env from '@next/env';
import fs from 'fs';
import path from 'path';

import { prettierFormatter } from './util/prettier-formatter';

const projectDir = process.cwd();
const outputDir = `${projectDir}/src/content`;

// Load all environment variables
env.loadEnvConfig(projectDir);

async function downloadSchema(schemaUrl: string, fileName: string) {
  try {
    console.log(`Fetching schema from ${schemaUrl}...`);
    const response = await fetch(schemaUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const schema = await prettierFormatter(data, { parser: 'json' });
    const destination = path.resolve(outputDir, fileName);

    await fs.writeFileSync(destination, schema, { encoding: 'utf-8' });

    console.log(`Schema downloaded and saved to ${destination.toString()}`);
  } catch (error) {
    console.log('Failed to download schema');
    console.error(error);
  }
}

downloadSchema(process.env.CLOUDSMITH_API_V1_URL!, 'api-schema-v1.json');
downloadSchema(process.env.CLOUDSMITH_API_V2_URL!, 'api-schema-v2.json');
