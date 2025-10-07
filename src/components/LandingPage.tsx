
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Smartphone,
  Database,
  BarChart3,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Monitor,
  Tablet,
  TrendingUp,
  Target,
  Globe,
  Cpu,
  Wifi,
  CloudRain,
  Leaf,
  PieChart,
  Settings,
  LineChart,
  Activity,
  Send,
  Clock,
  MessageSquare,
  ThumbsUp,
  Building,
  Rocket,
  TreePine,
  Lightbulb,
  Award,
  UserCheck,
  Calendar,
  Handshake,
  ClipboardCheck,
  Plus,
  Minus
} from 'lucide-react';
import { useState } from 'react';

// Import generated images
import smartFarmDashboard from '@/assets/smart-farm-dashboard.jpg';
import farmerTech from '@/assets/farmer-tech-new.jpg';
import smartFarmAerial from '@/assets/smart-farm-aerial.jpg';
import livestockTech from '@/assets/livestock-tech.jpg';
import geoffreyNjugunaCeo from '@/assets/geoffrey-njuguna-ceo.jpg';
import geoffreyKinyuaCto from '@/assets/geoffrey-kinyua-cto.jpg';

// Import product images
import cabbageImage from '@/assets/products/cabbage.jpg';
import onionsImage from '@/assets/products/onions.jpg';
import pigImage from '@/assets/products/pig.jpg';
import greenGramsImage from '@/assets/products/green-grams.jpg';
import logo from '@/assets/logo.png';

const LandingPage = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    farmType: '',
    inquiry: '',
    message: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    rating: 5,
    category: '',
    feedback: '',
    anonymous: false
  });

  const [labourForm, setLabourForm] = useState({
    fullName: '',
    contact: '',
    location: '',
    serviceType: '',
    numberOfWorkers: 1,
    duration: '',
    preferredDate: '',
    additionalNotes: ''
  });

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your inquiry!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', phone: '', farmType: '', inquiry: '', message: '' });
  };

  const handleLabourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅ Booking Received!",
      description: "Thank you! Our Agriherd team will contact you shortly to confirm availability and finalize arrangements.",
    });
    setLabourForm({
      fullName: '',
      contact: '',
      location: '',
      serviceType: '',
      numberOfWorkers: 1,
      duration: '',
      preferredDate: '',
      additionalNotes: ''
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback submitted successfully!",
      description: "Thank you for helping us improve our services.",
    });
    setFeedbackForm({ name: '', rating: 5, category: '', feedback: '', anonymous: false });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-background overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  🚀 Digital Agriculture Innovation Leader
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
                  Transforming Agriculture Through
                  <span className="text-primary block">Digital Innovation</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                  Smart tools & expert consultancy for the modern farmer. Revolutionize your farm operations with cutting-edge technology and data-driven insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button size="lg" className="group" onClick={() => scrollToSection('contact-us')}>
                    Get a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('solutions')}>
                    Explore Our Solutions
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
                  <img 
                    src={smartFarmDashboard}
                    alt="Smart farming technology dashboard"
                    className="rounded-lg shadow-2xl w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src={farmerTech}
                  alt="Modern agriculture technology"
                  className="rounded-xl shadow-lg w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-secondary/10 text-secondary">About AgriHerd Solutions</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">Empowering Farmers with Smart Technology</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                AgriHerd Solutions is at the forefront of agricultural innovation, providing comprehensive digital tools and expert consultancy services that transform traditional farming into smart, data-driven operations.
              </p>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Our smart farming platform combines real-time monitoring devices, performance reports, and easy-to-use management tools to help farmers optimize productivity, reduce costs, and make informed decisions based on real-time insights.
                </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="group"
                  onClick={() => scrollToSection('solutions')}
                >
                  Explore Our Technology
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div id="solutions" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Our Solutions</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Comprehensive Farm Management Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From crop tracking to livestock management, our integrated platform covers every aspect of modern farming
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Crop Management */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-6">
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-3xl">🌾</span>
                </div>
                <CardTitle className="text-2xl text-primary mb-2">Crop Management Solutions</CardTitle>
                <CardDescription className="text-base">
                  Advanced digital tools for comprehensive crop monitoring and management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    Production records & field tracking
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    Automated inventory management
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    Staff task scheduling & logs
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    Weather integration & alerts
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Livestock Management */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardHeader className="pb-6">
                <div className="h-16 w-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <span className="text-3xl">🐄</span>
                </div>
                <CardTitle className="text-2xl text-secondary mb-2">Livestock Management</CardTitle>
                <CardDescription className="text-base">
                  Complete herd management with health monitoring and breeding optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    Breeding & health monitoring
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    Smart feed formulation tools
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    Real-time herd tracking
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    Automated health alerts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Platform Features</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Farm Management System Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Modern dashboard with comprehensive tools for complete farm operation management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Breeding & Health Logs</CardTitle>
                <CardDescription>
                  Comprehensive tracking of breeding cycles, health records, and veterinary interventions with automated reminders and smart health analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-secondary/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <BarChart3 className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-secondary">Sales Tracking</CardTitle>
                <CardDescription>
                  Real-time sales monitoring, revenue analytics, and market performance insights with predictive forecasting and profit optimization.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-accent/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-accent">Automated Reports</CardTitle>
                <CardDescription>
                  Generate detailed performance reports, compliance documentation, and financial summaries automatically with customizable dashboards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Smart Inventory Alerts</CardTitle>
                <CardDescription>
                  Smart inventory tracking with automatic alerts for restocking, automated ordering, and real-time supply chain integration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-secondary/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-secondary">Workforce Management</CardTitle>
                <CardDescription>
                  Smart task assignment, performance analytics, and workforce optimization with mobile access for efficient field operations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border hover:border-accent/20 hover:-translate-y-1">
              <CardHeader>
                <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Monitor className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-accent">Cross-Platform Access</CardTitle>
                <CardDescription>
                  Access your farm data anywhere with our mobile-friendly platform and apps, plus offline capabilities for seamless farm management anywhere.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Technology Showcase */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-accent/10 text-accent">Advanced Technology Stack</Badge>
                <h3 className="text-3xl font-bold text-foreground mb-6">Built with Cutting-Edge AgTech</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Cpu className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Farm Performance Reports</div>
                      <div className="text-sm text-muted-foreground">Advanced analytics for crop yields and livestock health optimization</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Wifi className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Real-time Farm Monitoring</div>
                      <div className="text-sm text-muted-foreground">Real-time environmental and animal monitoring</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <CloudRain className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Weather Integration</div>
                      <div className="text-sm text-muted-foreground">Automated climate data and forecasting</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Sustainability Metrics</div>
                      <div className="text-sm text-muted-foreground">Environmental impact tracking and optimization</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={smartFarmAerial}
                  alt="Smart farm aerial view with technology overlay"
                  className="rounded-xl shadow-lg w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Farm Products</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium agricultural products directly from our partner farms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img 
                  src={cabbageImage} 
                  alt="Fresh Cabbages"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Fresh Cabbages</CardTitle>
                <CardDescription>Organic farm-fresh cabbages, perfect for your kitchen</CardDescription>
                <div className="text-2xl font-bold text-secondary mt-2">KSH 80/kg</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => window.location.href = '/store'}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img 
                  src={onionsImage} 
                  alt="Red Onions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Red Onions</CardTitle>
                <CardDescription>Premium red onions with rich flavor and long shelf life</CardDescription>
                <div className="text-2xl font-bold text-secondary mt-2">KSH 120/kg</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => window.location.href = '/store'}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img 
                  src={pigImage} 
                  alt="Farm Pigs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Farm Pigs</CardTitle>
                <CardDescription>Healthy, well-bred pigs for livestock farming</CardDescription>
                <div className="text-2xl font-bold text-secondary mt-2">KSH 15,000/pig</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => window.location.href = '/store'}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="h-48 bg-muted/20 overflow-hidden">
                <img 
                  src={greenGramsImage} 
                  alt="Green Grams"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-primary">Green Grams</CardTitle>
                <CardDescription>High-quality green grams rich in protein and nutrients</CardDescription>
                <div className="text-2xl font-bold text-secondary mt-2">KSH 200/kg</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => window.location.href = '/store'}>
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/store'}>
              View All Products
            </Button>
          </div>
        </div>
      </div>

      {/* Consultancy Services */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Expert Consultancy</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Professional Farm Consulting Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get expert guidance from agricultural specialists to optimize your farm operations and maximize profitability
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Breeding Advisory</CardTitle>
                <CardDescription>
                  Genetic optimization and breeding program design for improved livestock performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Health Analysis</CardTitle>
                <CardDescription>
                  Disease prevention strategies and health monitoring system implementation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Productivity Improvement</CardTitle>
                <CardDescription>
                  Process optimization and efficiency enhancement for maximum farm output
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 text-center border-2 hover:border-primary/20">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary">Market Analysis</CardTitle>
                <CardDescription>
                  Market trends analysis and strategic planning for optimal product positioning
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Casual Labour as a Service Section */}
      <div id="labour-service" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234ade80" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Labour Solutions</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Hire Trained Farm Labourers Easily
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Connect with verified and skilled farm workers whenever you need them. Quality work, reliable service, countywide coverage.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-primary">
                <UserCheck className="h-5 w-5" />
                <span className="font-semibold">Verified Workers</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">Countywide Service</span>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={() => scrollToSection('labour-booking-form')}
              className="group"
            >
              Book Labour Service
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Intro Paragraph with Icons */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground">Professional Farm Labour On Demand</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agriherd Solutions connects you with trained and reliable farm labourers whenever you need them. 
                Whether you need hands for planting, weeding, milking, or harvesting, we provide skilled workers 
                who understand farm operations and deliver quality work.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Handshake className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Trained & Vetted</h4>
                    <p className="text-sm text-muted-foreground">All workers are properly trained</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Insured</h4>
                    <p className="text-sm text-muted-foreground">Safety & reliability guaranteed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Flexible Hours</h4>
                    <p className="text-sm text-muted-foreground">Half day to multi-day options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Quality Work</h4>
                    <p className="text-sm text-muted-foreground">Experienced farm hands</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Icons Grid */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Team Work</h4>
                <p className="text-sm text-muted-foreground">Coordinated labour teams</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20 group">
                <div className="h-16 w-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Leaf className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Crop Care</h4>
                <p className="text-sm text-muted-foreground">Planting & harvesting</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/20 group">
                <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Livestock Care</h4>
                <p className="text-sm text-muted-foreground">Feeding & milking</p>
              </Card>
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Maintenance</h4>
                <p className="text-sm text-muted-foreground">Fencing & repairs</p>
              </Card>
            </div>
          </div>

          {/* Booking Form Section */}
          <div id="labour-booking-form" className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/10 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="text-center">
                  <CardTitle className="text-3xl mb-2">Book Labour Service</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and our team will contact you to confirm availability
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleLabourSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Full Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your full name"
                        value={labourForm.fullName}
                        onChange={(e) => setLabourForm({ ...labourForm, fullName: e.target.value })}
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    {/* Phone Number / Email */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        Phone Number / Email *
                      </label>
                      <Input
                        required
                        placeholder="Phone or email address"
                        value={labourForm.contact}
                        onChange={(e) => setLabourForm({ ...labourForm, contact: e.target.value })}
                        className="border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Farm Location / County */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Farm Location / County *
                      </label>
                      <Input
                        required
                        placeholder="e.g., Nanyuki, Laikipia"
                        value={labourForm.location}
                        onChange={(e) => setLabourForm({ ...labourForm, location: e.target.value })}
                        className="border-2 focus:border-primary"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                        Service Type Needed *
                      </label>
                      <Select
                        required
                        value={labourForm.serviceType}
                        onValueChange={(value) => setLabourForm({ ...labourForm, serviceType: value })}
                      >
                        <SelectTrigger className="border-2 focus:border-primary">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="planting">Planting</SelectItem>
                          <SelectItem value="harvesting">Harvesting</SelectItem>
                          <SelectItem value="weeding">Weeding</SelectItem>
                          <SelectItem value="livestock-feeding">Livestock Feeding</SelectItem>
                          <SelectItem value="milking">Milking</SelectItem>
                          <SelectItem value="fencing">Fencing</SelectItem>
                          <SelectItem value="spraying">Spraying</SelectItem>
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                          <SelectItem value="general-labour">General Labour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Number of Workers */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        Number of Casual Labourers *
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setLabourForm({ ...labourForm, numberOfWorkers: Math.max(1, labourForm.numberOfWorkers - 1) })}
                          className="h-10 w-10 border-2"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          required
                          value={labourForm.numberOfWorkers}
                          onChange={(e) => setLabourForm({ ...labourForm, numberOfWorkers: parseInt(e.target.value) || 1 })}
                          className="border-2 focus:border-primary text-center"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setLabourForm({ ...labourForm, numberOfWorkers: labourForm.numberOfWorkers + 1 })}
                          className="h-10 w-10 border-2"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Duration of Work *
                      </label>
                      <Select
                        required
                        value={labourForm.duration}
                        onValueChange={(value) => setLabourForm({ ...labourForm, duration: value })}
                      >
                        <SelectTrigger className="border-2 focus:border-primary">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-background z-50">
                          <SelectItem value="half-day">Half Day (4 hours)</SelectItem>
                          <SelectItem value="full-day">Full Day (8 hours)</SelectItem>
                          <SelectItem value="multi-day">Multi-Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Preferred Date *
                    </label>
                    <Input
                      type="date"
                      required
                      value={labourForm.preferredDate}
                      onChange={(e) => setLabourForm({ ...labourForm, preferredDate: e.target.value })}
                      className="border-2 focus:border-primary"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Additional Notes / Requirements
                    </label>
                    <Textarea
                      placeholder="Any special requirements or additional information..."
                      value={labourForm.additionalNotes}
                      onChange={(e) => setLabourForm({ ...labourForm, additionalNotes: e.target.value })}
                      className="border-2 focus:border-primary min-h-24"
                    />
                  </div>

                  {/* Information Note */}
                  <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 flex gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">All Agriherd labourers are trained, insured, and verified</strong> for safety and reliability. 
                      We ensure professional service delivery for your peace of mind.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="flex-1 group"
                    >
                      Book Labour Service
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      className="sm:w-auto"
                      onClick={() => window.open('https://wa.me/254700000000?text=Hi, I need help choosing labour services', '_blank')}
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Need Help Choosing?
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Call-to-Action Banner */}
          <div className="mt-16 text-center">
            <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Need Reliable Farm Help? Book Verified Labourers from Agriherd Today!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Professional farm workers ready to help you succeed
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => scrollToSection('labour-booking-form')}
                    className="group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => window.open('tel:+254700000000')}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gradient-to-br from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Our Leadership Team</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Meet the Founders</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced leaders with 14+ years combined expertise in agritech, animal health, and system development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <img 
                    src={geoffreyNjugunaCeo}
                    alt="Geoffrey Njuguna, CEO & Co-Founder"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Geoffrey Njuguna</h3>
                <p className="text-lg text-secondary font-semibold mb-4">CEO & Co-Founder</p>
                <p className="text-muted-foreground mb-4">
                  Agricultural Technology Leadership • Business Strategy • Livestock Management
                </p>
                <p className="text-sm text-muted-foreground">
                  7+ years in agritech with specialized expertise in animal health and livestock management systems. 
                  Passionate about revolutionizing African agriculture through technology.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/20">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <img 
                    src={geoffreyKinyuaCto}
                    alt="Geoffrey Kinyua, CTO & Co-Founder"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-secondary/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-2">Geoffrey Kinyua</h3>
                <p className="text-lg text-accent font-semibold mb-4">CTO & Co-Founder</p>
                <p className="text-muted-foreground mb-4">
                  System Development • Web Development • Software Architecture
                </p>
                <p className="text-sm text-muted-foreground">
                  Senior software engineer with deep expertise in system development and web development. 
                  Specializes in building scalable, farmer-friendly technology solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* About Our Journey - Startup Information */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent">Our Journey</Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">Kenyan Startup Revolutionizing Agriculture</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Born from a deep understanding of African farming challenges, AgriHerd Solutions is a Kenya-based 
                agritech startup dedicated to transforming traditional farming into smart, data-driven operations.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Based in Nanyuki Town, we understand the unique challenges facing Kenyan farmers - from smallholder 
                operations to large commercial farms. Our locally-developed solutions are designed specifically 
                for African agricultural conditions and practices.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Founded in Kenya</div>
                    <div className="text-sm text-muted-foreground">Local solutions for local challenges</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TreePine className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">African-Focused</div>
                    <div className="text-sm text-muted-foreground">Technology adapted for African farming conditions</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Innovation Hub</div>
                    <div className="text-sm text-muted-foreground">Expanding across East Africa with proven solutions</div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="group"
                onClick={() => scrollToSection('contact-us')}
              >
                Join Our Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src={smartFarmAerial}
                alt="Smart farm technology in Kenya"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose AgriHerd Solutions?</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of satisfied farmers who have transformed their operations with our innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="opacity-90">15+ years of agricultural technology expertise</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customizable Tools</h3>
              <p className="opacity-90">Tailored solutions for your specific farm needs</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="opacity-90">Average 30% increase in farm productivity</p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Support</h3>
              <p className="opacity-90">Dedicated support team understanding local farming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Let's Digitize Your Farm Together</h2>
          <p className="text-xl mb-10 opacity-90">
            Ready to transform your agricultural operations with cutting-edge technology? 
            Start your digital farming journey today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="group border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
              onClick={() => scrollToSection('contact-us')}
            >
              Book a Free Strategy Call
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center space-x-4 text-sm opacity-75">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span>Free consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact-us" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Contact Us</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your farm? Let's discuss how our solutions can help you achieve your agricultural goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Visit Our Office</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Location</div>
                      <div className="text-muted-foreground">Nanyuki Town, Kenya</div>
                      <div className="text-sm text-muted-foreground">Central Kenya Hub for Agricultural Innovation</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <div className="text-muted-foreground">+254712777581</div>
                      <div className="text-sm text-muted-foreground">Mon-Fri: 8:00 AM - 6:00 PM EAT</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div className="text-muted-foreground">agriherdsolutions@gmail.com</div>
                      <div className="text-sm text-muted-foreground">24-hour response time guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Office Hours</div>
                      <div className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</div>
                      <div className="text-sm text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <Input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <Input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        placeholder="+254..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Farm Type</label>
                      <Select value={contactForm.farmType} onValueChange={(value) => setContactForm({...contactForm, farmType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crop">Crop Farming</SelectItem>
                          <SelectItem value="livestock">Livestock</SelectItem>
                          <SelectItem value="mixed">Mixed Farming</SelectItem>
                          <SelectItem value="dairy">Dairy Farming</SelectItem>
                          <SelectItem value="poultry">Poultry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type</label>
                      <Select value={contactForm.inquiry} onValueChange={(value) => setContactForm({...contactForm, inquiry: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Free Consultation</SelectItem>
                          <SelectItem value="demo">Product Demo</SelectItem>
                          <SelectItem value="pricing">Pricing Information</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Tell us about your farm and how we can help you..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full group">
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary">Customer Feedback</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">Share Your Experience</h2>
            <p className="text-xl text-muted-foreground">
              Help us improve our services by sharing your feedback and experience with AgriHerd Solutions.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                    placeholder="Your name (optional if anonymous)"
                    disabled={feedbackForm.anonymous}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Overall Rating</label>
                  <Select value={feedbackForm.rating.toString()} onValueChange={(value) => setFeedbackForm({...feedbackForm, rating: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                      <SelectItem value="2">⭐⭐ Fair</SelectItem>
                      <SelectItem value="1">⭐ Needs Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Feedback Category</label>
                <Select value={feedbackForm.category} onValueChange={(value) => setFeedbackForm({...feedbackForm, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service Quality</SelectItem>
                    <SelectItem value="platform">Platform Usability</SelectItem>
                    <SelectItem value="support">Support Response</SelectItem>
                    <SelectItem value="features">Feature Requests</SelectItem>
                    <SelectItem value="overall">Overall Satisfaction</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Feedback *</label>
                <Textarea
                  value={feedbackForm.feedback}
                  onChange={(e) => setFeedbackForm({...feedbackForm, feedback: e.target.value})}
                  placeholder="Share your experience, suggestions, or concerns..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={feedbackForm.anonymous}
                  onChange={(e) => setFeedbackForm({...feedbackForm, anonymous: e.target.checked, name: e.target.checked ? '' : feedbackForm.name})}
                  className="rounded border-border"
                />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Submit feedback anonymously
                </label>
              </div>

              <Button type="submit" className="w-full group">
                <MessageSquare className="mr-2 h-4 w-4" />
                Submit Feedback
                <ThumbsUp className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="py-16 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="AgriHerd Solutions Logo" className="h-12 w-12" />
                <h3 className="text-2xl font-bold text-primary">AgriHerd Solutions</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Transforming agriculture through digital innovation. Smart tools and expert consultancy for the modern farmer.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+254712777581</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>agriherdsolutions@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Solutions</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Crop Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Livestock Management</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Farm Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Breeding Advisory</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Health Analysis</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Market Research</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Training & Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2025 AgriHerd Solutions. All rights reserved. Empowering farmers with digital innovation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
