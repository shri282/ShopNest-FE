import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { IAddProduct } from '../../interfaces/Product';
import { useForm } from 'react-hook-form';
import ProductService from '../../services/ProductService';
import ProductForm from '../ProductForm';
import "../css/addProductPopup.css";

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
        watch
    } = useForm<IAddProduct>({
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

    const onSubmit = async (data: IAddProduct) => {
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
                    <Button type="submit" autoFocus className="add-button">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddProductPopup;