import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class DataLoaderService {
  private readonly filePath = 'C:/Users/Gean de Lima/Documents/0animo-pra-ideia-torta/Moogle/db.json';

  loadData(): any {
    try {
      const rawData = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(rawData);
    } catch (error) {
      console.error('Erro ao carregar db.json:', error);
      return { pages: [], index: [] };
    }
  }
}
