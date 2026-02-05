import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BarChart2,
    Settings,
    Coffee,
    Building2,
    CreditCard,
    Sliders,
    Megaphone,
    Search,
    Bell,
    HelpCircle,
    LayoutGrid,
    Flag,
    Map
} from 'lucide-react';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

const MainLayout = ({ children }) => {
    const location = useLocation();

    const navItems = [
        { label: 'Satışlar', path: '/sales', icon: BarChart2, active: false },
        { label: 'Operasyon', path: '/operation', icon: Settings, active: false },
        { label: 'Makineler', path: '/machines', icon: Coffee, active: location.pathname === '/machines' },
        { label: 'Rotalar', path: '/routes', icon: Map, active: location.pathname === '/routes' },
        { label: 'Şirketler', path: '/companies', icon: Building2, active: false },
        { label: 'Sistem Yönetimi', path: '/system', icon: Sliders, active: false },
        { label: 'Pazarlama', path: '/marketing', icon: Megaphone, active: false },
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: colors.background.default,
            fontFamily: typography.fontFamily
        }}>
            {/* Top Navigation */}
            <header style={{
                backgroundColor: colors.background.paper,
                borderBottom: `1px solid ${colors.border.main}`,
                padding: `0 ${spacing.xl}`,
                height: '64px',
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                {/* Left: Logo */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/machines" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                        <img src="/logo.png" alt="Logo" style={{ height: '36px' }} />
                    </Link>
                </div>

                {/* Center: Navigation */}
                <nav style={{
                    display: 'flex',
                    gap: spacing.xs,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {navItems.map((Item) => (
                        <Link
                            key={Item.label}
                            to={Item.path}
                            style={{
                                padding: `${spacing.xs} ${spacing.md}`,
                                borderRadius: '50px',
                                fontSize: typography.fontSize.sm,
                                fontWeight: Item.active ? typography.fontWeight.semibold : typography.fontWeight.medium,
                                color: Item.active ? '#ffffff' : colors.text.secondary,
                                backgroundColor: Item.active ? colors.primary.main : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: spacing.sm,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Item.icon size={18} />
                            {Item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right: Actions & Profile */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: spacing.md }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, color: colors.text.secondary, paddingRight: spacing.md, borderRight: `1px solid ${colors.border.main}` }}>
                        <LayoutGrid size={20} style={{ cursor: 'pointer' }} />
                        <HelpCircle size={20} style={{ cursor: 'pointer' }} />
                        <Flag size={20} style={{ cursor: 'pointer' }} />
                        <div style={{ position: 'relative' }}>
                            <Bell size={20} style={{ cursor: 'pointer' }} />
                            <div style={{
                                position: 'absolute',
                                top: -2,
                                right: -2,
                                width: 8,
                                height: 8,
                                backgroundColor: '#ef4444',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }}></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: colors.text.primary }}>Sıla Durmaz</div>
                        </div>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: colors.border.main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img src="https://ui-avatars.com/api/?name=Sila+Durmaz&background=e6f2ed&color=1a644c" alt="Avatar" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main style={{ padding: spacing.xl, maxWidth: '1600px', margin: '0 auto' }}>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
