import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { IProduct, IUpdateProduct } from '../interfaces/Product';
import UpdateProductPopup from './popups/UpdateProductPopup';
import { useNavigate } from 'react-router-dom';

interface ProductListTableProps {
    rows: IProduct[]
}

const paginationModel = { page: 0, pageSize: 5 };

const ProductListTable: React.FC<ProductListTableProps> = ({ rows }) => {

    const navigate = useNavigate();
    const [updatePopupOpen, setUpdatePopupOpen] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<IProduct | null>(null);

    const editHandler = (product: IProduct) => {
        setUpdatePopupOpen(true);
        setProduct(product);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Product Name', width: 130 },
        { field: 'brand', headerName: 'Brand', width: 130 },
        {
            field: 'category',
            headerName: 'Category',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'prize',
            headerName: 'Price',
            type: 'number',
            width: 90,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: (cell) => {
                const productId = cell.row.id;
                return <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    width="100%"
                    height="100%"
                >
                    <EditIcon
                        color="primary"
                        onClick={() => editHandler(cell.row as IProduct)}
                        sx={{
                            marginRight: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            ":hover": { opacity: 0.6 }
                        }}

                    />
                    <VisibilityIcon
                        onClick={() => navigate(`/product/${productId}`)}
                        color="primary"
                        sx={{
                            borderRadius: "5px",
                            cursor: "pointer",
                            ":hover": { opacity: 0.6 }
                        }}
                    />
                </Box>
            },
            width: 180
        }
    ];

    return (
        <>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{ border: 0 }}
                />
            </Paper>
            {
                updatePopupOpen && product && (
                <UpdateProductPopup open={updatePopupOpen} setOpen={setUpdatePopupOpen} product={product} />)
            }  
        </>
    );
}

export default ProductListTable;
