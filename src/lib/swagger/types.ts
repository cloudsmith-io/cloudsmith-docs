import { OpenAPIV3 } from 'openapi-types';

export interface ApiOperation extends OpenAPIV3.OperationObject {
  path: string;
  method: OpenAPIV3.HttpMethods;
  menuSegments: string[];
}
