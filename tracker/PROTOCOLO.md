# Employee Tracker implementado en Packet Tracer

Fuentes cargadas y releyendas: pt_pc4.js en PC4, pt_server.js en Tracker_Server y pt_pc7.js en PC7. Proyectos: RCD Sender, RCD Tracker y RCD Dashboard, todos JavaScript.

PC4 transmite a 10.3.10.50:5000:
`EMP-001|secuencia|timestamp|x|y|actividad\n`.

El servidor responde en el mismo socket:
`ACK|secuencia|RECIBIDO|alerta\n`.

El relay mantiene una conexión TCP a 10.3.81.17:5001 y añade:
`|zona=<segundos>|alerta=<estado>`.

Se utiliza delimitación por salto de línea y secuencia creciente. Las coordenadas admitidas están entre 0 y 100. El tiempo de zona se calcula con Date.now del servidor, no con el timestamp del cliente. Al salir de zona se reinicia. El límite de alarma es 60 segundos continuos. La transición En reposo→Alta actividad genera alerta inmediata.

La escena de demostración permite verificar ambas alarmas; tras secuencia 80 las coordenadas y actividad son aleatorias. El planificador intenta una emisión cada 1000 ms de reloj. El simulador puede introducir retardo, por lo que no se promete temporización de tiempo real estricto.

PC7 muestra último registro, los diez anteriores y alertas en Programming. Para reiniciar: detener las tres aplicaciones y arrancar PC7, servidor y PC4. La simulación BLE ocurre en la aplicación; Thing es la representación visual del beacon.

Los scripts Python incluidos son prototipos de escritorio y no se usan para demostrar ejecución en PT.
