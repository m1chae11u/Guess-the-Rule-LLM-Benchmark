import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsContent } from "@/components/docs/DocsContent";

const Docs = () => {
  const [searchParams] = useSearchParams();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [helpful, setHelpful] = useState<boolean | null>(null);

  const contentRefs = {
    overview: useRef<HTMLDivElement>(null),
    datasetSize: useRef<HTMLDivElement>(null),
    gettingStarted: useRef<HTMLDivElement>(null),
    chooseGame: useRef<HTMLDivElement>(null),
    playOrPick: useRef<HTMLDivElement>(null),
    analyzeResults: useRef<HTMLDivElement>(null),
    paradigm: useRef<HTMLDivElement>(null),
    staticDataset: useRef<HTMLDivElement>(null),
    picnicGame: useRef<HTMLDivElement>(null),
    dynamicDataset: useRef<HTMLDivElement>(null),
    syntaxGame: useRef<HTMLDivElement>(null),
    mathSequence: useRef<HTMLDivElement>(null),
    results: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const section = searchParams.get('section');
    if (section && contentRefs[section]) {
      scrollToSection(contentRefs[section], section);
      
      // Open parent section if needed
      if (section === 'chooseGame' || section === 'playOrPick' || section === 'analyzeResults') {
        setOpenSections(prev => ({ ...prev, gettingStarted: true }));
      }
    }
  }, [searchParams]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, section: string) => {
    setSelectedSection(section);
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFeedback = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    console.log(`User found the documentation ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <DocsSidebar
        openSections={openSections}
        toggleSection={toggleSection}
        scrollToSection={scrollToSection}
        contentRefs={contentRefs}
      />
      <DocsContent
        selectedSection={selectedSection}
        contentRefs={contentRefs}
        helpful={helpful}
        handleFeedback={handleFeedback}
      />
    </div>
  );
};

export default Docs;