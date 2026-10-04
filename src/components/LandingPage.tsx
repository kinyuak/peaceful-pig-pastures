import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sprout,
  Users,
  Building2,
  Landmark,
  BarChart3,
  TrendingDown,
  Store,
  UsersRound,
  Brain,
  UserPlus,
  ClipboardList,
  Rocket,
  Check,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import logo from '@/assets/logo.png';

const whoItsFor = [
  { icon: Sprout, title: 'Farmers', desc: 'Individual and smallholder farmers looking to digitize their operations.' },
  { icon: Users, title: 'Cooperatives', desc: 'Farmer groups needing centralized data and coordination tools.' },
  { icon: Building2, title: 'Agribusinesses', desc: 'Commercial farms and processors managing complex supply chains.' },
  { icon: Landmark, title: 'Counties & Orgs', desc: 'Government and NGOs tracking agricultural programs at scale.' },
];

const valueProp = [
  { icon: ClipboardList, title: 'Track Everything in One Place', desc: 'Livestock, crops, inventory, sales, and staff — unified.' },
  { icon: BarChart3, title: 'Make Better Decisions with Data', desc: 'Real-time analytics and reports that drive smarter choices.' },
  { icon: TrendingDown, title: 'Reduce Costs and Losses', desc: 'Optimize feed, reduce mortality, and minimize waste.' },
  { icon: Store, title: 'Access Markets Directly', desc: 'Connect with buyers and sell produce through the marketplace.' },
  { icon: UsersRound, title: 'Manage Teams Easily', desc: 'Staff scheduling, attendance, payroll, and casual labour booking.' },
];

const features = [
  { icon: Sprout, title: 'Farm Management', desc: 'Complete crop and field management tools.' },
  { icon: Users, title: 'Livestock Tracking', desc: 'Health records, breeding, and growth monitoring.' },
  { icon: TrendingDown, title: 'Sales & Inventory', desc: 'Track stock levels and manage all transactions.' },
  { icon: UsersRound, title: 'Workforce Management', desc: 'Staff, casual labour, and task assignment.' },
  { icon: Store, title: 'Marketplace Access', desc: 'Buy and sell agricultural products online.' },
  { icon: Brain, title: 'AI Insights', desc: 'Smart recommendations powered by AI analytics.' },
];

const steps = [
  { icon: UserPlus, step: '01', title: 'Create Account', desc: 'Sign up in seconds with email or Google.' },
  { icon: ClipboardList, step: '02', title: 'Onboard Your Farm', desc: 'Add your farm details, animals, and crops.' },
  { icon: Rocket, step: '03', title: 'Start Managing & Growing', desc: 'Use the dashboard to run your operations.' },
];

const pricing = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Basic farm management',
    features: ['Up to 50 animals', 'Basic inventory', 'Single user', 'Community support'],
    popular: false,
  },
  {
    name: 'Growth',
    price: 'KES 2,500',
    period: '/mo',
    desc: 'Full farm operations',
    features: ['Unlimited animals', 'Inventory + Sales', 'Staff management', 'Reports & analytics', 'Email support'],
    popular: true,
  },
  {
    name: 'Pro',
    price: 'KES 7,500',
    period: '/mo',
    desc: 'Multi-farm management',
    features: ['Everything in Growth', 'Multi-farmer management', 'Analytics dashboard', 'Bulk onboarding', 'Priority support'],
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For counties & large orgs',
    features: ['Everything in Pro', 'Custom dashboards', 'API access', 'Dedicated support', 'SLA guarantee'],
    popular: false,
  },
];

export default function LandingPage() {
  const scrollRef = useScrollAnimation();

  return (
    <div ref={scrollRef} className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
              🌱 Built for Modern Agriculture
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Manage Farms, Farmers, and Agribusiness Operations, 
              <span className="text-primary">All in One Platform</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              AgriHerd helps farmers, cooperatives, and agribusinesses track production, manage operations,
              and access markets — all from one powerful system.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8 py-6" asChild>
                <Link to="/signup">
                  Start Free Trial (5 Days)
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6" asChild>
                <Link to="/signup">Book a Demo</Link>
              </Button>
            </div>
          </div>
          {/* Dashboard mockup */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border bg-card shadow-2xl overflow-hidden">
              <div className="h-8 bg-muted flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Animals', value: '248', color: 'text-primary' },
                  { label: 'Total Farms', value: '\n', color: 'text-success' },
                  { label: 'Active Tasks', value: '12', color: 'text-accent' },
                  { label: 'Staff Online', value: '8', color: 'text-secondary' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="scroll-fade-in border-y bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Built for modern agriculture across Africa
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40">
            {['AgriTech Kenya', 'FarmCo', 'CropLink', 'LivestockPro', 'GreenFields'].map((name) => (
              <span key={name} className="text-lg font-semibold text-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="scroll-fade-in py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Who It's For</h2>
            <p className="mt-4 text-muted-foreground text-lg">Designed for every player in the agricultural value chain.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoItsFor.map((item) => (
              <Card key={item.title} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="scroll-fade-in py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Everything You Need to Run a Modern Farm Operation
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProp.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="scroll-fade-in py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Platform Capabilities</h2>
            <p className="mt-4 text-muted-foreground text-lg">Powerful modules that work together seamlessly.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item) => (
              <Card key={item.title} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="scroll-fade-in py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground text-lg">Get started in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Step {item.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="scroll-fade-in py-20 md:py-28" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-muted-foreground text-lg">Start free, upgrade as you grow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricing.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  plan.popular ? 'border-2 border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <Badge variant="outline" className="mt-3 text-xs">5-Day Free Trial</Badge>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link to="/signup">Start Free Trial</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="scroll-fade-in py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Start Managing Your Farm the Smart Way</h2>
          <p className="mt-4 text-lg opacity-90">
            Join thousands of farmers and agribusinesses already using AgriHerd to grow smarter.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/signup">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="AgriHerd" className="h-8 w-8" />
                <span className="font-bold text-primary text-lg">AgriHerd Solutions</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The agricultural operations platform for modern farming.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
                <li><Link to="/signup" className="hover:text-primary">Free Trial</Link></li>
                <li><Link to="/signup" className="hover:text-primary">Book Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> hello@agriherd.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> +254 700 000 000
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgriHerd Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
