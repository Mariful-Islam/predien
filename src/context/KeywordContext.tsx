import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type KeywordContextType = {
  selectedKeyword: any | null;
  keywords: any[];
  setSelectedKeyword: React.Dispatch<React.SetStateAction<any | null>>;
  setKeywords: React.Dispatch<React.SetStateAction<any[]>>;
  fetchKeywords: () => Promise<void>;
};

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

type KeywordProviderProps = {
  children: ReactNode;
};

export const KeywordProvider = ({ children }: KeywordProviderProps) => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordContextType | null>(null);
  const [keywords, setKeywords] = useState<any[]>([]);

  const fetchKeywords = async () => {
    try {
      const response = await fetch('/api/keywords');
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.error('Error fetching Keywords:', error);
    }
  };


  useEffect(() => {
    fetchKeywords();
  }, []); 


  



  return (
    <KeywordContext.Provider
      value={{ selectedKeyword, keywords, setSelectedKeyword, setKeywords, fetchKeywords }}
    >
      {children}
    </KeywordContext.Provider>
  );
};

export const useKeywordContext = () => {
  const context = useContext(KeywordContext);
  if (!context) {
    throw new Error('useKeywordContext must be used within a KeywordProvider');
  }
  return context;
};
