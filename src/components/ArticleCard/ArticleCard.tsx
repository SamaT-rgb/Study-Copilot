import React, { useState } from 'react';
import { Article } from '../../data';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="flex flex-row gap-6 border-b border-gray-200 pb-6 w-full">
      {/* Article image/thumbnail */}
      {/* <div className="w-[320px] h-[180px] overflow-hidden rounded-lg shrink-0">
        <img
          src={article.thumbnail || "/api/placeholder/320/180"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Article details */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          {article.title}
        </h3>

        {/* Meta info */}
        <div className="text-sm text-gray-500 flex items-center gap-3">
          <span>Published in {article.publicationDate}</span>
          <span>•</span>
          <span>{article.publicationDate}</span>
          <span>•</span>
          {/* <span>{article.claps?.toLocaleString()} Claps</span> */}
        </div>

        {/* Author info */}
        <div className="flex items-center gap-2 mt-1">
          {/* <img
            // src={article.author_avatar || "/api/placeholder/24/24"}
            alt={article.author}
            className="w-6 h-6 rounded-full"
          /> */}
          <p className="text-sm text-gray-700">{article.author}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {article.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <a
            href={article.link}
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
            {article.summary}
          </div>
        )}
      </div>
    </div>
  );
};
