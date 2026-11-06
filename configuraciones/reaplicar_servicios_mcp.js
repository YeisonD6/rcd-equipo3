// Ejecutar mediante pt_send_raw en el proyecto RCD ya abierto.
// No crea ni elimina dispositivos. Reaplica servicios y relee su contenido.
var dns=ipc.network().getDevice("DNS_Server").getProcess("DnsServer");
dns.setEnable(true);
if(!dns.isDomainNameExisted("mvydjdr.net")){
    dns.addARecordToNameServerDb("mvydjdr.net","10.3.10.80");
    dns.addARecordToNameServerDb("mvydjdr.net","2001:1200:EC13:10::80");
}
if(!dns.isDomainNameExisted("www.mvydjdr.net"))dns.addARecordToNameServerDb("www.mvydjdr.net","10.3.10.80");
var h=ipc.network().getDevice("Web_Server").getProcess("HttpServer");
var s=ipc.network().getDevice("Web_Server").getProcess("HttpsServer");
h.setEnable(true);s.setEnable(true);s.setHttpsEnable(true);
var rows=[];for(var i=0;i<dns.getSizeOfNameServerDb();i++)rows.push(dns.getRrFromNameServerDbAt(i));
reportResult(JSON.stringify({dnsEnabled:dns.isEnabled(),dnsRecords:rows,httpEnabled:h.isEnabled(),httpsEnabled:s.isHttpsEnabled(),page:h.getPage("index.html")}));
