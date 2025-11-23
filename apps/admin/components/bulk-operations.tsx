'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { useAdminStore } from '@/lib/store';
import { Download, Upload, Trash2, Edit, CheckCircle } from 'lucide-react';

interface BulkOperationsProps {
  entityType: 'buses' | 'drivers' | 'schedules' | 'incidents';
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function BulkOperations({ entityType, selectedIds, onSelectionChange }: BulkOperationsProps) {
  const store = useAdminStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [operation, setOperation] = useState<'delete' | 'update' | 'export'>('delete');

  const entities = store[entityType];
  const selectedCount = selectedIds.length;

  const handleSelectAll = () => {
    if (selectedIds.length === entities.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(entities.map(e => e.id));
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => {
      switch (entityType) {
        case 'buses':
          store.deleteBus(id);
          break;
        case 'drivers':
          store.deleteDriver(id);
          break;
        case 'schedules':
          store.deleteSchedule(id);
          break;
        case 'incidents':
          store.deleteIncident(id);
          break;
      }
    });
    onSelectionChange([]);
    setShowConfirmDialog(false);
  };

  const handleBulkStatusUpdate = (status: string) => {
    selectedIds.forEach(id => {
      switch (entityType) {
        case 'buses':
          store.updateBus(id, { status: status as any });
          break;
        case 'drivers':
          store.updateDriver(id, { status: status as any });
          break;
        case 'schedules':
          store.updateSchedule(id, { status: status as any });
          break;
        case 'incidents':
          store.updateIncident(id, { status: status as any });
          break;
      }
    });
    onSelectionChange([]);
  };

  const handleExport = () => {
    const selectedEntities = entities.filter(e => selectedIds.includes(e.id));
    const csv = convertToCSV(selectedEntities);
    downloadCSV(csv, `${entityType}_export.csv`);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(value => 
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    );
    
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bulk Operations</span>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedIds.length === entities.length && entities.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm text-gray-600">
              Select All ({selectedCount} selected)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedCount > 0 ? (
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-1" />
              Export ({selectedCount})
            </Button>

            {entityType !== 'incidents' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusUpdate('ACTIVE')}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusUpdate('INACTIVE')}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Deactivate
                </Button>
              </>
            )}

            {entityType === 'schedules' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate('CANCELLED')}
              >
                Cancel Schedules
              </Button>
            )}

            {entityType === 'incidents' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkStatusUpdate('RESOLVED')}
              >
                Mark Resolved
              </Button>
            )}

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setOperation('delete')}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete ({selectedCount})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Confirm Bulk Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete {selectedCount} {entityType}? 
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={handleBulkDelete}
                    >
                      Delete {selectedCount} Items
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Select items to perform bulk operations
          </p>
        )}
      </CardContent>
    </Card>
  );
}