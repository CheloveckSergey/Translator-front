export type MenuLine = {
  body: string,
  onClick: () => void,
  isLoading?: boolean,
  isError?: boolean,
}

export type SelectOption<T extends string | number> = {
  value: T,
  name: string,
}