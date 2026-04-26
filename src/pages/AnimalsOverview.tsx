import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bug, Beef, Bird, Rabbit, ChevronRight, Sheet as SheetIcon } from 'lucide-react';

const species = [
  { name: 'Pigs', path: '/animals/pigs', icon: Bug, count: 0, color: 'bg-pink-500/10 text-pink-600', desc: 'Manage breeding sows, boars, weaners and porkers.' },
  { name: 'Cattle', path: '/animals/cattle', icon: Beef, count: 0, color: 'bg-amber-500/10 text-amber-600', desc: 'Track dairy and beef cattle, milk yields and calving.' },
  { name: 'Goats', path: '/animals/goats', icon: Rabbit, count: 0, color: 'bg-emerald-500/10 text-emerald-600', desc: 'Dairy and meat goats with kidding and production records.' },
  { name: 'Sheep', path: '/animals/sheep', icon: SheetIcon, count: 0, color: 'bg-blue-500/10 text-blue-600', desc: 'Manage flocks, lambing and wool production.' },
  { name: 'Poultry', path: '/animals/poultry', icon: Bird, count: 0, color: 'bg-orange-500/10 text-orange-600', desc: 'Layers, broilers and Kienyeji flocks with egg & mortality tracking.' },
];

export default function AnimalsOverview() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Livestock</h1>
        <p className="text-muted-foreground mt-1">Choose a species to manage records, health and production.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {species.map((s) => (
          <Card key={s.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-xs text-muted-foreground">{s.count} records</span>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{s.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              <Button asChild className="mt-4 w-full" variant="outline">
                <Link to={s.path}>
                  Manage {s.name} <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}