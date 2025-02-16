import { Module } from '@nestjs/common';
import { TreeModule } from '../tree/tree.module';
import { IndexerModule } from '../indexer/indexer.module';
import { SearchController } from './search.controller';

@Module({
    imports: [TreeModule, IndexerModule], 
    controllers: [SearchController]
})
export class SearchModule {}
