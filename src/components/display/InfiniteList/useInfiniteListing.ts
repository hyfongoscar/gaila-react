import React, { useEffect, useMemo, useState } from 'react';

import { first, range } from 'lodash-es';
import { type UseQueryOptions, useQueries } from 'react-query';

import { type ListingResponse } from 'types/response';

type Props = {
  queryFn: (request: any) => Promise<any>;
  queryKey: readonly unknown[];
  queryOption?: Omit<
    UseQueryOptions<any, unknown, any, any>,
    'queryKey' | 'queryFn'
  >;
  pageLimit?: number;
};

const useInfiniteListing = <TData = unknown, TMetadata = unknown>({
  queryFn,
  queryKey,
  queryOption,
  pageLimit: inputPageLimit,
}: Props) => {
  const [pages, setPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(inputPageLimit);
  const [endReached, setEndReached] = useState(false);

  const responses = useQueries(
    range(pages).map(page => {
      return {
        queryKey: [
          queryKey[0],
          { ...(queryKey[1] ? queryKey[1] : {}), page: page + 1 },
        ],
        queryFn,
        ...queryOption,
        onSuccess(data: ListingResponse<TData>) {
          queryOption?.onSuccess?.(data);
        },
      };
    }),
  );

  const isLoading = useMemo(
    () => responses.some(s => s.isLoading),
    [responses],
  );

  const error = useMemo(
    () => first(responses.filter(s => !!s.error))?.error,
    [responses],
  );

  const data = useMemo<TData[]>(() => {
    return responses.flatMap(s => s.data?.value || []);
  }, [responses]);

  useEffect(() => {
    if (!responses || isLoading) {
      return;
    }
    const lastData = responses[responses.length - 1]
      ?.data as ListingResponse<TData>;
    if (!lastData) {
      return;
    }
    if (
      (!pageLimit || pages < pageLimit) &&
      lastData.value?.length >= lastData.limit
    ) {
      // Last page & have more data, increment pages by 1
      setPages(s => s + 1);
    } else if (lastData.value?.length < lastData.limit) {
      // Last page & no more data, set endReached to true
      setEndReached(true);
    }
  }, [isLoading, pageLimit, pages, responses]);

  return {
    data,
    isLoading,
    error,
    metadata: responses
      .map(s => s.data?.metadata)
      .filter(s => !!s) as TMetadata[],
    endReached,
    setPages,
    setPageLimit,
  };
};

export default useInfiniteListing;
