import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export enum ProductStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  VENDIDO = 'vendido',
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  titulo: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({
    type: String,
    enum: Object.values(ProductStatus),
    default: ProductStatus.INATIVO,
  })
  status: ProductStatus;

  @Prop()
  imagemUrl: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
