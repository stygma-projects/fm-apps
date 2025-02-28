import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import {createExpressServer} from 'vitest/express';
import {appRouter} from '../api/routers'; // chemin de votre appRouter
import {createContext} from '../api/context';
import prisma from '../prisma/prisma'; // chemin de votre Prisma client

// Mock de Prisma pour isoler les tests
vi.mock('../prisma/prisma', () => ({
    productCategory: {
        findMany: vi.fn(),
    },
}));

describe('ProductCategory Router', () => {
    let server: any;

    beforeAll(async () => {
        // Lancer un serveur Express pour les tests
        server = createExpressServer({
            router: appRouter,
            createContext,
        });
        await server.listen(3000);
    });

    afterAll(async () => {
        await server.close();
    });

    it('should list product categories', async () => {
        // Données factices pour simuler le comportement de Prisma
        const mockCategories = [{id: 1, name: 'Electronics'}, {id: 2, name: 'Clothing'}];
        prisma.productCategory.findMany.mockResolvedValue(mockCategories);

        // Appel de l'API TRPC pour tester la route
        const response = await fetch('http://localhost:3000/trpc/productCategory.list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        // Assertions
        expect(response.status).toBe(200);
        expect(data.result).toEqual(mockCategories);
    });

    it('should handle errors when fetching categories', async () => {
        // Simuler une erreur de Prisma
        prisma.productCategory.findMany.mockRejectedValue(new Error('Failed to fetch categories'));

        const response = await fetch('http://localhost:3000/trpc/productCategory.list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });

        const data = await response.json();

        expect(response.status).toBe(500);
        expect(data.error.message).toBe('Failed to fetch categories');
    });
});
