import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsContentProps {
  selectedSection: string | null;
  contentRefs: Record<string, React.RefObject<HTMLDivElement>>;
  helpful: boolean | null;
  handleFeedback: (isHelpful: boolean) => void;
}

export const DocsContent = ({
  selectedSection,
  contentRefs,
  helpful,
  handleFeedback,
}: DocsContentProps) => {
  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
      case 'datasetSize':
        return (
          <div ref={contentRefs.overview}>
            <h2 className="text-2xl font-bold mb-4">Dataset Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              Our comprehensive dataset is designed to evaluate and compare the performance
              of different language models across various reasoning tasks. The dataset
              includes both static and dynamic components, allowing for thorough assessment
              of model capabilities.
            </p>
            
            <div ref={contentRefs.datasetSize} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Dataset Size</h3>
              <p className="text-gray-700 leading-relaxed">
                Our dataset comprises over 1,000 unique game scenarios, split between static and
                dynamic rule sets. Each scenario is carefully crafted to test different aspects of
                logical reasoning and pattern recognition.
              </p>
            </div>
          </div>
        );

      case 'gettingStarted':
      case 'chooseGame':
      case 'playOrPick':
      case 'analyzeResults':
        return (
          <div ref={contentRefs.gettingStarted}>
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-gray-700 leading-relaxed">
              Follow these steps to begin using our platform for evaluating language models
              through interactive games and challenges.
            </p>
            
            <div ref={contentRefs.chooseGame} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Choose a Game</h3>
              <p className="text-gray-700 leading-relaxed">
                Select from our collection of guess-the-rule games designed to test different
                aspects of LLM capabilities. Each game is carefully crafted to evaluate specific
                reasoning patterns and cognitive abilities.
              </p>
            </div>

            <div ref={contentRefs.playOrPick} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Play or Pick LLMs</h3>
              <p className="text-gray-700 leading-relaxed">
                You can either play the games yourself to understand the challenges firsthand,
                or select different language models to observe and compare their problem-solving
                approaches and strategies.
              </p>
            </div>

            <div ref={contentRefs.analyzeResults} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Analyze Results</h3>
              <p className="text-gray-700 leading-relaxed">
                Review detailed performance metrics and compare different approaches to understand
                LLM capabilities. Our analysis tools help you gain insights into model behavior
                and decision-making patterns.
              </p>
            </div>
          </div>
        );

      case 'paradigm':
        return (
          <div ref={contentRefs.paradigm}>
            <h2 className="text-2xl font-bold mb-4">Paradigm</h2>
            <p className="text-gray-700 leading-relaxed">
              The game follows a turn-based interaction paradigm where players propose examples
              and receive feedback. This structure allows for systematic evaluation of reasoning
              capabilities and hypothesis testing strategies.
            </p>
          </div>
        );

      case 'staticDataset':
      case 'picnicGame':
        return (
          <div ref={contentRefs.staticDataset}>
            <h2 className="text-2xl font-bold mb-4">Static Dataset</h2>
            <p className="text-gray-700 leading-relaxed">
              The static dataset contains games with fixed rules that remain constant throughout
              the interaction. These scenarios test the model's ability to identify and apply
              consistent patterns.
            </p>
            
            <div ref={contentRefs.picnicGame} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Picnic Game</h3>
              <p className="text-gray-700 leading-relaxed">
                The Picnic Game is a classic example of our static dataset challenges. Players
                must deduce the hidden rule that determines which items are allowed at a picnic,
                based on specific linguistic or logical patterns.
              </p>
            </div>
          </div>
        );

      case 'dynamicDataset':
      case 'syntaxGame':
      case 'mathSequence':
        return (
          <div ref={contentRefs.dynamicDataset}>
            <h2 className="text-2xl font-bold mb-4">Dynamic Dataset</h2>
            <p className="text-gray-700 leading-relaxed">
              The dynamic dataset features games where rules may evolve or require adaptive
              reasoning. These scenarios test the model's ability to handle changing contexts
              and update their understanding accordingly.
            </p>
            
            <div ref={contentRefs.syntaxGame} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Syntax Game</h3>
              <p className="text-gray-700 leading-relaxed">
                The Syntax Game challenges players to discover rules based on grammatical structures
                and linguistic patterns. This tests understanding of language syntax and semantic
                relationships.
              </p>
            </div>
            
            <div ref={contentRefs.mathSequence} className="mt-4">
              <h3 className="text-xl font-semibold mb-4">Mathematical Sequence</h3>
              <p className="text-gray-700 leading-relaxed">
                Mathematical sequence challenges focus on numerical patterns and relationships.
                Players must identify underlying mathematical rules through systematic testing
                and observation.
              </p>
            </div>
          </div>
        );

      case 'results':
        return (
          <div ref={contentRefs.results}>
            <h2 className="text-2xl font-bold mb-4">Experiment Results</h2>
            <p className="text-gray-700 leading-relaxed">
              Our experiments have shown varying success rates across different language models
              and rule types. Static rules generally see higher success rates, while dynamic
              rules present more significant challenges, particularly in cases requiring
              adaptive reasoning.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 mt-8">
            Select a section from the sidebar to view its content
          </div>
        );
    }
  };

  return (
    <ScrollArea className="flex-1 h-screen">
      <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
        {renderContent()}
        
        {selectedSection && (
          <>
            <Separator className="my-8" />
            <div className="flex items-center justify-center space-x-8">
              <p className="text-gray-600">Was this helpful?</p>
              <button
                onClick={() => handleFeedback(true)}
                className={cn(
                  "p-2 rounded-full transition-colors duration-200",
                  helpful === true ? "bg-green-100" : "hover:bg-gray-100"
                )}
              >
                <ThumbsUp className={cn(
                  "w-6 h-6",
                  helpful === true ? "text-green-600" : "text-gray-400"
                )} />
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className={cn(
                  "p-2 rounded-full transition-colors duration-200",
                  helpful === false ? "bg-red-100" : "hover:bg-gray-100"
                )}
              >
                <ThumbsDown className={cn(
                  "w-6 h-6",
                  helpful === false ? "text-red-600" : "text-gray-400"
                )} />
              </button>
            </div>
          </>
        )}
      </div>
    </ScrollArea>
  );
};