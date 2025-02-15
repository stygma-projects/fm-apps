import {Request} from 'express'
import {CreateProductCategoryDto} from '../dto/product-category/create-product-category.dto'
import {UpdateProductCategoryDto} from '../dto/product-category/update-product-category.dto'

export type ProductCategoryRequest = Request<
    {
        productCategoryId: string
    },
    object,
    CreateProductCategoryDto | UpdateProductCategoryDto
>

export enum PRODUCT_CATEGORY_ERROR {
    NOT_FOUND_BY_ID = 'ProductCategoryId not found',
    NOT_FOUND = 'ProductCategory not found',
}
