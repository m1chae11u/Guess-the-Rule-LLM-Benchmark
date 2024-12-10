import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DocsSidebarProps {
  openSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement>, section: string) => void;
  contentRefs: Record<string, React.RefObject<HTMLDivElement>>;
}

export const DocsSidebar = ({
  openSections,
  toggleSection,
  scrollToSection,
  contentRefs,
}: DocsSidebarProps) => {
  return (
    <div className="w-64 bg-white border-r shadow-sm">
      <ScrollArea className="h-screen py-6 px-4">
        <div className="space-y-4">
          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('overview')}
              className="font-semibold text-lg mb-2 w-full text-left hover:text-primary transition-colors duration-200"
            >
              Dataset Overview
            </CollapsibleTrigger>
            <CollapsibleContent>
              {openSections['overview'] && (
                <div 
                  className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                  onClick={() => scrollToSection(contentRefs.datasetSize, 'datasetSize')}
                >
                  Dataset Size
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('gettingStarted')}
              className="font-semibold text-lg mb-2 w-full text-left hover:text-primary transition-colors duration-200"
            >
              Getting Started
            </CollapsibleTrigger>
            <CollapsibleContent>
              {openSections['gettingStarted'] && (
                <>
                  <div 
                    className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                    onClick={() => scrollToSection(contentRefs.chooseGame, 'chooseGame')}
                  >
                    Choose a Game
                  </div>
                  <div 
                    className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                    onClick={() => scrollToSection(contentRefs.playOrPick, 'playOrPick')}
                  >
                    Play or Pick LLMs
                  </div>
                  <div 
                    className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                    onClick={() => scrollToSection(contentRefs.analyzeResults, 'analyzeResults')}
                  >
                    Analyze Results
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          <div 
            className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors duration-200"
            onClick={() => scrollToSection(contentRefs.paradigm, 'paradigm')}
          >
            Paradigm
          </div>

          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('static')}
              className="font-semibold text-lg mb-2 w-full text-left hover:text-primary transition-colors duration-200"
            >
              Static Dataset
            </CollapsibleTrigger>
            <CollapsibleContent>
              {openSections['static'] && (
                <div 
                  className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                  onClick={() => scrollToSection(contentRefs.picnicGame, 'picnicGame')}
                >
                  Picnic Game
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger 
              onClick={() => toggleSection('dynamic')}
              className="font-semibold text-lg mb-2 w-full text-left hover:text-primary transition-colors duration-200"
            >
              Dynamic Dataset
            </CollapsibleTrigger>
            <CollapsibleContent>
              {openSections['dynamic'] && (
                <>
                  <div 
                    className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                    onClick={() => scrollToSection(contentRefs.syntaxGame, 'syntaxGame')}
                  >
                    Syntax Game
                  </div>
                  <div 
                    className="ml-4 cursor-pointer hover:text-primary transition-colors duration-200"
                    onClick={() => scrollToSection(contentRefs.mathSequence, 'mathSequence')}
                  >
                    Mathematical Sequence
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          <div 
            className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors duration-200"
            onClick={() => scrollToSection(contentRefs.results, 'results')}
          >
            Experiment Results
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};