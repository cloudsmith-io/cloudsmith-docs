import { OpenAPIV3 } from 'openapi-types';

export interface ApiDefinition {
  operations: ApiOperation[];
  menu: ApiMenuSection[];
}

export interface ApiMenuSection {
  name: string;
  children: Array<ApiMenuSection | ApiOperation>;
}

export interface ApiOperation extends OpenAPIV3.OperationObject {
  name: string;
  path: string;
  method: OpenAPIV3.HttpMethods;
  menuSegments: string[];
}
