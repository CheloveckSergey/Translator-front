import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { TodayWordDto, TransWordDto, UserWordInfoDto, WordsInfoDto } from "../model";

export interface UserWordsQuery extends UsualQuery {
  userId: number,
}

export interface WordsInfoQuery {
  userId: number,
}

const INITIAL_URL = '/words'

export class WordApi {
  static async getAllWords(query: UserWordsQuery): Promise<UserWordInfoDto[]> {
    const response = await api.get<UserWordInfoDto[]>(
      INITIAL_URL + '/getAllWords',
      {
        params: query
      }
    );
    return response.data;
  }

  static async getTranslation(value: string): Promise<TransWordDto> {
    const response = await api.get<TransWordDto>(INITIAL_URL + '/getWordTranslation/' + value);
    return response.data;
  }

  static async getTodayList(): Promise<TodayWordDto[]> {
    const response = await api.get<TodayWordDto[]>(INITIAL_URL + '/getTodayList');
    return response.data;
  }

  static async getWordsInfo(query: WordsInfoQuery): Promise<WordsInfoDto> {
    const response = await api.get<WordsInfoDto>(
      INITIAL_URL + '/getWordsInfo',
      {
        params: query,
      }
    );
    return response.data;
  }

  static async addToProcess(value: string): Promise<any> {
    const response = await api.put(
      INITIAL_URL + '/addToProcess',
      { value },
    );
    return response.data;
  }

  static async deleteToStudied(value: string): Promise<any> {
    const response = await api.put(
      INITIAL_URL + '/deleteToStudied',
      { value },
    );
    return response.data;
  }

  static async successfullTry(value: string): Promise<any> {
    const response = await api.put(
      INITIAL_URL + '/successfullTry',
      { value },
    );
    return response.data;
  }

  static async unsuccessfullTry(value: string): Promise<any> {
    const response = await api.put(
      INITIAL_URL + '/unsuccessfullTry',
      { value },
    );
    return response.data;
  }
}