'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProfileDropdown } from '@/components/ui/profile-dropdown';
import { cn } from '@/lib/utils';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  CheckCircle2,
  Plus,
  Route as RouteIcon,
  Users
} from 'lucide-react';

// --- Types & Data ---

const STATS_DATA = [
  {
    title: 'Total Buses',
    value: '120',
    trend: '3% from last month',
    trendUp: true,
  },
  {
    title: 'Active Routes',
    value: '45',
    trend: '5% from last month',
    trendUp: true,
  },
  {
    title: 'On-Time Performance',
    value: '92%',
    trend: '7% from yesterday',
    trendUp: false,
    isNegativeMetric: true, 
  },
  {
    title: 'Incidents Reported',
    value: '3',
    trend: '1 new today',
    trendUp: false,
    isNegativeMetric: true, 
  },
];

const RECENT_ACTIVITY = [
  { text: 'Bus 202 started Route 4', time: '2 min ago', color: 'bg-blue-500' },
  { text: 'Driver John Doe logged in', time: '15 min ago', color: 'bg-blue-500' },
  { text: 'Incident reported on Route 12', time: '30 min ago', color: 'bg-red-500' },
  { text: 'Schedule updated for Route 7', time: '1 hour ago', color: 'bg-green-500' },
  { text: 'New bus added: Bus 210', time: '2 hours ago', color: 'bg-blue-500' },
];

const ALERTS = [
  { text: 'Low fuel warning for Bus 105.', type: 'warning' },
  { text: 'Route 8 experienced a delay due to traffic.', type: 'critical' },
];

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <div className="p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {STATS_DATA.map((stat, idx) => (
              <Card key={idx} className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                 <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                 <div className="flex flex-col gap-1">
                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold mt-1">
                       {stat.isNegativeMetric ? (
                          stat.trend.includes('yesterday') || stat.trend.includes('today') ? (
                             <span className="text-red-500 flex items-center gap-1">
                                <ArrowDown className="w-3 h-3" strokeWidth={3} /> {stat.trend}
                             </span>
                          ) : (
                             <span className="text-red-500 flex items-center gap-1">
                                <ArrowUp className="w-3 h-3" strokeWidth={3} /> {stat.trend}
                             </span>
                          )
                       ) : (
                           <span className="text-emerald-500 flex items-center gap-1">
                              <ArrowUp className="w-3 h-3" strokeWidth={3} /> {stat.trend}
                           </span>
                       )}
                    </div>
                 </div>
              </Card>
            ))}
          </div>

          {/* Middle Section: Map & Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Live Traffic Map */}
            <Card className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="font-semibold text-slate-900 text-lg">Live Traffic Map</h3>
              </div>
              <div className="flex-1 bg-slate-100 rounded-lg overflow-hidden relative min-h-[350px]">
                 {/* Map Placeholder Visual */}
                 <div className="absolute inset-0 bg-[#E8EBEF] flex items-center justify-center">
                    {/* SVG Map Representation */}
                    <svg className="w-full h-full opacity-40 scale-110" viewBox="0 0 500 400">
                       <path d="M50 80 Q 200 50 300 200 T 450 300" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                       <path d="M120 350 Q 180 200 350 150 T 450 80" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                       <path d="M250 50 L 250 350" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                       <circle cx="250" cy="200" r="8" fill="#EF4444" opacity="0.8" />
                       <circle cx="150" cy="120" r="8" fill="#10B981" opacity="0.8" />
                       <circle cx="350" cy="250" r="8" fill="#10B981" opacity="0.8" />
                    </svg>
                    {/* Map Labels could go here if we want more detail */}
                 </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
               <h3 className="font-semibold text-slate-900 text-lg mb-6">Recent Activity</h3>
               <div className="space-y-6">
                  {RECENT_ACTIVITY.map((activity, i) => (
                    <div key={i} className="flex gap-4 relative">
                       {/* Connector Line */}
                       {i !== RECENT_ACTIVITY.length - 1 && (
                         <div className="absolute left-[5px] top-4 bottom-[-24px] w-[2px] bg-slate-100"></div>
                       )}
                       <div className={cn("w-3 h-3 rounded-full mt-1.5 shrink-0 z-10", activity.color)} />
                       <div>
                          <p className="text-sm font-semibold text-slate-700">{activity.text}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             {/* Quick Actions */}
             <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                <h3 className="font-semibold text-slate-900 text-lg mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                   <Button variant="outline" className="justify-start h-12 px-4 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium bg-white">
                      <Plus className="w-5 h-5 mr-3" /> Add New Bus
                   </Button>
                   <Button variant="outline" className="justify-start h-12 px-4 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium bg-white">
                      <RouteIcon className="w-5 h-5 mr-3" /> Create New Route
                   </Button>
                   <Button variant="outline" className="justify-start h-12 px-4 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium bg-white">
                      <Calendar className="w-5 h-5 mr-3" /> Plan Schedule
                   </Button>
                   <Button variant="outline" className="justify-start h-12 px-4 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium bg-white">
                      <Users className="w-5 h-5 mr-3" /> Add New Driver
                   </Button>
                </div>
             </Card>

             {/* System Health */}
             <Card className="col-span-1 lg:col-span-2 p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full"> 
                   
                   {/* Health Metrics */}
                   <div className="space-y-6">
                      <h3 className="font-semibold text-slate-900 text-lg mb-2">System Health</h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-600 mb-2 font-medium">Server Status</p>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                               <CheckCircle2 className="w-4 h-4" /> Operational
                            </div>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-600 mb-2 font-medium">Database Latency</p>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                               <CheckCircle2 className="w-4 h-4" /> 20ms
                            </div>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-xs text-slate-600 mb-2 font-medium">API Uptime</p>
                            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                               <CheckCircle2 className="w-4 h-4" /> 99.9%
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Alerts */}
                   <div>
                       <h3 className="font-semibold text-slate-900 text-lg mb-4">Alerts</h3>
                       <div className="space-y-3">
                          {ALERTS.map((alert, i) => (
                             <div key={i} className={cn(
                                "p-3 rounded-lg border flex items-center gap-3 text-sm font-medium",
                                alert.type === 'warning' 
                                   ? "bg-[#FFFBEB] border-yellow-200 text-yellow-700"
                                   : "bg-[#FEF2F2] border-red-200 text-red-700"
                             )}>
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>{alert.text}</span>
                             </div>
                          ))}
                       </div>
                   </div>

                </div>
             </Card>
          </div>

      </div>
    </ProtectedRoute>
  );
}