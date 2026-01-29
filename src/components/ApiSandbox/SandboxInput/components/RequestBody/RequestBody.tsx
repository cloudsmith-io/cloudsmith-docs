import { useEffect, useMemo, useState } from 'react';

import { Tag } from '@/components/Tag';
import { ApiOperation, SchemaObject } from '@/lib/swagger/types';

import ParamSet from '../ParamSet';
import { Param, ParamToggle } from '../ParamSet/ParamSet';

type RequestBodyProps = {
  requestBody: NonNullable<ApiOperation['requestBody']>;
  state: Record<string, Record<string, string>>;
  onUpdateParam: (meta: string, name: string, value: string) => void;
};

export const RequestBody = ({ state, requestBody, onUpdateParam }: RequestBodyProps) => {
  const multipleMedia = Object.keys(requestBody.content).length > 1;

  return (
    <>
      {Object.entries(requestBody.content).map(([media, spec]) => (
        <MediaParams
          key={media}
          multipleMedia={multipleMedia}
          required={requestBody.required ?? false}
          media={media}
          schema={spec.schema ?? {}}
          state={state[media]}
          onUpdateParam={(name, value) => onUpdateParam(media, name, value)}
        />
      ))}
    </>
  );
};

type MediaParamsProps = {
  required: boolean;
  media: string;
  schema: SchemaObject;
  multipleMedia: boolean;
  state?: Record<string, string>;
  onUpdateParam: (name: string, value: string) => void;
};

const MediaParams = ({
  required,
  media,
  schema,
  multipleMedia,
  state = {},
  onUpdateParam,
}: MediaParamsProps) => {
  const parameterEntries = useMemo(() => Object.entries(schema.properties ?? {}), [schema]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [parameterEntries]);

  const optionalExists = useMemo(
    () => parameterEntries.some((p) => !schema.required?.includes(p[0])),
    [parameterEntries],
  );
  const displayedParameters = useMemo(() => {
    return parameterEntries.filter((param) => showAll || schema.required?.includes(param[0]));
  }, [parameterEntries, showAll]);

  if (schema.type !== 'object') {
    return null;
  }

  return (
    <ParamSet
      heading={
        <>
          Body params {multipleMedia ? `(${media})` : ''}{' '}
          <Tag variant={required ? 'light-red' : 'grey'}>{required ? 'required' : 'optional'}</Tag>
        </>
      }>
      {displayedParameters.map((p) => {
        const [name, param] = p;
        return (
          <Param
            key={name}
            name={name}
            description={param.description}
            schema={param}
            required={schema.required?.includes(name)}
            value={state[name]}
            onValueChange={(value) => onUpdateParam(name, value)}
          />
        );
      })}
      {optionalExists && <ParamToggle paramTag="body params" show={showAll} onChangeShow={setShowAll} />}
    </ParamSet>
  );
};

export default RequestBody;
