// Packet Tracer Programming: RCD Dashboard (JavaScript), PC7.
var server, history=[], latest="", alerts=[], count=0;
function setup(){
    server=new TCPServer();
    server.onNewClient=function(client){
        var buffer="";
        client.onReceive=function(data){
            buffer+=String(data);var lines=buffer.split("\n");buffer=lines.pop();
            for(var i=0;i<lines.length;i++)if(lines[i]){
                latest=lines[i];count++;history.push(latest);if(history.length>10)history.shift();
                if(latest.indexOf("alerta=SIN_ALERTA")<0){alerts.push(latest);if(alerts.length>10)alerts.shift();}
                Serial.println("ULTIMO "+latest);
                if(count%10===0)Serial.println("HISTORIAL CORTO\n"+history.join("\n"));
            }
        };
    };
    server.listen(5001);Serial.println("DASHBOARD_LISTEN TCP 5001");
}
function loop(){delay(100);}
