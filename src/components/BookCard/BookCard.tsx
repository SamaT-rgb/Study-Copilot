import React, { useState } from 'react';
import { Book } from '../../data';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="flex flex-row gap-6 border-b border-gray-200 pb-6 w-full">
      {/* Book cover */}
      <div className="w-[120px] h-[180px] overflow-hidden rounded-lg shrink-0">
        <img
          src={book.coverImage || "/api/placeholder/120/180"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book details */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          {book.title}
        </h3>

        {/* Author and year */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>by {book.author}</span>
          <span>•</span>
          <span>{book.publicationYear}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {book.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <a
            href={book.amazonLink}
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
            {book.summary}
          </div>
        )}
      </div>
    </div>
  );
};
