import { SharedLib } from "../../../shared/lib";
import { WordStatus, WordStatusFilter } from "../../../entities/word";
import { SharedUiTypes } from "../../../shared/sharedUi/types";

export const useUrlUserId = SharedLib.useUrlUserId;

export function getStatusFilter() {
  const orders: SharedUiTypes.SelectOption<WordStatusFilter>[] = [
    {
      value: 'all',
      name: 'All',
    },
    {
      value: 'studied',
      name: 'Studied',
    },
    {
      value: 'process',
      name: 'Process',
    },
  ];
  return orders
}