import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Play, GitCompare, ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight animate-fade-in whitespace-nowrap">
            Test Your Models with{" "}
            <span className="text-primary">Guess-The-Rule Games</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground animate-fade-in">
            Evaluate and explore your LLMs with interactive games such as Picnic!
          </p>
          <div className="mt-10 flex justify-center gap-4 animate-fade-in">
            <Button asChild size="lg" className="gap-2">
              <Link to="/play">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a
                href="https://github.com/yourusername/your-repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start Guide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm animate-fade-in">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Choose a game</h3>
                <p className="text-muted-foreground">
                  Select from our collection of guess-the-rule games designed to test
                  different aspects of LLM capabilities.
                </p>
                <Link to="/docs?section=chooseGame" className="mt-4 inline-block text-primary hover:underline">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm animate-fade-in [animation-delay:150ms]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  2. Play or Pick LLMs
                </h3>
                <p className="text-muted-foreground">
                  Either play the game yourself or select LLMs to observe their
                  problem-solving approaches.
                </p>
                <Link to="/docs?section=playOrPick" className="mt-4 inline-block text-primary hover:underline">
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-white/70 backdrop-blur-sm animate-fade-in [animation-delay:300ms]">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Analyze results</h3>
                <p className="text-muted-foreground">
                  Review performance metrics and compare different approaches to
                  understand LLM capabilities.
                </p>
                <Link to="/docs?section=analyzeResults" className="mt-4 inline-block text-primary hover:underline">
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
