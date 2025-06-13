
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Welcome to
              <span className="text-farm-blue-600 block">Peaceful Meadow Farm</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in">
              Experience sustainable farming at its finest. We specialize in high-quality crop farming 
              and ethical pig rearing, bringing you the best of agricultural innovation and tradition.
            </p>
            <div className="space-x-4 animate-fade-in">
              <Button size="lg" className="bg-farm-blue-600 hover:bg-farm-blue-700">
                Explore Our Farm
              </Button>
              <Button size="lg" variant="outline" className="border-farm-blue-600 text-farm-blue-600 hover:bg-farm-blue-50">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
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
                <CardTitle className="text-farm-blue-700">Crop Farming</CardTitle>
                <CardDescription>
                  Sustainable crop production using modern farming techniques and organic practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🐷</span>
                </div>
                <CardTitle className="text-farm-blue-700">Pig Rearing</CardTitle>
                <CardDescription>
                  Ethical and humane pig farming with focus on animal welfare and quality breeding.
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
                  Environmental stewardship through sustainable farming methods and eco-friendly approaches.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <CardTitle className="text-farm-blue-700">Health Management</CardTitle>
                <CardDescription>
                  Comprehensive health tracking and veterinary care for all our livestock.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-farm-blue-700">Modern Technology</CardTitle>
                <CardDescription>
                  Advanced farm management systems for optimal productivity and record keeping.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-farm-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <CardTitle className="text-farm-blue-700">Community Focus</CardTitle>
                <CardDescription>
                  Supporting local communities through quality agricultural products and services.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-farm-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-farm-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Pigs Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-farm-blue-600 mb-2">50</div>
              <div className="text-gray-600">Acres Farmed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-farm-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-farm-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Interested in our farm products or services? We'd love to hear from you!
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-farm-blue-600 hover:bg-farm-blue-700">
              Contact Us Today
            </Button>
            <Button size="lg" variant="outline" className="border-farm-blue-600 text-farm-blue-600 hover:bg-farm-blue-50">
              Visit Our Farm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
