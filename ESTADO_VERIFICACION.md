# Verificación final — 2 de noviembre de 2026

## Pruebas demostradas mediante MCP

| Prueba | Resultado observado |
|---|---|
| Inventario | 32 dispositivos y 32 enlaces |
| Salud | Sin enlaces físicos caídos ni IPv4 duplicadas |
| WAN R1→R2 | 5/5 respuestas IPv4 |
| PC4→PC7 y PC7→PC4 | 4/4 en ambos sentidos tras corregir routing |
| PC7→Tracker_Server | 4/4 IPv4 |
| PC7→Web_Server IPv6 | 4/4 por Tunnel0 |
| SLAAC en construcción | Direcciones automáticas observadas; persistencia al recargar no superada |
| Servidores IPv6 | Web ::80, DNS ::53, Tracker ::50 y DHCP ::10 |
| OSPFv3 | Vecindades FULL en túnel y tránsito R2–MLSW |
| ACL Web IPv6 | Las ocho combinaciones de sede/tipo/puerto coincidieron con la política |
| Web | Los cuatro clientes recuperaron la página personalizada por el protocolo permitido |
| DNS | nslookup devolvió 10.3.10.80 y 2001:1200:EC13:10::80 |
| Tracker TCP | Mensajes, ACK a PC4 y reenvío a PC7 observados |
| Actividad | CAMBIO_BRUSCO en secuencia 4 |
| Zona restringida | ZONA_RESTRINGIDA desde 60 segundos continuos; también ACK |
| IPsec | SA ESP activa, contadores de cifrado/descifrado y decisiones ESP en Simulation Mode |
| Simulation Mode | Traza del recorrido, decisiones TCP/IP, routing y cifrado |
| Reapertura | 32 dispositivos, programas y servicios conservados |

Los resultados de cierre están identificados en `evidencias/INDICE.md`. Algunos archivos de etapas previas contienen incidencias corregidas; el prefijo final por sí solo no garantiza que sean la última prueba. El ZIP excluye las capturas fallidas de inicialización y conserva su explicación en este documento.

Se exportaron las 13 configuraciones mediante `show running-config` completo a `configuraciones/*_running.txt`; los archivos sin ese sufijo son respaldos startup separados. La salud final no detectó enlaces caídos ni IPv4 duplicadas. El puerto físico R1 FastEthernet0/0 figura sin IP porque las direcciones están en sus subinterfaces.

## Pendientes técnicos y diferencias del diseño

- Tras recargar por la API, Packet Tracer vacía las direcciones IPv6 de PCs y puede dejar sockets en conexión. Se incluye y se prueba inicializar_proyecto_mcp.js, que aplica IPv6 estática de compatibilidad ::11 a ::18 y reinicia las aplicaciones en orden. La reapertura funcional se valida con ese inicializador; no se afirma persistencia autónoma ni cumplimiento del modo SLAAC previsto.
- Las interfaces LAN no quedaron pasivas en la configuración final de OSPFv3 tras las pruebas de compatibilidad. No se afirma esa parte del plan como completada.

- SNMP GET/SET: comunidades RO/RW y ACL SNMP-INTERNAL implementadas; falta registrar respuesta de MIB Browser desde Internal y su bloqueo desde las otras VLAN. No se sustituye esta prueba por la existencia de la configuración.
- El túnel IPv6 sobre IPv4 se conserva en modo ipv6ip. GRE sobre IPsec se probó y perdió la vecindad; se restauró ipv6ip. IPsec AES-256/SHA está demostrado para IPv4, no para protocolo 41.
- La DMZ conserva una superposición IPv4 para servicios y Tracker. El acceso Web IPv6 fue probado. La superposición es una desviación de la DMZ exclusivamente IPv6 indicada por el docente.
- DHCPv6 sin estado lo sirven los gateways de cada sede. El servidor central posee pools DHCPv4 y relays. No se afirma un relay DHCPv6 central.
- La actividad y el beacon se simulan por software. No hay asociación BLE de radio entre Thing y PC4.
- Vista Web bonus: no implementada. El dashboard obligatorio en Programming funciona.
- Se detectó que la exportación startup de la API abrevia la lista de VLAN permitidas. `show interfaces trunk` ofrece el estado vivo completo.
- Después de reabrir se detectó que el filtro IPv4 de gestión interfería con respuestas IPv6. Se retiró de interfaces internas afectadas y se repitieron pings IPv6 con 4/4. La política SNMP restante necesita la prueba interactiva indicada.
- La compatibilidad IPv4 de Guest MAD hacia Web no se considera validada; la matriz principal IPv6 sí pasó.

## Acciones de los integrantes

Completar actas con reuniones y contribuciones reales, ejecutar la prueba MIB Browser, grabar el video de diez minutos con cámaras, publicar Wiki, entregar en Teams y sustentar. Los formatos no acreditan asistencia ni aportes que no se hayan registrado.
