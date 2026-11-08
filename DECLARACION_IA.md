# Declaración Obligatoria de Uso de Inteligencia Artificial (Sección 4.6)

## 1. Herramientas de IA Consultadas
* **ChatGPT / OpenAI Codex (con integración MCP de Cisco Packet Tracer)**
* **Google Gemini (Asistente de programación y documentación en el entorno de trabajo local)**

## 2. Enlace de Conversación e Instrucciones Suministradas
* **Enlace público de la conversación en ChatGPT:**  
  👉 [https://chatgpt.com/s/cx_6aee127155d48191abedc299873f795d](https://chatgpt.com/s/cx_6aee127155d48191abedc299873f795d)

### Transcripción de las instrucciones y consultas realizadas por el equipo:
1. **Diseño, montaje inicial y automatización con MCP:**
   > *"con el mcp, plantea y realiza eso"*  
   > *"PLEASE IMPLEMENT THIS PLAN: # Proyecto final RCD Equipo 3"* (especificando $X=3$, dominio `mvydjdr.net`, integrantes Juan David Rubio, Yeison David Niño y Miguel Medina, direccionamiento VLSM IPv4 `/30` en WAN, prefijos IPv6 `/64` por VLAN, EIGRP AS 3, OSPFv2/v3 Proceso 3, túnel IPv6, IPsec, ACLs, SNMP y Employee Tracker).  
   > *"revisa de nuevo, ya abri el proyecto y continua"*  
   > *"continua y acaba"*
2. **Revisión final, cierre de SNMP, pruebas interactivas en MIB Browser y consolidación de la Wiki:**
   > *"AYUDAME BAJANDO ESTE PROYECTO DE GIT, Y HACER UNA EXPLICACION EN GENERAL DE TODO LO QUE SE HA ECHO Y ESO"*  
   > *"Que hace falta, mira esta es la guia del laboratorio"*  
   > *"Pero como tal en la implementacion del laboratorio en cisco, que hace falta para hacerlo?"*  
   > *"A ver ayudame a terminar de configurar lo que falta paso a paso"*  
   > *"Listo, actualiza la wiki y completa todo lo que falte y añade este que es el montaje final con todo lo que me dijiste para que quedara el 100% terminado"*

## 3. Validación de la Veracidad y Aplicación a la Solución Alcanzada
El equipo validó empíricamente cada sugerencia técnica y fragmento de configuración directamente dentro de **Cisco Packet Tracer 9.0.1**:

1. **Validación de Enrutamiento y Redistribución:** Se verificó con `show ip route` y pruebas de `ping` bidireccional entre `PC4` (Bogotá) y `PC7` (Madrid) que el ajuste de distancia administrativa (`distance ospf external 175` en `ISP_FL`, `ISP_BOG` e `ISP_ESP`) eliminó el bucle de redistribución entre `EIGRP 3` y `OSPF 3`, y que la ruta estática específica hacia `10.3.81.0/24` en `R2_ESP` resolvió el retorno fuera del bloque sumarizado `/17`.
2. **Validación de Sintaxis IOS y Pruebas SNMP en MIB Browser:** Durante la configuración final en el CLI de `SW1_BOG`, `MLSW_MAD` y `R2_ESP`, el equipo detectó que el IOS simulado del switch 2960 rechazaba el parámetro de ACL al final del comando `snmp-server community RCD3-RO RO 80` (`% Invalid input detected at '^' marker`). Se corrigió aplicando la sintaxis estándar soportada (`snmp-server community RCD3-RO RO` y `snmp-server community RCD3-RW RW`) y delegando el filtrado por origen a la ACL extendida `SNMP-INTERNAL`. Posteriormente, se comprobó en el **MIB Browser**:
   * Lectura exitosa (`GET`) de `sysName.0` (`R1_BOG`) desde `PC4` (`evidencias/snmp_get_pc4.jpg`).
   * Escritura exitosa (`SET`) de `sysLocation.0` (`Sede_Bogota_RCD3`) desde `PC4` (`evidencias/snmp_set_pc4.jpg`).
   * Bloqueo efectivo (`SNMP request timed out`) al consultar desde `PC1` en la VLAN 35 Guest (`evidencias/snmp_timeout_bloqueado_pc1.jpg`).
3. **Validación en Tiempo Real del Employee Tracker:** Se ejecutaron en orden las aplicaciones JavaScript en `PC7` (`RCD Dashboard`), `Tracker_Server` (`RCD Tracker`) y `PC4` (`RCD Sender`), verificando el envío de tramas TCP por el puerto `5000`, la respuesta `ACK`, el disparo de la alerta `CAMBIO_BRUSCO` en la secuencia 4, el disparo de la alerta `ZONA_RESTRINGIDA` al superar los 60 segundos continuos en la coordenada `(90,90)` y la recepción en el Dashboard de `PC7` por el puerto `5001`.
