// components/Product/UpdateProductPopup.tsx
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ProductForm from '../ProductForm';
import { useForm } from 'react-hook-form';
import { IProduct, IUpdateProduct } from '../../interfaces/Product';
import "../css/addProductPopup.css";
import ProductService from '../../services/ProductService';
import { base64ToFile } from '../../utils/FileEncoding';

interface UpdateProductPopupProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    product: IProduct;
    onUpdated?: (product: IProduct) => void;
}

const UpdateProductPopup: React.FC<UpdateProductPopupProps> = ({ setOpen, open, product, onUpdated }) => {
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<IUpdateProduct>({
        defaultValues: {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            category: product.category,
            availability: product.availability,
            prize: product.prize,
            quantity: product.quantity,
            image: base64ToFile(product.image, product.imageName, product.imageType),
        },
    });

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const onSubmit = async (data: IUpdateProduct) => {
        try {
            const product = await ProductService.updateProduct(data);
            if (onUpdated) onUpdated(product.data);
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
