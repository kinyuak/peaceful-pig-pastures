import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Phone, MapPin, Building2, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    farm_name: '',
    contact_phone: '',
    location: '',
    farm_type: 'mixed',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        farm_name: profile.farm_name || '',
        contact_phone: profile.contact_phone || '',
        location: profile.location || '',
        farm_type: profile.farm_type || 'mixed',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await updateProfile(form);
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to update profile.' });
    } else {
      toast({ title: 'Saved', description: 'Profile updated successfully.' });
    }
    setSaving(false);
  };

  const trialDaysLeft = profile?.trial_start_date
    ? Math.max(0, 5 - Math.floor((Date.now() - new Date(profile.trial_start_date).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Profile</CardTitle>
              <CardDescription>Update your farm information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Farm Name</Label>
                <Input value={form.farm_name} onChange={e => setForm(f => ({ ...f, farm_name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</Label>
                <Input value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</Label>
                <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Farm Type</Label>
                <Select value={form.farm_type} onValueChange={v => setForm(f => ({ ...f, farm_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed</SelectItem>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="crops">Crops</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Save Changes'}</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{user?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Type</p>
                <Badge variant="outline" className="capitalize">{profile?.account_type || 'farmer'}</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Trial Status</p>
                {profile?.trial_active ? (
                  <Badge className="bg-success/10 text-success">{trialDaysLeft} days left</Badge>
                ) : (
                  <Badge variant="secondary">Trial ended</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
