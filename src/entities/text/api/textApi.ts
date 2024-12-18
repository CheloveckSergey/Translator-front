import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { ShortTextPreviewDto, TextPreviewDto, TextSpanDto, TranslationDto } from "../model";

export interface TextPreviewsQuery extends UsualQuery {
  userId: number,
}

const INITIAL_URL = '/texts';

export class TextApi {
  static async getAllTextPreviewsByUser(query: TextPreviewsQuery) {
    const response = await api.get<TextPreviewDto[]>(
      INITIAL_URL + '/getAllTextPreviewsByUser',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getFriendsLastTexts() {
    const response = await api.get<ShortTextPreviewDto[]>(
      INITIAL_URL + '/getFriendsLastTexts',
    );
    return response.data;
  }

  static async getTextSpan(textId: number) {
    const response = await api.get<TextSpanDto>(INITIAL_URL + '/getTextSpan/' + textId);
    return response.data;
  }

  static async create(name: string, content: string) {
    const response = await api.post<TextPreviewDto>(
      INITIAL_URL + '/create',
      { name, content },
    );
    return response.data;
  }

  static async copyText(textId: number) {
    const response = await api.post(
      INITIAL_URL + '/copyText',
      { textId },
    );
    return response.data;
  }

  static async uncopyText(textId: number) {
    const response = await api.post(
      INITIAL_URL + '/uncopyText',
      { textId },
    );
    return response.data;
  }

  static async changeName(name: string, textId: number) {
    const response = await api.post<TextPreviewDto>(
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
    const response = await api.delete<TextPreviewDto[]>(INITIAL_URL + '/delete/' + textId);
    return response.data;
  }
}