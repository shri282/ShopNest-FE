import { Box, Button, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { UserService } from '../services/UserService';
import { UserAddress } from '../interfaces/User';
import { FormMode } from '../enum/FormMode';
import LoadingOverlay from '../common/LoadingOverlay';
import UserAddressForm from './UserAddressForm';

const ShippingAddress = () => {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState<UserAddress[]>([]);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<FormMode | null>(null);

    const getAddress = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);

        try {
            const userAddress = await UserService.getUserAddresses(user.id);
            setAddresses(userAddress);
        } catch (error) {
            console.log("Error fetching user addresses");
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        getAddress();
    }, [getAddress]);

    const onUpdate = (address: UserAddress) => {
        setAddresses((prev) => {
            const current = prev.filter((ele) => ele.id !== address.id);
            current.push(address);
            return current;
        })
    }

    const handleClose = () => {
        setExpandedId(null);
        setMode(null);
    };

    const handleExpand = (id: number, mode: FormMode) => {
        setExpandedId(id);
        setMode(mode);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography sx={{ mb: 2 }} variant='h5'>Shipping Address</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {addresses.map((address: UserAddress, index) => {
                    const isExpanded = expandedId === address.id;

                    return (
                        <Box
                            key={address.id}
                            sx={{
                                backgroundColor: 'white',
                                border: '1px solid #eee',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                borderRadius: 1,
                                padding: 2
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>{address.fullName}</Typography>
                                    <Typography sx={{ fontSize: 13, color: 'gray' }}>
                                        {address.addressLine1}, {address.city}, {address.postalCode}
                                    </Typography>
                                </Box>
                                {
                                    !isExpanded && <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            sx={{ textTransform: 'none' }}
                                            onClick={() => handleExpand(address.id, FormMode.VIEW)}
                                        >
                                            View
                                        </Button>
                                        <span style={{ color: '#4B5563' }}>|</span>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            sx={{ textTransform: 'none' }}
                                            onClick={() => handleExpand(address.id, FormMode.EDIT)}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                }
                            </Box>

                            {isExpanded && mode && (
                                <UserAddressForm key={index} onUpdate={onUpdate} address={address} handleClose={handleClose} mode={mode} />
                            )}
                        </Box>
                    );
                })}
            </Box>
            <Box mt={3}>
                <Button
                    // onClick={() => handleExpand(, FormMode.ADD)} 
                    variant='contained'
                    sx={{ textTransform: 'none' }}>
                    + Add new address
                </Button>
            </Box>
            <LoadingOverlay loading={isLoading} />
        </Box>
    );
};

export default ShippingAddress;
