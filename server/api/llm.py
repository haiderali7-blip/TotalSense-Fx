import os 
import requests
import json
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("LLM_API_KEY")
API_URL = os.getenv("LLM_API_URL")
MODEL = os.getenv("LLM_MODEL")

system_prompt = """You are the core sentiment engine for "TotalSense FX", an institutional-grade Forex analytics platform. 
Your role is to analyze current and upto-dated financial text (news headlines, central bank transcripts, social media, economic data) and extract precise, unbiased market sentiment for foreign exchange markets.

Guidelines:
1. Objectivity: Disregard hyperbole, memes, and sensationalism. Focus strictly on monetary policy, macroeconomics, geopolitical shifts, and market flows.
2. Relativity: Remember Forex is traded in pairs. Good news for the USD often implies bearish pressure on EUR/USD.
3. Scoring Metric: 
   - Sentiment Score: Continuous scale from -1.00 (Extremely Bearish) to +1.00 (Extremely Bullish), where 0.00 is Neutral.
   - Impact Level: Low, Medium, High (based on volatility potential).
"""


def call_llm(prompt):
    messages=[
       {
          "role":"system",
          "content": system_prompt
       },
       {
          "role":"user",
          "content": f"""{prompt}
          Respond using JSON with the following fields:
          target_asset: 
          overview:
          market_conditions:
          Technical_analysis:
          market_scenarios:
          next24hours:
          bottomLine: One sentence explaining all analysis
          
          do not output nested json. and don't response a short description
          """
       }
    ]
    headers={
       "Authorization": f"Bearer {API_KEY}",
       "Content-Type" : "application/json"
    }
    
    payload={
       "model":MODEL,
       "messages": messages,
       "temperature": 0.3
    }
    
    response = requests.post(API_URL,headers=headers,json=payload)
    response.raise_for_status()
    data = response.json()
    response_string = data["choices"][0]["message"]["content"]
    result_json = json.loads(response_string)
    return result_json
    
    