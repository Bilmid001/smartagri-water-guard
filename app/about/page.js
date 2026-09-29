import Card from '@/components/Card';
import { Brain, Droplets, Leaf, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-4xl font-extrabold">About SmartAgri Water Guard</h1>
      <p className="mt-4 text-lg text-earth-700 dark:text-earth-200">
        SmartAgri Water Guard is an irrigation decision-support system built for smallholder
        and commercial farmers. It helps reduce water waste, improve yields and make data-driven
        watering choices.
      </p>

      <Card className="mt-8">
        <h2 className="font-bold text-xl flex items-center gap-2"><Brain size={20} className="text-brand-600" /> Simple Rule-Based AI</h2>
        <p className="mt-3 text-earth-700 dark:text-earth-200">
          Instead of black-box models, we use an interpretable rules engine. Every recommendation can be traced
          back to a clear factor — so you always know <em>why</em> the system said what it said.
        </p>

        <ul className="mt-4 space-y-3">
          <RuleItem
            title="Temperature"
            desc="Above 30°C increases water need; above 35°C significantly. Below 15°C reduces it."
          />
          <RuleItem
            title="Humidity"
            desc="Below 40% increases water need; below 30% strongly. High humidity above 75% reduces evaporation."
          />
          <RuleItem
            title="Rain probability"
            desc="Above 60% reduces irrigation; above 70% recommends not watering at all."
          />
          <RuleItem
            title="Crop baseline"
            desc="Rice is a high-water crop, maize medium, tomato medium-high, cassava low-medium."
          />
        </ul>
      </Card>

      <Card className="mt-6">
        <h2 className="font-bold text-xl flex items-center gap-2"><Leaf size={20} className="text-brand-600" /> Sustainability Impact</h2>
        <p className="mt-3 text-earth-700 dark:text-earth-200">
          Agriculture accounts for ~70% of global freshwater use. Even modest optimization per field
          can translate to billions of litres saved annually. SmartAgri Water Guard helps farmers:
        </p>
        <ul className="mt-4 space-y-2 text-earth-700 dark:text-earth-200">
          <li className="flex items-start gap-2"><ShieldCheck size={18} className="mt-0.5 text-brand-600" /> Reduce unnecessary irrigation cycles.</li>
          <li className="flex items-start gap-2"><ShieldCheck size={18} className="mt-0.5 text-brand-600" /> Align watering with natural rainfall forecasts.</li>
          <li className="flex items-start gap-2"><ShieldCheck size={18} className="mt-0.5 text-brand-600" /> Preserve soil health by avoiding overwatering.</li>
          <li className="flex items-start gap-2"><ShieldCheck size={18} className="mt-0.5 text-brand-600" /> Lower energy consumption from pumping.</li>
        </ul>
      </Card>

      <Card className="mt-6">
        <h2 className="font-bold text-xl flex items-center gap-2"><Sparkles size={20} className="text-brand-600" /> Vision</h2>
        <p className="mt-3 text-earth-700 dark:text-earth-200">
          We believe every farm — small or large — deserves access to modern decision tools.
          Our roadmap includes IoT soil sensors, satellite imagery, and localized weather feeds.
        </p>
      </Card>
    </div>
  );
}

function RuleItem({ title, desc }) {
  return (
    <li className="flex items-start gap-3 p-3 rounded-xl bg-earth-50 dark:bg-earth-900">
      <Droplets size={18} className="mt-0.5 text-brand-600 shrink-0" />
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-earth-600 dark:text-earth-300">{desc}</div>
      </div>
    </li>
  );
}