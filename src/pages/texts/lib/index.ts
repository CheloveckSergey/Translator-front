import { SharedLib } from "../../../shared/lib";
import { SharedUiTypes } from "../../../shared/sharedUi/types";
import { SharedTypes } from "../../../shared/types";

export const useUrlUserId = SharedLib.useUrlUserId;

export function getOrdersFilter() {
  const orders: SharedUiTypes.SelectOption<SharedTypes.QueryTypes.Order>[] = [
    {
      value: 'DESC',
      name: 'Decrease',
    },
    {
      value: 'ASC',
      name: 'Increase',
    },
  ];
  return orders
}

export type TextsLimits = 3 | 4 | 5;

export function getLimitsFilter() {
  const limits: SharedUiTypes.SelectOption<TextsLimits>[] = [
    {
      value: 3,
      name: '3',
    },
    {
      value: 4,
      name: '4',
    },
    {
      value: 5,
      name: '5',
    },
  ];
  return limits
}