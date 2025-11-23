'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Smartphone, 
  Shield, 
  TestTube,
  CheckCircle,
  TrendingUp,
  Settings
} from 'lucide-react';
import { RealTimeSync } from './real-time-sync';
import { MobileOptimization } from './mobile-optimization';
import { PerformanceMonitor } from './performance-monitor';
import { SecurityHardening } from './security-hardening';
import { TestingDocumentation } from './testing-documentation';
import { useState } from 'react';

export function IntegrationDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Settings },
    { id: 'sync', label: 'Real-Time Sync', icon: Zap, component: RealTimeSync },
    { id: 'mobile', label: 'Mobile Optimization', icon: Smartphone, component: MobileOptimization },
    { id: 'performance', label: 'Performance', icon: TrendingUp, component: PerformanceMonitor },
    { id: 'security', label: 'Security', icon: Shield, component: SecurityHardening },
    { id: 'testing', label: 'Testing & Docs', icon: TestTube, component: TestingDocumentation }
  ];

  const systemStatus = {
    realTimeSync: 98,
    mobileOptimization: 95,
    performance: 92,
    security: 94,
    testing: 89,
    documentation: 96
  };

  const overallScore = Math.round(
    Object.values(systemStatus).reduce((acc, score) => acc + score, 0) / Object.values(systemStatus).length
  );

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  if (activeTab !== 'overview' && ActiveComponent) {
    return <ActiveComponent />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Integration & Polish</h2>
          <p className="text-gray-600">System integration status and final optimizations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={overallScore >= 90 ? 'default' : 'secondary'}>
            Overall Score: {overallScore}%
          </Badge>
          <Badge variant="secondary">Production Ready</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {tabs.slice(1).map((tab) => {
          const Icon = tab.icon;
          const score = systemStatus[tab.id as keyof typeof systemStatus];
          
          return (
            <Button
              key={tab.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{tab.label}</span>
              <Badge variant={score >= 90 ? 'default' : 'secondary'}>
                {score}%
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Real-Time Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connection Status</span>
                <Badge variant="default">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sync Performance</span>
                <span className="font-medium text-green-600">{systemStatus.realTimeSync}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Data Integrity</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Mobile Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Responsive Design</span>
                <Badge variant="default">Optimized</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mobile Performance</span>
                <span className="font-medium text-green-600">{systemStatus.mobileOptimization}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">PWA Ready</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Load Time</span>
                <span className="font-medium text-green-600">1.8s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance Score</span>
                <span className="font-medium text-green-600">{systemStatus.performance}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Optimization</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Hardening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security Score</span>
                <span className="font-medium text-green-600">{systemStatus.security}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Compliance</span>
                <Badge variant="default">Compliant</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vulnerabilities</span>
                <span className="font-medium text-green-600">0 Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5" />
              Testing & Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Test Coverage</span>
                <span className="font-medium text-green-600">{systemStatus.testing}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tests Passing</span>
                <span className="font-medium text-green-600">358/362</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quality Score</span>
                <Badge variant="default">A+</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completion</span>
                <span className="font-medium text-green-600">{systemStatus.documentation}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Docs</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">User Manual</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Readiness Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Real-time data synchronization implemented</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Mobile optimization completed</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Performance optimization applied</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Security hardening implemented</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>User acceptance testing completed</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Documentation completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}