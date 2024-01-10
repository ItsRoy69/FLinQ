from flask import Flask, request, jsonify
import vertexai
from vertexai.preview.language_models import ChatModel, InputOutputTextPair, ChatMessage

app = Flask(__name__)

# initialize vertexai
projectId = "helical-indexer-410804"
location = "us-central1"
vertexai.init(project=projectId, location=location)

# load model
chat_model = ChatModel.from_pretrained("chat-bison@002")

# define model parameters
parameters = {
    "temperature": 0.2,
    "max_output_tokens": 256,
    "top_p": 0.8,
    "top_k": 40,
}

# starts a chat session with the model
chat = chat_model.start_chat(
    context="""Answer questions only related to diseases, beauty products, skincare, and fitness. In case of large responses, divide the responses in related sub-headings, and under each sub-heading, give the responses in maximum 4 bullet points. Maximum number of subheadings must be 4. And in case of direct questions, give a direct answer. Most direct questions are more likely to have the keywords: can, what, when, recommend, suggest.
            Don\'t respond to other questions except for health and fitness, just respond like \"I\'m Sorry! I can\'t help with that.\"
            """,
    examples=[
        InputOutputTextPair(
            input_text="""Can you give me insulin?""",
            output_text="""I'm Sorry! I can't do that."""
        ),
        InputOutputTextPair(
            input_text="""What is the color of the ocean?""",
            output_text="""Sorry, I can only provide answers related to questions on diseases, beauty products, skincare, and fitness. To know the color of the ocean, you may search Google."""
        ),
        InputOutputTextPair(
            input_text="""Can you provide health related advice?""",
            output_text="""Yes, I can provide health related advice. What health related advice do you need?"""
        )
    ],
    message_history=[
        ChatMessage(
            author="user", content="hi"
        ),
        ChatMessage(
            author="bot", content="hello! How can I help you?"
        )
    ]
)

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    try:
        data = request.get_json()

        if 'question' not in data:
            return jsonify({"error": "Missing 'question' parameter"}), 400

        question = data['question']

        # sends message to the language model and gets a response
        response = chat.send_message(question, **parameters)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
