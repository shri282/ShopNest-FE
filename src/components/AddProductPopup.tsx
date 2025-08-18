import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import "../css/addProductPopup.css";
import { IAddProduct } from '../interfaces/Product';
import ProductService from '../services/ProductService';
import ProductForm from './ProductForm';

interface AddProductPopupProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({ setOpen, open }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<IAddProduct>({
        defaultValues: {
            name: "",
            brand: "",
            availability: false,
            categoryName: "",
            categoryId: 1,
            description: "",
            prize: 0,
            quantity: 0,
            image: null
        }
    });

    const handleClose = () => {
        reset();
        setOpen(false);
    };

    const onSubmit = async (data: IAddProduct) => {
        try {
            await ProductService.addProduct(data);
            handleClose();
            alert("Product added successfully");
        } catch (error: any) {
            alert("Error in adding product: " + error.message);
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
                    <Button type="submit" autoFocus className="add-button">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddProductPopup;