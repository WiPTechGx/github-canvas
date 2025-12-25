import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const cardTypes = [
  {
    name: "User Stats Card",
    description: "Display total stars, commits, PRs, issues, and more",
    preview: "⭐ 1,234 | 📦 56 | 👥 789",
    gradient: "from-primary/15 to-primary/5",
    accent: "green" as const,
  },
  {
    name: "Language Breakdown",
    description: "Show your most-used programming languages",
    preview: "TypeScript 45% | Python 30% | Rust 15%",
    gradient: "from-chart-3/15 to-chart-3/5",
    accent: "purple" as const,
  },
  {
    name: "Contribution Streak",
    description: "Track your current and longest contribution streak",
    preview: "🔥 Current: 15 days | Best: 87 days",
    gradient: "from-secondary/15 to-secondary/5",
    accent: "teal" as const,
  },
  {
    name: "Activity Graph",
    description: "Visualize your contribution activity over time",
    preview: "▁▂▃▅▆▇█▆▅▃▂▁▂▅▇",
    gradient: "from-secondary/15 to-primary/5",
    accent: "teal" as const,
  },
  {
    name: "Dev Quotes",
    description: "Random inspirational quotes for developers",
    preview: '"Code is poetry." - Unknown',
    gradient: "from-chart-3/15 to-chart-3/5",
    accent: "purple" as const,
  },
  {
    name: "Custom Image",
    description: "Create fully custom images with your own text and style",
    preview: "Your text, your style",
    gradient: "from-primary/15 to-secondary/5",
    accent: "green" as const,
  },
];

export function CardTypesSection() {
  return (
    <section className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">6 Card Types</span> to Choose From
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each fully customizable with themes, colors, and layouts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cardTypes.map((card, index) => (
            <GlassPanel key={index} hover accent={card.accent}>
              <div className={`h-32 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 border border-border/30 backdrop-blur-sm`}>
                <span className="font-mono text-sm text-muted-foreground text-center px-4">
                  {card.preview}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {card.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </GlassPanel>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link to="/generator">
              Create Your Card
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
