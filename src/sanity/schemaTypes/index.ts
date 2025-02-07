import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { Category } from './category'
import { Brand } from './brand'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, Category, Brand],
}
