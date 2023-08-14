import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JSON_TRANSFORMER } from '../infra.util';
import { AlbumEntity } from './album.entity';
import { UserEntity } from './user.entity';

@Entity('rules')
export class RuleEntity<T = RuleValue> {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  key!: RuleKey;

  @Column({ type: 'varchar', transformer: JSON_TRANSFORMER })
  value!: T;

  @Column()
  ownerId!: string;

  @ManyToOne(() => UserEntity)
  owner!: UserEntity;

  @Column()
  albumId!: string;

  @ManyToOne(() => AlbumEntity, (album) => album.rules, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  album!: AlbumEntity;
}

export enum RuleKey {
  PERSON = 'person',
  TAKEN_AFTER = 'taken-after',
  CITY = 'city',
  STATE = 'state',
  COUNTRY = 'country',
  MAKE = 'make',
  MODEL = 'model',
  LOCATION = 'location',
}

export type RuleValue = string | Date | RuleGeoValue;

export enum RuleValueType {
  UUID = 'uuid',
  STRING = 'string',
  DATE = 'date',
  GEO = 'geo',
}

export interface RuleGeoValue {
  lat: number;
  long: number;
  radius: number;
}

export const RULE_TO_TYPE: Record<RuleKey, RuleValueType> = {
  [RuleKey.PERSON]: RuleValueType.UUID,
  [RuleKey.TAKEN_AFTER]: RuleValueType.DATE,
  [RuleKey.CITY]: RuleValueType.STRING,
  [RuleKey.STATE]: RuleValueType.STRING,
  [RuleKey.COUNTRY]: RuleValueType.STRING,
  [RuleKey.MAKE]: RuleValueType.STRING,
  [RuleKey.MODEL]: RuleValueType.STRING,
  [RuleKey.LOCATION]: RuleValueType.GEO,
};