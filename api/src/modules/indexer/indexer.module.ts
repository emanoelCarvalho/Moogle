import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';

@Module({
  exports: [IndexerService],
  providers: [IndexerService]
})
export class IndexerModule {}
