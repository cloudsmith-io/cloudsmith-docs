import { getApiSchema } from '@/lib/swagger/util';
import _ from 'lodash';
import env from '@next/env';
import fs from 'fs';
import path from 'path';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
}

function setResource(resourceArray, menuParent, method, data) {
  if (resourceArray.length === 1) {
    menuParent.push({ type: 'operation', name: resourceArray[0], method, data });
  } else {
    const name = resourceArray.shift();
    const existing = menuParent.find((r) => r.name === name);

    if (existing) {
      setResource(resourceArray, existing.children, method, data);
    } else {
      const resource = { type: 'resource', name, children: [] };
      setResource(resourceArray, resource.children, method, data);
      menuParent.push(resource);
    }
  }
}

function printItem(item, spaces) {
  if (item.type === 'operation') {
    const name = item.name.replaceAll('-', ' ');
    console.log(`${''.padStart(spaces)} ${item.method.toUpperCase()} ${name}`);
  } else if (item.type === 'resource') {
    const name = item.name.replaceAll('-', ' ');
    console.log(''.padStart(spaces) + ' ' + toTitleCase(name));
    for (const child of item.children) {
      printItem(child, spaces + 2);
    }
  }
}

async function parseSchema() {
  const schema = await getApiSchema();

  const menu = [];

  for (const path in schema.paths) {
    const pathDef = schema.paths[path];

    for (const method in pathDef) {
      const methodDef = pathDef[method];
      if (method != 'parameters') {
        const split = methodDef.operationId.replace('partial_update', 'partial-update').split('_');
        setResource(split, menu, method, methodDef);
      }
    }
  }

  for (const child of menu) {
    printItem(child, 0);
  }
}

parseSchema();
