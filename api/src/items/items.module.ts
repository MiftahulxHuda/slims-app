import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { BibliosModule } from 'src/biblios/biblios.module';
import { BibliosService } from 'src/biblios/biblios.service';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ItemRepository,
        ]),
        AuthModule,
        forwardRef(() => BibliosModule),
    ],
    controllers: [ItemsController],
    providers: [
        ItemsService
    ],
    exports: [ ItemsService ]
})
export class ItemsModule { }
