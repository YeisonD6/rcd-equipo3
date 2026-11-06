# Diseño e implementación de una red empresarial — Equipo 3

Juan David Rubio, Yeison David Niño y Miguel Medina. Dominio `mvydjdr.net`. X=3.

## Fuentes, alcance y decisiones

El enunciado del proyecto y la hoja T_1 de la rúbrica son los requisitos del docente [1], [2]. La asignación de nombres, la distribución inequívoca de PCs Guest/Internal y las decisiones de compatibilidad son decisiones de implementación del equipo solicitadas en esta tarea. El objetivo es apuntar a Experto; la matriz no equivale a una nota otorgada.

El diseño contiene seis routers 2811 con NM-4A/S, seis switches 2960, un 3650, cuatro servidores, ocho PCs, cuatro impresoras y un beacon simulado. Dos unidades eléctricas automáticas de PT explican el total vivo de 32 dispositivos. La Figura 1 se reproduce con 32 enlaces.

## Metodología estructurada

Se siguieron cinco fases: análisis de requisitos; diseño lógico y direccionamiento; montaje físico; configuración por capas; pruebas, guardado y reapertura. Cada afirmación funcional debe tener un resultado observado. El paquete conserva las incidencias y la evidencia final por separado.

### Comparación de alternativas

| Decisión | Alternativa evaluada | Selección y efecto |
|---|---|---|
| Inter-VLAN Bogotá | MLSW adicional o router-on-a-stick | Router-on-a-stick reutiliza R1 y mantiene la figura; un solo uplink limita capacidad |
| Inter-VLAN Madrid | Router-on-a-stick o MLSW | 3650 exigido; enruta por SVIs y separa acceso de borde WAN |
| Asignación IPv6 | Estática, DHCPv6 stateful o SLAAC | SLAAC ensayado; modo estático de compatibilidad en PCs; estática en infraestructura |
| Transición | Dual-stack WAN, protocolo 41 o GRE | WAN IPv4 y túnel ipv6ip; GRE fue probado con pérdida de OSPFv3 |
| Redundancia LAN | Sin enlace alterno o triángulo con STP | STP evita bucles y conserva un camino de respaldo |
| Seguridad | Solo ACL o ACL más VPN | ACL controla servicios; IPsec demuestra protección del tráfico IPv4 |

SLAAC genera direcciones a partir de anuncios de router y verifica duplicados [3]. OSPFv3 permite anunciar los prefijos IPv6 de ambas sedes a través del túnel [4]. IPsec opera en la capa IP mediante políticas y asociaciones de seguridad [5].

## Direccionamiento y subneteo

Se dividió 86.106.79.0/24 en enlaces /30. Cada /30 tiene cuatro direcciones, dos utilizables y máscara 255.255.255.252. Se ocupan siete bloques consecutivos .0, .4, .8, .12, .16, .20 y .24: 28 direcciones, de las cuales 14 son interfaces WAN. Queda libre el espacio desde .28 hasta .255 para expansión.

Bogotá utiliza `2001:1200:EA13:<VLAN>::/64`; Madrid `2001:1200:EB23:<VLAN>::/64`. Los identificadores 35, 40, 80 y 99 son hextetos escritos en notación hexadecimal, asociados por convención a los números de VLAN. La DMZ es `2001:1200:EC13:10::/64`. El túnel es `2001:1200:ED13:300::/64`; el tránsito R2–MLSW es `2001:1200:EB23:200::/64`. El gateway es ::1, excepto el extremo MLSW del tránsito, ::2.

Web_Server usa ::80, DNS_Server ::53, Tracker_Server ::50 y DHCP_Server ::10. Se observaron direcciones SLAAC durante la construcción. Por el problema de recarga, el inicializador final aplica ::11 a ::18 en PCs como compatibilidad. El XLSX distingue esa decisión de las direcciones automáticas observadas.

La red IPv4 de compatibilidad usa 10.3.0.0/16 segmentada por sede/VLAN. Madrid Internal es 10.3.81.0/24 y requiere una ruta específica en R2: no pertenece al resumen 10.3.128.0/17.

La recarga del archivo por la API vacía las IPv6 de los PCs, incluso al intentar sufijos estáticos secundarios, mientras las IPv6 de servidores persisten. El inicializador MCP aplica direcciones estáticas y reinicia sockets. La prueba de reapertura requiere ese paso y se identifica como limitación del simulador y desviación del modo SLAAC previsto. No se atribuye a la red una persistencia autónoma que no se observó.

## Montaje y configuración

Los módulos seriales se instalaron con los routers apagados y se verificaron los nombres Serial1/0–1/3. R1 usa subinterfaces dot1Q para Bogotá. El 3650 utiliza un puerto enrutado a R2 y SVIs de VLAN 35/40/80/99. Los troncales transportan las cuatro VLAN y tienen VLAN nativa 99. La redundancia se controla mediante STP; un puerto bloqueado es esperado y no equivale a un enlace físico averiado.

Los equipos IOS tienen hostname, banner, enable secret, usuario local, SSH y cifrado de contraseñas. La consola física queda utilizable por el MCP; las líneas VTY utilizan login local y SSH. Los hashes type 5 corresponden al IOS simulado y son una limitación frente a algoritmos modernos.

## Routing y redistribución

EIGRP AS 3 recorre R1–ISP_BOG–ISP_NET–ISP_ESP–R2 y conecta ISP_NET con ISP_FL. OSPFv2 proceso 3, área 0, enlaza ISP_BOG–ISP_FL–ISP_ESP. ISP_FL es el único redistribuidor entre estos dos protocolos.

Las rutas LAN IPv4 de Bogotá se anuncian mediante EIGRP. R2 redistribuye rutas estáticas hacia Madrid; esto no es un segundo punto de redistribución OSPF/EIGRP. Para impedir que las rutas externas EIGRP se prefieran por el regreso OSPF, los tres routers OSPF tienen distancia externa 175. EIGRP externo conserva distancia 170 y EIGRP interno 90. La corrección eliminó el bucle observado en las pruebas entre sedes.

OSPFv3 proceso 3 conecta R1 y R2 por Tunnel0 y R2 con MLSW. Las interfaces LAN anuncian sus prefijos. La condición de interfaces pasivas no se conservó en la configuración final tras las pruebas de compatibilidad; se registra como diferencia del plan.

Se añadieron rutas IPv6 agregadas de respaldo con distancia 200 entre los extremos del túnel. Las rutas OSPFv3 específicas /64 tienen prioridad cuando están presentes. El respaldo ayuda durante la resincronización del simulador después de reabrir el archivo.

## Migración e IPsec

Tunnel0 encapsula IPv6 en IPv4 con protocolo 41. El acceso IPv6 de PC7 a Web_Server se comprobó con ping y con la matriz TCP. Los ISP intermedios solo necesitan routing IPv4.

IPsec usa AES-256, SHA, grupo DH 2, PSK y crypto map en Serial1/0 de R1/R2. Se observaron asociaciones ESP activas, incremento de contadores y cifrado/descifrado del flujo IPv4 entre sedes en Simulation Mode. GRE sobre IPsec se intentó; OSPFv3 pasó FULL→DOWN y se restauró ipv6ip. Por ello, el paquete no afirma cifrado del túnel protocolo 41. Esta limitación y la DMZ dual-stack deben explicarse al docente; no constituyen cumplimiento literal de una DMZ exclusivamente IPv6.

## Servicios y ACL

DNS_Server tiene registros A y AAAA para mvydjdr.net; nslookup devuelve 10.3.10.80 y 2001:1200:EC13:10::80. HTTP y HTTPS están activos con una página personalizada del equipo. Los servicios se configuraron mediante los procesos nativos DnsServer, HttpServer y HttpsServer y se releyeron.

R1 aplica WEB-DMZ al salir hacia la DMZ en IPv6 y WEB-DMZ4 para compatibilidad IPv4. La ubicación central controla a ambas sedes con una única política. La matriz IPv6 observada fue:

| Origen | HTTP 80 | HTTPS 443 |
|---|---|---|
| BOG Guest, PC1 | Permitido | Bloqueado |
| BOG Internal, PC4 | Bloqueado | Permitido |
| MAD Guest, PC5 | Permitido | Bloqueado |
| MAD Internal, PC7 | Bloqueado | Permitido |

Las pruebas usan sockets TCP: estado 3 es conexión establecida y estado 0/1 sin respuesta establecida. También se recuperó el HTML desde los cuatro clientes usando el protocolo autorizado.

DHCPv6 stateless reside en los gateways, con opciones DNS y dominio; el DHCP_Server central contiene cuatro pools IPv4 y se utilizan relays ip helper-address en las VLAN de usuarios. Esta implementación no utiliza relay DHCPv6 central.

## Employee Tracker y flujo bidireccional

Las tres aplicaciones están instaladas en Dev: y visibles en Programming. PC4 envía `EMP-001|secuencia|timestamp|x|y|actividad` por TCP 5000. El servidor mantiene estado, devuelve `ACK|secuencia|RECIBIDO|alerta` a PC4 y reenvía el registro con tiempo en zona y alerta a PC7 por TCP 5001. PC7 conserva diez registros y muestra último dato y alertas en la consola de Programming.

La demostración inicial fuerza En reposo→Alta actividad en secuencia 4 y una posición 90,90 desde secuencia 6 hasta 80. Después genera datos aleatorios. El planificador consulta Date.now para enviar aproximadamente cada segundo; el retardo del simulador puede añadir variación. Se comprobó una estancia real de más de 60 segundos y alerta desde zona=60.

La traza de Simulation Mode muestra el transporte TCP, dot1Q, decisiones de routing, encapsulación ESP, tránsito HDLC y descifrado en R2. También aparecen copias descartadas por STP durante flooding; el flujo principal sí llega. El ACK de aplicación confirma que no se trata solo de configuración estática.

El objeto Thing representa el beacon. Las coordenadas se generan por software y no se afirma detección de una radio BLE física. El bonus Web no quedó implementado: HTTPServer en Programming devuelve “HTTP server not supported on this device” en PC-PT; se preservó el dashboard TCP obligatorio.

## SNMP y análisis GET/SET

Las comunidades RCD3-RO y RCD3-RW están configuradas en equipos de sede. SNMP-INTERNAL permite UDP/161 desde 10.3.80.0/24 y 10.3.81.0/24 y deniega otros orígenes. Se aplica en las entradas L3 relevantes; las comunidades se retiraron de los ISP.

En las interfaces internas de VLAN 80 y en el enlace DMZ se retiró el filtro IPv4 durante la verificación porque interrumpía respuestas IPv6 en esta versión de PT. Se mantienen filtros en las VLAN Guest, Services y Management y en entradas WAN pertinentes. La prueba MIB Browser debe comprobar el efecto real antes de afirmar aislamiento SNMP completo.

Un GET debe consultar sysName.0, OID 1.3.6.1.2.1.1.5.0, y recibir el nombre del agente. Un SET con la comunidad RW puede cambiar sysLocation.0, OID 1.3.6.1.2.1.1.6.0, a BOG-RCD3 o MAD-RCD3; otro GET debe confirmar el cambio. El mismo intento desde Guest debe agotarse por ACL. Este es el procedimiento esperado, no una respuesta capturada: la prueba MIB Browser sigue pendiente y debe registrarse en la hoja Pruebas.

## Incidencias por capa TCP/IP

| Capa | Incidencia real | Diagnóstico y corrección |
|---|---|---|
| Acceso | Lista VLAN abreviada en exportación | Se contrastó con show interfaces trunk; el estado vivo contiene las cuatro VLAN |
| Internet | Madrid Internal fuera del resumen /17 | Ruta estática específica 10.3.81.0/24 y anuncio a EIGRP |
| Internet | Bucle por redistribución | Distancia externa OSPF 175; retest bidireccional 4/4 |
| Internet | GRE dejó sin OSPFv3 | Restauración ipv6ip y resincronización de OSPFv3 |
| Transporte | Crypto map en interfaz interna | Retirado de Fa0/0 de R2; aplicado solo a WAN |
| Aplicación | API de host rechazaba IPv6 | Firma correcta addIpv6Address(addr,64,0,false) y lectura posterior |
| Aplicación | Servicios y Programming sin herramientas dedicadas | Acceso a procesos y archivos nativos, con readback y ejecución real |
| Operación | Dos instancias PT competían por buzón | Cierre de instancia creada durante diagnóstico y nonce único del motor |

## Conclusiones y recomendaciones

Las pruebas demuestran conectividad IPv4 entre sedes, acceso IPv6 a DMZ, separación Web por perfiles, DNS y Tracker TCP con ambas alertas. La salud estructural complementa esas pruebas y no las reemplaza. El modelo también evidencia las limitaciones del simulador: IPsec sobre protocolo 41/GRE, bonus HTTPServer en PC-PT y APIs limitadas del MIB Browser.

Antes de entregar deben completarse las pruebas SNMP y la participación real del equipo. El docente no ha suministrado en estos archivos la guía completa usada en clase; se responden las preguntas incluidas en el enunciado, sin inventar otras preguntas de esa guía.

## Entrega y colaboración

La rúbrica asigna 20% a diseño/direccionamiento/argumentación, 30% a simulación, 10% a resultados, 10% a video, 10% a Wiki y 20% a trabajo en equipo [2]. Los roles en actas son propuestas, no evidencia de reuniones ni de trabajo individual completado. Cada integrante debe incorporar contribuciones verificables.

La publicación de Wiki, video con cámaras, Teams y sustentación están fuera del paquete local. Fecha de entrega: 10 de noviembre de 2026, 23:00; sustentación: 11 de noviembre, 09:00 [1]. Una vez sometida la Wiki no se debe modificar después del límite según el enunciado.

## Uso de IA

Véase [declaración e instrucciones exactas](../DECLARACION_IA.md). Se utilizó Codex y MCP, con validación contra el estado vivo y artefactos guardados.

## Referencias IEEE

[1] Docentes RCD, “Proyecto final. Diseño e implementación de una red empresarial,” Redes y Comunicación de Datos, versión 1.0, oct. 2026, pp. 1–5. Archivo aportado por el usuario.  
[2] Docentes RCD, “Rúbricas PF RCD 262,” hoja T_1, 2026. Archivo aportado por el usuario.  
[3] S. Thomson, T. Narten y T. Jinmei, “IPv6 Stateless Address Autoconfiguration,” RFC 4862, sep. 2007. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc4862. [Consultado: 2-nov-2026].  
[4] R. Coltun, D. Ferguson, J. Moy y A. Lindem, “OSPF for IPv6,” RFC 5340, jul. 2008. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc5340. [Consultado: 2-nov-2026].  
[5] S. Kent y K. Seo, “Security Architecture for the Internet Protocol,” RFC 4301, dic. 2005. [En línea]. Disponible: https://www.rfc-editor.org/rfc/rfc4301. [Consultado: 2-nov-2026].  
[6] Cisco, “Cisco Packet Tracer Extensions API” y “IoT JavaScript API,” ayuda oficial incluida con Packet Tracer, copia local consultada el 2-nov-2026.
