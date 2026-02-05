import React from 'react';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { X, WifiOff, DoorOpen, AlertTriangle, Info, CreditCard, Clock } from 'lucide-react';

const MachineStatusModal = ({ isOpen, onClose, machine }) => {
    if (!isOpen || !machine) return null;

    const StatusBadge = ({ icon: Icon, label, value, color, bgColor }) => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            padding: `${spacing.sm} ${spacing.md}`,
            backgroundColor: bgColor,
            borderRadius: spacing.borderRadius.md,
            border: `1px solid ${color}`,
            color: color
        }}>
            <Icon size={18} />
            <span style={{ fontWeight: typography.fontWeight.semibold }}>{label}:</span>
            <span style={{ fontWeight: typography.fontWeight.bold }}>{value}</span>
        </div>
    );

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(4px)'
        }}>
            <Card style={{ width: '500px', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: spacing.md,
                        right: spacing.md,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: colors.text.secondary
                    }}
                >
                    <X size={20} />
                </button>

                <h3 style={{
                    marginBottom: spacing.lg,
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.primary.main,
                    borderBottom: `2px solid ${colors.primary.light}`,
                    paddingBottom: spacing.sm
                }}>
                    {machine.machineNo} - Durum Detayları
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                    {/* Hata İkonları */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm }}>
                        <StatusBadge
                            icon={WifiOff}
                            label="Wi-Fi"
                            value={machine.wifiError ? 'HATA' : 'OK'}
                            color={machine.wifiError ? '#ef4444' : '#10b981'}
                            bgColor={machine.wifiError ? '#fef2f2' : '#f0fdf4'}
                        />
                        <StatusBadge
                            icon={DoorOpen}
                            label="Kapı"
                            value={machine.doorOpen ? 'AÇIK' : 'KAPALI'}
                            color={machine.doorOpen ? '#ef4444' : '#10b981'}
                            bgColor={machine.doorOpen ? '#fef2f2' : '#f0fdf4'}
                        />
                        <StatusBadge
                            icon={AlertTriangle}
                            label="Uyarı"
                            value={machine.warningCount || 0}
                            color="#f59e0b"
                            bgColor="#fffbeb"
                        />
                        <StatusBadge
                            icon={Info}
                            label="Bilgi"
                            value={machine.infoCount || 0}
                            color="#3b82f6"
                            bgColor="#eff6ff"
                        />
                    </div>

                    {/* Satış Bilgileri */}
                    <div style={{
                        marginTop: spacing.md,
                        padding: spacing.md,
                        backgroundColor: '#f8fafc',
                        borderRadius: spacing.borderRadius.lg,
                        borderLeft: `4px solid #7c3aed`
                    }}>
                        <h4 style={{ fontSize: typography.fontSize.sm, color: '#475569', marginBottom: spacing.sm, fontWeight: 'bold' }}>
                            Satış İstatistikleri
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                                <CreditCard size={20} color="#7c3aed" />
                                <div>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>K. Kartı Satış</div>
                                    <div style={{ fontSize: typography.fontSize.base, fontWeight: 'bold', color: '#1e293b' }}>{machine.ccSales || 0} Adet</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                                <Clock size={20} color="#6366f1" />
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Son Satış</div>
                                    <div style={{ fontSize: typography.fontSize.base, fontWeight: 'bold', color: '#1e293b' }}>{machine.lastSaleTime || '--:--'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: spacing.xl, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={onClose} style={{ backgroundColor: colors.primary.main }}>Kapat</Button>
                </div>
            </Card>
        </div>
    );
};

export default MachineStatusModal;
