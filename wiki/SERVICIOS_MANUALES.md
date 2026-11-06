# Operación y reproducción

Los servicios DNS, HTTP/HTTPS y los programas Tracker ya están cargados en el .pkt.

## Web y DNS

En DNS_Server > Services > DNS revisar mvydjdr.net y www.mvydjdr.net. En Web_Server > Services > HTTP revisar HTTP/HTTPS e index.html. La dirección IPv6 del Web es 2001:1200:EC13:10::80. La resolución A y AAAA se prueba con `nslookup mvydjdr.net`.

## Reiniciar Tracker

Detener RCD Sender en PC4, RCD Tracker en Tracker_Server y RCD Dashboard en PC7. Arrancar primero Dashboard, después Tracker y finalmente Sender. Observar ACK, alerta en secuencia 4 y zona restringida después de 60 segundos. Los archivos pt_*.js son las fuentes de Programming; los .py son referencias para una red Python externa.

## Prueba SNMP pendiente

1. PC4 > Desktop > MIB Browser: agente R1, 10.3.80.1, versión v2c, RO=RCD3-RO y RW=RCD3-RW.
2. GET sysName.0, OID 1.3.6.1.2.1.1.5.0.
3. SET sysLocation.0, OID 1.3.6.1.2.1.1.6.0, tipo Octet String, valor BOG-RCD3.
4. Repetir GET para confirmar la escritura.
5. Repetir desde PC7 sobre MLSW 10.3.81.1 con valor MAD-RCD3.
6. Repetir desde PC1 y PC5; UDP/161 debe bloquearse.
7. Capturar respuestas y decisiones ACL en Simulation Mode. Registrar resultado real en XLSX.

No marcar esta prueba aprobada si solo se observa la comunidad en running-config.
