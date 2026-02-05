import React from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const Button = ({ children, variant = 'primary', onClick, className = '', style = {}, ...props }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: colors.primary.main,
                    border: `1px solid ${colors.primary.main}`,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.background.subtle,
                    color: colors.text.primary,
                    border: `1px solid ${colors.border.main}`,
                };
            default:
                return {
                    backgroundColor: colors.primary.main,
                    color: colors.primary.contrastText,
                    border: 'none',
                };
        }
    };

    const buttonStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: spacing.borderRadius.md,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        cursor: 'pointer',
        transition: 'all 0.2s',
        gap: spacing.sm,
        ...getVariantStyles(),
        ...style
    };

    return (
        <button
            className={`btn-container ${className}`}
            style={buttonStyle}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
