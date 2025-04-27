import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { AddProduct } from '../../interfaces/Product';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
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
        watch,
        setValue,
        register
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
            const formData = new FormData();

            // Create product object
            const product = {
                name: data.name,
                brand: data.brand,
                availability: data.availability,
                category: data.category,
                description: data.description,
                prize: data.prize,
                quantity: data.quantity
            };

            // Append product as JSON string
            formData.append('product', new Blob([JSON.stringify(product)], {
                type: 'application/json'
            }));

            // Append image file if exists
            if (data.image) {
                formData.append('image', data.image);
            }

            // Debug: Log FormData contents
            for (let [key, value] of Array.from(formData.entries())) {
                console.log(key, value);
            }

            await axios.post("http://localhost:8080/products", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            alert("Product added successfully");
            handleClose();
        } catch (error: any) {
            alert("Error in adding product: " + error.message);
        }
    };

    console.log('Current form values:', watch());
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="add-product-dialog-title"
            aria-describedby="add-product-dialog-description"
            className="add-product-popup"
        >
            <DialogTitle id="add-product-dialog-title" className="dialog-title">
                Add Product
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent className="dialog-content">
                    <div className="input-row">
                        <div className="input-group">
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: 'Name is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        fullWidth
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="input-group">
                            <Controller
                                name="brand"
                                control={control}
                                rules={{ required: 'Brand is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Brand"
                                        fullWidth
                                        error={!!errors.brand}
                                        helperText={errors.brand?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                )}
                            />
                        </div>

                        <div className="input-group">
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Category"
                                        fullWidth
                                        error={!!errors.category}
                                        helperText={errors.category?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <Controller
                                name="prize"
                                control={control}
                                rules={{
                                    required: 'Price is required',
                                    min: { value: 0, message: 'Price must be positive' }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        error={!!errors.prize}
                                        helperText={errors.prize?.message}
                                    />
                                )}
                            />
                        </div>

                        <div className="input-group">
                            <Controller
                                name="quantity"
                                control={control}
                                rules={{
                                    required: 'Quantity is required',
                                    min: { value: 0, message: 'Quantity must be positive' }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Quantity"
                                        type="number"
                                        fullWidth
                                        error={!!errors.quantity}
                                        helperText={errors.quantity?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="image" className="label">Upload Image</label>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="file"
                                    id="image"
                                    className="input-file"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            field.onChange(e.target.files[0]);
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="availability-toggle">
                        <span className="toggle-label">Availability</span>
                        <Controller
                            name="availability"
                            control={control}
                            render={({ field }) => (
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            )}
                        />
                    </div>
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