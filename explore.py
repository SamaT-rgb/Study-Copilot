import json
import requests
import feedparser
from googleapiclient.discovery import build
from datetime import datetime, timezone
import urllib.parse

# Function to search YouTube videos
def search_youtube_videos(api_key, query, max_results=6):
    youtube = build('youtube', 'v3', developerKey=api_key)
    search_response = youtube.search().list(
        q=query,
        part='snippet',
        type='video',
        maxResults=max_results,
        videoCaption='any',
        relevanceLanguage='en'
    ).execute()

    videos = []
    for item in search_response['items']:
        video_id = item['id']['videoId']
        snippet = item['snippet']
        title = snippet['title']
        description = snippet.get('description', '')
        channel = snippet['channelTitle']
        channel_id = snippet['channelId']
        published_at = snippet['publishedAt']
        thumbnail = snippet['thumbnails']['high']['url']
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        channel_url = f"https://www.youtube.com/channel/{channel_id}"

        # Fetch video statistics
        video_response = youtube.videos().list(
            part='statistics',
            id=video_id
        ).execute()
        stats = video_response['items'][0]['statistics']
        views = stats.get('viewCount', '0')
        likes = stats.get('likeCount', '0')

        # Calculate days since published
        published_date = datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%SZ")
        published_date = published_date.replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        days_since_published = (now - published_date).days

        video_info = {
            'title': title,
            'description': description,
            'channel': channel,
            'channel_url': channel_url,
            'published_at': published_at,
            'days_since_published': days_since_published,
            'thumbnail': thumbnail,
            'url': video_url,
            'views': views,
            'likes': likes
        }
        videos.append(video_info)
    return videos

# Function to search books using Google Books API
def search_books(query, max_results=6):
    encoded_query = urllib.parse.quote(query)
    url = f"https://www.googleapis.com/books/v1/volumes?q={encoded_query}&maxResults={max_results}&langRestrict=en"
    response = requests.get(url)
    books = []
    if response.status_code == 200:
        data = response.json()
        for item in data.get('items', []):
            volume_info = item.get('volumeInfo', {})
            title = volume_info.get('title', 'No Title')
            authors = volume_info.get('authors', [])
            description = volume_info.get('description', 'No Description')
            info_link = volume_info.get('infoLink', 'No Link')
            image_links = volume_info.get('imageLinks', {})
            thumbnail = image_links.get('thumbnail', 'No Thumbnail')
            book_info = {
                'title': title,
                'authors': authors,
                'description': description,
                'info_link': info_link,
                'thumbnail': thumbnail
            }
            books.append(book_info)
    return books

# Function to search academic articles using arXiv API with summaries
def search_arxiv_articles(query, max_results=6):
    base_url = 'http://export.arxiv.org/api/query?'
    encoded_query = urllib.parse.quote(query)
    search_query = f'search_query=all:{encoded_query}&start=0&max_results={max_results}'
    response = feedparser.parse(base_url + search_query)
    articles = []
    for entry in response.entries:
        title = entry.title
        summary = entry.summary  # The summary is the description in arXiv
        authors = [author.name for author in entry.authors]
        link = entry.link
        article_info = {
            'title': title,
            'summary': summary,  # Summary of the article
            'authors': authors,
            'link': link
        }
        articles.append(article_info)
    return articles

# Function to search news articles using NewsAPI with summaries
def search_news(api_key, query, max_results=6):
    encoded_query = urllib.parse.quote(query)
    url = f"https://newsapi.org/v2/everything?q={encoded_query}&pageSize={max_results}&language=en&apiKey={api_key}"
    response = requests.get(url)
    news_list = []
    if response.status_code == 200:
        data = response.json()
        for article in data.get('articles', []):
            title = article.get('title', 'No Title')
            description = article.get('description', 'No Description')
            summary = article.get('description', 'No Summary')  # Adding the description as summary
            source = article.get('source', {}).get('name', 'Unknown Source')
            published_at = article.get('publishedAt', '')
            url = article.get('url', '')
            news_info = {
                'title': title,
                'description': description,
                'summary': summary,  # Adding summary for the article
                'source': source,
                'published_at': published_at,
                'url': url
            }
            news_list.append(news_info)
    return news_list

# Main execution
def main():
    # Replace with your actual API keys
    YOUTUBE_API_KEY = 'Your_YT_API_KEY'
    NEWS_API_KEY = '8a62450c8a4f47b4aa756fd20b63aea4'

    query = input("Enter a topic to explore: ")

    print("Fetching YouTube videos...")
    youtube_videos = search_youtube_videos(YOUTUBE_API_KEY, query)

    print("Fetching books...")
    books = search_books(query)

    print("Fetching academic articles...")
    articles = search_arxiv_articles(query)

    print("Fetching news articles...")
    news = search_news(NEWS_API_KEY, query)

    # Compile all data
    explore_data = {
        'query': query,
        'youtube_videos': youtube_videos,
        'books': books,
        'articles': articles,
        'news': news
    }

    # Output results
    print(json.dumps(explore_data, indent=4))

    # Optional: Save to a file
    with open('explore_results.json', 'w') as f:
        json.dump(explore_data, f, indent=4)

# Run the main function
if _name_ == '_main_':
    main()
