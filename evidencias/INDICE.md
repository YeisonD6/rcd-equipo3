# Índice de evidencia

Evidencia real del simulador, corte del 2 de noviembre de 2026. La configuración escrita no sustituye las pruebas funcionales.

| Archivo | Alcance |
|---|---|
| final_topologia.png | Captura auténtica de la red |
| final_topologia.txt | Inventario de 32 equipos y 32 enlaces |
| final_cierre_salud.txt | Última revisión sin enlaces caídos ni IPv4 duplicadas |
| final_pings_retest.txt | Conectividad después de los ajustes de routing |
| final_reapertura_con_inicializador.txt | PC7→Web IPv6 4/4 después de reabrir y aplicar IPv6 estática por MCP |
| final_matriz_acl.txt | Ocho pruebas TCP IPv6; incluye la incidencia de compatibilidad IPv4 MAD Guest |
| final_web_clientes.txt | Lectura de la página desde los cuatro clientes autorizados |
| final_ipsec_antes.txt / final_ipsec_despues.txt | Contadores reales ESP antes y después de tráfico; también había Tracker concurrente, por lo que el incremento no se atribuye exclusivamente al ping |
| final_simulacion.txt | 81 eventos, recorrido y decisiones por capa, incluidos ESP |
| final_tracker_*.txt | Salidas seriales auténticas de las aplicaciones; son ventanas acotadas y no todas contienen el mismo tramo temporal |
| vlans_*.txt | Lectura nativa de las siete bases VLAN |
| ../configuraciones/*_running.txt | Trece transcripciones de show running-config completas |

La alerta de zona está registrada en Tracker_Server; los registros previos de PC4 también contienen el ACK de zona. Las ventanas cortas del dashboard pueden haber desplazado ese tramo del historial. Ninguno de estos registros acredita SNMP GET/SET ni cifrado de protocolo 41.

El ZIP omite el respaldo preajuste, la captura de lienzo vacío, final_pings.txt y final_slaac_reinicializado.txt. Se mantienen en la carpeta de trabajo para trazabilidad; las incidencias y diferencias se describen en ESTADO_VERIFICACION.md.
