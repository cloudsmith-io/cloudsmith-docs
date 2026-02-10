import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { defaultMedia } from '@/lib/operations/constants';
import { ApiOperation } from '@/lib/swagger/types';

export const MediaContext = createContext<{
  media: string;
  updateMedia: (v: string) => void;
}>({
  media: defaultMedia,
  updateMedia: () => {},
});

type MediaProviderProps = {
  operation: ApiOperation;
  children: ReactNode;
};

export const MediaProvider = ({ operation, children }: MediaProviderProps) => {
  const bodyParameters = operation.requestBody;

  const [mediaState, setMediaState] = useState<string>(
    Object.keys(bodyParameters?.content ?? {})[0] ?? defaultMedia,
  );
  const updateMedia = useCallback((v: string) => setMediaState(v), []);

  useEffect(() => {
    const mediaTypes = Object.keys(bodyParameters?.content ?? {});
    if (mediaTypes.length > 0 && !mediaTypes.includes(mediaState)) {
      setMediaState(mediaTypes[0]);
    } else if (mediaTypes.length === 0 && mediaState !== defaultMedia) {
      setMediaState(defaultMedia);
    }
  }, [bodyParameters, mediaState]);

  const contextValue = useMemo(() => {
    return {
      media: mediaState,
      updateMedia,
    };
  }, [mediaState, updateMedia]);

  return <MediaContext.Provider value={contextValue}>{children}</MediaContext.Provider>;
};
