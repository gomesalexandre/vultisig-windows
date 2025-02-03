import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { GetVaults } from '../../../wailsjs/go/storage/Store';
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent';
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder';

export const vaultsQueryKey = ['vaults'];

export const vaultsQueryFn = async () => {

  return []

  const result = await GetVaults();

  return sortEntitiesWithOrder(result);
};

export const useVaultsQuery = () => {
  return {
    data: [],
    isLoading: false,
    isPending: false,
    error: null,
  };
};

export const useVaults = () => {
  const { data } = useVaultsQuery();
  if (!data || data.length === 0) {
    return [];
  }
  return shouldBePresent(data);
};

export const useFolderlessVaults = () => {
  const vaults = useVaults();

  return useMemo(() => vaults.filter(({ folder_id }) => !folder_id), [vaults]);
};

export const useFolderVaults = (folderId: string) => {
  const vaults = useVaults();

  return useMemo(
    () => vaults.filter(({ folder_id }) => folder_id === folderId),
    [vaults, folderId]
  );
};
