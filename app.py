from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY') 
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_response():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        raw_response = chat.send_message(user_input)
        response = raw_response.text
        
        # Format response for better readability
        formatted_response = format_response(response)
        
        return jsonify({"response": formatted_response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

def format_response(response):
    """
    Function to format the response into clear paragraphs.
    Adds HTML tags like <p> and <br> for clarity.
    """
    paragraphs = response.split('\n')  # Split text into paragraphs if any
    formatted_response = "".join([f"<p>{para.strip()}</p>" for para in paragraphs if para.strip()])
    return formatted_response

if __name__ == '__main__':
    app.run(debug=True)
