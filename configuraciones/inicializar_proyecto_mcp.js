/* Ejecutar con pt_send_raw después de abrir el .pkt y esperar convergencia. La API PT no conservó la IPv6 de los PCs al recargar. Este inicializador aplica el modo estático de compatibilidad y reinicia los sockets. SLAAC fue observado durante la construcción, pero no se afirma persistencia automática. */
var pcs=[["PC1","EA13","35","11"],["PC2","EA13","80","12"],["PC3","EA13","80","13"],["PC4","EA13","80","14"],["PC5","EB23","35","15"],["PC6","EB23","80","16"],["PC7","EB23","80","17"],["PC8","EB23","35","18"]];
for(var i=0;i<pcs.length;i++){var p=ipc.network().getDevice(pcs[i][0]).getPort("FastEthernet0");p.setIpv6Enabled(true);p.setIpv6AddressAutoConfig(false);p.addIpv6Address("2001:1200:"+pcs[i][1]+":"+pcs[i][2]+"::"+pcs[i][3],64,0,false);p.setv6DefaultGateway("2001:1200:"+pcs[i][1]+":"+pcs[i][2]+"::1");p.setv6ServerIp("2001:1200:EC13:10::53");}
var apps=[["PC4","RCD Sender (JavaScript)"],["Tracker_Server","RCD Tracker (JavaScript)"],["PC7","RCD Dashboard (JavaScript)"]];
for(var j=0;j<apps.length;j++){ipc.network().getDevice(apps[j][0]).stopProject(apps[j][1]);}
for(var k=apps.length-1;k>=0;k--){ipc.network().getDevice(apps[k][0]).runProject(apps[k][1],"");}
reportResult("IPv6 estática de compatibilidad aplicada; aplicaciones reiniciadas: PC7, Tracker_Server, PC4. Verificar direcciones y ACK.");
