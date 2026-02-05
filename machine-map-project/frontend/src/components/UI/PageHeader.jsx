import React from 'react';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

const PageHeader = ({ title, subtitle, actions }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.lg,
        }}>
            <div>
                <h1 style={{
                    fontSize: typography.fontSize.xxl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.primary.main,
                    margin: 0,
                }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{
                        fontSize: typography.fontSize.sm,
                        color: colors.text.secondary,
                        marginTop: spacing.xs,
                    }}>
                        {subtitle}
                    </p>
                )}
            </div>
            {actions && (
                <div style={{ display: 'flex', gap: spacing.md }}>
                    {actions}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
