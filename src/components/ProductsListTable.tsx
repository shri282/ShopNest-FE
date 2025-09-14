import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../interfaces/Product';
import ProductService from '../services/ProductService';
import UpdateProductPopup from './UpdateProductPopup';
import ErrorSnackbar from '../common/ErrorSnackBar';

const ProductListTable: React.FC = () => {

    const navigate = useNavigate();

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });
    const [rows, setRows] = React.useState<IProduct[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    
    const [error, setError] = React.useState<any>(null)
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [updatePopupOpen, setUpdatePopupOpen] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<IProduct | null>(null);

    const editHandler = (product: IProduct) => {
        setUpdatePopupOpen(true);
        setProduct(product);
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data: any = await ProductService.getPaginatedProducts(paginationModel);
                setRows(data.content);
                setRowCount(data.totalElements);
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setErrorPopupOpen(true);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [paginationModel]);

    const updateRowInState = (updatedProduct: IProduct) => {
        setRows((prev) =>
            prev.map((item) => item.id === updatedProduct.id ? updatedProduct : item)
        );
    };


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 50 },
        { field: 'name', headerName: 'Product Name', flex: 1.5, minWidth: 150 },
        { field: 'brand', headerName: 'Brand', flex: 1, minWidth: 120 },
        { field: 'category', headerName: 'Category', sortable: false, flex: 1.2, minWidth: 140 },
        { field: 'prize', headerName: 'Price', type: 'number', flex: 0.8, minWidth: 100 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', flex: 0.8, minWidth: 100 },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            flex: 1,
            minWidth: 150,
            renderCell: (cell) => {
                const productId = cell.row.id;
                return (
                    <Box
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
                );
            }
        }
    ];


    return (
        <>
            <Paper sx={{ boxShadow: 'none', height: 'auto', minHeight: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={rowCount}
                    loading={loading}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[5, 10, 20]}
                    paginationMode="server"
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': {
                            transition: 'width 0.1s ease-in-out',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            transition: 'width 0.1s ease-in-out',
                        }
                    }}
                />
            </Paper>
            {
                updatePopupOpen && product && (
                    <UpdateProductPopup open={updatePopupOpen} setOpen={setUpdatePopupOpen} product={product} onUpdated={(p) => updateRowInState(p)} />)
            }
            <ErrorSnackbar open={errorPopupOpen} message={error?.message} onClose={() => setErrorPopupOpen(false)} />
        </>
    );
}

export default ProductListTable;
