'use client';

import { Tag } from '@/components';
import { ChevronIcon } from '@/icons/Chevron';
import { ApiOperation, ResponseObject } from '@/lib/swagger/types';
import { useState } from 'react';
import { ApiGrid, ApiGridColumn, ApiGridRowContent, ApiGridRowToggler } from '../ApiGrid/ApiGrid';
import { ApiMediaResponse } from '../ApiMedia/ApiMedia';

import styles from './ApiResponses.module.css';

export const ApiResponses = (operation: ApiOperation) => (
  <ApiGrid heading="Responses">
    {Object.entries(operation.responses).map(([code, response], index) => (
      <ApiResponse key={code} code={code} response={response} initialOpen={index === 0} />
    ))}
  </ApiGrid>
);

export const ApiResponse = ({ code, response, initialOpen }: ResponseProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <>
      <ApiGridRowToggler isOpen={isOpen} onToggle={() => setIsOpen((open) => !open)}>
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
        <ApiMediaResponse {...response} />
      </ApiGridRowContent>
    </>
  );
};

interface ResponseProps {
  code?: string;
  response: ResponseObject;
  initialOpen?: boolean;
}
