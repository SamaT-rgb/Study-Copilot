import { useEffect, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import exploreData from "../../data/explore.json";

// Removed unused import for roadmapData

// Define types based on the JSON structure you provided
interface YoutubeVideo {
  title: string;
  description: string;
  channel: string;
  channel_url: string;
  published_at: string;
  days_since_published: number;
  thumbnail: string;
  url: string;
  views: string;
  likes: string;
}

interface Book {
  title: string;
  authors: string[];
  description: string;
  info_link: string;
  thumbnail: string;
}

interface Article {
  title: string;
  summary: string;
  authors: string[];
  link: string;
}

interface News {
  title: string;
  description: string;
  summary: string;
  source: string;
  published_at: string;
  url: string;
}

interface ExploreData {
  youtube_videos: YoutubeVideo[];
  books: Book[];
  articles: Article[];
  news: News[];
}

export const Explore = (): JSX.Element => {
  const [data, setData] = useState<ExploreData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with the actual path to your explore.json file
        const response = await fetch("../data/explore.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading explore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format view count for better readability
  const formatViews = (viewCount: string): string => {
    const count = parseInt(viewCount, 10);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format date to display "x days ago" or actual date
  const formatPublishedDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days ago`;
    }
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading explore content...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Unable to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">Explore</h1>
      
      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          placeholder="Search anything..." 
          className="pl-10 py-2 border rounded-md w-full"
        />
      </div>
      
      {/* YouTube Videos Section */}
      {data.youtube_videos && data.youtube_videos.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Youtube videos</h2>
            <a href="#" className="text-blue-600 flex items-center text-sm">
              See more <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.youtube_videos.map((video, index) => (
              <div key={index} className="flex flex-col">
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/api/placeholder/400/250" 
                    alt={video.title} 
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                </a>
                <h3 className="font-medium text-base">{video.title}</h3>
                <div className="text-sm text-gray-600 flex flex-wrap gap-x-2">
                  <span>{video.channel}</span>
                  <span>•</span>
                  <span>{formatViews(video.views)}</span>
                  <span>•</span>
                  <span>{formatPublishedDate(video.published_at)}</span>
                  <span>•</span>
                  <span>{video.likes} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Books Section */}
      {data.books && data.books.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Books</h2>
            <a href="#" className="text-blue-600 flex items-center text-sm">
              See more <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.books.map((book, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative mb-2">
                  <a href={book.info_link} target="_blank" rel="noopener noreferrer">
                    <img 
                      src="/api/placeholder/180/240" 
                      alt={book.title} 
                      className="w-40 h-56 object-cover"
                    />
                  </a>
                  {index === 0 && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold py-1 px-2 rotate-12">
                      NEW
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-center">{book.title}</h3>
                <div className="text-sm text-gray-600 text-center">
                  Author: {book.authors.join(", ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Articles Section */}
      {data.articles && data.articles.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Articles</h2>
            <a href="#" className="text-blue-600 flex items-center text-sm">
              See more <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {data.articles.map((article, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-medium text-blue-600 mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                  <p className="text-xs text-gray-500">By: {article.authors.join(", ")}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* News Section */}
      {data.news && data.news.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">News</h2>
            <a href="#" className="text-blue-600 flex items-center text-sm">
              See more <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {data.news.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="font-medium text-blue-600 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Source: {item.source}</span>
                    <span className="text-xs text-gray-500">{formatPublishedDate(item.published_at)}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};