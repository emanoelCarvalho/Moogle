import { Module } from '@nestjs/common';
import { TreeModule } from '../tree/tree.module';
import { IndexerModule } from '../indexer/indexer.module';

@Module({
    imports: [TreeModule, IndexerModule]
})
export class SearchModule {}
