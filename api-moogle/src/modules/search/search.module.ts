import { Module } from '@nestjs/common';
import { TreeModule } from '../tree/tree.module';
import { IndexerModule } from '../indexer/indexer.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [TreeModule, IndexerModule], 
    controllers: [SearchController], 
    providers: [SearchService],
})
export class SearchModule {}
