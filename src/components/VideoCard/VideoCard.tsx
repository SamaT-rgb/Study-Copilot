import React, { useState } from 'react';
import { Video } from '../../data';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="flex flex-row gap-6 border-b border-gray-200 pb-6 w-full">
      {/* Thumbnail */}
      <div className="w-[320px] h-[240px] overflow-hidden rounded-lg shrink-0">
        <img
          src={video.thumbnail || "/api/placeholder/320/180"}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-2">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          {video.title}
        </h3>

        {/* Meta info */}
        <div className="text-sm text-gray-500 flex items-center gap-3">
          <span>{parseInt(video.views).toLocaleString()} Views</span>
          <span>•</span>
          <span>{video.days_since_published} hours ago</span>
          <span>•</span>
          <span>40 Likes</span> {/* Hardcoded for now */}
        </div>

        {/* Channel info */}
        <div className="flex items-center gap-2 mt-1">
          <img
            src={video.channel_icon || "/api/placeholder/24/24"}
            alt={video.channel}
            className="w-6 h-6 rounded-full"
          />
          <p className="text-sm text-gray-700">{video.channel}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {video.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#1c40ca] text-white text-sm font-medium rounded-md hover:bg-[#1636ac]"
          >
            Watch Now
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
            {video.summary}
          </div>
        )}
      </div>
    </div>
  );
};
