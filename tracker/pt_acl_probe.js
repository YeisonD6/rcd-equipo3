// Prueba TCP. Instalar en Programming de PC1, PC4, PC5 o PC7.
// TCPClient.state()==3 significa conexión establecida. 0/1 no demuestra aceptación.
var probes=[];
function setup(){
    var targets=["10.3.10.80","2001:1200:EC13:10::80"];
    for(var i=0;i<targets.length;i++)for(var j=0;j<2;j++){
        var p={ip:targets[i],port:j===0?80:443,client:new TCPClient()};
        p.client.connect(p.ip,p.port);probes.push(p);
    }
}
function loop(){
    delay(5000);
    for(var i=0;i<probes.length;i++)Serial.println(probes[i].ip+":"+probes[i].port+" state="+probes[i].client.state());
}
