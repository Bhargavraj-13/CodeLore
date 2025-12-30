// Home page component displaying topics and search functionality

import { useEffect, useState, useCallback } from 'react';
// import AppHeader from '../components/layout/AppHeader.jsx';
// import AppFooter from '../components/layout/AppFooter.jsx';
import { SearchBar, TopicGrid } from '../components/home';
import api from '../lib/api.jsx';
import { useAuth } from "../components/auth/AuthContext";

function HomePage() {
  const { user } = useAuth();

  const [topics, setTopics] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/topics');
      setTopics(res.data || []);
    } catch (err) {
      console.error('Error fetching topics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query) => {
      if (!query.trim()) {
        fetchTopics();
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(`/api/search?q=${query}`);
        setTopics(res.data || []);
        setSuggestions(res.data || []);
      } catch (err) {
        console.error('Search error:', err);
      }
    },
    [fetchTopics]
  );

  const handleSelect = (title) => {
    handleSearch(title);
    setSuggestions([]);
  };

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/*<AppHeader user={user} />*/}
      <main className="flex-1 px-6 md:px-10 py-10">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <SearchBar
                onSearch={handleSearch}
                suggestions={suggestions}
                onSelectSuggestion={handleSelect}
              />
          </div>
          <h1 className="text-3xl mb-6 font-semibold text-center">Explore Topics</h1>

          {loading ? (
            <div className="text-center text-slate-400 py-10">
              Loading...
            </div>
          ) : (
            <TopicGrid topics={topics} />
          )}
        </div>
      </main>

      {/* <AppFooter /> */}
    </div>
  );
}

export default HomePage;