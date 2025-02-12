import { Module } from '@nestjs/common';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { SearchModule } from './modules/search/search.module';
import { IndexerModule } from './modules/indexer/indexer.module';
import { TreeModule } from './modules/tree/tree.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Keyword } from './entities/keyword.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Mudando para MySQL
      host: 'localhost',
      port: 3306,
      username: 'root', // Substitua pelo seu usuário do MySQL
      password: 'faculdade', // Substitua pela sua senha
      database: 'crawler_db', // Nome do banco de dados
      entities: [Page, Keyword],
      synchronize: true, // Apenas para desenvolvimento
    }),
    CrawlerModule,
    SearchModule,
    IndexerModule,
    TreeModule,
  ],
})
export class AppModule {}
