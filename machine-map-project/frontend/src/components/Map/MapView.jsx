import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';
import MarkerPopup from './MarkerPopup';

// Custom Marker Icons using SVGs
const createCustomIcon = (color, className = '') => {
    return L.divIcon({
        html: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16 17 20 13.5 20 9.5C20 5.35786 16.6421 2 12 2C7.35786 2 4 5.35786 4 9.5C4 13.5 8 17 12 21Z" fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="12" cy="9.5" r="3" fill="white"/>
      </svg>
    `,
        className: `custom-leaflet-icon ${className}`,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });
};

// Custom color map for status
const statusColors = {
    Mevcut: '#10b981',   // Success Green
    Potansiyel: '#fbc02d', // Brighter Yellow
};

// Re-defining available icons with theme colors
const getIcon = (machine, focusedMachineId) => {
    const hasError = machine.wifiError || machine.doorOpen || (machine.warningCount > 0);
    const color = hasError ? '#ff0000' : (statusColors[machine.status] || colors.secondary.main);
    let classNames = [];
    if (hasError) classNames.push('alarm-blink');
    if (machine.id === focusedMachineId) classNames.push('focused-marker');
    return createCustomIcon(color, classNames.join(' '));
};

// Component to handle map centering when machines change
const MapController = ({ center, zoom }) => {
    const map = useMap();
    React.useEffect(() => {
        if (center) {
            map.setView(center, zoom || map.getZoom(), {
                animate: true,
                duration: 1
            });
        }
    }, [center, zoom, map]);
    return null;
};

const MapView = ({ machines = [], center = [41.015137, 28.979530], zoom = 12, focusedMachineId }) => {
    return (
        <div style={{
            height: '500px',
            width: '100%',
            borderRadius: spacing.borderRadius.lg,
            overflow: 'hidden',
            border: `1px solid ${colors.border.main}`,
            boxShadow: spacing.shadow.md
        }}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
            >
                <MapController center={center} />
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {machines.map((machine) => (
                    <Marker
                        key={machine.id}
                        position={[machine.latitude, machine.longitude]}
                        icon={getIcon(machine, focusedMachineId)}
                    >
                        <MarkerPopup machine={machine} />
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
