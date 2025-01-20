'use client';

import { Tag } from '@/components';
import { ChevronIcon } from '@/icons/Chevron';
import { ApiOperation, ResponseObject } from '@/lib/swagger/types';
import { useState } from 'react';
import { ApiGrid, ApiGridColumn, ApiGridRowContent, ApiGridRowToggler } from '../_components/ApiGrid';
import { MediaResponse } from '../_components/ApiMedia';

import styles from './Responses.module.css';

export const Responses = (operation: ApiOperation) => (
  <ApiGrid heading="Responses">
    {Object.entries(operation.responses).map(([code, response], index) => (
      <Response key={code} code={code} response={response} initialOpen={index === 0} />
    ))}
  </ApiGrid>
);

export const Response = ({ code, response, initialOpen }: ResponseProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <>
      <ApiGridRowToggler onToggle={() => setIsOpen((open) => !open)}>
        <ApiGridColumn>
          {code ? <Tag statusCode={Number(code) as Tag.HttpResponseStatusCodes} /> : null}
          <ChevronIcon
            title=""
            chevronDirection={isOpen ? 'up' : 'right'}
            transition={{ duration: 0.35, ease: [0.55, 0, 0, 1] }}
            className={styles.togglerIcon}
          />
        </ApiGridColumn>
        <ApiGridColumn type="descriptionWide">{response.description || 'No description'}</ApiGridColumn>
      </ApiGridRowToggler>

      <ApiGridRowContent isOpen={isOpen}>
        <MediaResponse {...response} />
      </ApiGridRowContent>
    </>
  );
};

interface ResponseProps {
  code?: string;
  response: ResponseObject;
  initialOpen?: boolean;
}
