export type MenuLine = {
  body: string,
  onClick: () => void,
  isLoading?: boolean,
  isError?: boolean,
}