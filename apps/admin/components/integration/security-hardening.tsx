'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Lock, 
  Key, 
  AlertTriangle,
  CheckCircle,
  Eye,
  UserCheck
} from 'lucide-react';
import { useState } from 'react';

export function SecurityHardening() {
  const [securityScore, setSecurityScore] = useState(92);
  const [securityChecks] = useState([
    { id: 1, name: 'JWT Token Security', status: 'passed', severity: 'high' },
    { id: 2, name: 'Input Validation', status: 'passed', severity: 'high' },
    { id: 3, name: 'SQL Injection Protection', status: 'passed', severity: 'critical' },
    { id: 4, name: 'XSS Protection', status: 'passed', severity: 'high' },
    { id: 5, name: 'CSRF Protection', status: 'passed', severity: 'medium' },
    { id: 6, name: 'Rate Limiting', status: 'warning', severity: 'medium' },
    { id: 7, name: 'Data Encryption', status: 'passed', severity: 'critical' },
    { id: 8, name: 'Access Control', status: 'passed', severity: 'high' }
  ]);

  const [auditLogs] = useState([
    { id: 1, action: 'Login Attempt', user: 'admin@pbts.com', status: 'success', time: '2 min ago' },
    { id: 2, action: 'Data Export', user: 'manager@pbts.com', status: 'success', time: '15 min ago' },
    { id: 3, action: 'Failed Login', user: 'unknown', status: 'blocked', time: '1 hour ago' },
    { id: 4, action: 'Permission Change', user: 'admin@pbts.com', status: 'success', time: '2 hours ago' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="secondary">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security Hardening</h2>
          <p className="text-gray-600">Security monitoring and compliance status</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={securityScore >= 90 ? 'default' : securityScore >= 70 ? 'secondary' : 'destructive'}>
            Security Score: {securityScore}%
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Score</p>
                <p className="text-3xl font-bold text-green-600">{securityScore}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
                <p className="text-3xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Encryption</p>
                <p className="text-3xl font-bold text-purple-600">AES-256</p>
              </div>
              <Lock className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {securityChecks.map((check) => (
                <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(check.status)}
                    <span className="font-medium">{check.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(check.severity)}
                    <span className={`text-sm ${getStatusColor(check.status)}`}>
                      {check.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{log.action}</span>
                    <Badge variant={log.status === 'success' ? 'default' : log.status === 'blocked' ? 'destructive' : 'secondary'}>
                      {log.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{log.user}</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              <Eye className="w-4 h-4 mr-2" />
              View Full Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Enable 2FA</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Implement two-factor authentication for all admin accounts.
              </p>
              <Button size="sm" variant="outline">Configure 2FA</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-green-500" />
                <span className="font-medium">API Rate Limiting</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Implement stricter rate limiting to prevent API abuse.
              </p>
              <Button size="sm" variant="outline">Update Limits</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Session Security</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Reduce session timeout and implement secure session management.
              </p>
              <Button size="sm" variant="outline">Update Sessions</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Security Monitoring</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Enable real-time security monitoring and alerting system.
              </p>
              <Button size="sm" variant="outline">Enable Monitoring</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="font-medium">GDPR Compliance</p>
              <Badge variant="default" className="mt-2">Compliant</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="font-medium">ISO 27001</p>
              <Badge variant="default" className="mt-2">Compliant</Badge>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="font-medium">SOC 2 Type II</p>
              <Badge variant="default" className="mt-2">Compliant</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}