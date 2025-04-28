import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { AddProduct } from '../../interfaces/Product';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import ProductService from '../../services/ProductService';
import "../css/addProductPopup.css";
import ProductForm from '../ProductForm';

interface AddProductPopupProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

const AddProductPopup: React.FC<AddProductPopupProps> = ({ setOpen, open }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<AddProduct>({
        defaultValues: {
            name: "",
            brand: "",
            availability: false,
            category: "",
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

    const onSubmit = async (data: AddProduct) => {
        try {
            const product = await ProductService.addProduct(data);
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
            className="add-product-popup"
        >
            <DialogTitle id="add-product-dialog-title" className="dialog-title">
                Product
            </DialogTitle>
            <DialogContent className='dialog-content'>
                <ProductForm control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} defaultValues={{}} />
            </DialogContent>

            <DialogActions className="dialog-actions">
                <Button onClick={handleClose} className="close-button">Close</Button>
                <Button type="submit" autoFocus className="add-button">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductPopup;