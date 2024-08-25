import api from "../../../shared/api";
import { StringSpan } from "../../word";
import { TextPreview, TextSpanDto } from "../model";

const INITIAL_URL = '/texts'

export class TextApi {
  static async getAll() {
    const response = await api.get<TextPreview[]>(INITIAL_URL + '/getAll');
    return response.data;
  }

  static async getAllByUser() {
    const response = await api.get<TextPreview[]>(INITIAL_URL + '/getAllByUser');
    return response.data;
  }

  static async getTextArray(textId: number) {
    const response = await api.get<TextSpanDto>(INITIAL_URL + '/getTextArray/' + textId);
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

  static async delete(textId: number) {
    const response = await api.delete<TextPreview[]>(INITIAL_URL + '/textId/' + textId);
    return response.data;
  }
}