import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

import { AuthModule } from './modules/auth/auth.module';
import { GisModule } from './modules/gis/gis.module';
import { UsersModule } from './modules/users/users.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { VerificationModule } from './modules/verification/verification.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { SyncModule } from './modules/sync/sync.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { EventsGateway } from './gateways/events.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    GisModule,
    UsersModule,
    IncidentsModule,
    VerificationModule,
    ContactsModule,
    SyncModule,
    TicketsModule,
  ],
  providers: [EventsGateway],
})
export class AppModule {}
