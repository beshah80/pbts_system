import React, { useState, useEffect } from 'react';
import { BusIcon, RouteIcon, ScheduleIcon, FeedbackIcon, SearchIcon, MapIcon } from './Icons';
import { getRouteSuggestion } from '../services/geminiService';
import { routeApi, scheduleApi, busApi, driverApi, feedbackApi } from '../services/api';
import type { Route, Schedule, Bus, Driver, NewFeedback } from '../types';
import { useCollection } from '../hooks/useApi';

type PassengerPage = 'home' | 'routes' | 'route-detail' | 'schedule' | 'feedback';

const PassengerHeader = ({ onNavigate }: { onNavigate: (page: PassengerPage) => void }) => (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                       <a href="#" onClick={() => onNavigate('home')} className="flex items-center space-x-2 text-primary">
                            <BusIcon className="h-8 w-8"/>
                            <span className="text-2xl font-bold">BusTracker</span>
                       </a>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {['home', 'routes', 'schedule', 'feedback'].map((item) => (
                             <a key={item} href={`#${item}`} onClick={() => onNavigate(item as PassengerPage)} className="text-gray-700 hover:bg-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium capitalize">{item}</a>
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
        <div className="bg-primary p-8 rounded-lg shadow-xl text-white">
            <h2 className="text-3xl font-bold mb-4">Where are you going?</h2>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., 'to Bole' or 'Route 45'" 
                    className="flex-grow p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-secondary focus:outline-none"
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-secondary text-primary font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition duration-300 flex items-center justify-center disabled:bg-gray-400"
                >
                    {loading ? 'Searching...' : <><SearchIcon className="h-5 w-5 mr-2" /> Search</>}
                </button>
            </form>
            {error && <p className="text-red-300 mt-2">{error}</p>}
        </div>
    );
};


const HomePage = ({ onNavigate, onRouteSelect, routes }: { onNavigate: (page: PassengerPage) => void, onRouteSelect: (route: Route) => void, routes: Route[] }) => (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <SearchBar onSearchResult={onRouteSelect} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            <ActionCard icon={<RouteIcon />} title="View Routes" onClick={() => onNavigate('routes')} />
            <ActionCard icon={<ScheduleIcon />} title="Check Schedules" onClick={() => onNavigate('schedule')} />
            <ActionCard icon={<FeedbackIcon />} title="Give Feedback" onClick={() => onNavigate('feedback')} />
            <ActionCard icon={<MapIcon />} title="Bus Map" description="Static map of all routes" onClick={() => onNavigate('routes')} />
        </div>

        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Popular Routes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {routes.slice(0, 3).map(route => (
                    <div key={route.id} onClick={() => onRouteSelect(route)} className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow">
                        <div className="font-bold text-primary">{route.name}</div>
                        <div>{route.start} &rarr; {route.end}</div>
                        <div className="text-sm text-gray-500 mt-1">{route.operator}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// FIX: Updated the type for the 'icon' prop to ensure it can accept a 'className'.
const ActionCard = ({ icon, title, description, onClick }: { icon: React.ReactElement<{ className?: string }>, title: string, description?: string, onClick: () => void }) => (
    <div onClick={onClick} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer text-center">
        <div className="text-primary inline-block p-3 bg-blue-100 rounded-full mb-4">
            {React.cloneElement(icon, { className: "h-8 w-8"})}
        </div>
        <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
    </div>
);


const RoutesPage = ({ onRouteSelect, routes }: { onRouteSelect: (route: Route) => void, routes: Route[] }) => (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All Bus Routes</h2>
        <div className="space-y-4">
            {routes.map(route => (
                <div key={route.id} onClick={() => onRouteSelect(route)} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-primary">{route.name}</h3>
                        <p className="text-gray-600">{route.start} to {route.end}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${route.operator === 'Anbessa' ? 'bg-red-200 text-red-800' : route.operator === 'Sheger' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>{route.operator}</span>
                </div>
            ))}
        </div>
    </div>
);

const RouteDetailPage = ({ route, schedules, buses, drivers }: { route: Route, schedules: Schedule[], buses: Bus[], drivers: Driver[] }) => {
    const routeSchedules = schedules.filter(s => s.routeId === route.id);
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{route.name}</h2>
            <p className="text-xl text-gray-600 mb-6">{route.start} &rarr; {route.end}</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Stops</h3>
                    <ul className="space-y-3">
                        {route.stops.map((stop, index) => (
                             <li key={stop.id} className="flex items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${index === 0 || index === route.stops.length-1 ? 'bg-primary text-white' : 'bg-gray-300'}`}>
                                    <span className="text-xs font-bold">{index + 1}</span>
                                </div>
                                <span className="font-medium text-gray-700">{stop.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-2">
                     <h3 className="text-2xl font-semibold text-gray-800 mb-4">Static Map</h3>
                     <div className="bg-gray-200 rounded-lg shadow-inner h-64 lg:h-96 flex items-center justify-center">
                        <img src={`https://picsum.photos/seed/${route.id}/800/600`} alt="Static map placeholder" className="w-full h-full object-cover rounded-lg" />
                     </div>
                </div>
            </div>
            
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Schedule</h3>
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival (Est.)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Plate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                             {routeSchedules.map(s => {
                                 const bus = buses.find(b => b.id === s.busId);
                                 const driver = drivers.find(d => d.id === s.driverId);
                                 return (
                                     <tr key={s.id}>
                                         <td className="px-6 py-4 whitespace-nowrap">{s.departureTime}</td>
                                         <td className="px-6 py-4 whitespace-nowrap">{s.arrivalTime}</td>
                                         <td className="px-6 py-4 whitespace-nowrap">{bus?.plateNumber}</td>
                                         <td className="px-6 py-4 whitespace-nowrap">{driver?.name}</td>
                                     </tr>
                                 )
                             })}
                        </tbody>
                    </table>
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
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Bus Schedules</h2>
            
            <div className="mb-4">
                <label htmlFor="route-select" className="block text-sm font-medium text-gray-700">Select a Route</label>
                <select 
                    id="route-select" 
                    value={selectedRoute?.id || ''}
                    onChange={(e) => setSelectedRoute(routes.find(r => r.id === e.target.value) || null)} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                    {routes.map(route => <option key={route.id} value={route.id}>{route.name}: {route.start} to {route.end}</option>)}
                </select>
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
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-center">
                 <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg" role="alert">
                    <p className="font-bold">Thank you!</p>
                    <p>Your feedback has been submitted successfully.</p>
                </div>
                <button onClick={() => setSubmitted(false)} className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700">Submit Another</button>
            </div>
        )
    }

    return (
         <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Feedback & Complaints</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"/>
                    </div>
                     <div>
                        <label htmlFor="route" className="block text-sm font-medium text-gray-700">Route</label>
                        <select id="route" name="route" required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                            {routes.map(route => <option key={route.id} value={route.id}>{route.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment / Suggestion</label>
                        <textarea id="comment" name="comment" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400">
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
        <div className="min-h-screen bg-gray-100">
            <PassengerHeader onNavigate={handleNavigate} />
            <main>
                {renderPage()}
            </main>
            <footer className="bg-dark text-white mt-12 py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Ethiopian Cities Bus Tracker. All rights reserved.</p>
                    <p className="text-sm text-gray-400 mt-2">A project by Addis Ababa University, School of Information Science Students.</p>
                </div>
            </footer>
        </div>
    );
};