import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TreeModule } from '../tree/tree.module';
import { IndexerModule } from '../indexer/indexer.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TreeModule, IndexerModule, HttpModule],
  controllers: [CrawlerController], 
  providers: [CrawlerService],
})
export class CrawlerModule {}
