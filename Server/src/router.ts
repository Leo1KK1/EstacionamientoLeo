import { Router } from 'express';
import { createClient } from './handlers/client';
import { createProduct ,getProductById,updateProduct,deleteProduct,getProducts} from './handlers/products';
import { body ,param} from 'express-validator';
import { ContextHandlerImpl } from 'express-validator/lib/chain';
import { handleInputerrors } from './middleware';


const router = Router();
router.get('/',getProducts);

router.get('/:id',
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputerrors,
    getProductById
)
router.put('/:id',
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('price')
    .isNumeric().withMessage("valor no valido")
    .notEmpty().withMessage("el precio del pproducto no puede ir vacio")
    .custom(value => value > 0).withMessage("El precio no valido"),
   body('disponibility').toBoolean()
    .isBoolean().withMessage("El valor de disponible debe ser un booleano")
    ,        
    handleInputerrors,
    updateProduct
)


router.post('/',
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('price')
    .isNumeric().withMessage("valor no valido")
    .notEmpty().withMessage("el precio del pproducto no puede ir vacio")
    .custom(value => value > 0).withMessage("El precio no valido"),
    handleInputerrors,
    createProduct,
)

router.delete('/:id',
    param('id').isInt().withMessage('El id debe ser un numero entero'),
    handleInputerrors,
    deleteProduct
)
export default router;