# Proyecto Final RCD — Equipo 3

Repositorio de trabajo público para continuar la implementación. Última preparación de la transferencia, 6 de noviembre de 2026.

**Empezar por [PENDIENTES_Y_ESTUDIO.md](PENDIENTES_Y_ESTUDIO.md).** Contiene apertura con y sin MCP, pendientes priorizados, criterios de cierre, ruta de estudio y pruebas de regresión.

```bash
git clone https://github.com/rubxo/rcd-equipo3.git
cd rcd-equipo3
```

Abrir el `.pkt` principal en Cisco Packet Tracer. El programa y el MCP se instalan por separado. Para colaborar desde otra cuenta se puede hacer fork y pull request o solicitar acceso como colaborador a Juan.

La copia `.pkt` incluida fue modificada localmente el 4 de noviembre. Las pruebas y configuraciones exportadas conservadas corresponden al 2 de noviembre. Repetirlas sobre el archivo recibido antes de dar por validada su versión actual. La preparación para GitHub comprobó archivos e integridad, y requiere una nueva ejecución de red para actualizar esa evidencia.

Los originales del enunciado y rúbrica están en `fuentes/`. El respaldo anterior y los manifiestos del paquete del 2 de noviembre están en `historico/`. El manifiesto de la transferencia actual está en la raíz. Las credenciales incluidas pertenecen al laboratorio académico.

Juan David Rubio · Yeison David Niño · Miguel Medina  
Dominio: `mvydjdr.net` · X=3 · Corte: 2 de noviembre de 2026

Abrir `Proyecto_Final_RCD_Equipo3.pkt` en Cisco Packet Tracer. El archivo fue guardado y reabierto mediante MCP. Contiene 30 equipos del diseño y dos dispositivos de distribución eléctrica creados por PT: 32 dispositivos y 32 enlaces.

## Uso inmediato

1. Esperar la convergencia de STP y OSPFv3 al abrir. Mediante MCP ejecutar el contenido de configuraciones/inicializar_proyecto_mcp.js; aplica IPv6 estática de compatibilidad a los PCs y reinicia los sockets. Esta necesidad de inicialización es una limitación de persistencia observada en PT, no una prueba de apertura autónoma perfecta.
2. En PC4, Programming > **RCD Sender (JavaScript)** muestra TX y ACK.
3. En Tracker_Server, **RCD Tracker (JavaScript)** muestra recepción, tiempo en zona y alertas.
4. En PC7, **RCD Dashboard (JavaScript)** muestra último registro, historial y alertas.
5. Las aplicaciones quedaron guardadas en ejecución. Para reiniciar la demostración, detener las tres y arrancar PC7, Tracker_Server y PC4 en ese orden.
6. En PC1/PC5 abrir `http://mvydjdr.net`; en PC4/PC7 abrir `https://mvydjdr.net`. Para asegurar la prueba IPv6 usar `http://[2001:1200:EC13:10::80]` o su variante HTTPS.

La demostración Tracker comienza con cambio brusco en secuencia 4, entra en zona restringida en secuencia 6 y permanece allí hasta secuencia 80. Después genera coordenadas y actividad aleatorias. El beacon es una fuente simulada por software; no se afirma detección de una radio BLE física.

## Archivos

- `direccionamiento_y_rubrica.xlsx`: direccionamiento y matriz de pruebas.
- `configuraciones/`: exportaciones IOS del proyecto.
- `evidencias/`: resultados auténticos, direcciones, servicios, ACL, IPsec, Tracker y traza por capas.
- `wiki/README.md`: informe técnico listo para publicar localmente.
- `tracker/pt_*.js`: fuentes exactas de Programming instaladas en el .pkt. Los .py son prototipos de referencia para Python de escritorio, no programas cargados en PT.
- `actas/`: formatos y propuesta de responsabilidades que deben completar los integrantes con hechos reales.
- `video/`: guion y checklist.
- `DECLARACION_IA.md`: herramienta, instrucciones y validación.

## Credenciales de laboratorio

Usuario IOS `admin`, clave `Rcd3Admin2026`, enable `Rcd3Enable2026`, PSK `RCD3vpn2026`, comunidades `RCD3-RO` y `RCD3-RW`.

## Límites de la entrega local

SNMP está configurado con comunidades y filtro por origen, pero los GET/SET con MIB Browser requieren la comprobación interactiva final. La vista Web bonus del Tracker no se incluyó porque PC-PT rechaza HTTPServer en Programming. El túnel IPv6 funciona; el cifrado demostrado es IPsec sobre tráfico IPv4. No se afirma que protocolo 41 esté cifrado. Ver `ESTADO_VERIFICACION.md`.

Este repositorio publica el material de trabajo por autorización del usuario del 6 de noviembre de 2026. La entrega académica en Teams y el video siguen pendientes. El enunciado fija entrega en Teams el 10 de noviembre de 2026 a las 23:00 y sustentación el 11 de noviembre a las 09:00.
