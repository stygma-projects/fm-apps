import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createContext } from '../src/index';
import { productCategoryRouter } from '../src/routes/inventory/productCategory.route';
import prisma from './mocks/prisma'

vi.mock('../libs/prisma')

describe('ProductCategory Router', () => {
  const ctx = createContext({ 
    req: {} as any, 
    res: {} as any,
    info: {} as any
  });
  const caller = productCategoryRouter.createCaller(ctx);

  // Nettoyage avant et après chaque test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new product category', async () => {
      const input = {
        label: 'Test Category',
        imageUrl: 'https://example.com/image.jpg'
      };

      const mockResult = {
        id: '1',
        ...input,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prisma.productCategory.create.mockResolvedValue(mockResult);

      const result = await caller.create(input);

      expect(prisma.productCategory.create).toHaveBeenCalledWith({
        data: input
      });
      expect(result).toBeDefined();
      expect(result.label).toBe(input.label);
      expect(result.imageUrl).toBe(input.imageUrl);
    });

    it('should throw error if label is too short', async () => {
      const input = {
        label: 'a',
        imageUrl: 'https://example.com/image.jpg'
      };

      prisma.productCategory.create.mockRejectedValue(new Error('Label too short'));

      await expect(caller.create(input)).rejects.toThrow();
    });
  });

  describe('list', () => {
    it('should return all product categories', async () => {
      const mockCategories = [
        { id: '1', label: 'Category 1', imageUrl: null, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', label: 'Category 2', imageUrl: null, createdAt: new Date(), updatedAt: new Date() }
      ];

      prisma.productCategory.findMany.mockResolvedValue(mockCategories);

      const result = await caller.list();

      expect(prisma.productCategory.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe('Category 1');
      expect(result[1].label).toBe('Category 2');
    });
  });

  describe('getById', () => {
    it('should return a product category by id', async () => {
      const mockCategory = {
        id: '1',
        label: 'Test Category',
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prisma.productCategory.findUnique.mockResolvedValue(mockCategory);

      const result = await caller.getById({ id: '1' });

      expect(prisma.productCategory.findUnique).toHaveBeenCalledWith({
        where: { id: '1' }
      });
      expect(result).toBeDefined();
      expect(result?.id).toBe('1');
      expect(result?.label).toBe('Test Category');
    });

    it('should return null for non-existent id', async () => {
      prisma.productCategory.findUnique.mockResolvedValue(null);

      const result = await caller.getById({ id: 'non-existent-id' });
      
      expect(prisma.productCategory.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' }
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a product category', async () => {
      const updateInput = {
        id: '1',
        label: 'Updated Label',
        imageUrl: 'https://example.com/new-image.jpg'
      };

      const mockUpdatedCategory = {
        ...updateInput,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prisma.productCategory.update.mockResolvedValue(mockUpdatedCategory);

      const result = await caller.update(updateInput);

      expect(prisma.productCategory.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          label: updateInput.label,
          imageUrl: updateInput.imageUrl
        }
      });
      expect(result.id).toBe('1');
      expect(result.label).toBe(updateInput.label);
      expect(result.imageUrl).toBe(updateInput.imageUrl);
    });
  });

  describe('delete', () => {
    it('should delete a product category', async () => {
      const mockDeletedCategory = {
        id: '1',
        label: 'To Delete',
        imageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      prisma.productCategory.delete.mockResolvedValue(mockDeletedCategory);
      prisma.productCategory.findUnique.mockResolvedValue(null);

      const result = await caller.delete({ id: '1' });
      
      expect(prisma.productCategory.delete).toHaveBeenCalledWith({
        where: { id: '1' }
      });
      expect(result.id).toBe('1');

      const deleted = await prisma.productCategory.findUnique({
        where: { id: '1' }
      });
      expect(deleted).toBeNull();
    });
  });
}); 