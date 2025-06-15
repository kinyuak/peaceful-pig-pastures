import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, AlertTriangle, TrendingUp } from "lucide-react";
import PigReportsCharts from "./PigReportsCharts";

interface Pig {
  id: string;
  pigId: string;
  name: string;
  breed: string;
  dateOfBirth: string;
  weight: number;
  category: "Sow" | "Boar" | "Weaner" | "Porker";
  status: "Alive" | "Dead" | "Sold";
  healthStatus: "Healthy" | "Sick" | "Under Treatment";
  lastCheckup: string;
  lastServiceDate?: string;
  lastHeatDate?: string;
  notes?: string;
  boarTagNumber?: string;
}

interface Props {
  pig: Pig;
}

function parseSowNotes(notes?: string) {
  if (!notes) return [];
  const tips: { type: "info" | "warning" | "suggestion"; title: string; message: string }[] = [];

  if (/worm infestation/i.test(notes)) {
    tips.push({
      type: "warning",
      title: "Worm Infestation History",
      message: "Past worm infestation detected in notes. Deworm more regularly and monitor closely."
    });
  }
  if (/diarrhea|amprocox/i.test(notes)) {
    tips.push({
      type: "warning",
      title: "Recent Diarrhea Episodes",
      message: "Past diarrhea episode(s) detected. Ensure water is clean and monitor piglets' stools."
    });
  }
  if (/iron deficiency/i.test(notes)) {
    tips.push({
      type: "info",
      title: "Iron Supplement Record",
      message: "Iron injection administered in past. Continue timely iron supplementation for piglets."
    });
  }
  // Farrowing and litter performance
  const litterMatches = notes.match(/LITTER\s*\d+:[^\n]+/gi);
  const litterCount = litterMatches ? litterMatches.length : 0;
  if (litterCount > 0) {
    tips.push({
      type: "info",
      title: "Farrowing Performance",
      message: `Detected ${litterCount} litters. Review litter sizes and survival rates for breeding efficiency.`
    });
    litterMatches?.forEach(litter => {
      const match = litter.match(/(\d+)\s*alive/);
      if (match) {
        const count = Number(match[1]);
        if (count < 8)
          tips.push({
            type: "suggestion",
            title: "Small Litter Size Warning",
            message: "A litter with less than 8 alive piglets was recorded. Look into nutrition and breeding management."
          });
      }
    });
  }
  // Sales/culled
  if (/sold/i.test(notes)) {
    tips.push({
      type: "info",
      title: "Sales Record",
      message: "This sow or its offspring have been sold. Track production per animal for profitability."
    });
  }
  // Mortalities
  if (/died/i.test(notes)) {
    const deaths = notes.match(/(\d+)\s*died/gi);
    if (deaths && deaths.length > 0) {
      tips.push({
        type: "warning",
        title: "Piglet/Litter Mortalities",
        message: "Mortality recorded in previous litter(s). Investigate management, feeding, and environment."
      });
    }
  }

  // Adoption of piglets
  if (/adopted/i.test(notes)) {
    tips.push({
      type: "info",
      title: "Piglet Adoption",
      message: "Piglets adopted in previous litters. Monitor maternal behavior and supplementary feeding."
    });
  }

  return tips;
}

function getSowSuggestions(pig: Pig) {
  const tips: { type: "info" | "warning" | "suggestion"; title: string; message: string }[] = [];

  // Core suggestions based on structured data
  if (pig.status === "Alive" && pig.category === "Sow") {
    // Heat cycle
    if (pig.lastHeatDate) {
      const lastHeat = new Date(pig.lastHeatDate);
      const nextHeat = new Date(lastHeat.getTime() + 21 * 24 * 60 * 60 * 1000);
      tips.push({
        type: "info",
        title: "Next Expected Heat",
        message: `Expected around ${nextHeat.toLocaleDateString()}. Observe sow for heat signs.`
      });
    } else {
      tips.push({
        type: "warning",
        title: "No Heat Records",
        message: "No previous heat date recorded. Track cycle for optimized breeding."
      });
    }
    // Farrowing prediction
    if (pig.lastServiceDate) {
      const lastService = new Date(pig.lastServiceDate);
      const expectedFarrow = new Date(lastService.getTime() + 115 * 24 * 60 * 60 * 1000);
      tips.push({
        type: "info",
        title: "Expected Farrowing",
        message: `If serviced, expected farrowing around ${expectedFarrow.toLocaleDateString()}. Prepare farrowing pen and check body condition.`
      });
    }
    // Body weight
    if (pig.weight < 120) {
      tips.push({
        type: "warning",
        title: "Low Weight",
        message: "Weight below 120kg. Low weight can negatively impact litter size and piglet survival."
      });
    } else if (pig.weight > 200) {
      tips.push({
        type: "warning",
        title: "High Weight",
        message: "Weight above 200kg. Obesity in sows increases risk of farrowing difficulties."
      });
    } else {
      tips.push({
        type: "info",
        title: "Good Weight",
        message: "Current weight is within typical range for a breeding sow."
      });
    }
  }
  // Health
  if (pig.healthStatus === "Sick" || pig.healthStatus === "Under Treatment") {
    tips.push({
      type: "warning",
      title: "Health Monitoring",
      message: "Current health requires ongoing monitoring. Ensure medication protocols are followed."
    });
  }

  // Add tips from notes (unstructured analysis)
  tips.push(...parseSowNotes(pig.notes));

  return tips;
}

const badgeColor = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-orange-100 text-orange-800",
  suggestion: "bg-green-100 text-green-700"
};

const iconComponent = {
  info: <Heart className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  suggestion: <TrendingUp className="h-5 w-5 text-green-600" />
};

const PigSowSuggestions = ({ pig }: Props) => {
  const suggestions = getSowSuggestions(pig);
  if (suggestions.length === 0 && !pig.notes) return null;

  return (
    <Card className="mt-8 border-blue-100 bg-blue-50 shadow">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center text-lg">
          <TrendingUp className="h-5 w-5 text-farm-blue-700" />
          Sow Analysis & Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Charts (only render if we have notes with litters info) */}
        {pig.notes && <PigReportsCharts notes={pig.notes} />}

        {/* Tips/analysis */}
        {suggestions.length > 0 && (
          <ul className="space-y-3 mt-8">
            {suggestions.map((tip, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span>{iconComponent[tip.type]}</span>
                <div>
                  <Badge className={`${badgeColor[tip.type]} mb-1 mr-2`}>{tip.title}</Badge>
                  <span className="block text-sm text-gray-700">{tip.message}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default PigSowSuggestions;
