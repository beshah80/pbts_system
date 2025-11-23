'use client';

import { RealTimeDashboard } from '@/components/analytics/real-time-dashboard';
import { RouteUtilization } from '@/components/analytics/route-utilization';
import { DelayPatterns } from '@/components/analytics/delay-patterns';
import { ExportReports } from '@/components/analytics/export-reports';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Real-Time Dashboard', component: RealTimeDashboard },
    { id: 'routes', label: 'Route Analysis', component: RouteUtilization },
    { id: 'delays', label: 'Delay Patterns', component: DelayPatterns },
    { id: 'reports', label: 'Export Reports', component: ExportReports }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || RealTimeDashboard;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Analytics & Reports
              </h1>
              <p className="text-gray-600">Comprehensive analytics and reporting system</p>
            </div>
          </div>
          <Badge variant="secondary">Analytics Complete</Badge>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <ActiveComponent />
      </div>
    </div>
  );
}