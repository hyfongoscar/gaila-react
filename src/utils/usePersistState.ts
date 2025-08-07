import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cloneDeep, defaultsDeep, isUndefined } from 'lodash-es';

import persist from 'utils/localStorage';

type PersistState<T> = [T, (newValue: T) => Promise<void>, boolean];

export default function usePersistState<T extends object>(
  key: string,
  defaultValue: T,
): PersistState<T> {
  const persistInstance = useMemo(() => persist(key), [key]);
  const isPersisted = useRef(false);
  const [persistedValue, setPersistedValue] = useState<T>(defaultValue);
  const [_update, setUpdate] = useState(0);

  useEffect(() => {
    // Get default value
    persistInstance.getValue().then((storedValue: any) => {
      isPersisted.current = true;
      if (storedValue) {
        setPersistedValue(s => defaultsDeep(storedValue, s));
      } else if (!isUndefined(defaultValue)) {
        setPersistedValue(cloneDeep(defaultValue));
      } else {
        setUpdate(new Date().getTime());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValuePromise = useCallback(
    async (newValue: T) => {
      await persistInstance.setValue(newValue);
      setPersistedValue(newValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [persistedValue, setValuePromise, isPersisted.current];
}
