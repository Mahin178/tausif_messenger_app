from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

users = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    if username in users:
        return jsonify({'success': False, 'message': 'Username already taken'}), 400
    users.append(username)
    return jsonify({'success': True, 'username': username}), 200

@socketio.on('message')
def handle_message(msg):
    emit('message', msg, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)

if __name__ == '__main__':
    socketio.run(app, debug=True)
