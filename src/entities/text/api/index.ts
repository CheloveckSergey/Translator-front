import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { StringSpan } from "../../word";
import { TextPreview, TextSpanDto, TranslationDto } from "../model";

export interface TextPreviewsQuery extends UsualQuery {
  userId?: number,
}

const INITIAL_URL = '/texts';

export class TextApi {
  static async getAllTextPreviewsByUser(query: TextPreviewsQuery) {
    const response = await api.get<TextPreview[]>(
      INITIAL_URL + '/getAllTextPreviewsByUser',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getTextSpan(textId: number) {
    const response = await api.get<TextSpanDto>(INITIAL_URL + '/getTextSpan/' + textId);
    return response.data;
  }

  static async create(name: string, content: string) {
    const response = await api.post<TextPreview>(
      INITIAL_URL + '/create',
      { name, content },
    );
    return response.data;
  }

  static async changeName(name: string, textId: number) {
    const response = await api.post<TextPreview>(
      INITIAL_URL + '/changeName',
      { name, textId },
    );
    return response.data;
  }

  static async getTranslation(value: string) {
    const response = await api.post<TranslationDto>(
      INITIAL_URL + '/getTranslation',
      { value },
    );
    return response.data;
  }

  static async delete(textId: number) {
    const response = await api.delete<TextPreview[]>(INITIAL_URL + '/textId/' + textId);
    return response.data;
  }
}