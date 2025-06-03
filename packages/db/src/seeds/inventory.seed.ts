import {prisma} from "../client";
import {IngredientCategoryLabel, ProductCategoryLabel} from "./seed.type";

export const seedInventory = async ()=>{

// Insert ingredient types
    await prisma.ingredientCategory.createMany({
        data: [
            { label: IngredientCategoryLabel.VEGETABLES },
            { label: IngredientCategoryLabel.DAIRY },
            { label: IngredientCategoryLabel.MEAT},
            { label: IngredientCategoryLabel.BREAD },
            { label: IngredientCategoryLabel.SAUCE },
            { label: IngredientCategoryLabel.COOKING },
            { label: IngredientCategoryLabel.CONDIMENT },
            { label: IngredientCategoryLabel.DISH },
            { label: IngredientCategoryLabel.CHEESE },
            { label: IngredientCategoryLabel.GRATIN },
            { label: IngredientCategoryLabel.STARCH },
        ],
        skipDuplicates: true,
    })
    const ingredientCategories = await prisma.ingredientCategory.findMany()

// Insert product categories
    await prisma.productCategory.createMany({
        data: [
            { label: ProductCategoryLabel.SANDWICHES },
            { label: ProductCategoryLabel.AMERICANS },
            { label: ProductCategoryLabel.DESSERTS },
            { label: ProductCategoryLabel.DRINKS },
            { label: ProductCategoryLabel.SPECIALITIES },
            { label: ProductCategoryLabel.HAMBURGERS },
            { label: ProductCategoryLabel.PANINIS },
            { label: ProductCategoryLabel.FRIES },
            { label: ProductCategoryLabel.MEATS },
            { label: ProductCategoryLabel.TACOS },
            { label: ProductCategoryLabel.PLATES },
            { label: ProductCategoryLabel.HALF_AMERICANS },
            { label: ProductCategoryLabel.WRAPS },
            { label: ProductCategoryLabel.HALF_SANDWICHES },
            { label: ProductCategoryLabel.FLAMMESKUECHES },
            { label: ProductCategoryLabel.SALADS },
        ],
        skipDuplicates: true,
    })
    const productCategories = await prisma.productCategory.findMany()

    // Insert ingredients
    const getIngredientCategoryByLabel = (label: IngredientCategoryLabel) => {
        const category = ingredientCategories.find(category => category.label === label);
        if (!category) throw new Error(`Ingredient category "${label}" not found`);
        return category.id;
    }
    await prisma.ingredient.createMany({
        data: [
            {
                label: 'Bacon',
                price: 0.5,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.MEAT),
            },
            {
                label: 'Cheddar',
                price: 0.3,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.CHEESE),
            },
            {
                label: 'Salade',
                price: 0.2,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.VEGETABLES),
            },
            {
                label: 'Pain doré',
                price: 0.1,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.BREAD),
            },
            {
                label: 'Pain blanc',
                price: 0.1,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.BREAD),
            },
            {
                label: 'Mayonnaise',
                price: 0.1,
                categoryId: getIngredientCategoryByLabel(IngredientCategoryLabel.SAUCE),
            },
        ],
        skipDuplicates: true,
    })

    // Insert products
    const getProductCategoryByLabel = (label: ProductCategoryLabel) => {
        const category = productCategories.find(category => category.label === label);
        if (!category) throw new Error(`Product category "${label}" not found`);
        return category.id;
    }
    await prisma.product.createMany({
        data: [
            {
                label: 'Bacon Sandwich',
                price: 3.5,
                categoryId: getProductCategoryByLabel(ProductCategoryLabel.SANDWICHES),
            },
            {
                label: 'Cheddar Panini',
                price: 4.0,
                categoryId: getProductCategoryByLabel(ProductCategoryLabel.PANINIS),
            },
            {
                label: 'Salad Bowl',
                price: 5.0,
                categoryId: getProductCategoryByLabel(ProductCategoryLabel.SALADS),
            },
        ],
        skipDuplicates: true,
    })

}