import React from 'react';
import Card from '../../../components/UI/Card';
import { spacing } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import Badge from '../../../components/UI/Badge';
import { MapPin, Trash2, Edit, Eye } from 'lucide-react';

const MachineTable = ({ machines, onDelete, onEdit, onMachineClick, onViewDetails }) => {
    return (
        <Card padding="0">
            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: typography.fontSize.sm,
                    textAlign: 'center',
                    tableLayout: 'fixed'
                }}>
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.border.main}`, backgroundColor: colors.background.subtle }}>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '15%' }}>Makine No</th>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '15%' }}>Lokasyon</th>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '15%' }}>Statü</th>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '20%' }}>Konum (Lat, Lng)</th>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '20%' }}>Açıklama</th>
                            <th style={{ padding: spacing.md, color: colors.text.light, fontWeight: typography.fontWeight.semibold, width: '15%' }}>Aksiyonlar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {machines.length > 0 ? (
                            machines.map((machine) => (
                                <tr key={machine.id} style={{ borderBottom: `1px solid ${colors.border.light}`, transition: 'background 0.2s' }}>
                                    <td style={{ padding: spacing.md }}>
                                        <button
                                            onClick={() => onMachineClick?.(machine)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                padding: 0,
                                                color: colors.text.primary,
                                                fontWeight: typography.fontWeight.bold,
                                                cursor: 'pointer',
                                                textDecoration: 'underline',
                                                textDecorationColor: 'transparent',
                                                transition: 'color 0.2s, text-decoration-color 0.2s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = colors.primary.main;
                                                e.currentTarget.style.textDecorationColor = colors.primary.main;
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = colors.text.primary;
                                                e.currentTarget.style.textDecorationColor = 'transparent';
                                            }}
                                        >
                                            {machine.machineNo}
                                        </button>
                                    </td>
                                    <td style={{ padding: spacing.md, color: colors.text.primary }}>{machine.location || '-'}</td>
                                    <td style={{ padding: spacing.md }}>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <Badge variant={machine.status === 'Mevcut' ? 'active' : 'stock'}>
                                                {machine.status}
                                            </Badge>
                                        </div>
                                    </td>
                                    <td style={{ padding: spacing.md, color: colors.text.secondary }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, justifyContent: 'center' }}>
                                            <MapPin size={14} />
                                            {machine.latitude.toFixed(6)}, {machine.longitude.toFixed(6)}
                                        </div>
                                    </td>
                                    <td style={{ padding: spacing.md, color: colors.text.secondary, textAlign: 'left', fontSize: '12px' }}>
                                        <div style={{
                                            maxHeight: '40px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {machine.description || '-'}
                                        </div>
                                    </td>
                                    <td style={{ padding: spacing.md }}>
                                        <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'center' }}>
                                            <button
                                                onClick={() => onViewDetails?.(machine)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7c3aed', padding: spacing.xs }}
                                                title="Detayları Gör"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(machine)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.primary.main, padding: spacing.xs }}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(machine.id)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: colors.status.danger, padding: spacing.xs }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: spacing.xl, textAlign: 'center', color: colors.text.light }}>
                                    Henüz makine eklenmemiş veya filtrelerle eşleşen sonuç yok.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MachineTable;
