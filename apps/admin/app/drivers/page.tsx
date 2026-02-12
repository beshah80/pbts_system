'use client';

import { DriverForm } from '@/components/forms/driver-form';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAdminStore } from '@/lib/store';
import { Driver } from '@/types';
import { Mail, Phone, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function DriversPage() {
  const drivers = useAdminStore((state) => state.drivers);
  const buses = useAdminStore((state) => state.buses);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'INACTIVE'>('ALL');
  const [busFilter, setBusFilter] = useState<string>('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleClose = () => {
    setShowAddDialog(false);
    setEditingDriver(null);
  };

  const filteredDrivers = useMemo(() => {
    return drivers
      .filter(driver =>
        driver.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(driver => statusFilter === 'ALL' ? true : driver.status === statusFilter)
      .filter(driver => {
        if (busFilter === 'ALL') return true;
        const assigned = buses.find(b => b.driverId === driver.id);
        return assigned?.busNumber === busFilter;
      });
  }, [drivers, searchTerm, statusFilter, busFilter, buses]);

  const getStatusBadge = (status: Driver['status']) => {
    const text = status === 'ACTIVE' ? 'ON DUTY' : status === 'SUSPENDED' ? 'SUSPENDED' : 'OFF DUTY';
    const cls =
      status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
      status === 'SUSPENDED' ? 'bg-red-100 text-red-800' :
      'bg-gray-100 text-gray-800';
    return <span className={`px-2 py-1 rounded-md text-[11px] font-semibold ${cls}`}>{text}</span>;
  };

  const pages = Math.max(1, Math.ceil(filteredDrivers.length / pageSize));
  const pagedDrivers = filteredDrivers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ProtectedRoute requiredPermission="drivers.read">
      <div className="h-screen flex flex-col overflow-hidden">
        <main className="flex-1 min-h-0 p-6 overflow-y-auto">
          <Card className="rounded-xl border border-slate-200 shadow-sm">
            <CardHeader className="pb-0">
              <CardTitle className="text-xl">Driver Management</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search Name, License #..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">All Status</option>
                  <option value="ACTIVE">On Duty</option>
                  <option value="INACTIVE">Off Duty</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
                <select
                  value={busFilter}
                  onChange={(e) => setBusFilter(e.target.value)}
                  className="h-9 px-3 text-sm border border-slate-200 rounded-lg bg-white"
                >
                  <option value="ALL">All Buses</option>
                  {buses.map(b => (
                    <option key={b.id} value={b.busNumber}>{b.busNumber}</option>
                  ))}
                </select>
                <div className="ml-auto">
                  <Dialog open={showAddDialog} onOpenChange={(open) => open ? setShowAddDialog(true) : handleClose()}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setEditingDriver(null)} className="bg-blue-600 hover:bg-blue-700 text-white h-9">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Driver
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogTitle>{editingDriver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
                      <DriverForm driver={editingDriver || undefined} onClose={handleClose} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-700 text-sm">
                    <tr>
                      <th className="py-3 px-4">Driver</th>
                      <th className="py-3 px-4">License #</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assigned Bus</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {pagedDrivers.length === 0 ? (
                      <tr>
                        <td className="py-6 px-4 text-center text-slate-500" colSpan={6}>
                          No drivers found
                        </td>
                      </tr>
                    ) : (
                      pagedDrivers.map((driver) => {
                        const assigned = buses.find(b => b.driverId === driver.id);
                        return (
                          <tr key={driver.id} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
                                  {driver.firstName[0]}{driver.lastName[0]}
                                </div>
                                <div>
                                  <div className="font-medium text-slate-900">{driver.firstName} {driver.lastName}</div>
                                  {driver.email && (
                                    <div className="text-xs text-slate-500 flex items-center gap-1">
                                      <Mail className="w-3 h-3" /> {driver.email}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">{driver.licenseNumber}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-500" />
                                {driver.phoneNumber}
                              </div>
                            </td>
                            <td className="py-3 px-4">{getStatusBadge(driver.status as any)}</td>
                            <td className="py-3 px-4">{assigned?.busNumber ? `Bus ${assigned.busNumber}` : '-'}</td>
                            <td className="py-3 px-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="h-8 px-3">Actions ▾</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => setEditingDriver(driver)}>Edit Profile</DropdownMenuItem>
                                  <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                  <DropdownMenuItem>Suspend</DropdownMenuItem>
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
                  Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredDrivers.length)} of {filteredDrivers.length} drivers
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