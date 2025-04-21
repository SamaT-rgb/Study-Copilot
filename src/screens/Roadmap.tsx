import React, { useState } from "react";
import roadmapData from "../data/Roadmap.json";
import { CheckCircle, Circle, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";

export const LearningPath = (): JSX.Element => {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const [currentStep, setCurrentStep] = useState<number>(0);

  const toggleStep = (index: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const markAsComplete = (index: number) => {
    if (index === currentStep) {
      setCurrentStep(index + 1);
    }
  };

  return (
    <div className="flex flex-col w-full items-start gap-6 p-6 absolute w-[926px] h-[879px] top-[92px] left-80">
      <div className="flex flex-col items-start gap-4 w-full overflow-y-auto max-h-[600px]">
        <div className="flex items-center w-full">
          <h2 className="text-2xl font-bold text-[#35424d]">
            {roadmapData.title} Learning Path
          </h2>
        </div>
        <p className="text-gray-600 mb-4">
          Follow this personalized learning path to master {roadmapData.title}. Track your progress as you complete each step.
        </p>
        
        {/* Progress indicator */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${(currentStep / roadmapData.steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Timeline view */}
        <div className="w-full">
          {roadmapData.steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isExpanded = expandedSteps[index];
            
            return (
              <div key={index} className="mb-6">
                <div className="flex items-start">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center mr-4">
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                    ) : isActive ? (
                      <Circle className="w-8 h-8 text-blue-600 flex-shrink-0" strokeWidth={2.5} />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-300 flex-shrink-0" />
                    )}
                    {index < roadmapData.steps.length - 1 && (
                      <div className={`w-0.5 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                  
                  {/* Step content */}
                  <div className={`flex-1 p-4 rounded-lg border ${
                    isActive ? 'border-blue-200 bg-blue-50' : 
                    isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}>
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleStep(index)}
                    >
                      <h3 className={`text-lg font-semibold ${
                        isActive ? 'text-blue-700' : 
                        isCompleted ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        Step {index + 1}: {step.title}
                      </h3>
                      {isExpanded ? 
                        <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      }
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4">
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        <div className="space-y-3">
                          {step.links.map((link, linkIndex) => (
                            <a 
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium text-blue-600">{link.title}</h4>
                                {/* {link.description && (
                                  <p className="text-sm text-gray-500 mt-1">{link.description}</p>
                                )} */}
                              </div>
                              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                        
                        {isActive && (
                          <Button 
                            onClick={() => markAsComplete(index)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Mark as Complete
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};