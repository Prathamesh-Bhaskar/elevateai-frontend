import create from 'zustand';

interface BusinessPlanState {
  currentStep: number;
  answers: Record<string, string>;
  setCurrentStep: (step: number) => void;
  setAnswer: (question: string, answer: string) => void;
}

const useBusinessPlanStore = create<BusinessPlanState>((set) => ({
  currentStep: 1,
  answers: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  setAnswer: (question, answer) =>
    set((state) => ({
      answers: { ...state.answers, [question]: answer },
    })),
}));

export default useBusinessPlanStore;