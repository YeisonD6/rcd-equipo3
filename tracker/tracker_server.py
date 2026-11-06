import socket
import threading
import time

LISTEN_HOST = "0.0.0.0"
LISTEN_PORT = 5000
DASHBOARD_HOST = "10.3.81.17"
DASHBOARD_PORT = 5001
state = {"last_activity": None, "zone_since": None}

def process(line: str) -> str:
    employee, seq, timestamp, x, y, activity = line.strip().split("|")
    x, y = float(x), float(y)
    now = time.time()
    in_zone = x >= 80 and y >= 80
    if in_zone and state["zone_since"] is None:
        state["zone_since"] = now
    if not in_zone:
        state["zone_since"] = None
    zone_seconds = int(now - state["zone_since"]) if state["zone_since"] else 0
    alerts = []
    if zone_seconds >= 60:
        alerts.append("ZONA_RESTRINGIDA")
    if state["last_activity"] == "En reposo" and activity == "Alta actividad":
        alerts.append("CAMBIO_BRUSCO")
    state["last_activity"] = activity
    alert = ",".join(alerts) if alerts else "SIN_ALERTA"
    forward = f"{line.strip()}|zona={zone_seconds}|alerta={alert}"
    try:
        with socket.create_connection((DASHBOARD_HOST, DASHBOARD_PORT), timeout=1) as dash:
            dash.sendall((forward + "\n").encode())
    except OSError:
        pass
    return f"ACK|{seq}|RECIBIDO|{alert}\n"

def handle(conn):
    with conn:
        data = conn.recv(2048).decode()
        if data:
            conn.sendall(process(data).encode())

with socket.socket() as server:
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((LISTEN_HOST, LISTEN_PORT))
    server.listen()
    print(f"Tracker escuchando TCP {LISTEN_PORT}")
    while True:
        conn, _ = server.accept()
        threading.Thread(target=handle, args=(conn,), daemon=True).start()

