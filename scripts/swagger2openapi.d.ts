declare module 'swagger2openapi' {
  export class S2OError extends Error {
    name: 'S2OError';
    options?: ConvertOptions;
  }

  export const targetVersion: string;

  export interface ConvertOptions {
    original?: unknown;
    text?: string;
    externals?: unknown[];
    externalRefs?: Record<string, unknown>;
    rewriteRefs?: boolean;
    preserveMiro?: boolean;
    promise?: {
      resolve: (value: ConvertOptions | unknown) => void;
      reject: (error: Error) => void;
    };
    cache?: Record<string, unknown>;
    source?: string;
    openapi?: unknown;
    direct?: boolean;
    resolve?: boolean;
    targetVersion?: string;
    origin?: boolean;
    sourceFile?: string;
    encoding?: string;
    fetch?: typeof fetch;
    fetchOptions?: RequestInit;
    agent?: unknown;
    verbose?: boolean;
    warnOnly?: boolean;
    warnProperty?: string;
    patch?: boolean;
    patches?: number;
  }

  export type ConvertCallback = (
    err: Error | null,
    options: ConvertOptions
  ) => void;

  export function convertObj(
    swagger: unknown,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;

  export function convert(
    swagger: unknown,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;

  export function convertUrl(
    url: string,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;

  export function convertStr(
    str: string,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;

  export function convertFile(
    filename: string,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;

  export function convertStream(
    readable: NodeJS.ReadableStream,
    options: ConvertOptions,
    callback?: ConvertCallback
  ): Promise<ConvertOptions> | void;
}
