import React, { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useApi';
import { busApi, driverApi, feedbackApi, routeApi, scheduleApi } from '../services/api';
import { getRouteSuggestion } from '../services/geminiService';
import type { Bus, Driver, NewFeedback, Route, Schedule } from '../types';
import { BusIcon, FeedbackIcon, MapIcon, RouteIcon, ScheduleIcon, SearchIcon } from './Icons';

type PassengerPage = 'home' | 'routes' | 'route-detail' | 'schedule' | 'feedback';

const PassengerHeader = ({ onNavigate }: { onNavigate: (page: PassengerPage) => void }) => (
    <header className="bg-white/70 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                    <div className="flex-shrink-0 group cursor-pointer" onClick={() => onNavigate('home')}>
                       <a href="#" className="flex items-center space-x-3 text-primary-dark group-hover:text-primary transition-colors duration-300">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                                <BusIcon className="h-8 w-8"/>
                            </div>
                            <span className="text-2xl font-extrabold tracking-tight">BusTracker</span>
                       </a>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-6">
                        {['home', 'routes', 'schedule', 'feedback'].map((item) => (
                             <a key={item} href={`#${item}`} onClick={() => onNavigate(item as PassengerPage)} className="text-gray-600 hover:text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary/5 transition-all duration-300 capitalize text-sm tracking-wide">{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

const SearchBar = ({ onSearchResult }: { onSearchResult: (route: Route) => void }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setLoading(true);
        setError('');
        try {
            const result = await getRouteSuggestion(query);
            if (result) {
                onSearchResult(result);
            } else {
                setError('No route found for your query. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during search.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 p-10 rounded-3xl shadow-2xl text-white mb-12 animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-30 pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">Where will your journey take you?</h2>
                <p className="text-blue-100 text-lg mb-8 font-light">Find the best routes, check real-time schedules, and travel with ease.</p>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                    <div className="flex-grow relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                        </div>
                        <input 
                            type="text" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for a destination or route..." 
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 bg-white shadow-lg focus:ring-4 focus:ring-secondary/50 focus:outline-none transition-all duration-300 text-lg placeholder-gray-400"
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-secondary text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
                {error && <div className="mt-4 bg-red-500/20 backdrop-blur-sm text-red-100 py-2 px-4 rounded-lg inline-block animate-slide-up">{error}</div>}
            </div>
        </div>
    );
};


const HomePage = ({ onNavigate, onRouteSelect, routes }: { onNavigate: (page: PassengerPage) => void, onRouteSelect: (route: Route) => void, routes: Route[] }) => (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <SearchBar onSearchResult={onRouteSelect} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ActionCard icon={<RouteIcon />} title="View Routes" description="Explore all available bus lines" onClick={() => onNavigate('routes')} color="bg-blue-50 text-blue-600" />
            <ActionCard icon={<ScheduleIcon />} title="Check Schedules" description="Real-time departure info" onClick={() => onNavigate('schedule')} color="bg-green-50 text-green-600" />
            <ActionCard icon={<FeedbackIcon />} title="Give Feedback" description="Help us improve your ride" onClick={() => onNavigate('feedback')} color="bg-purple-50 text-purple-600" />
            <ActionCard icon={<MapIcon />} title="Bus Map" description="Visual network overview" onClick={() => onNavigate('routes')} color="bg-orange-50 text-orange-600" />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Popular Routes</h3>
                <button onClick={() => onNavigate('routes')} className="text-primary font-semibold hover:text-primary-dark transition-colors flex items-center">View All <span className="ml-2">&rarr;</span></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {routes.slice(0, 3).map((route, index) => (
                    <div key={route.id} onClick={() => onRouteSelect(route)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <RouteIcon className="h-6 w-6" />
                            </div>
                            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${route.operator === 'Anbessa' ? 'bg-red-100 text-red-700' : route.operator === 'Sheger' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{route.operator}</span>
                        </div>
                        <div className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">{route.name}</div>
                        <div className="text-gray-500 flex items-center text-sm">
                            <span className="font-medium">{route.start}</span>
                            <span className="mx-2 text-gray-300">&rarr;</span>
                            <span className="font-medium">{route.end}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// FIX: Updated the type for the 'icon' prop to ensure it can accept a 'className'.
const ActionCard = ({ icon, title, description, onClick, color = "bg-blue-100 text-primary" }: { icon: React.ReactElement<{ className?: string }>, title: string, description?: string, onClick: () => void, color?: string }) => (
    <div onClick={onClick} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center group h-full flex flex-col items-center justify-center">
        <div className={`inline-flex p-4 rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110 ${color}`}>
            {React.cloneElement(icon, { className: "h-8 w-8"})}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        {description && <p className="text-gray-500 text-sm leading-relaxed">{description}</p>}
    </div>
);


const RoutesPage = ({ onRouteSelect, routes }: { onRouteSelect: (route: Route) => void, routes: Route[] }) => (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl animate-fade-in">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">All Bus Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map(route => (
                <div key={route.id} onClick={() => onRouteSelect(route)} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex justify-between items-center group">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{route.name}</h3>
                        <p className="text-gray-500 mt-1 font-medium">{route.start} <span className="text-gray-300 mx-1">&rarr;</span> {route.end}</p>
                    </div>
                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${route.operator === 'Anbessa' ? 'bg-red-50 text-red-600 border border-red-100' : route.operator === 'Sheger' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>{route.operator}</span>
                </div>
            ))}
        </div>
    </div>
);

const RouteDetailPage = ({ route, schedules, buses, drivers }: { route: Route, schedules: Schedule[], buses: Bus[], drivers: Driver[] }) => {
    const routeSchedules = schedules.filter(s => s.routeId === route.id);
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                <div className="bg-primary p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{route.name}</h2>
                        <div className="flex items-center text-xl md:text-2xl font-light text-blue-100">
                            <span>{route.start}</span>
                            <span className="mx-4 opacity-70">&rarr;</span>
                            <span>{route.end}</span>
                        </div>
                    </div>
                </div>
                
                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-2 h-8 bg-secondary rounded-full mr-3"></span>Stops</h3>
                            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8">
                                {route.stops.map((stop, index) => (
                                     <div key={stop.id} className="relative">
                                        <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${index === 0 || index === route.stops.length-1 ? 'bg-primary ring-4 ring-primary/20' : 'bg-gray-300'}`}></div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 text-lg">{stop.name}</span>
                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">{index === 0 ? 'Start' : index === route.stops.length-1 ? 'End' : `Stop ${index + 1}`}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-2">
                             <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center"><span className="w-2 h-8 bg-secondary rounded-full mr-3"></span>Route Map</h3>
                             <div className="bg-gray-100 rounded-2xl shadow-inner h-80 lg:h-[500px] flex items-center justify-center overflow-hidden relative group">
                                <img src={`https://picsum.photos/seed/${route.id}/1200/800`} alt="Static map placeholder" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Schedule</h3>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Departure</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Arrival (Est.)</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bus Plate</th>
                                    <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Driver</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                 {routeSchedules.map((s, idx) => {
                                     const bus = buses.find(b => b.id === s.busId);
                                     const driver = drivers.find(d => d.id === s.driverId);
                                     return (
                                         <tr key={s.id} className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                                             <td className="px-8 py-5 whitespace-nowrap font-medium text-gray-900">{s.departureTime}</td>
                                             <td className="px-8 py-5 whitespace-nowrap text-gray-600">{s.arrivalTime}</td>
                                             <td className="px-8 py-5 whitespace-nowrap"><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-mono">{bus?.plateNumber}</span></td>
                                             <td className="px-8 py-5 whitespace-nowrap text-gray-600">{driver?.name}</td>
                                         </tr>
                                     )
                                 })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SchedulePage = ({ routes, schedules, buses, drivers }: { routes: Route[], schedules: Schedule[], buses: Bus[], drivers: Driver[] }) => {
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(routes[0] || null);

    useEffect(() => {
        if (!selectedRoute && routes.length > 0) {
            setSelectedRoute(routes[0]);
        }
    }, [routes, selectedRoute]);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 md:mb-0">Bus Schedules</h2>
                <div className="w-full md:w-auto">
                    <div className="relative">
                        <select 
                            id="route-select" 
                            value={selectedRoute?.id || ''}
                            onChange={(e) => setSelectedRoute(routes.find(r => r.id === e.target.value) || null)} 
                            className="block w-full md:w-80 pl-4 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm rounded-xl shadow-sm bg-white appearance-none cursor-pointer"
                        >
                            {routes.map(route => <option key={route.id} value={route.id}>{route.name}: {route.start} to {route.end}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {selectedRoute && <RouteDetailPage route={selectedRoute} schedules={schedules} buses={buses} drivers={drivers} />}
        </div>
    );
};

const FeedbackPage = ({ routes }: { routes: Route[] }) => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const newFeedback: NewFeedback = {
            passengerName: formData.get('name') as string,
            routeId: formData.get('route') as string,
            comment: formData.get('comment') as string,
            type: 'Suggestion', // Simplified for this example
            timestamp: new Date().toISOString()
        };
        
        await feedbackApi.add(newFeedback);
        
        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-center max-w-2xl animate-fade-in">
                 <div className="bg-green-50 border border-green-100 text-green-800 p-8 rounded-3xl shadow-sm mb-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                    <p className="text-green-700">Your feedback has been submitted successfully. We appreciate your input.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-dark hover:shadow-lg transition-all duration-300">Submit Another</button>
            </div>
        )
    }

    return (
         <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl animate-fade-in">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">Feedback & Complaints</h2>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                        <input type="text" name="name" id="name" required className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300"/>
                    </div>
                     <div>
                        <label htmlFor="route" className="block text-sm font-bold text-gray-700 mb-2">Route</label>
                        <div className="relative">
                            <select id="route" name="route" required className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm rounded-xl shadow-sm appearance-none bg-white">
                                {routes.map(route => <option key={route.id} value={route.id}>{route.name}</option>)}
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-bold text-gray-700 mb-2">Comment / Suggestion</label>
                        <textarea id="comment" name="comment" rows={5} required className="block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1">
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};


export const PassengerUI = () => {
    const [page, setPage] = useState<PassengerPage>('home');
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

    const { data: routes, loading: routesLoading } = useCollection(routeApi.getAll);
    const { data: schedules, loading: schedulesLoading } = useCollection(scheduleApi.getAll);
    const { data: buses, loading: busesLoading } = useCollection(busApi.getAll);
    const { data: drivers, loading: driversLoading } = useCollection(driverApi.getAll);
    
    const loading = routesLoading || schedulesLoading || busesLoading || driversLoading;

    const handleNavigate = (newPage: PassengerPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };
    
    const handleRouteSelect = (route: Route) => {
        setSelectedRoute(route);
        setPage('route-detail');
        window.scrollTo(0, 0);
    }

    const renderPage = () => {
        if (loading) {
            return <div className="flex justify-center items-center h-64"><p>Loading...</p></div>
        }

        if (!routes || !schedules || !buses || !drivers) {
            return <div className="flex justify-center items-center h-64"><p>Could not load data.</p></div>
        }

        switch (page) {
            case 'home':
                return <HomePage onNavigate={handleNavigate} onRouteSelect={handleRouteSelect} routes={routes}/>;
            case 'routes':
                return <RoutesPage onRouteSelect={handleRouteSelect} routes={routes} />;
            case 'route-detail':
                return selectedRoute ? <RouteDetailPage route={selectedRoute} schedules={schedules} buses={buses} drivers={drivers} /> : <RoutesPage onRouteSelect={handleRouteSelect} routes={routes} />;
            case 'schedule':
                return <SchedulePage routes={routes} schedules={schedules} buses={buses} drivers={drivers} />;
            case 'feedback':
                return <FeedbackPage routes={routes} />;
            default:
                return <HomePage onNavigate={handleNavigate} onRouteSelect={handleRouteSelect} routes={routes}/>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-primary/20 selection:text-primary">
            <PassengerHeader onNavigate={handleNavigate} />
            <main className="pb-20">
                {renderPage()}
            </main>
            <footer className="bg-gray-900 text-white mt-auto py-12 border-t border-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center items-center space-x-2 mb-6 opacity-50 hover:opacity-100 transition-opacity duration-300">
                        <BusIcon className="h-8 w-8"/>
                        <span className="text-2xl font-bold tracking-tight">BusTracker</span>
                    </div>
                    <p className="text-gray-400 mb-2">&copy; {new Date().getFullYear()} Ethiopian Cities Bus Tracker. All rights reserved.</p>
                    <p className="text-sm text-gray-600">Designed with ❤️ by Addis Ababa University Students.</p>
                </div>
            </footer>
        </div>
    );
};