'use client';

import { BusForm } from '@/components/forms/bus-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAdminStore } from '@/lib/store';
import { Bus } from '@/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export default function BusesPage() {
  const { buses } = useAdminStore();
  const routes = useAdminStore((s: any) => s.routes);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'MAINTENANCE' | 'OFF_DUTY' | 'OUT_OF_SERVICE'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'ANBESSA' | 'SHEGER' | 'VELOCITY'>('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return (buses || [])
      .filter(b => {
        const q = searchTerm.trim().toLowerCase();
        return !q || b.plateNumber?.toLowerCase().includes(q) || b.busNumber?.toLowerCase().includes(q);
      })
      .filter(b => statusFilter === 'ALL' ? true : b.status === statusFilter)
      .filter(b => typeFilter === 'ALL' ? true : (b.type === typeFilter));
  }, [buses, searchTerm, statusFilter, typeFilter]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const statusBadge = (status?: string) => {
    const s = status || 'ACTIVE';
    const map: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      MAINTENANCE: 'bg-orange-100 text-orange-800',
      OUT_OF_SERVICE: 'bg-gray-200 text-gray-700',
      OFF_DUTY: 'bg-gray-100 text-gray-800'
    };
    return <span className={`px-2 py-1 rounded-md text-[11px] font-semibold ${map[s] || 'bg-gray-100 text-gray-800'}`}>{s.replace('_', ' ')}</span>;
  };

  return (
    <ProtectedRoute requiredPermission="buses.read">
      <div className="h-screen flex flex-col overflow-hidden">
        <main className="flex-1 min-h-0 p-6 overflow-y-auto space-y-6">
          <Card className="rounded-xl border border-slate-200 shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">Bus Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search Plate #, Bus ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-3 pr-3 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="OFF_DUTY">Off Duty</option>
                    <option value="OUT_OF_SERVICE">Out of Service</option>
                  </select>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as any)}
                    className="h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white"
                  >
                    <option value="ALL">All Types</option>
                    <option value="ANBESSA">Anbessa City Bus</option>
                    <option value="SHEGER">Sheger Express</option>
                    <option value="VELOCITY">Velocity Commuter</option>
                  </select>
                  <div className="ml-auto">
                    <Dialog open={showAddDialog} onOpenChange={(open) => setShowAddDialog(open)}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditingBus(undefined)} className="bg-blue-600 hover:bg-blue-700 text-white h-9">
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Bus
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogTitle className="sr-only">{editingBus ? 'Edit Bus' : 'Add New Bus'}</DialogTitle>
                        <BusForm bus={editingBus} onClose={() => setShowAddDialog(false)} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-700 text-sm">
                      <tr>
                        <th className="py-3 px-4">ID/Plate</th>
                        <th className="py-3 px-4">Type/Model</th>
                        <th className="py-3 px-4">Capacity</th>
                        <th className="py-3 px-4">Route</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {paged.length === 0 ? (
                        <tr>
                          <td className="py-6 px-4 text-center text-slate-500" colSpan={6}>
                            No buses found
                          </td>
                        </tr>
                      ) : (
                        paged.map((bus) => {
                          const route = routes?.find((r: any) => r.id === bus.routeId);
                          const routeLabel = route?.routeName ? route.routeName : (bus.routeId ? `Route ${bus.routeId}` : '-');
                          return (
                            <tr key={bus.id} className="border-t border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-900">{bus.busNumber}</div>
                                <div className="text-xs text-slate-500">{bus.plateNumber}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-slate-800">{bus.type || '—'}</div>
                                <div className="text-xs text-slate-500">Model</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-1 rounded-md text-[11px] font-semibold border border-slate-200 bg-white">
                                  {bus.capacity} Seats
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {bus.routeId ? (
                                  <Link href={`/routes`} className="text-blue-600 hover:underline">
                                    {routeLabel}
                                  </Link>
                                ) : (
                                  <span className="text-slate-500">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4">{statusBadge(bus.status)}</td>
                              <td className="py-3 px-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-8 px-3">Actions ▾</Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => { setEditingBus(bus); setShowAddDialog(true); }}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>View History</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-slate-600">
                    Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} buses
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8" disabled={page <= 1} onClick={() => setPage(page - 1)}>{'<'}</Button>
                    {[...Array(pages)].map((_, idx) => (
                      <Button
                        key={idx}
                        variant={page === idx + 1 ? 'default' : 'outline'}
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(idx + 1)}
                      >
                        {idx + 1}
                      </Button>
                    ))}
                    <Button variant="outline" className="h-8" disabled={page >= pages} onClick={() => setPage(page + 1)}>{'>'}</Button>
                  </div>
                </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
