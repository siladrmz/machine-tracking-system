import React from 'react';
import Card from '../../../components/UI/Card';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

const MachineStats = ({ activeCount, stockCount }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, marginBottom: spacing.lg }}>
            <Card padding="0">
                <div style={{
                    backgroundColor: colors.status.active.bg,
                    padding: spacing.sm,
                    textAlign: 'center',
                    borderTopLeftRadius: spacing.borderRadius.lg,
                    borderTopRightRadius: spacing.borderRadius.lg,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.status.active.text,
                    borderBottom: `1px solid ${colors.border.main}`
                }}>
                    Mevcut
                </div>
                <div style={{
                    padding: spacing.lg,
                    textAlign: 'center',
                    fontSize: typography.fontSize.xxl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.text.primary
                }}>
                    {activeCount}
                </div>
            </Card>

            <Card padding="0">
                <div style={{
                    backgroundColor: colors.status.stock.bg,
                    padding: spacing.sm,
                    textAlign: 'center',
                    borderTopLeftRadius: spacing.borderRadius.lg,
                    borderTopRightRadius: spacing.borderRadius.lg,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.status.stock.text,
                    borderBottom: `1px solid ${colors.border.main}`
                }}>
                    Potansiyel
                </div>
                <div style={{
                    padding: spacing.lg,
                    textAlign: 'center',
                    fontSize: typography.fontSize.xxl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.text.primary
                }}>
                    {stockCount}
                </div>
            </Card>
        </div>
    );
};

export default MachineStats;
