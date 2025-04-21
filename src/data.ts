// Define types for our data models
export interface Video {
    id: string;
    title: string;
    description: string;
    channel: string;
    channel_url: string;
    channel_icon: string;
    published_at: string;
    days_since_published: number;
    thumbnail: string;
    url: string;
    views: string;
    likes: string;
    summary: string;
  }
  
  export interface News {
    id: string;
    title: string;
    description: string;
    publicationDate: string;
    source: string;
    thumbnail: string;
    url: string;
    summary: string;
  }
  

  export interface Article {
    id: string;
    title: string;
    author: string;
    source: string;
    link: string;
    description: string;
    publicationDate: string;
    readingTime: string;
    thumbnail: string;
    summary: string;
  }
  
  
  export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    publicationYear: string;
    coverImage: string;
    amazonLink: string;
    summary: string;
  }
  
  // Function to load data from the generated JSON file
  export const loadDataFromJson = async (): Promise<{
    videoData: Video[];
    articlesData: Article[];
    booksData: Book[];
    newsData: News[];
  }> => {
    try {
      const response = await fetch('/combined_output(3).json');
      const data = await response.json();
      
      // Process YouTube videos
      const videoData: Video[] = data.youtube_videos.map((video: any, index: number) => ({
        id: index.toString(),
        title: video.title,
        description: video.description,
        channel: video.channel,
        channel_url: video.channel_url,
        channel_icon: video.channel_icon,
        published_at: video.published_at,
        days_since_published: video.days_since_published,
        thumbnail: video.thumbnail,
        url: video.url,
        views: video.views,
        likes: video.likes,
        summary: video.summary
      }));
      
      // Process articles
      const articlesData: Article[] = data.articles_and_books.articles?.map((article: any, index: number) => ({
        id: index.toString(),
        title: article.title || "",
        link: article.link || "#",
        author: article.authors[0] || "Unknown",
        // description: article.short_description || "",
        // thumbnail: article.thumbnail || "/api/placeholder/320/180", // Placeholder if no image
        summary: article.summary || "",
        publicationDate: article.publicationDate || "16/09/2023",
        readingTime: article.readingTime || "10 min"
      })) || [];
      
      // Process books
      const booksData: Book[] = data.articles_and_books.books?.map((book: any, index: number) => ({
        id: index.toString(),
        title: book.title || "",
        author: book.authors[0] || "Unknown",
        description: book.description || "",
        publicationYear: book.publicationYear || "09/2023",
        coverImage: book.thumbnail || "/api/placeholder/200/300", // Placeholder if no image
        amazonLink: book.info_link || "#",
        summary: book.summary || "",
      })) || [];

      const newsData: News[] = data.news?.map((newsItem: any, index: number) => ({
        id: index.toString(),
        title: newsItem.title || "",
        description: newsItem.description || "",
        publicationDate: newsItem.published_at || "",
        source: newsItem.source || "Unknown",
        thumbnail: newsItem.thumbnail || "/api/placeholder/320/180",
        url: newsItem.url || "#",
        summary: newsItem.summary || "",
      })) || [];
  
      return { videoData, articlesData, booksData, newsData };
    } catch (error) {
      console.error("Error loading data:", error);
      return { videoData: [], articlesData: [], booksData: [], newsData: [] };
    }
  };
  
  // Fallback data in case JSON loading fails
  export const videoData: Video[] = [
    {
      id: "1",
      title: "Transitioning from Data Analyst to Machine Learning Engineer",
      description: "Learn the key skills and steps to move from data analysis to ML engineering",
      channel: "Tech Career Insights",
      channel_url: "https://www.youtube.com/channel/example1",
      channel_icon: "/api/placeholder/48/48",
      published_at: "2023-08-15T14:30:00Z",
      days_since_published: 245,
      thumbnail: "/api/placeholder/480/360",
      url: "https://www.youtube.com/watch?v=example1",
      views: "45230",
      likes: "3200",
      summary: "This video covers the essential skills, tools, and learning path for data analysts wanting to become machine learning engineers."
    },
    {
      id: "2",
      title: "SQL to Python: Expanding Your Data Skills",
      description: "How to leverage your SQL knowledge to learn Python for machine learning",
      channel: "Data Science Pathways",
      channel_url: "https://www.youtube.com/channel/example2",
      channel_icon: "/api/placeholder/48/48",
      published_at: "2023-09-22T10:15:00Z",
      days_since_published: 207,
      thumbnail: "/api/placeholder/480/360",
      url: "https://www.youtube.com/watch?v=example2",
      views: "32150",
      likes: "2750",
      summary: "This tutorial shows how SQL skills transfer to Python programming, with specific examples for data transformation and analysis."
    }
  ];
  
  export const articlesData: Article[] = [
    {
      id: "1",
      title: "From Data Analysis to Machine Learning: A Complete Roadmap",
      author: "Jennifer Stevens",
      source: "Towards Data Science",
      link: "https://towardsdatascience.com/example1",
      description: "This comprehensive guide outlines the skills, tools, and concepts you need to master to transition from a data analyst to a machine learning engineer role.",
      publicationDate: "Mar 12, 2023",
      readingTime: "12 min",
      thumbnail: "/api/placeholder/320/180",
        summary: "Explore the roadmap for transitioning from data analysis to machine learning, including essential skills and resources."
    },
    {
      id: "2",
      title: "Leveraging SQL Experience for Machine Learning Projects",
      author: "Michael Chang",
      source: "Analytics Vidhya",
      link: "https://analyticsvidhya.com/example2",
      description: "Learn how your SQL expertise can be a strong foundation for understanding data processing in machine learning pipelines.",
      publicationDate: "Jun 5, 2023",
      readingTime: "8 min",
        thumbnail: "/api/placeholder/320/180",
        summary: "Discover how SQL skills can enhance your machine learning projects, with practical examples and insights."
    }
  ];
  
  export const booksData: Book[] = [
    {
      id: "1",
      title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
      author: "Aurélien Géron",
      description: "This practical book provides a great introduction to machine learning concepts using Python libraries, ideal for data analysts looking to transition to ML.",
      publicationYear: "2022",
      coverImage: "/api/placeholder/200/300",
      amazonLink: "https://www.amazon.com/example1",
      summary: "A hands-on guide to machine learning with Python, covering essential libraries and techniques for data analysts."
    },
    {
      id: "2",
      title: "Python for Data Analysis",
      author: "Wes McKinney",
      description: "Master the essential Python tools like pandas for data manipulation and analysis, bridging the gap between SQL-based analysis and ML preparation.",
      publicationYear: "2022",
      coverImage: "/api/placeholder/200/300",
      amazonLink: "https://www.amazon.com/example2",
        summary: "An essential guide to using Python for data analysis, focusing on the pandas library and practical applications."
    }
  ];

  export const newsData: News[] = [
    {
      id: "1",
      title: "Microsoft adds ‘deep reasoning’ Copilot AI for research and data analysis",
      description: "Microsoft introduces Researcher and Analyst, two new agents for Microsoft 365 Copilot.",
      publicationDate: "2025-03-26T03:04:28Z",
      source: "The Verge",
      thumbnail: "https://platform.theverge.com/wp-content/uploads/sites/2/2025/02/STK259_MICROSOFT_COPILOT_3__B.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
      url: "https://www.theverge.com/microsoft/636089/microsoft-365-copilot-reasoning-ai-agents",
      summary: "Microsoft announces two 'deep reasoning' Copilot agents for enhanced research and analysis."
    },
    {
      id: "2",
      title: "How a Cup of Tea Laid the Foundations for Modern Statistical Analysis",
      description: "Scientific experiments run today are based on research practices that evolved out of a British tea-tasting experiment in the 1920s.",
      publicationDate: "2025-03-26T12:00:00Z",
      source: "Wired",
      thumbnail: "https://media.wired.com/photos/67dd4bbb752a4eef7d18ed6d/191:100/w_1280,c_limit/GettyImages-2164195905.jpg",
      url: "https://www.wired.com/story/how-a-cup-of-tea-laid-the-foundations-for-modern-statistical-analysis-adam-kucharski-proof-book/",
      summary: "Statistical analysis foundations from a 1920s tea-tasting experiment still shape today's scientific research."
    }
  ];