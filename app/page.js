'use client';
import Link from 'next/link';
import { ArrowRight, BarChart3, CloudSun, Droplets, Leaf, ShieldCheck, Sprout, TrendingDown, Waves } from 'lucide-react';

const features = [
  { icon: Droplets, title: 'Water with confidence', desc: 'Get an explainable irrigation recommendation from crop needs and field conditions.' },
  { icon: CloudSun, title: 'Weather-aware decisions', desc: 'Bring temperature, humidity and rain probability into one practical view.' },
  { icon: BarChart3, title: 'See the whole field', desc: 'Track a seven-day moisture projection, decision history and downloadable reports.' },
];

function DashboardPreview() {
  return <div className="preview-shell">
    <div className="preview-top"><div><span className="preview-mark"><Sprout size={15}/></span><b>Field overview</b></div><span className="preview-live"><i/> DEMO PREVIEW</span></div>
    <div className="preview-body">
      <div className="preview-heading"><div><small>MONDAY, OCTOBER 21</small><h3>Good morning, Amina <span>✳</span></h3><p>Here’s what’s happening across your farm today.</p></div><div className="preview-weather"><CloudSun size={22}/><b>28°</b><span>Partly cloudy</span></div></div>
      <div className="preview-stats"><div><small>ACTIVE FIELDS</small><b>04 <em>↗ 1 this week</em></b></div><div><small>WATER SAVED</small><b>1,240 <i>litres</i></b></div><div><small>AVG. SOIL MOISTURE</small><b>64<i>%</i></b></div></div>
      <div className="preview-grid"><div className="preview-chart"><div className="preview-card-title"><span>Moisture &amp; water need</span><span>Next 7 days⌄</span></div><div className="preview-chart-area"><div className="preview-y"><span>100</span><span>75</span><span>50</span><span>25</span></div><svg viewBox="0 0 520 148" preserveAspectRatio="none" aria-label="Seven day water need chart"><path d="M0 45 C60 55 85 69 130 77 S220 104 260 95 S340 117 390 110 S470 133 520 126" fill="none" stroke="#d99a49" strokeWidth="3" strokeDasharray="7 6"/><path d="M0 75 C62 59 91 65 130 51 S216 72 260 47 S343 57 390 36 S468 58 520 29" fill="none" stroke="#308b62" strokeWidth="3"/><path d="M0 75 C62 59 91 65 130 51 S216 72 260 47 S343 57 390 36 S468 58 520 29 L520 148 L0 148Z" fill="url(#fade)" opacity=".28"/><defs><linearGradient id="fade" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#308b62"/><stop offset="1" stopColor="#308b62" stopOpacity="0"/></linearGradient></defs></svg></div><div className="preview-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className="preview-legend"><span><i/> Soil moisture</span><span><i/> Crop water need</span></div></div><div className="preview-recommend"><span className="recommend-icon"><Droplets size={18}/></span><small>TODAY’S RECOMMENDATION</small><h4>Water your maize</h4><p>Field North · Maize</p><div className="recommend-meter"><span/></div><div className="recommend-meta"><span>Water need</span><b>68 / 100</b></div><div className="recommend-note"><ShieldCheck size={15}/> Rain chance is low today</div></div></div>
    </div><div className="preview-foot"><span><i/> Sample dashboard for product illustration</span><Link href="/dashboard">Explore the live dashboard <ArrowRight size={14}/></Link></div>
  </div>;
}

export default function Home() {
  return <div className="landing">
    <section className="landing-hero"><div className="hero-photo"/><div className="hero-wash"/><div className="hero-copy"><span className="eyebrow"><Sprout size={15}/> SMART FARMING, MADE PRACTICAL</span><h1>Every drop has a purpose.</h1><p>Make your next watering decision with a clearer picture of your crops, your field conditions and the weather ahead.</p><div className="hero-actions"><Link href="/register" className="hero-button">Start for free <ArrowRight size={17}/></Link><Link href="/dashboard" className="hero-link">Explore the dashboard <span>↗</span></Link></div><div className="hero-proof"><span><ShieldCheck size={16}/> Explainable recommendations</span><span><Waves size={16}/> Water-conscious decisions</span></div></div><div className="hero-caption"><span>01 / A MORE RESILIENT HARVEST</span><span>Tools that grow with your farm</span></div></section>
    <section className="preview-section"><div className="section-intro"><span className="eyebrow"><BarChart3 size={14}/> YOUR FARM AT A GLANCE</span><h2>Clarity for every field.</h2><p>Turn scattered field conditions into a simple, actionable daily view.</p></div><DashboardPreview/></section>
    <section className="landing-features"><div className="section-intro"><span className="eyebrow"><Leaf size={14}/> DESIGNED FOR THE REAL WORLD</span><h2>Better decisions start here.</h2><p>Useful tools, clear reasoning, and a lighter footprint on your water supply.</p></div><div className="feature-grid">{features.map(({icon:Icon,title,desc},i)=><article className="feature-card" key={title}><span className="feature-number">0{i+1}</span><div className="feature-icon"><Icon size={20}/></div><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
    <section className="landing-impact"><div className="impact-photo"/><div className="impact-copy"><span className="eyebrow"><TrendingDown size={14}/> GROW MORE WITH LESS</span><h2>Protect the harvest.<br/>Respect the water.</h2><p>When farmers can see what a crop needs and why, they can make each irrigation cycle count. SmartAgri helps put that insight within reach.</p><Link href="/about" className="hero-link">Our approach <ArrowRight size={15}/></Link></div></section>
    <section className="landing-cta"><div><span className="eyebrow"><Sprout size={14}/> YOUR NEXT SEASON STARTS NOW</span><h2>Grow with a little more certainty.</h2><p>Create your account and bring your first field into focus.</p></div><Link href="/register" className="hero-button">Create your account <ArrowRight size={17}/></Link></section>
  </div>;
}
