import express from 'express';
import { body } from 'express-validator';
import { createPublication, deletePublication, updatePublication} from '../controllers/publicationController.js';
import { authenticateJWT } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const publicationValidationRules = [
        body('propertyType').notEmpty().withMessage('Property type is required'),
        body('neighborhood').notEmpty().withMessage('Neighborhood is required'),
        body('municipality').notEmpty().withMessage('Municipality is required'),
        body('department').notEmpty().withMessage('Department is required'),
        body('propertyAddress').notEmpty().withMessage('Property address is required'),
        body('longitude').isNumeric().withMessage('Longitude must be a number'),
        body('latitude').isNumeric().withMessage('Latitude must be a number'),
        body('propertySize').notEmpty().withMessage('Property size is required'),
        body('propertyBedrooms').notEmpty().withMessage('Number of bedrooms is required'),
        body('propertyBathrooms').notEmpty().withMessage('Number of bathrooms is required'),
        body('propertyFloors').notEmpty().withMessage('Number of floors is required'),
        body('propertyParking').isInt({ min: 0 }).withMessage('Number of parking spaces must be a non-negative integer'),
        body('propertyFurnished').notEmpty().withMessage('Furnished status is required'),
        body('propertyDescription').notEmpty().withMessage('Property description is required'),
        body('propertyPrice').notEmpty().withMessage('Property price is required'),
];

const updatePublicationValidationRules = [
        body('propertyType').optional().notEmpty().withMessage('Property type cannot be empty'),
        body('neighborhood').optional().notEmpty().withMessage('Neighborhood cannot be empty'),
        body('municipality').optional().notEmpty().withMessage('Municipality cannot be empty'),
        body('department').optional().notEmpty().withMessage('Department cannot be empty'),
        body('propertyAddress').optional().notEmpty().withMessage('Property address cannot be empty'),
        body('longitude').optional().isNumeric().withMessage('Longitude must be a number'),
        body('latitude').optional().isNumeric().withMessage('Latitude must be a number'),
        body('propertySize').optional().notEmpty().withMessage('Property size cannot be empty'),
        body('propertyBedrooms').optional().notEmpty().withMessage('Number of bedrooms cannot be empty'),
        body('propertyBathrooms').optional().notEmpty().withMessage('Number of bathrooms cannot be empty'),
        body('propertyFloors').optional().notEmpty().withMessage('Number of floors cannot be empty'),
        body('propertyParking').optional().isInt({ min: 0 }).withMessage('Number of parking spaces must be a non-negative integer'),
        body('propertyFurnished').optional().notEmpty().withMessage('Furnished status cannot be empty'),
        body('propertyDescription').optional().notEmpty().withMessage('Property description cannot be empty'),
        body('propertyPrice').optional().notEmpty().withMessage('Property price cannot be empty'),
      ];
      
router.put('/:publicationId', authenticateJWT, updatePublicationValidationRules, validate, updatePublication);
      
router.post('/create', authenticateJWT, publicationValidationRules, validate, createPublication);

router.delete('/:publicationId', authenticateJWT, deletePublication);

export default router;

