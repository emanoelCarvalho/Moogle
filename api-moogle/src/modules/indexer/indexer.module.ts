import { Module } from '@nestjs/common';
import { IndexerService } from './indexer.service';
import { DataLoaderService } from 'src/data-loader/data-loader.service';

@Module({
  exports: [IndexerService],
  providers: [IndexerService, DataLoaderService]
})
export class IndexerModule {}
