
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Shield, Heart, Phone, Mail, MapPin } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-farm-blue-600/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-farm-blue-100 text-farm-blue-700 hover:bg-farm-blue-200">
                🏆 Award-Winning Farm Since 2014
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
                Welcome to
                <span className="text-farm-blue-600 block">Peaceful Meadow Farm</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl animate-fade-in leading-relaxed">
                Experience sustainable farming at its finest. We specialize in premium crop farming 
                and ethical pig rearing, combining traditional farming wisdom with modern technology 
                to bring you the highest quality agricultural products.
              </p>
              <div className="space-x-4 animate-fade-in">
                <Button size="lg" className="bg-farm-blue-600 hover:bg-farm-blue-700">
                  Explore Our Farm
                </Button>
                <Button size="lg" variant="outline" className="border-farm-blue-600 text-farm-blue-600 hover:bg-farm-blue-50">
                  Contact Us
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span>4.9/5 Customer Rating</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-1" />
                  <span>Certified Organic</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Farm landscape with animals"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-farm-blue-600">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sheep grazing in green field"
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story & Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2014, Peaceful Meadow Farm began as a small family operation with a big dream: 
                to practice sustainable agriculture that respects both the land and the animals we care for.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we're proud to be a leading example of ethical farming practices, combining 
                traditional methods with innovative technology to ensure the highest standards of 
                animal welfare and crop quality.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-farm-blue-50 rounded-lg">
                  <Award className="h-8 w-8 text-farm-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Certified</div>
                  <div className="text-sm text-gray-600">Organic Farm</div>
                </div>
                <div className="text-center p-4 bg-farm-blue-50 rounded-lg">
                  <Heart className="h-8 w-8 text-farm-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Ethical</div>
                  <div className="text-sm text-gray-600">Animal Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-farm-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Farm Specialties</h2>
            <p className="text-lg text-gray-600">Committed to sustainable agriculture and ethical livestock management</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <CardTitle className="text-farm-blue-700">Premium Crop Farming</CardTitle>
                <CardDescription>
                  Sustainable crop production using modern farming techniques, organic practices, 
                  and precision agriculture to maximize yield while protecting the environment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🐷</span>
                </div>
                <CardTitle className="text-farm-blue-700">Ethical Pig Rearing</CardTitle>
                <CardDescription>
                  Humane pig farming with spacious living conditions, natural diet, and comprehensive 
                  health monitoring to ensure the highest standards of animal welfare.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <CardTitle className="text-farm-blue-700">Sustainable Practices</CardTitle>
                <CardDescription>
                  Environmental stewardship through renewable energy, water conservation, 
                  soil health management, and biodiversity preservation initiatives.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <CardTitle className="text-farm-blue-700">Advanced Health Management</CardTitle>
                <CardDescription>
                  Comprehensive health tracking, preventive care, and veterinary partnerships 
                  to maintain optimal health for all our livestock.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-farm-blue-700">Smart Technology</CardTitle>
                <CardDescription>
                  IoT sensors, automated feeding systems, and data analytics to optimize 
                  farm operations and ensure consistent quality standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <CardTitle className="text-farm-blue-700">Community Partnership</CardTitle>
                <CardDescription>
                  Supporting local communities through job creation, educational programs, 
                  and partnerships with local restaurants and markets.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Farm Gallery</h2>
            <p className="text-lg text-gray-600">Take a visual tour of our beautiful farm</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Farm animals grazing"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Pasture Grazing</h3>
                  <p className="text-sm opacity-90">Our animals enjoy open pastures</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Farm ox in field"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Mountain Views</h3>
                  <p className="text-sm opacity-90">Scenic mountain backdrop</p>
                </div>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
              <img 
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Farm crops"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-semibold">Organic Crops</h3>
                  <p className="text-sm opacity-90">Premium quality harvests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-farm-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-farm-blue-100">Pigs Managed</div>
              <div className="text-sm text-farm-blue-200 mt-1">Healthy & thriving</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">120</div>
              <div className="text-farm-blue-100">Acres Farmed</div>
              <div className="text-sm text-farm-blue-200 mt-1">Sustainable cultivation</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-farm-blue-100">Years Experience</div>
              <div className="text-sm text-farm-blue-200 mt-1">Proven expertise</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-farm-blue-100">Satisfaction Rate</div>
              <div className="text-sm text-farm-blue-200 mt-1">Happy customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Interested in our farm products, tours, or partnerships? We'd love to hear from you!
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-farm-blue-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-FARM</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-farm-blue-600 mr-3" />
                  <span className="text-gray-700">hello@peacefulmeadowfarm.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-farm-blue-600 mr-3" />
                  <span className="text-gray-700">123 Farm Road, Green Valley, CA 95945</span>
                </div>
              </div>
              
              <div className="space-x-4">
                <Button size="lg" className="bg-farm-blue-600 hover:bg-farm-blue-700">
                  Schedule Farm Tour
                </Button>
                <Button size="lg" variant="outline" className="border-farm-blue-600 text-farm-blue-600 hover:bg-farm-blue-50">
                  Request Quote
                </Button>
              </div>
            </div>
            
            <div className="bg-farm-blue-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Contact Form</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-farm-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-farm-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-farm-blue-500"></textarea>
                </div>
                <Button type="submit" className="w-full bg-farm-blue-600 hover:bg-farm-blue-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
