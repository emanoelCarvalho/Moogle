import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TreeModule } from '../tree/tree.module';
import { IndexerModule } from '../indexer/indexer.module';

@Module({
  imports: [TreeModule, IndexerModule],
  controllers: [CrawlerController], 
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}
