export type FeatureBlock = Action | Description;

interface Action {
  type: 'action',
  body: string | React.ReactNode,
  description?: string,
  mutate: () => void,
  isLoading: boolean,
  isError: boolean,
}

interface Description {
  type: 'description',
  description: string | React.ReactNode,
}