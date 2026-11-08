# Proyecto Final RCD — Equipo 3 (`mvydjdr.net` · $X = 3$)

**Asignatura:** Redes y Comunicación de Datos (2026-2)  
**Integrantes:** Juan David Rubio · Yeison David Niño · Miguel Medina  
**Estado del Proyecto:** ✅ **100% Completado y Verificado (7 de noviembre de 2026)**

---

## 📖 Documentación Principal (Wiki del Proyecto)

👉 **Ir al informe técnico completo con capturas y tablas: [`wiki/README.md`](wiki/README.md)**

El informe en [`wiki/README.md`](wiki/README.md) contiene todos los puntos exigidos en las secciones 2, 3 y 4 del enunciado oficial:
1. **Síntesis de la metodología estructurada** y tabla comparativa de decisiones de diseño.
2. **Esquema de direccionamiento IPv4 e IPv6 ($X=3$)** con tablas completas de subredes WAN (`/30`), LAN/DMZ (`/64` y `/24`) e inventario de equipos.
3. **Respuestas detalladas a todas las preguntas guía** de la sección de Procedimiento (numerales 3 al 8).
4. **Resultados y Análisis de la experimentación** (numerales 1 al 4), incluyendo:
   * Evaluación del flujo bidireccional del **Employee Tracker** (`PC4` $\rightarrow$ `Tracker_Server` $\rightarrow$ `PC7`) con capturas en tiempo real de las alertas `CAMBIO_BRUSCO` y `ZONA_RESTRINGIDA` ($\ge 60\text{ s}$).
   * Evaluación del flujo bidireccional **SNMP (`GET` y `SET`)** desde la red interna (`PC4`) y demostración de bloqueo (`SNMP request timed out`) desde la VLAN de invitados (`PC1`).
5. **Retos técnicos por capas TCP/IP**, conclusiones, recomendaciones y **referencias en formato IEEE**.
6. **Roles, actas y matriz de contribuciones verificables** de cada integrante ([`actas/ACTA_01.md`](actas/ACTA_01.md) y [`actas/MATRIZ_CONTRIBUCIONES.md`](actas/MATRIZ_CONTRIBUCIONES.md)).
7. **Declaración obligatoria de uso de IA** con el enlace de la sesión de trabajo y validación empírica ([`DECLARACION_IA.md`](DECLARACION_IA.md)).

---

## 📂 Estructura de Entregables del Repositorio

* **[`Proyecto_Final_RCD_Equipo3.pkt`](Proyecto_Final_RCD_Equipo3.pkt)** y **[`Proyecto_FINAL.pkt`](Proyecto_FINAL.pkt)**: Montaje final en Cisco Packet Tracer 9.0.1 con los 32 dispositivos, 32 enlaces, servicios, SNMP y aplicaciones del Tracker 100% configuradas.
* **[`wiki/README.md`](wiki/README.md)**: Documentación técnica completa lista para revisión y publicación en la Wiki de GitHub.
* **[`direccionamiento_y_rubrica.xlsx`](direccionamiento_y_rubrica.xlsx)**: Libro Excel con las hojas `Resumen`, `Direccionamiento`, `WAN`, `Inventario`, `Pruebas` y `Rubrica`.
* **[`configuraciones/`](configuraciones)**: Archivos `.txt` con la exportación completa de `show running-config` (`*_running.txt`) de los 13 routers y switches.
* **[`evidencias/`](evidencias)**: Capturas de pantalla auténticas de SNMP (`GET`, `SET`, `Timeout`), consolas en vivo del Employee Tracker, trazas de *Simulation Mode*, contadores IPsec y matriz de ACLs.
* **[`tracker/`](tracker)**: Código fuente en JavaScript (`pt_pc4.js`, `pt_server.js`, `pt_pc7.js`) instalado en los equipos de Packet Tracer.
* **[`actas/`](actas)**: Actas de reunión y evaluación del equipo (`ACTA_01.md`) y matriz de contribuciones (`MATRIZ_CONTRIBUCIONES.md`).
* **[`video/`](video)**: Guion cronometrado de 10 minutos (`GUION_10_MIN.md`) y lista de chequeo para grabación y sustentación (`CHECKLIST_SUSTENTACION.md`).
* **[`DECLARACION_IA.md`](DECLARACION_IA.md)**: Registro transparente de herramientas de IA consultadas, enlace de conversación y pruebas de validación.

---

## 🔑 Credenciales de Laboratorio Configuradas

* **Usuario administrativo IOS / SSHv2:** `admin` · **Contraseña:** `Rcd3Admin2026`
* **Contraseña de modo privilegiado (`enable secret`):** `Rcd3Enable2026`
* **Llave precompartida VPN IPsec (PSK):** `RCD3vpn2026`
* **Comunidades SNMPv2c:** `RCD3-RO` (Solo lectura) · `RCD3-RW` (Lectura/Escritura)
