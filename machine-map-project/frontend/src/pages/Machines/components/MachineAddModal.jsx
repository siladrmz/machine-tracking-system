import React, { useState, useEffect } from 'react';
import Card from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { X } from 'lucide-react';

const MachineAddModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        machineNo: '',
        location: '',
        status: 'Mevcut',
        description: '',
        latitude: '',
        longitude: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                machineNo: initialData.machineNo || '',
                location: initialData.location || '',
                status: initialData.status || 'Mevcut',
                description: initialData.description || '',
                latitude: initialData.latitude || '',
                longitude: initialData.longitude || ''
            });
        } else {
            setFormData({
                machineNo: '',
                location: '',
                status: 'Mevcut',
                description: '',
                latitude: '',
                longitude: ''
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.machineNo || !formData.location || !formData.latitude || !formData.longitude) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        const machineData = {
            id: initialData ? initialData.id : Date.now(),
            machineNo: formData.machineNo,
            location: formData.location,
            status: formData.status,
            description: formData.description,
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
            lastSeen: initialData ? initialData.lastSeen : new Date().toLocaleDateString('tr-TR')
        };

        if (isNaN(machineData.latitude) || isNaN(machineData.longitude)) {
            alert('Geçersiz koordinat!');
            return;
        }

        onSave(machineData);
        onClose();
    };

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
            <Card style={{ width: '600px', position: 'relative' }}>
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
                    color: colors.text.primary
                }}>
                    {initialData ? 'Makine Düzenle' : 'Manuel Makine Ekle'}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: spacing.md }}>
                        <label style={{
                            display: 'block',
                            marginBottom: spacing.xs,
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.text.secondary
                        }}>
                            Makine No
                        </label>
                        <input
                            type="text"
                            placeholder="Örn: VM-150"
                            value={formData.machineNo}
                            onChange={(e) => setFormData({ ...formData, machineNo: e.target.value })}
                            style={{
                                width: '100%',
                                padding: spacing.sm,
                                borderRadius: spacing.borderRadius.md,
                                border: `1px solid ${colors.border.main}`,
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: spacing.md }}>
                        <label style={{
                            display: 'block',
                            marginBottom: spacing.xs,
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.text.secondary
                        }}>
                            Lokasyon
                        </label>
                        <input
                            type="text"
                            placeholder="Örn: MyTechnich Kafeterya"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            style={{
                                width: '100%',
                                padding: spacing.sm,
                                borderRadius: spacing.borderRadius.md,
                                border: `1px solid ${colors.border.main}`,
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: spacing.md }}>
                        <label style={{
                            display: 'block',
                            marginBottom: spacing.xs,
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.text.secondary
                        }}>
                            Statü
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            style={{
                                width: '100%',
                                padding: spacing.sm,
                                borderRadius: spacing.borderRadius.md,
                                border: `1px solid ${colors.border.main}`,
                                backgroundColor: 'white',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        >
                            <option value="Mevcut">Mevcut</option>
                            <option value="Potansiyel">Potansiyel</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: spacing.md }}>
                        <label style={{
                            display: 'block',
                            marginBottom: spacing.xs,
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.text.secondary
                        }}>
                            Açıklama
                        </label>
                        <textarea
                            placeholder="Makine hakkında ek bilgiler..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{
                                width: '100%',
                                padding: spacing.sm,
                                borderRadius: spacing.borderRadius.md,
                                border: `1px solid ${colors.border.main}`,
                                outline: 'none',
                                boxSizing: 'border-box',
                                minHeight: '80px',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.lg }}>
                        <div style={{ flex: 1 }}>
                            <label style={{
                                display: 'block',
                                marginBottom: spacing.xs,
                                fontSize: typography.fontSize.sm,
                                fontWeight: typography.fontWeight.medium,
                                color: colors.text.secondary
                            }}>
                                Enlem (Lat)
                            </label>
                            <input
                                type="number"
                                step="any"
                                placeholder="41.01"
                                value={formData.latitude}
                                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: spacing.sm,
                                    borderRadius: spacing.borderRadius.md,
                                    border: `1px solid ${colors.border.main}`,
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{
                                display: 'block',
                                marginBottom: spacing.xs,
                                fontSize: typography.fontSize.sm,
                                fontWeight: typography.fontWeight.medium,
                                color: colors.text.secondary
                            }}>
                                Boylam (Lng)
                            </label>
                            <input
                                type="number"
                                step="any"
                                placeholder="28.97"
                                value={formData.longitude}
                                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: spacing.sm,
                                    borderRadius: spacing.borderRadius.md,
                                    border: `1px solid ${colors.border.main}`,
                                    outline: 'none',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'flex-end' }}>
                        <Button variant="outline" type="button" onClick={onClose}>İptal</Button>
                        <Button type="submit">{initialData ? 'Güncelle' : 'Kaydet'}</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default MachineAddModal;
