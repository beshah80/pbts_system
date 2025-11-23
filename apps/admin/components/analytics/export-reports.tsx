'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Calendar, 
  Clock,
  BarChart3,
  Users,
  Route,
  AlertTriangle
} from 'lucide-react';
import { useAdminStore } from '@/lib/store';
import { useState } from 'react';

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  format: 'PDF' | 'CSV' | 'BOTH';
  automated: boolean;
  lastGenerated?: string;
}

export function ExportReports() {
  const [generating, setGenerating] = useState<string | null>(null);
  
  const reports: ReportConfig[] = [
    {
      id: 'fleet-performance',
      name: 'Fleet Performance Report',
      description: 'Comprehensive fleet utilization and performance metrics',
      icon: BarChart3,
      format: 'BOTH',
      automated: true,
      lastGenerated: '2024-01-20 09:00'
    },
    {
      id: 'route-analysis',
      name: 'Route Utilization Analysis',
      description: 'Detailed route performance and optimization insights',
      icon: Route,
      format: 'PDF',
      automated: false
    },
    {
      id: 'delay-patterns',
      name: 'Delay Pattern Report',
      description: 'Analysis of delay patterns and root causes',
      icon: Clock,
      format: 'BOTH',
      automated: true,
      lastGenerated: '2024-01-20 06:00'
    },
    {
      id: 'incident-summary',
      name: 'Incident Summary Report',
      description: 'Monthly incident tracking and resolution metrics',
      icon: AlertTriangle,
      format: 'PDF',
      automated: true,
      lastGenerated: '2024-01-19 23:59'
    },
    {
      id: 'customer-feedback',
      name: 'Customer Feedback Analysis',
      description: 'Passenger satisfaction and feedback trends',
      icon: Users,
      format: 'CSV',
      automated: false
    },
    {
      id: 'financial-summary',
      name: 'Financial Performance Report',
      description: 'Revenue analysis and financial KPIs',
      icon: FileText,
      format: 'PDF',
      automated: true,
      lastGenerated: '2024-01-20 08:00'
    }
  ];

  const generateReport = async (reportId: string, format: 'PDF' | 'CSV') => {
    setGenerating(reportId);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock data generation based on report type
    const mockData = generateMockData(reportId);
    
    if (format === 'CSV') {
      downloadCSV(mockData, `${reportId}-${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      generatePDF(reportId, mockData);
    }
    
    setGenerating(null);
  };

  const generateMockData = (reportId: string) => {
    switch (reportId) {
      case 'fleet-performance':
        return [
          { metric: 'Fleet Utilization', value: '85%', target: '80%', status: 'Above Target' },
          { metric: 'On-Time Performance', value: '92%', target: '90%', status: 'Above Target' },
          { metric: 'Fuel Efficiency', value: '12.5 km/l', target: '12 km/l', status: 'Above Target' },
          { metric: 'Maintenance Cost', value: '15,000 ETB', target: '18,000 ETB', status: 'Below Target' }
        ];
      case 'route-analysis':
        return [
          { route: 'R001 - Meskel Square to Bole', utilization: '95%', revenue: '25,000 ETB', rating: '4.2' },
          { route: 'R002 - Mercato to Piazza', utilization: '78%', revenue: '18,500 ETB', rating: '3.8' },
          { route: 'R003 - Addis Ketema to CMC', utilization: '65%', revenue: '12,000 ETB', rating: '3.5' }
        ];
      default:
        return [
          { date: '2024-01-20', incidents: 3, delays: 5, satisfaction: '4.1' },
          { date: '2024-01-19', incidents: 2, delays: 3, satisfaction: '4.3' },
          { date: '2024-01-18', incidents: 4, delays: 7, satisfaction: '3.9' }
        ];
    }
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );
    
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generatePDF = (reportId: string, data: any[]) => {
    // Mock PDF generation - in real implementation, use jsPDF or similar
    const pdfContent = `
      PBTS System Report: ${reportId}
      Generated: ${new Date().toLocaleString()}
      
      ${data.map(item => 
        Object.entries(item).map(([key, value]) => `${key}: ${value}`).join('\n')
      ).join('\n\n')}
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportId}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const scheduleAutomatedReport = (reportId: string) => {
    // Mock scheduling - in real implementation, this would set up automated generation
    alert(`Automated report scheduled for ${reportId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Export & Reports</h2>
          <p className="text-gray-600">Generate and download system reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Reports
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Bulk Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          
          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {report.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{report.description}</p>
                
                <div className="flex items-center gap-2">
                  <Badge variant={report.automated ? 'default' : 'secondary'}>
                    {report.automated ? 'Automated' : 'Manual'}
                  </Badge>
                  <Badge variant="outline">
                    {report.format}
                  </Badge>
                </div>

                {report.lastGenerated && (
                  <p className="text-xs text-gray-500">
                    Last generated: {report.lastGenerated}
                  </p>
                )}

                <div className="space-y-2">
                  {(report.format === 'BOTH' || report.format === 'PDF') && (
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => generateReport(report.id, 'PDF')}
                      disabled={generating === report.id}
                    >
                      {generating === report.id ? (
                        'Generating...'
                      ) : (
                        <>
                          <FileText className="w-4 h-4 mr-2" />
                          Export PDF
                        </>
                      )}
                    </Button>
                  )}
                  
                  {(report.format === 'BOTH' || report.format === 'CSV') && (
                    <Button
                      className="w-full"
                      variant="outline"
                      size="sm"
                      onClick={() => generateReport(report.id, 'CSV')}
                      disabled={generating === report.id}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  )}

                  {!report.automated && (
                    <Button
                      className="w-full"
                      variant="ghost"
                      size="sm"
                      onClick={() => scheduleAutomatedReport(report.id)}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Auto
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automated Report Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.filter(r => r.automated).map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <report.icon className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-600">
                      {report.id === 'fleet-performance' && 'Daily at 9:00 AM'}
                      {report.id === 'delay-patterns' && 'Daily at 6:00 AM'}
                      {report.id === 'incident-summary' && 'Monthly on last day'}
                      {report.id === 'financial-summary' && 'Daily at 8:00 AM'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Active</Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Download className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">Export All Data</p>
                <p className="text-sm text-gray-600">Complete system data export</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <p className="font-medium">Custom Date Range</p>
                <p className="text-sm text-gray-600">Export data for specific period</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}