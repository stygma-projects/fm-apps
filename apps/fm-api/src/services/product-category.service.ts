import {CreateProductCategoryDto} from '../dto/product-category/create-product-category.dto'
import {UpdateProductCategoryDto} from '../dto/product-category/update-product-category.dto'
import {PrismaService} from './prisma.service'
import {Injectable, NotFoundException} from '@nestjs/common'
import {PRODUCT_CATEGORY_ERROR} from '../types/product-category.type'
import {ProductCategory} from '@prisma/client'

@Injectable()
export class ProductCategoryService {
    constructor(private readonly prisma: PrismaService) {
    }

    create(
        createProductCategoryDto: CreateProductCategoryDto,
    ): Promise<ProductCategory> {
        return this.prisma.productCategory.create({
            data: createProductCategoryDto,
        })
    }

    findAll(): Promise<ProductCategory[]> {
        return this.prisma.productCategory.findMany()
    }

    async findOneById(productCategoryId: string): Promise<ProductCategory> {
        const productCategory = await this.prisma.productCategory.findUnique({
            where: {
                id: productCategoryId,
            },
        })
        if (!productCategory) {
            throw new NotFoundException(PRODUCT_CATEGORY_ERROR.NOT_FOUND_BY_ID)
        }
        return productCategory
    }

    async findOne(
        productCategoryId?: string,
        label?: string,
    ): Promise<ProductCategory> {
        const productCategory = await this.prisma.productCategory.findFirst({
            where: {
                OR: [{id: productCategoryId}, {label}],
            },
        })
        if (!productCategory) {
            throw new NotFoundException(PRODUCT_CATEGORY_ERROR.NOT_FOUND)
        }
        return productCategory
    }

    update(
        productCategoryId: string,
        updateProductCategoryDto: UpdateProductCategoryDto,
    ): Promise<ProductCategory> {
        return this.prisma.productCategory.update({
            where: {
                id: productCategoryId,
            },
            data: updateProductCategoryDto,
        })
    }

    remove(productCategoryId: string): Promise<ProductCategory> {
        return this.prisma.productCategory.delete({
            where: {
                id: productCategoryId,
            },
        })
    }
}
