
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Award, 
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
  Brain,
  TrendingUp,
  Target,
  Globe
} from 'lucide-react';

const LandingPage = () => {
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
                  <Button size="lg" className="group">
                    Get a Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Our Solutions
                  </Button>
                </div>
                <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>5.0 Client Satisfaction</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span>Data Secure & GDPR Compliant</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Smart farming technology dashboard"
                    className="rounded-lg shadow-2xl w-full h-80 object-cover"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-card p-6 rounded-xl shadow-lg border">
                    <div className="text-3xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Farms Digitized</div>
                  </div>
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
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
                Our cutting-edge platform combines IoT sensors, AI analytics, and cloud-based management systems to help farmers optimize productivity, reduce costs, and make informed decisions based on real-time data.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
                  <Award className="h-10 w-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground">Award-Winning</div>
                  <div className="text-sm text-muted-foreground">AgTech Innovation</div>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border hover:shadow-md transition-shadow">
                  <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Smart Analytics</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-20 bg-background">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Breeding & Health Logs</CardTitle>
                <CardDescription>
                  Comprehensive tracking of breeding cycles, health records, and veterinary interventions with automated reminders.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Sales Tracking</CardTitle>
                <CardDescription>
                  Real-time sales monitoring, revenue analytics, and market performance insights with predictive forecasting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Automated Reports</CardTitle>
                <CardDescription>
                  Generate detailed performance reports, compliance documentation, and financial summaries automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Inventory Alerts</CardTitle>
                <CardDescription>
                  Smart inventory management with low-stock alerts, automated reordering, and supplier integration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Staff Management</CardTitle>
                <CardDescription>
                  Task assignment, performance tracking, and workforce optimization with mobile access for field teams.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 border hover:border-primary/20">
              <CardHeader>
                <Monitor className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-primary">Multi-Device Access</CardTitle>
                <CardDescription>
                  Access your farm data anywhere with responsive web and mobile apps that sync in real-time.
                </CardDescription>
              </CardHeader>
            </Card>
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
            <Button size="lg" variant="outline" className="group border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
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

      {/* Footer */}
      <div className="py-16 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-primary mb-4">AgriHerd Solutions</h3>
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
