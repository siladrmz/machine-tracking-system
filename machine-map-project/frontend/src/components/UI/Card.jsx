import React from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const Card = ({ children, padding = 'md', className = '', style = {} }) => {
    const cardStyle = {
        backgroundColor: colors.background.paper,
        borderRadius: spacing.borderRadius.lg,
        boxShadow: spacing.shadow.sm,
        padding: spacing[padding] || padding,
        border: `1px solid ${colors.border.main}`,
        ...style
    };

    return (
        <div className={`card-container ${className}`} style={cardStyle}>
            {children}
        </div>
    );
};

export default Card;
