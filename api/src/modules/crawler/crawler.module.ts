import { Module } from '@nestjs/common';
import { CrawlerController } from './crawler.controller';
import { CrawlerService } from './crawler.service';
import { TreeModule } from '../tree/tree.module';

@Module({
  imports: [TreeModule],
  controllers: [CrawlerController], 
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}
