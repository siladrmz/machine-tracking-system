import React from 'react';
import Card from '../../../components/UI/Card';
import { spacing } from '../../../theme/spacing';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';
import Button from '../../../components/UI/Button';
import { Search, Filter, FileUp } from 'lucide-react';

const MachineFilters = ({ filters, setFilters, onImportExcel, onAddManual }) => {
    return (
        <Card style={{ marginBottom: spacing.lg }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: spacing.md
            }}>
                <div style={{ display: 'flex', gap: spacing.md, flex: 1, minWidth: '300px' }}>
                    {/* Search */}
                    <div style={{ position: 'relative', flex: '0 1 400px' }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: spacing.sm,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: colors.text.light
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Makine No Ara..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            style={{
                                width: '100%',
                                padding: `${spacing.sm} ${spacing.md} ${spacing.sm} 80px`,
                                borderRadius: spacing.borderRadius.md,
                                border: `1px solid ${colors.border.main}`,
                                fontSize: typography.fontSize.sm,
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        style={{
                            padding: `${spacing.sm} ${spacing.md}`,
                            borderRadius: spacing.borderRadius.md,
                            border: `1px solid #f97316`,
                            fontSize: typography.fontSize.sm,
                            backgroundColor: 'white',
                            color: '#ea580c',
                            outline: 'none',
                            minWidth: '140px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="all">Tüm Statüler</option>
                        <option value="Mevcut">Mevcut</option>
                        <option value="Potansiyel">Potansiyel</option>
                    </select>

                    {/* Sorting Filter */}
                    <select
                        value={filters.sortBy}
                        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                        style={{
                            padding: `${spacing.sm} ${spacing.md}`,
                            borderRadius: spacing.borderRadius.md,
                            border: `1px solid #7c3aed`, // Purple-600
                            fontSize: typography.fontSize.sm,
                            backgroundColor: 'white',
                            color: '#6d28d9', // Purple-700
                            outline: 'none',
                            minWidth: '140px',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="newest">Sırala</option>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                        <option value="machineNo">Makine No (A-Z)</option>
                        <option value="status">Statü</option>
                    </select>

                    <Button variant="outline" onClick={onImportExcel}>
                        <FileUp size={16} />
                        Excel'den Aktar
                    </Button>
                    <Button onClick={onAddManual}>
                        ➕ Manuel Ekle
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default MachineFilters;
