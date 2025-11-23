'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TestTube, 
  FileText, 
  CheckCircle, 
  XCircle,
  Clock,
  Users,
  Bug,
  BookOpen
} from 'lucide-react';
import { useState } from 'react';

export function TestingDocumentation() {
  const [testResults] = useState({
    unit: { passed: 245, failed: 3, coverage: 94 },
    integration: { passed: 67, failed: 1, coverage: 89 },
    e2e: { passed: 34, failed: 0, coverage: 92 },
    performance: { passed: 12, failed: 0, coverage: 100 }
  });

  const [userTests] = useState([
    { id: 1, scenario: 'Admin Login Flow', status: 'passed', tester: 'John Doe', time: '2 min ago' },
    { id: 2, scenario: 'Bus Registration', status: 'passed', tester: 'Jane Smith', time: '15 min ago' },
    { id: 3, scenario: 'Schedule Conflict Detection', status: 'failed', tester: 'Mike Johnson', time: '1 hour ago' },
    { id: 4, scenario: 'Mobile Responsiveness', status: 'passed', tester: 'Sarah Wilson', time: '2 hours ago' }
  ]);

  const [documentation] = useState([
    { id: 1, title: 'API Documentation', status: 'complete', coverage: 100, lastUpdated: '1 day ago' },
    { id: 2, title: 'User Manual', status: 'complete', coverage: 95, lastUpdated: '2 days ago' },
    { id: 3, title: 'Installation Guide', status: 'complete', coverage: 100, lastUpdated: '1 day ago' },
    { id: 4, title: 'Troubleshooting Guide', status: 'in-progress', coverage: 75, lastUpdated: '3 hours ago' },
    { id: 5, title: 'Security Guidelines', status: 'complete', coverage: 100, lastUpdated: '1 day ago' }
  ]);

  const getTotalTests = () => {
    return Object.values(testResults).reduce((acc, test) => acc + test.passed + test.failed, 0);
  };

  const getPassedTests = () => {
    return Object.values(testResults).reduce((acc, test) => acc + test.passed, 0);
  };

  const getOverallCoverage = () => {
    const coverages = Object.values(testResults).map(test => test.coverage);
    return Math.round(coverages.reduce((acc, coverage) => acc + coverage, 0) / coverages.length);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testing & Documentation</h2>
          <p className="text-gray-600">Quality assurance and documentation status</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">
            {Math.round((getPassedTests() / getTotalTests()) * 100)}% Tests Passing
          </Badge>
          <Badge variant="secondary">
            {getOverallCoverage()}% Coverage
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                <p className="text-3xl font-bold text-blue-600">{getTotalTests()}</p>
              </div>
              <TestTube className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passed Tests</p>
                <p className="text-3xl font-bold text-green-600">{getPassedTests()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Failed Tests</p>
                <p className="text-3xl font-bold text-red-600">{getTotalTests() - getPassedTests()}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coverage</p>
                <p className="text-3xl font-bold text-purple-600">{getOverallCoverage()}%</p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Results by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(testResults).map(([category, results]) => (
                <div key={category} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{category} Tests</span>
                    <Badge variant={results.failed === 0 ? 'default' : 'destructive'}>
                      {results.passed}/{results.passed + results.failed}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Coverage: {results.coverage}%</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{results.passed}</span>
                      {results.failed > 0 && (
                        <>
                          <XCircle className="w-3 h-3 text-red-500" />
                          <span>{results.failed}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Acceptance Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userTests.map((test) => (
                <div key={test.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{test.scenario}</span>
                    <Badge variant={test.status === 'passed' ? 'default' : 'destructive'}>
                      {test.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{test.tester}</span>
                    </div>
                    <span>{test.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              <Bug className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documentation.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    <p className="text-sm text-gray-600">Last updated: {doc.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{doc.coverage}% Complete</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${doc.status === 'complete' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        style={{ width: `${doc.coverage}%` }}
                      />
                    </div>
                  </div>
                  <Badge variant={doc.status === 'complete' ? 'default' : 'secondary'}>
                    {doc.status === 'complete' ? 'Complete' : 'In Progress'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Code Quality Score</span>
                <Badge variant="default">A+</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Security Score</span>
                <Badge variant="default">92%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Performance Score</span>
                <Badge variant="default">95%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Accessibility Score</span>
                <Badge variant="default">98%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testing Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <TestTube className="w-4 h-4 mr-2" />
                Run All Tests
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate Test Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Update Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Schedule UAT Session
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}