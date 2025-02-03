import { shouldBePresent } from '@lib/utils/assert/shouldBePresent';
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { GetVaultFolders } from '../../../../wailsjs/go/storage/Store';

export const vaultFoldersQueryKey = ['vaultFolders'];

export const vaultFoldersQueryFn = async () => {
  return []

  const result = await GetVaultFolders();

  return sortEntitiesWithOrder(result);
};

export const useVaultFoldersQuery = () => {
  return {
    data: [],
    isLoading: false,
    isPending: false,
    error: null,
  };
};

export const useVaultFolders = () => {
  const { data } = useVaultFoldersQuery();
  if (!data || data.length === 0) {
    return [];
  }
  return shouldBePresent(data);
};

export const useVaultFolder = (id: string) => {
  const folders = useVaultFolders();

  return useMemo(() => folders.find(folder => folder.id === id), [folders, id]);
};
