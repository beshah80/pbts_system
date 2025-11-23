'use client';

import { IntegrationDashboard } from '@/components/integration/integration-dashboard';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Settings } from 'lucide-react';

export default function IntegrationPage() {
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
                <Settings className="w-6 h-6" />
                Integration & Polish
              </h1>
              <p className="text-gray-600">Final system integration and optimization</p>
            </div>
          </div>
          <Badge variant="secondary">Final Implementation</Badge>
        </div>

        <IntegrationDashboard />
      </div>
    </div>
  );
}