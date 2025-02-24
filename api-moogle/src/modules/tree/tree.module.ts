import { Module } from '@nestjs/common';
import { TreeService } from './tree.service';
import { DataLoaderService } from 'src/data-loader/data-loader.service';

@Module({
  providers: [TreeService, DataLoaderService], 
  exports: [TreeService]
})
export class TreeModule {}
