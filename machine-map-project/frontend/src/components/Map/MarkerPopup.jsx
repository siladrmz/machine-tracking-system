import React from 'react';
import { Popup } from 'react-leaflet';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { WifiOff, DoorOpen, AlertTriangle, CreditCard, Clock, MapPin } from 'lucide-react';

const MarkerPopup = ({ machine }) => {
    return (
        <Popup>
            <div style={{ padding: spacing.xs, minWidth: '180px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.sm,
                    borderBottom: `1px solid ${colors.border.light}`,
                    paddingBottom: spacing.xs
                }}>
                    <span style={{
                        fontWeight: typography.fontWeight.bold,
                        color: colors.primary.main,
                        fontSize: typography.fontSize.sm
                    }}>
                        {machine.machineNo || 'Makine'}
                    </span>
                    <Badge variant={machine.status === 'Mevcut' ? 'active' : 'stock'}>
                        {machine.status}
                    </Badge>
                </div>

                <div style={{ fontSize: typography.fontSize.xs, color: colors.text.secondary }}>
                    <div style={{ marginBottom: spacing.xs }}>
                        <strong>Lokasyon:</strong> {machine.location || 'Belirtilmemiş'}
                    </div>

                    {/* Error Icons Row */}
                    {(machine.wifiError || machine.doorOpen || (machine.warningCount > 0)) && (
                        <div style={{ display: 'flex', gap: spacing.xs, marginBottom: spacing.sm, marginTop: spacing.xs }}>
                            {machine.wifiError && <WifiOff size={14} color="#ef4444" style={{ backgroundColor: '#fef2f2', padding: '2px', borderRadius: '4px' }} />}
                            {machine.doorOpen && <DoorOpen size={14} color="#ef4444" style={{ backgroundColor: '#fef2f2', padding: '2px', borderRadius: '4px' }} />}
                            {machine.warningCount > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b', backgroundColor: '#fffbeb', padding: '0 4px', borderRadius: '4px' }}>
                                    <AlertTriangle size={12} />
                                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{machine.warningCount}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Sales Mini Info */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: spacing.xs,
                        backgroundColor: '#f8fafc',
                        borderRadius: spacing.borderRadius.sm,
                        marginTop: spacing.xs,
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CreditCard size={12} color="#7c3aed" />
                            <span style={{ fontWeight: 'bold', color: '#1e293b' }}>KK Satış: {machine.ccSales || 0}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} color="#64748b" />
                            <span style={{ fontSize: '10px' }}>{machine.lastSaleTime || '--:--'}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: spacing.sm }}>
                        <Button
                            variant="primary"
                            style={{ width: '100%', fontSize: typography.fontSize.xs, padding: spacing.xs }}
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${machine.latitude},${machine.longitude}`, '_blank')}
                        >
                            <MapPin size={14} />
                            Yol Tarifi Al
                        </Button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default MarkerPopup;
