/**Number.prototype.NaN0 = function() {return isNaN(this)?0:this;}
 String.prototype.Trim = function() { return this.replace(/^\s*([\S\s]*?)\s*$/, '$1');}
 **/
var InicTime;
var ActualTime;
var auxTime=new Date();
var crono;
var lahora=0;
var losminutos=0;
var lossegundos=0;

var tIni=new Array();
tIni[0]=0;
tIni[1]=0;
tIni[2]=0;
tIni[3]=0;
tIni[4]=0;
tIni[5]=0;

window.onload = function() {
    onClicks();
    //ajustar();
}

function onClicks(){
    /**var todos=ruta('nums').getElementsByTagName("a");
     for(i=0;i<todos.length;i++){
        if(todos[i].nodeType==1){
            if(i<10){
                todos[i].onclick=function(){
                    var anterior=tIni.shift();
                    tIni[tIni.length]=parseInt(this.innerHTML);
                    ruta('cronometro').innerHTML=tIni[0]+""+tIni[1]+":"+tIni[2]+""+tIni[3]+":"+tIni[4]+""+tIni[5];
                }
            } else {
                todos[i].onclick=function(){
                    tIni.pop();
                    tIni.unshift(0);
                    ruta('cronometro').innerHTML=tIni[0]+""+tIni[1]+":"+tIni[2]+""+tIni[3]+":"+tIni[4]+""+tIni[5];
                }
            }
        }
    }**/
    var todos=ruta('prenums').getElementsByTagName("a");

    for(i=0;i<todos.length;i++){
        if(todos[i].nodeType==1){
            todos[i].onclick=function(){
                var mili=this.getAttribute('mili');
                setReloj(mili);
            }
        }
    }
    ruta('switch-label').onclick=function(){
        eCronometro();
    }

    ruta('limpiar').onclick=function(){
        tIni[0]=0;
        tIni[1]=0;
        tIni[2]=0;
        tIni[3]=0;
        tIni[4]=0;
        tIni[5]=0;
        fCronometro();
    }
    /**ruta('pausar').onclick=function(){
        pCronometro();
    }**/
    /**ruta('reanudar').onclick=function(){
        ruta('liPausar').style.display='block';
        ruta('liReanudar').style.display='none';
        eCronometro();
    }**/
}

function fCronometro(){
    clearInterval(crono);
    //ruta('elbeep').pause();
    //ruta('liPausar').style.display='block';
    //ruta('liReanudar').style.display='none';
    ruta('cronometro').innerHTML="00:00:00";
}

/**function pCronometro(){
    clearInterval(crono);
    ruta('elbeep').pause();
    ruta('liPausar').style.display='none';
    ruta('liReanudar').style.display='block';
}**/

function setReloj(milisegundos){
    var intauxTime = new Date();
    intauxTime.setTime(milisegundos);
    lahora=intauxTime.getUTCHours();
    losminutos=intauxTime.getUTCMinutes()
    lossegundos=intauxTime.getUTCSeconds();
    var crono="";
    if(lahora<10){
        tIni[0]=0;
        crono=0+""+lahora+":";
    } else {
        tIni[0]=Math.floor(lahora/10);
        crono=lahora+":";
    }
    tIni[1]=lahora%10;
    if(losminutos<10){
        tIni[2]=0;
        crono=crono+0+""+losminutos+":";
    } else {
        tIni[2]=Math.floor(losminutos/10);
        crono=crono+losminutos+":";
    }
    tIni[3]=losminutos%10;
    if(lossegundos<10){
        tIni[4]=0;
        crono=crono+0+""+lossegundos;
    } else {
        tIni[4]=Math.floor(lossegundos/10);
        crono=crono+""+lossegundos;
    }
    tIni[5]=lossegundos%10;
    ruta('cronometro').innerHTML=crono;
}

function eCronometro(){
    //clearInterval(crono);
    //ruta('elbeep').pause();
    //ruta('liPausar').style.display='block';
    //ruta('liReanudar').style.display='none';
    lahora=(parseInt(tIni[0]+""+tIni[1],10));
    losminutos=(parseInt(tIni[2]+""+tIni[3],10));
    lossegundos=(parseInt(tIni[4]+""+tIni[5],10));
    var milisegundos=(lahora*60*60*1000)+(losminutos*60*1000)+(lossegundos*1000);
    setReloj(milisegundos);
    auxTime.setTime(0);
    InicTime = new Date();
    InicTime.setTime(InicTime.getTime()+milisegundos);
    crono=setTimeout("cronometro()", 1000);
}

function cronometro(){
    ActualTime = new Date();
    var midifTime= new Date();
    var diferencia = (InicTime.getTime() -ActualTime.getTime());
    if(diferencia<=0){
        ruta('cronometro').innerHTML="00:00:00";
        ruta('elbeep').play();
    } else {
        setReloj(diferencia);
        crono=setTimeout("cronometro()", 1000);
    }
}
function ruta(id){	return document.getElementById(id); }

/**function TamVentana() {
    var Tamanyo = [0, 0];
    if (typeof window.innerWidth != 'undefined')
    {
        Tamanyo = [
            window.innerWidth,
            window.innerHeight
        ];
    }
    else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0)
    {
        Tamanyo = [
            document.documentElement.clientWidth,
            document.documentElement.clientHeight
        ];
    }
    else   {
        Tamanyo = [
            document.getElementsByTagName('body')[0].clientWidth,
            document.getElementsByTagName('body')[0].clientHeight
        ];
    }
    return Tamanyo;
}

 /**function px(num){
    return num+"px";
}
 function ajustar(){
    var Tam = TamVentana();
    var nuTam=Math.floor(defTam*(Tam[0]/defVentana));
    ruta('cronometro').style.fontSize=px(nuTam);
}

 window.onresize = function() {
    ajustar();
}
 function getCookie(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1){
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1){
        c_value = null;
    }else{
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1){
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

 function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}


 function PonerCookie(){
    setCookie('aviso','1',365);
    document.getElementById("ley").style.display="none";
}**/