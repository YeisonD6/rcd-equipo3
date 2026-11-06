import socket
from collections import deque

history = deque(maxlen=10)
with socket.socket() as server:
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(("0.0.0.0", 5001))
    server.listen()
    print("Dashboard PC7 escuchando TCP 5001")
    while True:
        conn, _ = server.accept()
        with conn:
            line = conn.recv(2048).decode().strip()
            if not line:
                continue
            history.append(line)
            print("\nÚLTIMO REGISTRO")
            print(line)
            print("HISTORIAL")
            for item in history:
                print(item)

