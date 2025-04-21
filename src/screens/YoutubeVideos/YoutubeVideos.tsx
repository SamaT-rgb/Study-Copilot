import React, { useEffect, useState } from "react";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";
import { BookCard } from "../../components/BookCard/BookCard";
import { ChatbotButton } from "../../components/ChatbotButton/ChatbotButton";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { NewsCard } from "../../components/News/NewsCard";
import { 
  loadDataFromJson, 
  videoData as fallbackVideoData, 
  articlesData as fallbackArticlesData, 
  booksData as fallbackBooksData,
  Video,
  Article,
  Book,
  News,
} from "../../data";

export const YoutubeVideos = (): JSX.Element => {
  const [videos, setVideos] = useState<Video[]>(fallbackVideoData);
  const [articles, setArticles] = useState<Article[]>(fallbackArticlesData);
  const [books, setBooks] = useState<Book[]>(fallbackBooksData);
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { videoData, articlesData, booksData , newsData} = await loadDataFromJson();
        // Only update states if we actually got data
        if (videoData.length > 0) setVideos(videoData);
        if (articlesData.length > 0) setArticles(articlesData);
        if (booksData.length > 0) setBooks(booksData);
        if (newsData && newsData.length > 0) setNews(newsData);
      } catch (error) {
        console.error("Error loading JSON data:", error);
        // Fallback data will be used from initial state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1280px] h-[832px] relative">
        <Header />
        <Sidebar />
        {/* Main Content */}
        <main className="absolute w-[926px] h-[879px] top-[92px] left-80">
          <div className="flex flex-col w-[912px] items-end gap-4">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-col items-start justify-center gap-3 w-full">
                <div className="flex items-center w-full bg-white">
                  <h2 className="text-[#35424d] text-xl [font-family:'Source_Sans_Pro',Helvetica] font-semibold">
                    Dashboard
                  </h2>
                </div>
              </div>
              <Tabs defaultValue="youtube" className="w-full">
                <TabsList className="flex h-auto w-full justify-start bg-transparent p-0 border-b border-[#d7d9db]">
                  <TabsTrigger
                    value="youtube"
                    className="inline-flex items-center justify-center pt-2 pb-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1c40ca] data-[state=active]:text-[#1c40ca] data-[state=active]:font-semibold rounded-none bg-transparent [font-family:'Source_Sans_Pro',Helvetica] text-[13px]"
                  >
                    Youtube Videos
                  </TabsTrigger>
                  <TabsTrigger
                    value="articles"
                    className="inline-flex items-center justify-center pt-2 pb-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1c40ca] data-[state=active]:text-[#1c40ca] data-[state=active]:font-semibold rounded-none bg-transparent [font-family:'Source_Sans_Pro',Helvetica] text-[13px]"
                  >
                    Articles
                  </TabsTrigger>
                  <TabsTrigger
                    value="books"
                    className="inline-flex items-center justify-center pt-2 pb-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1c40ca] data-[state=active]:text-[#1c40ca] data-[state=active]:font-semibold rounded-none bg-transparent [font-family:'Source_Sans_Pro',Helvetica] text-[13px]"
                  >
                    Books
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="news"
                    className="inline-flex items-center justify-center pt-2 pb-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1c40ca] data-[state=active]:text-[#1c40ca] data-[state=active]:font-semibold rounded-none bg-transparent [font-family:'Source_Sans_Pro',Helvetica] text-[13px]"
                  >
                    News
                  </TabsTrigger> */}
                </TabsList>
                <TabsContent value="youtube" className="mt-4 p-0 overflow-y-auto max-h-[600px]">
                  {loading ? (
                    <div className="flex justify-center p-12">
                      <p>Loading videos...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {videos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="books" className="mt-4 p-0 overflow-y-auto max-h-[600px]">
                  {loading ? (
                    <div className="flex justify-center p-12">
                      <p>Loading books...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="articles" className="mt-4 p-0 overflow-y-auto max-h-[600px]">
                  {loading ? (
                    <div className="flex justify-center p-12">
                      <p>Loading articles...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="news" className="mt-4 p-0 overflow-y-auto max-h-[600px]">
                  {loading ? (
                    <div className="flex justify-center p-12">
                      <p>Loading news...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8">
                      {news.map((news) => (
                        <NewsCard key={news.id} news={news} />
                      ))}
                    </div>
                  )}
                </TabsContent>

              </Tabs>
            </div>
          </div>
          <ChatbotButton />
        </main>
      </div>
    </div>
  );
};