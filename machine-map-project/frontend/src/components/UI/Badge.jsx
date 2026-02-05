import React from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const Badge = ({ children, variant = 'default', className = '', style = {} }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'active':
                return {
                    backgroundColor: colors.status.active.bg,
                    color: colors.status.active.text,
                };
            case 'stock':
                return {
                    backgroundColor: colors.status.stock.bg,
                    color: colors.status.stock.text,
                };
            case 'primary':
                return {
                    backgroundColor: colors.primary.main,
                    color: colors.primary.contrastText,
                };
            default:
                return {
                    backgroundColor: colors.background.subtle,
                    color: colors.text.secondary,
                };
        }
    };

    const badgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing.xs} ${spacing.sm}`,
        borderRadius: spacing.borderRadius.full,
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...getVariantStyles(),
        ...style
    };

    return (
        <span className={`badge-container ${className}`} style={badgeStyle}>
            {children}
        </span>
    );
};

export default Badge;
