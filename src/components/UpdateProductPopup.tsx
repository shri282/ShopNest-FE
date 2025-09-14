import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IProduct, IUpdateProduct } from '../interfaces/Product';
import "../css/addProductPopup.css";
import ProductService from '../services/ProductService';
import LoadingOverlay from '../common/LoadingOverlay';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useAuthContext } from '../context/auth';

interface UpdateProductPopupProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    product: IProduct;
    onUpdated: (product: IProduct) => void;
}

const UpdateProductPopup: React.FC<UpdateProductPopupProps> = ({ setOpen, open, product, onUpdated }) => {
    const { control, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<IUpdateProduct>({
        defaultValues: {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: product.brand,
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            availability: product.availability,
            prize: product.prize,
            quantity: product.quantity,
            imageURL: product.imageURL,
            image: null,
        },
    });
    const [isApiLoading, setIsApiLoading] = useState(false);
    const { authContextSelector } = useAuthContext();
    const user = authContextSelector.getUser();
    
    const navigate = useNavigate();

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const onSubmit = async (data: IUpdateProduct) => {
        if (!user) return navigate("/login");
        setIsApiLoading(true);

        try {
            const product = await ProductService.updateProduct(data);
            onUpdated(product.data);
            handleClose();
        } catch (error: any) {
            alert('Error updating product: ' + error.message);
        } finally {
            setIsApiLoading(false);
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
                    <ProductForm setValue={setValue} watch={watch} control={control} errors={errors} />
                </DialogContent>

                <DialogActions className="dialog-actions">
                    <Button onClick={handleClose} className="close-button">Close</Button>
                    <Button type="submit" autoFocus className="add-button">Update</Button>
                </DialogActions>
            </form>
            <LoadingOverlay loading={isApiLoading} />
        </Dialog>
    );
};

export default UpdateProductPopup;
