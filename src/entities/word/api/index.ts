import api from "../../../shared/api";
import { UsualQuery } from "../../../shared/types";
import { TodayWordDto, TransWordDto, WholeWordDto } from "../model";

export interface WholeWordQuery extends UsualQuery {
  userId: number,
}

const INITIAL_URL = '/words'

export class WordApi {
  static async getAllWords(query: WholeWordQuery): Promise<WholeWordDto[]> {
    const response = await api.get<WholeWordDto[]>(
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