import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { IsMongoIdObject } from '../../common/mongo.validation';
import { copy } from '../../common/copier';
import { Category, Content } from '../schemas/content.schema';
import { UserInfoDto } from '../../user/dto/user-info.dto';

export class ContentInfoDto {
  @IsMongoIdObject()
  _id: Types.ObjectId;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  subtitle: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsUrl()
  thumbnail: string;

  @IsNotEmpty()
  extra: string;

  @IsNumber()
  @Min(0)
  likes: number;

  @IsNumber()
  @Min(0)
  views: number;

  @IsNumber()
  @Min(0)
  shares: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  score: number;

  @IsBoolean()
  liked: boolean;

  @IsOptional()
  @IsBoolean()
  private?: boolean;

  @ValidateNested()
  createdBy: UserInfoDto;

  constructor(content: Content, liked: boolean) {
    const props = copy(content, [
      '_id',
      'category',
      'thumbnail',
      'title',
      'subtitle',
      'description',
      'thumbnail',
      'extra',
      'likes',
      'views',
      'shares',
      'private',
      'score',
    ]);
    Object.assign(this, props);
    this.liked = liked;
    this.createdBy = new UserInfoDto(content.createdBy);
  }
}