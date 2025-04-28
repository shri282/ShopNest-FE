import React, { ReactNode } from 'react';

interface FallBackWrapperProps {
    fallback: boolean;
    fallbackComponent: ReactNode;
    children: ReactNode;
}

const FallBackWrapper: React.FC<FallBackWrapperProps> = ({
    fallback,
    fallbackComponent,
    children
}) => {
    return (
        <>
            {fallback ? fallbackComponent : children}
        </>
    );
};

export default FallBackWrapper;