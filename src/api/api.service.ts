import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  async post(
    route: string,
    token?: string,
    data?: Record<string, any>,
  ): Promise<Record<string, any>> {
    try {
      const headers = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await lastValueFrom(
        this.httpService.post(route, data, headers),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  }

  async get(route: string, token?: string): Promise<object> {
    try {
      const headers = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await lastValueFrom(
        this.httpService.get(route, headers),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error);
    }
  }
}
