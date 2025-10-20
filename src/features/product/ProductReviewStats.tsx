import { Box, LinearProgress, Rating, Typography, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IProductReviewStats } from '../../interfaces/Product'
import DataState from '../../common/DataState'
import ErrorSnackbar from '../../common/ErrorSnackBar'
import ProductService from '../../services/ProductService'

function ProductReviewStats({ productId, reviewSubmitted }: { productId: number, reviewSubmitted: boolean }) {
    const [productReviewStats, setProductReviewStats] = useState<IProductReviewStats | null>(null)
    const [error, setError] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    
    const [errorPopupOpen, setErrorPopupOpen] = React.useState(false)

    useEffect(() => {
        const fetchReviewStats = async () => {
            setLoading(true)

            try {
                const reviewStats = await ProductService.getProductReviewStats(productId);
                console.log(reviewStats);
                setProductReviewStats(reviewStats)
            } catch (error) {
                setError(error)
                setErrorPopupOpen(true)
            } finally {
                setLoading(false)
            }
        }

        fetchReviewStats()
    }, [productId, reviewSubmitted])

    return (
        <Box>
            <DataState
                data={productReviewStats}
                error={error}
                loading={loading}
                render={(stats: IProductReviewStats) => (
                    <Box sx={{ maxWidth: 400 }}>
                        {/* Header */}
                        <Typography variant="h6" fontWeight="bold">
                            Customer reviews
                        </Typography>

                        {/* Average rating + stars */}
                        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                            <Rating value={stats.averageRating} precision={0.10} readOnly />
                            <Typography variant="subtitle1">{stats.averageRating} out of 5</Typography>
                        </Stack>

                        {/* Total ratings */}
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            {stats.totalRatings} global ratings
                        </Typography>

                        {/* Distribution bars */}
                        <Box mt={2}>
                            {[5, 4, 3, 2, 1].map((star) => (
                                <Stack key={star} direction="row" alignItems="center" spacing={1} mb={1}>
                                    <Typography variant="body2" sx={{ width: 40 }}>{star} star</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={stats.percentages[star] ?? 0}
                                        sx={{ flex: 1, height: 10, borderRadius: 5 }}
                                        color="warning"
                                    />
                                    <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>
                                        {Math.round(stats.percentages[star] ?? 0)}%
                                    </Typography>
                                </Stack>
                            ))}
                        </Box>
                    </Box>
                )}
            />

            <ErrorSnackbar
                open={errorPopupOpen}
                message={error?.message}
                onClose={() => setErrorPopupOpen(false)}
            />
        </Box>
    )
}

export default ProductReviewStats