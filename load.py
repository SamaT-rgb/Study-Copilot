import json
import re
import os
import requests
from datetime import datetime, timezone
from googleapiclient.discovery import build
import google.generativeai as genai
from dotenv import load_dotenv
from warnings import filterwarnings

filterwarnings('ignore')
load_dotenv()

# API Keys
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')  # Or hardcode if preferred
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
API_URL = 'https://rnd.tnq.co.in/api/chat/completions'

# ----------- USER DATA INPUT -----------
user_data = {
    "current_position": "Data Analyst",
    "current_skills": ["Excel", "SQL", "Tableau"],
    "desired_position": "Machine Learning Engineer"
}

# ----------- YOUTUBE VIDEO SECTION -----------
def search_youtube_videos(api_key, query, max_results=6):
    youtube = build('youtube', 'v3', developerKey=api_key)
    search_response = youtube.search().list(
        q=query, part='snippet', type='video', maxResults=max_results
    ).execute()

    videos = []
    for item in search_response['items']:
        video_id = item['id']['videoId']
        title = item['snippet']['title']
        description = item['snippet'].get('description', '')
        channel = item['snippet']['channelTitle']
        channel_id = item['snippet']['channelId']
        published_at = item['snippet']['publishedAt']
        thumbnail = item['snippet']['thumbnails']['high']['url']
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        channel_url = f"https://www.youtube.com/channel/{channel_id}"

        video_response = youtube.videos().list(part='statistics', id=video_id).execute()
        stats = video_response['items'][0]['statistics']
        views = stats.get('viewCount', '0')
        likes = stats.get('likeCount', '0')

        channel_response = youtube.channels().list(part='snippet', id=channel_id).execute()
        channel_icon = channel_response['items'][0]['snippet']['thumbnails']['default']['url']

        published_date = datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        days_since_published = (now - published_date).days

        videos.append({
            'title': title,
            'description': description,
            'channel': channel,
            'channel_url': channel_url,
            'channel_icon': channel_icon,
            'published_at': published_at,
            'days_since_published': days_since_published,
            'thumbnail': thumbnail,
            'url': video_url,
            'views': views,
            'likes': likes
        })
    return videos

def generate_summary(api_key, title, description):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name="gemini-1.5-pro")
    prompt = f"Title: {title}\nDescription: {description}\n\nProvide a concise summary of the video content."
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Summary generation failed: {str(e)}"

# ----------- ARTICLE/BOOK SECTION -----------
def chat_with_model(api_key, prompt_content):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt_content}],
        "temperature": 0.7
    }
    response = requests.post(API_URL, headers=headers, json=data)
    return response.json()

# def fetch_articles_and_books(user_data):
#     skill_prompt_template = """
#     You are a career transition expert.
#     Given:
#     - Current Position: {current_position}
#     - Current Skills: {current_skills}
#     - Desired Position: {desired_position}

#     I require the Articles and the books for learning the skills for the transition from Current Position to Desired Position.
#     The output should be like all the books data should be together and all the articles should be together in the format of JSON.
#     """

#     formatted_prompt = skill_prompt_template.format(
#         current_position=user_data["current_position"],
#         current_skills=user_data["current_skills"],
#         desired_position=user_data["desired_position"]
#     )
#     result = chat_with_model(OPENAI_API_KEY, formatted_prompt)
#     content = result['choices'][0]['message']['content']

#     match = re.search(r'json(.*?)$', content, re.DOTALL | re.IGNORECASE)
#     if match:
#         json_str = match.group(1).strip()
#         try:
#             return json.loads(json_str)
#         except json.JSONDecodeError as e:
#             return {"error": f"JSON parsing failed: {str(e)}"}
#     return {"error": "No JSON found in response"}


def fetch_articles_and_books(user_data):
    skill_prompt_template = """
    You are a career transition expert and a research assistant.

    Given:
    - Current Position: {current_position}
    - Current Skills: {current_skills}
    - Desired Position: {desired_position}

    Return a **curated list of real and high-quality Articles and Books** that can help in this career transition.

    Each **article** should include:
    - title
    - link (must be a valid, working URL from a reputable site like Medium, TowardsDataScience, Analytics Vidhya, etc.)
    - author (if available)
    - summary (2-3 lines)
    - thumbnail (only if it's publicly available)
    - short description

    Each **book** should include:
    - title
    - author
    - summary (2-3 lines)
    - link (Amazon/Goodreads preferred)
    - thumbnail (if publicly available)
    - short description

    The response **must be valid JSON** with two keys: "articles" and "books". Do not include anything outside the JSON block.
    """



    formatted_prompt = skill_prompt_template.format(
        current_position=user_data["current_position"],
        current_skills=user_data["current_skills"],
        desired_position=user_data["desired_position"]
    )
    result = chat_with_model(OPENAI_API_KEY, formatted_prompt)
    content = result['choices'][0]['message']['content']

    # New: Try extracting valid JSON by slicing from first "{" to last "}"
    start = content.find('{')
    end = content.rfind('}')
    if start != -1 and end != -1 and start < end:
        json_str = content[start:end+1]
        try:
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            return {"error": f"JSON parsing failed: {str(e)}", "raw_response": content}

    return {"error": "No JSON found in response", "raw_response": content}


# ----------- MAIN COMBINED EXECUTION -----------
def main():
    query = f"{user_data['current_position']} to {user_data['desired_position']} with {' '.join(user_data['current_skills'])}"

    # Get YouTube videos + summaries
    videos = search_youtube_videos(YOUTUBE_API_KEY, query)
    for video in videos:
        video['summary'] = generate_summary(GEMINI_API_KEY, video['title'], video['description'])

    # Get Articles and Books
    resources = fetch_articles_and_books(user_data)

    # Combined response
    output = {
        'query': query,
        'youtube_videos': videos,
        'articles_and_books': resources
    }

    print(json.dumps(output, indent=2))

    with open('combined_output(2).json', 'w') as f:
        json.dump(output, f, indent=2)

if __name__ == '__main__':
    main()