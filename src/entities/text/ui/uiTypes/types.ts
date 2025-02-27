import { CreateTextDto, CreateTextResponse } from "../../model";

export interface TLActionObjects {
  addText?: {
    mutate: (
      dto: CreateTextDto,
    ) => Promise<CreateTextResponse>,
    isLoading: boolean,
    isError: boolean,
  }
}