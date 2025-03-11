import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { CreateTextDto, CreateTextResponse, EditingTextSpanDto, SaveBlocksDto, ShortTextPreviewDto, TextPreviewDto, TextSchema, TextSpanDto, TextsInfoDto, TranslationDto } from "../model";

export interface GTextPreviewsQuery extends UsualQuery {

}

export interface TextPreviewsQuery extends GTextPreviewsQuery {
  userId: number,
}

export interface AllTextPreviewsQuery extends GTextPreviewsQuery {}

export interface LastFriendsTextsQuery extends UsualQuery {
  userId: number,
}

export interface TextsInfoQuery {
  userId: number,
}

export interface TextQuery {
  textId: number,
  page: number,
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
    // console.log('getTextsApi');
    // console.log(response.data);
    return response.data;
  }

  static async getAllTextPreviews(query: AllTextPreviewsQuery) {
    const response = await api.get<TextPreviewDto[]>(
      INITIAL_URL + '/getAllTextPreviews',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getFriendsLastTexts(query: LastFriendsTextsQuery) {
    const response = await api.get<ShortTextPreviewDto[]>(
      INITIAL_URL + '/getFriendsLastTexts',
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

  static async getEditingTextSpan(query: TextQuery) {
    const response = await api.get<EditingTextSpanDto>(
      INITIAL_URL + '/getEditingTextSpan',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async getTextsInfo(query: TextsInfoQuery) {
    const response = await api.get<TextsInfoDto>(
      INITIAL_URL + '/getTextsInfo',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async create(dto: CreateTextDto) {
    const response = await api.post<TextPreviewDto>(
      INITIAL_URL + '/create',
      dto,
    );
    return response.data;
  }

  static async saveBlocks(dto: SaveBlocksDto) {
    const response = await api.post(
      INITIAL_URL + '/saveBlocks',
      dto,
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