import { Module } from '@nestjs/common';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { SearchModule } from './modules/search/search.module';
import { IndexerModule } from './modules/indexer/indexer.module';
import { TreeModule } from './modules/tree/tree.module';
import { DataLoaderService } from './data-loader/data-loader.service';

@Module({
  imports: [
    CrawlerModule,
    SearchModule,
    IndexerModule,
    TreeModule,
  ],
  providers: [DataLoaderService],
})
export class AppModule {}
