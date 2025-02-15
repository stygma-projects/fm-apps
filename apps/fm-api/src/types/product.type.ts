import {Request} from 'express'
import {CreateProductDto} from '../dto/product/create-product.dto'
import {UpdateProductDto} from '../dto/product/update-product.dto'

export type ProductRequest = Request<
    {
        productId: string
    },
    object,
    CreateProductDto | UpdateProductDto
>

export enum PRODUCT_ERROR {
    NOT_FOUND_BY_ID = 'ProductId not found',
    NOT_FOUND = 'Product not found',
}
