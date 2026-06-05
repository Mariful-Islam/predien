import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type TopicContextType = {
  selectedTopic: any | null;
  topics: any[];
  setSelectedTopic: React.Dispatch<React.SetStateAction<any | null>>;
  setTopics: React.Dispatch<React.SetStateAction<any[]>>;
  fetchTopics: () => Promise<void>;
};

const TopicContext = createContext<TopicContextType | undefined>(undefined);

type TopicProviderProps = {
  children: ReactNode;
};

export const TopicProvider = ({ children }: TopicProviderProps) => {
  const [selectedTopic, setSelectedTopic] = useState<TopicContextType | null>(null);
  const [topics, setTopics] = useState<any[]>([]);

  const fetchTopics = async () => {
    try {
      const response = await fetch('/api/topics');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };


  useEffect(() => {
    fetchTopics();
  }, []); 


  



  return (
    <TopicContext.Provider
      value={{ selectedTopic, topics, setSelectedTopic, setTopics, fetchTopics }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export const useTopicContext = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopicContext must be used within a TopicProvider');
  }
  return context;
};
