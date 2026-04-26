import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users as UsersIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Row {
  id: string; farm_name: string | null; account_type: string | null;
  contact_phone: string | null; location: string | null; created_at: string;
}

const demo: Row[] = [
  { id: '1', farm_name: 'Kamau Farm', account_type: 'farmer', contact_phone: '+254700111222', location: 'Kiambu', created_at: '2026-04-20T00:00:00Z' },
  { id: '2', farm_name: 'AgriCoop Kenya', account_type: 'organization', contact_phone: '+254711333444', location: 'Nairobi', created_at: '2026-04-15T00:00:00Z' },
  { id: '3', farm_name: 'Wanjiku Dairy', account_type: 'farmer', contact_phone: '+254722555666', location: 'Nakuru', created_at: '2026-03-01T00:00:00Z' },
];

export default function AdminUsers() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>(demo);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user && !user.id.startsWith('bypass-')) {
      supabase.from('profiles').select('*').order('created_at', { ascending: false })
        .then(({ data }) => { if (data && data.length) setRows(data as Row[]); });
    }
  }, [user]);

  const filtered = rows.filter(r =>
    (r.farm_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <UsersIcon className="h-7 w-7 text-primary" />
        <div><h1 className="text-2xl md:text-3xl font-bold">All Users</h1><p className="text-muted-foreground text-sm">Search and review every account on the platform.</p></div>
      </div>

      <Card><CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by farm or location..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-sm" />
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader><TableRow>
              <TableHead>Farm/Org</TableHead><TableHead>Type</TableHead>
              <TableHead>Phone</TableHead><TableHead>Location</TableHead><TableHead>Joined</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.farm_name || '—'}</TableCell>
                  <TableCell><Badge variant="outline">{r.account_type}</Badge></TableCell>
                  <TableCell>{r.contact_phone || '—'}</TableCell>
                  <TableCell>{r.location || '—'}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-6">No users found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent></Card>
    </div>
  );
}