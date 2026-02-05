import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import MainLayout from '../../layouts/MainLayout';
import PageHeader from '../../components/UI/PageHeader';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import MapView from '../../components/Map/MapView';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { ArrowLeft, Car, Flag } from 'lucide-react';

// Helper to calculate distance between two coordinates in km
const calculateDistance = (p1, p2) => {
    if (!p1 || !p2) return 0;
    const R = 6371;
    const dLat = (p2.latitude - p1.latitude) * Math.PI / 180;
    const dLon = (p2.longitude - p1.longitude) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(p1.latitude * Math.PI / 180) * Math.cos(p2.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// Nearest Neighbor Heuristic for Route Optimization
const getOptimizedRoute = (start, machines) => {
    if (!start || machines.length === 0) return machines;

    let unvisited = [...machines];
    let optimized = [];
    let currentPos = start;

    while (unvisited.length > 0) {
        let nearestIndex = 0;
        let minDistance = calculateDistance(currentPos, unvisited[0]);

        for (let i = 1; i < unvisited.length; i++) {
            let dist = calculateDistance(currentPos, unvisited[i]);
            if (dist < minDistance) {
                minDistance = dist;
                nearestIndex = i;
            }
        }

        currentPos = unvisited[nearestIndex];
        optimized.push(unvisited[nearestIndex]);
        unvisited.splice(nearestIndex, 1);
    }

    return optimized;
};

// Component to handle routing visualization
const RoutingMachine = ({ start, machines, end, onRouteFound }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const allPoints = [];
        if (start) allPoints.push(L.latLng(start.latitude, start.longitude));

        // Optimize the order of machines for the map display
        const optimizedMachines = getOptimizedRoute(start, machines);
        optimizedMachines.forEach(m => allPoints.push(L.latLng(m.latitude, m.longitude)));

        if (end) allPoints.push(L.latLng(end.latitude, end.longitude));

        if (allPoints.length < 2) return;

        const routingControl = L.Routing.control({
            waypoints: allPoints,
            lineOptions: {
                styles: [{ color: colors.primary.main, weight: 6, opacity: 0.7 }]
            },
            show: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null
        })
            .on('routesfound', (e) => {
                const routes = e.routes;
                const summary = routes[0].summary;
                onRouteFound({
                    distance: (summary.totalDistance / 1000).toFixed(2),
                    duration: (summary.totalTime / 3600).toFixed(1)
                });
            })
            .addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, start, machines, end, onRouteFound]);

    return null;
};

const RouteCreatePage = () => {
    const navigate = useNavigate();
    // Data Loading
    const [availableMachines] = useState(() => {
        const saved = localStorage.getItem('machines_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map(m => ({
                    value: m.id,
                    label: `${m.machineNo} (${m.location})`,
                    latitude: m.latitude,
                    longitude: m.longitude,
                    status: m.status
                }));
            } catch (e) {
                console.error("Error parsing machines for routes:", e);
            }
        }
        return [
            { value: 1, label: 'VM-117 (Kayaşehir)', latitude: 41.015137, longitude: 28.979530, status: 'Mevcut' },
            { value: 2, label: 'VM-127 (Bolu)', latitude: 41.035137, longitude: 28.989530, status: 'Mevcut' },
            { value: 3, label: 'VM-126 (Çukurambar)', latitude: 40.995137, longitude: 28.959530, status: 'Potansiyel' },
            { value: 4, label: 'VM-125 (Aksaray)', latitude: 41.055137, longitude: 29.019530, status: 'Mevcut' },
        ];
    });

    const [personnel] = useState([
        { value: 'p1', label: 'Hamza Yaşar' },
        { value: 'p2', label: 'Kubilay Şimşek' },
        { value: 'p3', label: 'Salih Murat Tevetoğlu' },
    ]);

    // State
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentStats, setCurrentStats] = useState({ distance: 0, duration: 0 });
    const [editingId, setEditingId] = useState(null);
    const [routes, setRoutes] = useState(() => {
        const saved = localStorage.getItem('routes_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Error parsing saved routes:", e);
            }
        }
        return [
            {
                id: 1,
                personnel: { value: 'p1', label: 'Hamza Yaşar' },
                startLocation: null,
                endLocation: null,
                machines: [
                    { value: 1, label: 'VM-117 (Kayaşehir)', latitude: 41.015137, longitude: 28.979530, status: 'Mevcut' },
                    { value: 2, label: 'VM-127 (Bolu)', latitude: 41.035137, longitude: 28.989530, status: 'Mevcut' }
                ],
                date: '2026-02-01 - 2026-02-02',
                status: 'Aktif',
                distance: '4.2',
                duration: '0.5'
            }
        ];
    });

    const locationOptions = [
        { value: 'current', label: '📍 Mevcut Konum', isCurrent: true },
        ...availableMachines
    ];

    const handleGetCurrentLocation = (setter) => {
        if (!navigator.geolocation) return alert('Tarayıcınız konum özelliğini desteklemiyor.');

        navigator.geolocation.getCurrentPosition((position) => {
            setter({
                value: 'current',
                label: '📍 Mevcut Konum',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, () => {
            alert('Konum alınamadı. Lütfen izinleri kontrol edin.');
        });
    };

    const handleCreateRoute = () => {
        if (selectedMachines.length < 1) return alert('Lütfen en az 1 makine seçin!');
        if (!selectedPersonnel) return alert('Lütfen personel seçin!');

        // Optimize machines order before saving
        const optimizedMachines = getOptimizedRoute(startLocation, selectedMachines);

        const routeData = {
            id: editingId || Date.now(),
            startLocation,
            endLocation,
            machines: optimizedMachines,
            personnel: selectedPersonnel,
            date: `${startDate || '---'} - ${endDate || '---'}`,
            status: 'Aktif',
            distance: currentStats.distance,
            duration: currentStats.duration
        };

        if (editingId) {
            setRoutes(routes.map(r => r.id === editingId ? routeData : r));
            setEditingId(null);
            alert('Rota başarıyla güncellendi!');
        } else {
            setRoutes([routeData, ...routes]);
            alert('Rota başarıyla oluşturuldu!');
        }

        // Reset form
        setStartLocation(null);
        setEndLocation(null);
        setSelectedMachines([]);
        setSelectedPersonnel(null);
        setStartDate('');
        setEndDate('');
        setCurrentStats({ distance: 0, duration: 0 });
    };

    const handleDeleteRoute = (id) => {
        if (window.confirm('Bu rotayı silmek istediğinize emin misiniz?')) {
            setRoutes(routes.filter(r => r.id !== id));
        }
    };

    const handleEditRoute = (route) => {
        setEditingId(route.id);
        setStartLocation(route.startLocation);
        setEndLocation(route.endLocation);
        setSelectedMachines(route.machines);
        setSelectedPersonnel(route.personnel);
        const dates = route.date.split(' - ');
        setStartDate(dates[0] === '---' ? '' : dates[0]);
        setEndDate(dates[1] === '---' ? '' : dates[1]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Persistence
    useEffect(() => {
        localStorage.setItem('routes_data', JSON.stringify(routes));
    }, [routes]);

    const [activeTab, setActiveTab] = useState('Aktif');
    const [listFilters, setListFilters] = useState({ personnel: '', status: 'all', sortBy: 'newest' });

    const handleViewRoute = (route) => {
        setEditingId(null);
        setStartLocation(route.startLocation || null);
        setEndLocation(route.endLocation || null);
        setSelectedMachines(route.machines);
        setSelectedPersonnel(route.personnel);
        const dates = route.date.split(' - ');
        setStartDate(dates[0] === '---' ? '' : dates[0]);
        setEndDate(dates[1] === '---' ? '' : dates[1]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredRoutes = routes
        .filter(r => {
            const matchesTab = r.status === activeTab;
            const matchesPersonnel = !listFilters.personnel || r.personnel?.label.toLowerCase().includes(listFilters.personnel.toLowerCase());
            return matchesTab && matchesPersonnel;
        })
        .sort((a, b) => {
            if (listFilters.sortBy === 'newest') return b.id - a.id;
            if (listFilters.sortBy === 'oldest') return a.id - b.id;
            if (listFilters.sortBy === 'personnel') return (a.personnel?.label || '').localeCompare(b.personnel?.label || '');
            return 0;
        });

    const optimizedMachines = React.useMemo(() => {
        return getOptimizedRoute(startLocation, selectedMachines);
    }, [startLocation, selectedMachines]);

    return (
        <MainLayout>
            <PageHeader
                title="Rota Yönetimi"
                actions={
                    <Button variant="outline" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
                        <ArrowLeft size={16} /> Geri
                    </Button>
                }
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: spacing.lg, marginBottom: spacing.xl }}>
                <div>
                    <Card padding="0" style={{ height: '500px' }}>
                        <MapContainer
                            center={[41.015137, 28.979530]}
                            zoom={12}
                            style={{ height: '100%', width: '100%', borderRadius: spacing.borderRadius.lg }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {startLocation && (
                                <Marker
                                    position={[startLocation.latitude, startLocation.longitude]}
                                    icon={L.divIcon({
                                        html: `
                                            <div style="background: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2"/>
                                                    <circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>
                                                </svg>
                                            </div>`,
                                        className: '',
                                        iconSize: [32, 32],
                                        iconAnchor: [16, 16]
                                    })}
                                />
                            )}
                            {optimizedMachines.map((m, index) => (
                                <Marker
                                    key={m.value}
                                    position={[m.latitude, m.longitude]}
                                    icon={L.divIcon({
                                        html: `
                                            <div style="background: #7c3aed; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); font-weight: bold; font-size: 14px;">
                                                ${index + 1}
                                            </div>`,
                                        className: '',
                                        iconSize: [28, 28],
                                        iconAnchor: [14, 14]
                                    })}
                                />
                            ))}
                            {endLocation && (
                                <Marker
                                    position={[endLocation.latitude, endLocation.longitude]}
                                    icon={L.divIcon({
                                        html: `
                                            <div style="background: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #ef4444; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                                                </svg>
                                            </div>`,
                                        className: '',
                                        iconSize: [32, 32],
                                        iconAnchor: [16, 16]
                                    })}
                                />
                            )}

                            <RoutingMachine
                                start={startLocation}
                                machines={optimizedMachines}
                                end={endLocation}
                                onRouteFound={setCurrentStats}
                            />
                        </MapContainer>
                    </Card>
                </div>

                <aside>
                    <Card style={{ height: '100%' }}>
                        <h3 style={{ fontSize: typography.fontSize.base, color: colors.primary.main, marginBottom: spacing.md }}>
                            {editingId ? 'Rotayı Düzenle' : 'Rota Parametreleri'}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                            <div>
                                <label style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, marginBottom: '4px', display: 'block' }}>
                                    Başlangıç Konumu
                                </label>
                                <Select
                                    options={locationOptions}
                                    value={startLocation}
                                    onChange={(val) => val?.value === 'current' ? handleGetCurrentLocation(setStartLocation) : setStartLocation(val)}
                                    placeholder="Konum ara..."
                                    styles={{ control: (base) => ({ ...base, fontSize: '14px' }) }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, marginBottom: '4px', display: 'block' }}>
                                    Bitiş Konumu
                                </label>
                                <Select
                                    options={locationOptions}
                                    value={endLocation}
                                    onChange={(val) => val?.value === 'current' ? handleGetCurrentLocation(setEndLocation) : setEndLocation(val)}
                                    placeholder="Konum ara..."
                                    styles={{ control: (base) => ({ ...base, fontSize: '14px' }) }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, marginBottom: '4px', display: 'block' }}>
                                    Makineleri Seçin
                                </label>
                                <Select
                                    isMulti
                                    options={availableMachines}
                                    value={selectedMachines}
                                    onChange={setSelectedMachines}
                                    placeholder="Makine ara..."
                                    styles={{ control: (base) => ({ ...base, fontSize: '14px' }) }}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.bold, marginBottom: '4px', display: 'block' }}>
                                    Personel Seçin
                                </label>
                                <Select
                                    options={personnel}
                                    value={selectedPersonnel}
                                    onChange={setSelectedPersonnel}
                                    placeholder="Seçiniz..."
                                    styles={{ control: (base) => ({ ...base, fontSize: '14px' }) }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm }}>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${colors.border.main}`, fontSize: '12px' }}
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${colors.border.main}`, fontSize: '12px' }}
                                />
                            </div>

                            {currentStats.distance > 0 && (
                                <div style={{
                                    padding: spacing.sm,
                                    backgroundColor: colors.primary.light,
                                    borderRadius: spacing.borderRadius.md,
                                    fontSize: typography.fontSize.xs,
                                    color: colors.primary.main,
                                    fontWeight: 'bold'
                                }}>
                                    Tahmini: {currentStats.distance} km | {currentStats.duration} saat
                                </div>
                            )}

                            <Button onClick={handleCreateRoute} style={{ width: '100%', marginTop: spacing.sm }}>
                                {editingId ? 'Değişiklikleri Kaydet' : 'Rotayı Onayla'}
                            </Button>
                            {editingId && (
                                <Button variant="outline" onClick={() => {
                                    setEditingId(null);
                                    setSelectedMachines([]);
                                    setSelectedPersonnel(null);
                                    setStartDate('');
                                    setEndDate('');
                                }} style={{ width: '100%' }}>
                                    İptal
                                </Button>
                            )}
                        </div>
                    </Card>
                </aside>
            </div>

            {/* Rota Listesi Bölümü */}
            <Card title="Rota Listesi">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border.light}`, marginBottom: spacing.md }}>
                    <div style={{ display: 'flex' }}>
                        {['Aktif', 'Pasif'].map(tab => (
                            <div
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: `${spacing.sm} ${spacing.lg}`,
                                    cursor: 'pointer',
                                    borderBottom: activeTab === tab ? `2px solid ${colors.primary.main}` : 'none',
                                    color: activeTab === tab ? colors.primary.main : colors.text.light,
                                    fontWeight: activeTab === tab ? typography.fontWeight.bold : typography.fontWeight.medium,
                                    fontSize: typography.fontSize.sm
                                }}
                            >
                                {tab} Rotalar
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: spacing.sm }}>
                        <select
                            value={listFilters.sortBy}
                            onChange={(e) => setListFilters({ ...listFilters, sortBy: e.target.value })}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: `1px solid #7c3aed`,
                                fontSize: '12px',
                                color: '#6d28d9',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="newest">Sırala</option>
                            <option value="newest">En Yeni</option>
                            <option value="oldest">En Eski</option>
                            <option value="personnel">Personel (A-Z)</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Personel ara..."
                            onChange={(e) => setListFilters({ ...listFilters, personnel: e.target.value })}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${colors.border.main}`, fontSize: '12px' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                    {filteredRoutes.length > 0 ? filteredRoutes.map(r => (
                        <div key={r.id} style={{
                            padding: spacing.md,
                            border: `1px solid ${colors.border.light}`,
                            borderRadius: spacing.borderRadius.md,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: '#fff'
                        }}>
                            <div style={{ display: 'flex', gap: spacing.lg, alignItems: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: colors.primary.light,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: colors.primary.main,
                                    fontWeight: 'bold'
                                }}>
                                    {r.personnel.label.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>{r.personnel.label}</div>
                                    <div style={{ fontSize: typography.fontSize.xs, color: colors.text.light }}>📅 {r.date}</div>
                                    {(r.startLocation || r.endLocation) && (
                                        <div style={{ fontSize: '10px', color: colors.primary.main, marginTop: '2px' }}>
                                            🚩 {r.startLocation?.value === 'current' ? 'LOKASYONUM' : r.startLocation?.label || '---'}
                                            {' → '}
                                            🏁 {r.endLocation?.value === 'current' ? 'LOKASYONUM' : r.endLocation?.label || '---'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: spacing.xl, alignItems: 'center' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>{r.machines.length} İstasyon</div>
                                    <div style={{ fontSize: typography.fontSize.xs, color: colors.text.light }}>
                                        {r.distance} km | {r.duration} s
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: spacing.sm }}>
                                    <Button variant="outline" size="sm" onClick={() => handleEditRoute(r)} style={{ padding: '4px 8px', fontSize: '11px' }}>
                                        Düzenle
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDeleteRoute(r.id)} style={{ padding: '4px 8px', fontSize: '11px', color: colors.status.danger, borderColor: colors.status.danger }}>
                                        Sil
                                    </Button>
                                    <div
                                        onClick={() => handleViewRoute(r)}
                                        style={{ fontSize: typography.fontSize.xs, color: colors.primary.main, cursor: 'pointer', alignSelf: 'center', marginLeft: spacing.sm }}
                                    >
                                        Detayları Gör
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', color: colors.text.light, padding: spacing.xl }}>
                            Bu kategoride kayıtlı rota bulunamadı.
                        </div>
                    )}
                </div>
            </Card>
        </MainLayout>
    );
};

export default RouteCreatePage;
