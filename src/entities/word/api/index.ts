import api from "../../../shared/api";
import { TranslationWordDto, TranslatorResponse } from "../model";

const INITIAL_URL = '/words'

export class WordApi {


  static async getAllWords(): Promise<TranslationWordDto[]> {
    const response = await api.get<TranslationWordDto[]>(INITIAL_URL + '/getAllWords');
    return response.data;
  }

  static async getTranslation(value: string): Promise<TranslationWordDto> {
    const response = await api.get<TranslationWordDto>(INITIAL_URL + '/getWordTranslation/' + value);
    return response.data;
  }

  static async getTodayList(): Promise<TranslationWordDto[]> {
    const response = await api.get<TranslationWordDto[]>(INITIAL_URL + '/getTodayList');
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