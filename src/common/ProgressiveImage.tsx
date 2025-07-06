import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

interface ProgressiveImageProps {
    src: string;
    alt: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {!loaded && (
                <Skeleton variant="rectangular" width="100%" height="200px" />
            )}
            <img
                src={src}
                alt={alt}
                style={{ display: loaded ? 'block' : 'none' }}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
};

export default ProgressiveImage;
