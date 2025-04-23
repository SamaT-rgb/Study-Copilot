import React, { useState } from 'react';
import { News } from '../../data';

interface NewsCardProps {
  news: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [showSummary, setShowSummary] = useState(false);
  console.log("Data: ", news);

  return (
    <div className="flex flex-row gap-6 border-b border-gray-200 pb-6 w-full">
      {/* News image */}
      <div className="w-[120px] h-[100px] overflow-hidden rounded-lg shrink-0">
        <img
          src={news.thumbnail || "/api/placeholder/120/100"}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* News content */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          {news.title}
        </h3>

        {/* Meta */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>{news.source}</span>
          <span>•</span>
          <span>{news.publicationDate}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {news.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#1c40ca] text-white text-sm font-medium rounded-md hover:bg-[#1636ac]"
          >
            Read Now
          </a>
          <button
            onClick={() => setShowSummary((prev) => !prev)}
            className="px-4 py-1.5 border border-[#1c40ca] text-[#1c40ca] text-sm font-medium rounded-md hover:bg-[#f0f4ff]"
          >
            AI Summary
          </button>
        </div>

        {/* Summary */}
        {showSummary && (
          <div className="mt-3 bg-gray-50 p-3 rounded-md border border-gray-200 text-sm text-gray-800">
            {news.summary}
          </div>
        )}
      </div>
    </div>
  );
};
