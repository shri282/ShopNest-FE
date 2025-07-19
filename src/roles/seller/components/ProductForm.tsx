import { Controller, UseFormSetValue } from 'react-hook-form';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProductCategory } from '../../../interfaces/Product';
import ProductService from '../../../services/ProductService';

interface ProductFormProps {
    control: any;
    errors: any;
    watch: any;
    setValue: UseFormSetValue<any>;
}

const ProductForm: React.FC<ProductFormProps> = ({ control, errors, watch, setValue }) => {

    const [productCategories, setProductCategories] = useState<IProductCategory[]>([]);

    useEffect(() => {
        const fetchProductCategories = async () => {
            try {
                const prodCatgy: IProductCategory[] = await ProductService.getProductsCategories();
                setProductCategories(prodCatgy);
            } catch (error) {
                console.log("something went wrong in product form", error);
            }
        }

        fetchProductCategories();
    }, []); 

    return (
        <>
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
                        name="categoryName"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Category"
                                fullWidth
                                error={!!errors.category}
                                helperText={errors.category?.message}
                                onChange={(e) => {
                                    const selectedName = e.target.value;
                                    const selectedCategory = productCategories.find(cat => cat.name === selectedName);
                                    field.onChange(selectedName);
                                    if (selectedCategory) {
                                        setValue('categoryId', selectedCategory.id);
                                    }
                                }}
                            >
                                {productCategories?.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                            min: { value: 0, message: 'Price must be positive' },
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
                            min: { value: 0, message: 'Quantity must be positive' },
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
                {(watch('imageURL') || watch('image')) && (
                    <>
                        <img
                            src={watch('imageURL') ? watch('imageURL') : URL.createObjectURL(watch('image'))}
                            alt="Preview"
                            className="image-preview"
                        />

                        <Stack direction="row" spacing={2} mt={1}>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    setValue('image', null);
                                    setValue('imageURL', "");
                                    const input = document.getElementById('image') as HTMLInputElement;
                                    if (input) input.value = '';
                                }}
                            >
                                Remove Image
                            </Button>
                        </Stack>
                    </>
                )}

                <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                    <span className="image-label">Upload Image</span>
                    <label htmlFor="image">
                        <input
                            type="file"
                            id="image"
                            className="input-file"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setValue('image', e.target.files[0]);
                                } else {
                                    setValue('image', null);
                                    setValue('imageURL', "");
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<UploadIcon />}
                        >
                            Upload
                        </Button>
                    </label>
                </Stack>
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

        </>
    );
};

export default ProductForm;
