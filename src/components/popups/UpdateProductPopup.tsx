// components/Product/UpdateProductPopup.tsx
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ProductForm from '../ProductForm';
import { useForm } from 'react-hook-form';
import { Product, UpdateProduct } from '../../interfaces/Product';
import "../css/addProductPopup.css";
import ProductService from '../../services/ProductService';

interface UpdateProductPopupProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    product: Product;
}

const UpdateProductPopup: React.FC<UpdateProductPopupProps> = ({ setOpen, open, product }) => {
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<UpdateProduct>({
        defaultValues: {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category,
            availability: product.availability,
            prize: product.prize,
            quantity: product.quantity,
            image: ProductService.base64ToFile(product.image, product.imageName, product.imageType),
        },
    });

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const onSubmit = async (data: UpdateProduct) => {
        try {
            const product = await ProductService.updateProduct(data);

            alert('Product updated successfully!');
            handleClose();
        } catch (error: any) {
            alert('Error updating product: ' + error.message);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="add-product-dialog-title"
            aria-describedby="add-product-dialog-description"
            className="product-popup"
        >
            <DialogTitle id="add-product-dialog-title" className="dialog-title">
                Product
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} action="">
                <DialogContent className='dialog-content'>
                    <ProductForm watch={watch} control={control} errors={errors} defaultValues={{}} />
                </DialogContent>

                <DialogActions className="dialog-actions">
                    <Button onClick={handleClose} className="close-button">Close</Button>
                    <Button type="submit" autoFocus className="add-button">Update</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateProductPopup;
