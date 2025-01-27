import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { CreateTextDto, CreateTextResponse, SaveBlocksDto, ShortTextPreviewDto, TextPreviewDto, TextSchema, TextSpanDto, TextsInfoDto, TranslationDto } from "../model";

export interface TextPreviewsQuery extends UsualQuery {
  userId: number,
}

export interface LastFriendsTextsQuery extends UsualQuery {
  userId: number,
}

export interface TextsInfoQuery {
  userId: number,
}

type By = 'user' | 'friends' | 'title';

interface BaseByOptions {
  by: By,
}

interface ByUser extends BaseByOptions {
  by: 'user',
  userId: number,
}

interface ByFriends extends BaseByOptions {
  by: 'friends',
  userId: number,
}

interface ByTitle extends BaseByOptions {
  by: 'title',
  title: string,
}

type ByOptions = ByUser | ByFriends | ByTitle;

interface FieldsOptions<K extends keyof TextSchema> {
  fields: K[],
}

export type TextsQuery<K extends keyof TextSchema> = ByOptions & UsualQuery & FieldsOptions<K>

const INITIAL_URL = '/texts';

export class TextApi {
  static async getTexts<K extends keyof TextSchema>(query: TextsQuery<K>): Promise<Pick<TextSchema, K>[]> {
    const response = await api.get<Pick<TextSchema, keyof TextSchema>[]>(
      INITIAL_URL + '/getTexts',
      {
        params: query,
      }
    );
    return response.data
  } 

  static async getAllTextPreviewsByUser(query: TextPreviewsQuery) {
    const response = await api.get<TextPreviewDto[]>(
      INITIAL_URL + '/getAllTextPreviewsByUser',
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
    const response = await api.post<CreateTextResponse>(
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