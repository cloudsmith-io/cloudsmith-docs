import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import * as RadixSelect from '@radix-ui/react-select';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import {
  ArrayParamState,
  BodyParamState,
  ObjectParamState,
  ParamState,
  SimpleParamState,
  StringParamState,
} from '@/lib/operations/param-state/types';
import { defaultParamState, randomId } from '@/lib/operations/param-state/util';
import { ApiOperation, ArraySchemaObject, NonArraySchemaObject, SchemaObject } from '@/lib/swagger/types';

import RootParamSet from '../ParamSet';
import { ParamArray, ParamEntry, ParamKeyValue, ParamSet, ParamToggle } from '../ParamSet/ParamSet';
import styles from './RequestBody.module.css';

type RequestBodyProps = {
  requestBody: NonNullable<ApiOperation['requestBody']>;
  state: BodyParamState;
  media: string;
  onChangeMedia: (m: string) => void;
  onUpdateParam: (keys: string[], value: ParamState | undefined) => void;
};

export const RequestBody = ({
  state,
  media,
  requestBody,
  onChangeMedia,
  onUpdateParam,
}: RequestBodyProps) => {
  const mediaTypes = Object.keys(requestBody.content);
  const multipleMedia = mediaTypes.length >= 2;
  const spec = requestBody.content[media];

  const required = requestBody.required ?? false;

  return (
    <>
      {spec && (
        <RootParamSet
          heading={
            <Flex gap="xs">
              <RadixSelect.Root value={media} onValueChange={onChangeMedia} disabled={!multipleMedia}>
                <RadixSelect.Trigger aria-label="media select" asChild>
                  <Flex className={styles.select} wrap={false} gap="xs">
                    {multipleMedia && <Icon name="chevronDown" title="select" />}
                    <RadixSelect.Value>
                      <div>Body params {multipleMedia ? `(${media})` : ''} </div>
                    </RadixSelect.Value>
                  </Flex>
                </RadixSelect.Trigger>

                <RadixSelect.Content className={styles.selectContainer}>
                  <RadixSelect.Viewport>
                    {mediaTypes.map((m) => (
                      <RadixSelect.Item key={m} value={m} className={styles.selectItem}>
                        <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                          <Icon name="action/check" title="selected" />
                        </RadixSelect.ItemIndicator>
                        <RadixSelect.ItemText>{m}</RadixSelect.ItemText>
                      </RadixSelect.Item>
                    ))}
                  </RadixSelect.Viewport>
                </RadixSelect.Content>
              </RadixSelect.Root>

              {required && <Tag variant="light-red">Required</Tag>}
            </Flex>
          }>
          <BodyParam
            isNested={false}
            schema={spec.schema ?? {}}
            state={state[media]}
            required={required}
            onUpdateParam={(keys, value) => onUpdateParam([media, ...keys], value)}
          />
        </RootParamSet>
      )}
    </>
  );
};

type BodyParamProps = {
  name?: string;
  isNested: boolean;
  schema: SchemaObject;
  required: boolean;
  state?: ParamState;
  item?: boolean;
  onUpdateParam: (keys: string[], value: ParamState | undefined) => void;
  onDeleteItem?: (keys: string[]) => void;
};

const BodyParam = ({
  name,
  isNested,
  schema,
  required,
  state,
  item = false,
  onUpdateParam,
  onDeleteItem,
}: BodyParamProps) => {
  if (
    schema.type === 'string' ||
    schema.type === 'number' ||
    schema.type === 'integer' ||
    schema.type === 'boolean'
  ) {
    return (
      <ParamEntry
        name={name ?? ''}
        schema={schema}
        required={required}
        value={state as SimpleParamState | undefined}
        noKey={!name}
        item={item}
        onValueChange={(v) => onUpdateParam([], v)}
        onDeleteItem={() => onDeleteItem?.([])}
      />
    );
  }

  if (schema.type === 'object') {
    return (
      <ObjectBodyParam
        isNested={isNested}
        name={name ?? ''}
        required={required}
        schema={schema as NonArraySchemaObject & { type: 'object' }}
        state={state}
        item={item}
        onUpdateParam={onUpdateParam}
        onDeleteItem={onDeleteItem}
      />
    );
  }

  if (schema.type === 'array') {
    return (
      <ArrayParam
        isNested={isNested}
        name={name ?? ''}
        required={required}
        schema={schema}
        state={state}
        onUpdateParam={onUpdateParam}
        onDeleteItem={onDeleteItem}
      />
    );
  }

  return null;
};

type ObjectBodyParamProps = {
  isNested: boolean;
  name?: string;
  schema: NonArraySchemaObject & { type: 'object' };
  required: boolean;
  state?: ParamState;
  item?: boolean;
  onUpdateParam: (keys: string[], value: ParamState | undefined) => void;
  onDeleteItem?: (keys: string[]) => void;
};

const GenericObjectParam = ({
  isNested,
  name,
  schema,
  required,
  state,
  item,
  onUpdateParam,
  onDeleteItem,
}: ObjectBodyParamProps) => {
  const entries = Object.entries((state as ObjectParamState)?.items ?? {}) as [string, StringParamState][];

  const Wrapper = useMemo(
    () =>
      isNested
        ? ({ children }: { children: ReactNode }) => (
            <ParamSet
              heading="object"
              name={name}
              required={required}
              schema={schema}
              description={schema.description}
              item={item}
              onAddEntry={() => {
                onUpdateParam([randomId()], {
                  type: 'string',
                  name: '',
                  value: '',
                });
              }}
              onDeleteItem={(keys) => onDeleteItem?.(keys)}>
              {children}
            </ParamSet>
          )
        : React.Fragment,
    [],
  );

  return (
    <Wrapper>
      {entries.map(([id, state]) => (
        <ParamKeyValue
          key={id}
          keyValue={state.name ?? ''}
          value={state.value ?? ''}
          onKeyValueChange={(v) =>
            onUpdateParam([id], {
              ...state,
              name: v,
            })
          }
          onValueChange={(v) =>
            onUpdateParam([id], {
              ...state,
              value: v,
            })
          }
          onDelete={() => onUpdateParam([id], undefined)}
        />
      ))}
    </Wrapper>
  );
};

const StructuredObjectParam = ({
  isNested,
  name,
  schema,
  required,
  state,
  item,
  onUpdateParam,
  onDeleteItem,
}: ObjectBodyParamProps) => {
  const parameterEntries = useMemo(() => Object.entries(schema.properties ?? {}), [schema]);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [parameterEntries]);

  const sortedParameterEntries = useMemo(() => {
    return parameterEntries.toSorted((a, b) => a[0].localeCompare(b[0]));
  }, [parameterEntries]);

  const requiredParameters = useMemo(
    () => sortedParameterEntries.filter((p) => schema.required?.includes(p[0])),
    [sortedParameterEntries, schema.required],
  );
  const optionalParameters = useMemo(
    () => sortedParameterEntries.filter((p) => !schema.required?.includes(p[0])),
    [sortedParameterEntries, schema.required],
  );

  const Wrapper = useMemo(
    () =>
      isNested
        ? ({ children }: { children: ReactNode }) => (
            <ParamSet
              heading="object"
              name={name}
              required={required}
              schema={schema}
              description={schema.description}
              item={item}
              onDeleteItem={(keys) => onDeleteItem?.(keys)}>
              {children}
            </ParamSet>
          )
        : React.Fragment,
    [],
  );

  return (
    <Wrapper>
      {requiredParameters.map((p) => {
        const [name, param] = p;
        const s = Object.entries((state as ObjectParamState)?.items ?? {}).find((v) => v[1].name === name);
        if (!s) return null;

        const [id, stateValue] = s;

        return (
          <BodyParam
            key={id}
            name={name}
            isNested={true}
            schema={param}
            required={schema.required?.includes(p[0]) ?? false}
            state={stateValue}
            onUpdateParam={(keys, value) => {
              onUpdateParam([id, ...keys], value);
            }}
          />
        );
      })}
      {optionalParameters.length > 0 && (
        <ParamToggle
          paramTag={`optional body params (${optionalParameters.length})`}
          show={showAll}
          onChangeShow={setShowAll}
        />
      )}
      {showAll &&
        optionalParameters.map((p) => {
          const [name, param] = p;
          const s = Object.entries((state as ObjectParamState)?.items ?? {}).find((v) => v[1].name === name);
          if (!s) return null;

          const [id, stateValue] = s;

          return (
            <BodyParam
              key={id}
              name={name}
              isNested={true}
              schema={param}
              required={schema.required?.includes(p[0]) ?? false}
              state={stateValue}
              onUpdateParam={(keys, value) => {
                onUpdateParam([id, ...keys], value);
              }}
            />
          );
        })}
    </Wrapper>
  );
};

const ObjectBodyParam = ({
  isNested,
  name,
  schema,
  required,
  state,
  item,
  onUpdateParam,
  onDeleteItem,
}: ObjectBodyParamProps) => {
  const parameterEntries = useMemo(() => Object.entries(schema.properties ?? {}), [schema]);

  if (parameterEntries.length === 0)
    return (
      <GenericObjectParam
        isNested={isNested}
        name={name}
        schema={schema}
        required={required}
        state={state}
        item={item}
        onUpdateParam={onUpdateParam}
        onDeleteItem={onDeleteItem}
      />
    );

  return (
    <StructuredObjectParam
      isNested={isNested}
      name={name}
      schema={schema}
      required={required}
      state={state}
      item={item}
      onUpdateParam={onUpdateParam}
      onDeleteItem={onDeleteItem}
    />
  );
};

type ArrayParamProps = {
  isNested: boolean;
  name?: string;
  required: boolean;
  schema: ArraySchemaObject;
  state?: ParamState;
  onUpdateParam: (keys: string[], value: ParamState | undefined) => void;
  onDeleteItem?: (keys: string[]) => void;
};

const ArrayParam = ({ name, schema, required, state, onUpdateParam }: ArrayParamProps) => {
  const _items = (state as ArrayParamState)?.items ?? {};
  const items = Object.entries(_items);

  return (
    <ParamArray
      name={name}
      required={required}
      description={schema.description}
      schema={schema}
      onAddItem={() => {
        onUpdateParam([randomId()], defaultParamState(schema.items));
      }}>
      {items.map(([id, item]) => {
        return (
          <BodyParam
            key={id}
            isNested={true}
            schema={schema.items}
            required={false}
            state={item}
            item={true}
            onUpdateParam={(keys, value) => {
              onUpdateParam([id, ...keys], value);
            }}
            onDeleteItem={(keys) => {
              onUpdateParam([id, ...keys], undefined);
            }}
          />
        );
      })}
    </ParamArray>
  );
};

export default RequestBody;
