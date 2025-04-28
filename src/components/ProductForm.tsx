// components/Product/ProductForm.tsx
import { Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

interface ProductFormProps {
    control: any;
    errors: any;
    defaultValues: any;
    watch: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ control, errors, watch, defaultValues }) => {
    return (
        <>
            <div className="input-row">
                <div className="input-group">
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        defaultValue={defaultValues.name}
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
                        defaultValue={defaultValues.brand}
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
                        defaultValue={defaultValues.description}
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
                        defaultValue={defaultValues.category}
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
                            min: { value: 0, message: 'Price must be positive' },
                        }}
                        defaultValue={defaultValues.prize}
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
                        defaultValue={defaultValues.quantity}
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
                {watch('image') && (
                    <img
                        src={URL.createObjectURL(watch('image'))}
                        alt="Preview"
                        className="image-preview"
                    />
                )}
                <span className="image-label">Upload Image </span>
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
                                } else {
                                    field.onChange(null);
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
                    defaultValue={defaultValues.availability}
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
