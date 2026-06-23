import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

type KeywordContextType = {
  selectedKeyword: any | null;
  keywords: any[];
  search: string;
  page: number;
  limit: number;
  totalPages: number;
  setSelectedKeyword: React.Dispatch<React.SetStateAction<any | null>>;
  setKeywords: React.Dispatch<React.SetStateAction<any[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  fetchKeywords: () => Promise<void>;
};

const KeywordContext = createContext<KeywordContextType | undefined>(undefined);

type KeywordProviderProps = {
  children: ReactNode;
};

export const KeywordProvider = ({ children }: KeywordProviderProps) => {
  // Fixed a bug in your original code: selectedKeyword state type should match its usage, not the whole context type
  const [selectedKeyword, setSelectedKeyword] = useState<any | null>(null);
  const [keywords, setKeywords] = useState<any[]>([]);
  
  // New States for Pagination and Search
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Wrapped in useCallback to prevent infinite loops if passed as a dependency elsewhere
  const fetchKeywords = useCallback(async () => {
    try {
      // Constructs URL query params, e.g., /api/keywords?page=2&limit=10&search=abc
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search
      });

      const response = await fetch(`/api/keywords?${queryParams.toString()}`);
      const data = await response.json();
      
      // Assumes your API returns an object like: { data: [...], totalPages: 5 }
      // Adjust according to your exact API response structure
      setKeywords(data.data || data); 
      if (data.totalPages) {
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching Keywords:', error);
    }
  }, [page, limit, search]); // Re-fetches whenever these values change

  // Automatically trigger fetch whenever page, limit, or search query changes
  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  // Reset to page 1 whenever a user types a new search query
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <KeywordContext.Provider
      value={{ 
        selectedKeyword, 
        keywords, 
        search, 
        page, 
        limit, 
        totalPages, 
        setSelectedKeyword, 
        setKeywords, 
        setSearch, 
        setPage, 
        setLimit, 
        fetchKeywords 
      }}
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