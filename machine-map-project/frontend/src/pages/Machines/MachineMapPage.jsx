import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import MainLayout from '../../layouts/MainLayout';
import PageHeader from '../../components/UI/PageHeader';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';
import MapView from '../../components/Map/MapView';
import MachineStats from './components/MachineStats';
import MachineFilters from './components/MachineFilters';
import MachineTable from './components/MachineTable';
import MachineAddModal from './components/MachineAddModal';
import MachineStatusModal from './components/MachineStatusModal';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

const MachineMapPage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // State
    const [machines, setMachines] = useState(() => {
        const samples = [
            {
                id: 200, machineNo: 'VM-200', location: 'Sultanahmet Meydanı', status: 'Mevcut',
                latitude: 41.006, longitude: 28.976, description: 'Örnek: Wi-Fi Hatası',
                wifiError: true, doorOpen: false, warningCount: 12, infoCount: 5,
                ccSales: 45, lastSaleTime: '14:20'
            },
            {
                id: 201, machineNo: 'VM-201', location: 'Ayasofya Müzesi', status: 'Mevcut',
                latitude: 41.008, longitude: 28.979, description: 'Örnek: Kapı Açık',
                wifiError: false, doorOpen: true, warningCount: 4, infoCount: 2,
                ccSales: 120, lastSaleTime: '14:15'
            },
            {
                id: 202, machineNo: 'VM-202', location: 'Gülhane Parkı', status: 'Mevcut',
                latitude: 41.012, longitude: 28.980, description: 'Örnek: Çoklu Hata',
                wifiError: true, doorOpen: true, warningCount: 8, infoCount: 1,
                ccSales: 88, lastSaleTime: '13:50'
            },
            {
                id: 203, machineNo: 'VM-203', location: 'Eminönü İskelesi', status: 'Mevcut',
                latitude: 41.017, longitude: 28.972, description: 'Örnek: Wi-Fi Hatası',
                wifiError: true, doorOpen: false, warningCount: 0, infoCount: 10,
                ccSales: 210, lastSaleTime: '14:25'
            },
            {
                id: 204, machineNo: 'VM-204', location: 'Galata Köprüsü', status: 'Mevcut',
                latitude: 41.020, longitude: 28.973, description: 'Örnek: Kapı Açık',
                wifiError: false, doorOpen: true, warningCount: 5, infoCount: 0,
                ccSales: 15, lastSaleTime: '12:10'
            },
            {
                id: 205, machineNo: 'VM-205', location: 'Karaköy Sahil', status: 'Mevcut',
                latitude: 41.023, longitude: 28.975, description: 'Örnek: Wi-Fi Hatası',
                wifiError: true, doorOpen: false, warningCount: 2, infoCount: 0,
                ccSales: 32, lastSaleTime: '14:40'
            }
        ];

        const saved = localStorage.getItem('machines_data');
        if (saved) {
            try {
                const savedMachines = JSON.parse(saved);
                // Filter out any existing entries that have the same number as our samples
                // AND also explicitly remove the old 101-105 series
                const sampleNos = new Set(samples.map(s => s.machineNo));
                const oldSamples = new Set([
                    'VM-101', 'VM-102', 'VM-103', 'VM-104', 'VM-105',
                    'VM-101-HATA', 'VM-102-HATA', 'VM-103-HATA', 'VM-104-BILGI', 'VM-105-HATA'
                ]);

                const otherMachines = savedMachines.filter(m =>
                    !sampleNos.has(m.machineNo) && !oldSamples.has(m.machineNo)
                );
                return [...samples, ...otherMachines];
            } catch (e) {
                console.error("Error parsing saved machines:", e);
                return samples;
            }
        }
        return samples;
    });

    // Persistence
    React.useEffect(() => {
        localStorage.setItem('machines_data', JSON.stringify(machines));
    }, [machines]);

    const [filters, setFilters] = useState({ search: '', status: 'all', sortBy: 'newest' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusModalMachine, setStatusModalMachine] = useState(null);
    const [editingMachine, setEditingMachine] = useState(null);
    const [mapFocus, setMapFocus] = useState({ center: [41.006, 28.976], zoom: 14 });
    const [focusedMachineId, setFocusedMachineId] = useState(null);

    // Handlers
    const handleMachineClick = (machine) => {
        setFocusedMachineId(machine.id);
        setMapFocus({
            center: [machine.latitude, machine.longitude],
            zoom: 18
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleImportExcel = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            const newMachines = data.map((item, index) => ({
                id: Date.now() + index,
                machineNo: item['Makine No'] || item.machineNo || 'Bilinmiyor',
                status: item['Statü'] || item.status || 'Potansiyel',
                latitude: parseFloat(item['Enlem'] || item.latitude || item.lat),
                longitude: parseFloat(item['Boylam'] || item.longitude || item.lng),
                location: item['Lokasyon'] || item.location || 'İçeri Aktarıldı',
                lastSeen: new Date().toLocaleDateString('tr-TR')
            })).filter(m => !isNaN(m.latitude) && !isNaN(m.longitude));

            setMachines(prev => [...prev, ...newMachines]);
        };
        reader.readAsBinaryString(file);
        e.target.value = null; // Reset input
    };

    const handleDelete = (id) => {
        if (window.confirm('Bu makineyi silmek istediğinize emin misiniz?')) {
            setMachines(machines.filter(m => m.id !== id));
        }
    };

    const handleEdit = (machine) => {
        setEditingMachine(machine);
        setIsModalOpen(true);
    };

    const handleSaveMachine = (machineData) => {
        if (editingMachine) {
            setMachines(prev => prev.map(m => m.id === editingMachine.id ? { ...m, ...machineData } : m));
            setEditingMachine(null);
        } else {
            setMachines(prev => [...prev, machineData]);
        }
        setIsModalOpen(false);
    };

    // Logic
    const filteredMachines = machines
        .filter(m => {
            const matchesSearch = m.machineNo.toLowerCase().includes(filters.search.toLowerCase());
            const matchesStatus = filters.status === 'all' || m.status === filters.status;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'newest') return b.id - a.id;
            if (filters.sortBy === 'oldest') return a.id - b.id;
            if (filters.sortBy === 'machineNo') return a.machineNo.localeCompare(b.machineNo);
            if (filters.sortBy === 'status') return a.status.localeCompare(b.status);
            return 0;
        });

    const activeCount = machines.filter(m => m.status === 'Mevcut').length;
    const potentialCount = machines.filter(m => m.status === 'Potansiyel').length;

    return (
        <MainLayout>
            <PageHeader
                title="Makineler"
                actions={
                    <Button onClick={() => navigate('/routes')}>
                        🚀 Rota Oluştur
                    </Button>
                }
            />

            <MachineStats activeCount={activeCount} stockCount={potentialCount} />

            <MachineFilters
                filters={filters}
                setFilters={setFilters}
                onImportExcel={() => fileInputRef.current.click()}
                onAddManual={() => setIsModalOpen(true)}
            />

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".xlsx, .xls, .csv"
                onChange={handleImportExcel}
            />

            <Card padding="0" style={{ marginBottom: spacing.lg }}>
                <MapView
                    machines={filteredMachines}
                    center={mapFocus.center}
                    zoom={mapFocus.zoom}
                    focusedMachineId={focusedMachineId}
                />
            </Card>

            <MachineTable
                machines={filteredMachines}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onMachineClick={handleMachineClick}
                onViewDetails={(machine) => setStatusModalMachine(machine)}
            />

            <MachineAddModal
                isOpen={isModalOpen}
                initialData={editingMachine}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingMachine(null);
                }}
                onSave={handleSaveMachine}
            />

            <MachineStatusModal
                isOpen={!!statusModalMachine}
                onClose={() => setStatusModalMachine(null)}
                machine={statusModalMachine}
            />
        </MainLayout>
    );
};

export default MachineMapPage;
