import random
import socket
import time

SERVER = "10.3.10.50"
PORT = 5000
activities = ["En reposo", "En movimiento", "Alta actividad"]

for seq in range(1, 1000000):
    x, y = random.randint(0, 100), random.randint(0, 100)
    activity = activities[seq % len(activities)]
    msg = f"EMP-001|{seq}|{int(time.time())}|{x}|{y}|{activity}\n"
    try:
        with socket.create_connection((SERVER, PORT), timeout=1) as sock:
            sock.sendall(msg.encode())
            print(sock.recv(1024).decode().strip())
    except OSError as exc:
        print("SIN_ACK", exc)
    time.sleep(1)

