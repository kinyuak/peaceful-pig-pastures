
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, TrendingUp, AlertCircle, CheckCircle, Scale, Calendar } from 'lucide-react';

interface Pig {
  id: string;
  pigId: string;
  name: string;
  breed: string;
  dateOfBirth: string;
  weight: number;
  category: 'Sow' | 'Boar' | 'Weaner' | 'Porker';
  status: 'Alive' | 'Dead' | 'Sold';
  healthStatus: 'Healthy' | 'Sick' | 'Under Treatment';
  lastCheckup: string;
  lastServiceDate?: string;
  lastHeatDate?: string;
  notes?: string;
}

interface PigHealthReportsProps {
  pig: Pig;
}

const PigHealthReports = ({ pig }: PigHealthReportsProps) => {
  const calculateAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth);
    const now = new Date();
    const ageInMs = now.getTime() - birth.getTime();
    const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const ageInMonths = Math.floor(ageInDays / 30);
    
    return { days: ageInDays, weeks: ageInWeeks, months: ageInMonths };
  };

  const getWeightRecommendations = (pig: Pig) => {
    const age = calculateAge(pig.dateOfBirth);
    const recommendations = [];

    switch (pig.category) {
      case 'Sow':
        if (pig.weight < 120) {
          recommendations.push({
            type: 'warning',
            message: 'Underweight for breeding sow. Target: 120-180kg',
            action: 'Increase protein intake to 14-16% and add energy supplements'
          });
        } else if (pig.weight > 200) {
          recommendations.push({
            type: 'warning',
            message: 'Overweight. May affect breeding performance',
            action: 'Reduce feed quantity and increase fiber content'
          });
        } else {
          recommendations.push({
            type: 'success',
            message: 'Optimal weight for breeding sow',
            action: 'Maintain current feeding program'
          });
        }
        break;

      case 'Boar':
        if (pig.weight < 150) {
          recommendations.push({
            type: 'warning',
            message: 'Underweight for breeding boar. Target: 150-250kg',
            action: 'Increase feed intake with high-quality protein'
          });
        } else if (pig.weight > 280) {
          recommendations.push({
            type: 'warning',
            message: 'Overweight. May affect mobility and breeding',
            action: 'Implement controlled feeding and exercise'
          });
        } else {
          recommendations.push({
            type: 'success',
            message: 'Good weight for breeding boar',
            action: 'Monitor body condition regularly'
          });
        }
        break;

      case 'Weaner':
        const expectedWeight = (age.weeks - 3) * 3 + 7; // Starting at 7kg at 3 weeks
        if (pig.weight < expectedWeight * 0.8) {
          recommendations.push({
            type: 'warning',
            message: `Below expected weight (${expectedWeight.toFixed(1)}kg)`,
            action: 'Provide starter feed with 20-22% protein'
          });
        }
        break;

      case 'Porker':
        const targetWeight = age.weeks * 5; // Rough estimate
        if (pig.weight < targetWeight * 0.8) {
          recommendations.push({
            type: 'warning',
            message: 'Slow growth rate detected',
            action: 'Review feed quality and increase caloric density'
          });
        }
        break;
    }

    return recommendations;
  };

  const getKenyaSpecificAdvice = (pig: Pig) => {
    const advice = [];

    // Nanyuki specific conditions (high altitude, cool climate)
    advice.push({
      title: 'Nanyuki Climate Considerations',
      points: [
        'Provide adequate shelter from cold nights (altitude 2000m+)',
        'Ensure proper ventilation while preventing drafts',
        'Monitor for respiratory issues during cold/dry seasons',
        'Adjust feeding during cool weather - pigs need more energy'
      ]
    });

    // Seasonal feeding advice
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 2 && currentMonth <= 5) { // Mar-Jun (Long rains)
      advice.push({
        title: 'Long Rains Season (Mar-Jun)',
        points: [
          'Ensure good drainage in pig housing',
          'Watch for increased parasite pressure',
          'Utilize fresh green feeds when available',
          'Monitor feed storage for mold due to humidity'
        ]
      });
    } else if (currentMonth >= 9 && currentMonth <= 11) { // Oct-Dec (Short rains)
      advice.push({
        title: 'Short Rains Season (Oct-Dec)',
        points: [
          'Prepare for cooler temperatures',
          'Stock up on quality feeds before prices rise',
          'Maintain clean water sources',
          'Plan breeding for post-rain period'
        ]
      });
    } else {
      advice.push({
        title: 'Dry Season Management',
        points: [
          'Ensure constant water supply',
          'Provide shade and cooling options',
          'Supplement with vitamins A, D, E',
          'Consider dust control measures'
        ]
      });
    }

    // Local feed recommendations
    advice.push({
      title: 'Local Feed Options (Kenya)',
      points: [
        'Utilize maize germ and bran from local mills',
        'Consider sweet potato vines and cassava leaves',
        'Use locally available fishmeal from Lake Victoria',
        'Incorporate sunflower cake from oil processing'
      ]
    });

    return advice;
  };

  const getHealthScore = (pig: Pig) => {
    let score = 100;
    const weightRecs = getWeightRecommendations(pig);
    
    // Deduct points for health issues
    if (pig.healthStatus === 'Sick') score -= 40;
    if (pig.healthStatus === 'Under Treatment') score -= 20;
    
    // Deduct points for weight issues
    weightRecs.forEach(rec => {
      if (rec.type === 'warning') score -= 15;
    });

    // Deduct points for old checkup
    const daysSinceCheckup = Math.floor((new Date().getTime() - new Date(pig.lastCheckup).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceCheckup > 30) score -= 10;
    if (daysSinceCheckup > 60) score -= 15;

    return Math.max(0, score);
  };

  const age = calculateAge(pig.dateOfBirth);
  const weightRecommendations = getWeightRecommendations(pig);
  const kenyaAdvice = getKenyaSpecificAdvice(pig);
  const healthScore = getHealthScore(pig);

  return (
    <div className="space-y-6">
      {/* Health Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Health Score & Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{healthScore}%</div>
              <Progress value={healthScore} className="mb-2" />
              <p className="text-sm text-gray-600">Overall Health Score</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{age.weeks}</div>
              <p className="text-sm text-gray-600">Weeks Old</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{pig.weight}kg</div>
              <p className="text-sm text-gray-600">Current Weight</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-green-600" />
            Weight Analysis & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weightRecommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              rec.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
            }`}>
              <div className="flex items-start gap-2">
                {rec.type === 'success' ? 
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /> : 
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                }
                <div>
                  <p className="font-medium text-gray-900">{rec.message}</p>
                  <p className="text-sm text-gray-600 mt-1">{rec.action}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Kenya-Specific Advice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Kenya/Nanyuki Specific Recommendations
          </CardTitle>
          <CardDescription>
            Location-specific advice for optimal pig farming in Nanyuki, Kenya
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {kenyaAdvice.map((section, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Feeding Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-red-600" />
            Feeding Schedule Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Daily Feeding Guidelines</h4>
              {pig.category === 'Sow' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Pregnant Sow:</strong> 3-4kg feed/day (16-18% protein)</p>
                  <p><strong>Lactating Sow:</strong> 5-7kg feed/day (20-22% protein)</p>
                  <p><strong>Dry Sow:</strong> 2.5-3kg feed/day (14-16% protein)</p>
                </div>
              )}
              {pig.category === 'Boar' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Breeding Boar:</strong> 3-3.5kg feed/day (16-18% protein)</p>
                  <p><strong>Young Boar:</strong> 3.5-4kg feed/day (18-20% protein)</p>
                </div>
              )}
              {pig.category === 'Weaner' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Starter Feed:</strong> 10% of body weight (22-24% protein)</p>
                  <p><strong>Water:</strong> 2-3 liters per day minimum</p>
                </div>
              )}
              {pig.category === 'Porker' && (
                <div className="space-y-2 text-sm">
                  <p><strong>Grower Feed:</strong> 6-8% of body weight (18-20% protein)</p>
                  <p><strong>Finisher Feed:</strong> 4-6% of body weight (16-18% protein)</p>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Supplement Recommendations</h4>
              <div className="space-y-2 text-sm">
                <p>• <strong>Vitamin C:</strong> 50mg/day (stress reduction)</p>
                <p>• <strong>Iron:</strong> Injectable for piglets at 3 days</p>
                <p>• <strong>Calcium:</strong> Extra for pregnant/lactating sows</p>
                <p>• <strong>Probiotics:</strong> During stress periods</p>
                <p>• <strong>Salt:</strong> 0.5% of total feed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PigHealthReports;
