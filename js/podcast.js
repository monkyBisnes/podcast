// JavaScript Document
function creaCORS(method, url) {
  var xmlDoc = new XMLHttpRequest();
  if ("withCredentials" in xmlDoc) {
    xmlDoc.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xmlDoc = new XDomainRequest();
    xmlDoc.open(method, url);
  } else {
    xmlDoc = null;
  }
  return xmlDoc;
}

function cargaContenido(url){
  var xmlDoc = creaCORS('GET', url);
  if(!xmlDoc) {
    console.log('CORS no está soportado');
  }
  else {
    console.log(xmlDoc);
    console.log('Yeah, CORS es soportado');
  }
  xmlDoc.onload = function() {
    console.log('Respuesta CORS desde ' + url);
	
	uri = "http://www.itunes.com/dtds/podcast-1.0.dtd";
	xmlDoc=xmlDoc.responseXML;
	
			namePod = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
			imgPod = "";
			imagePod = xmlDoc.getElementsByTagNameNS(uri,"image");
			if(imagePod.length){
			   imgPod=imagePod[0].getAttribute('href');
			}
			autorPod = xmlDoc.getElementsByTagNameNS(uri,"author")[0].childNodes[0].nodeValue;
			
			document.getElementById("imagePodcast").innerHTML= '<img src="'+ imgPod +'" width="200" height"200">';
			document.getElementById("namePodcast").innerHTML= '<h3>' + namePod +'</h3>';
			document.getElementById("autorPodcast").innerHTML= '<h5>' + autorPod +'</h5>';
			
			
			x=xmlDoc.getElementsByTagName("item");
			
			info = "";
			for(var i=0; i< x.length; i++) 
			{
				audio = x[i].getElementsByTagName("enclosure");
				if(audio.length){
			   		var audioPod =audio[0].getAttribute('url');
				}
				
				
				info += '<div class="titulo"><h4>'+(x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue) +'</h4></div>' + 
						'<div class="col-xs-12 col-sm-12 col-md-9"><div class="fecha">'+(x[i].getElementsByTagName("pubDate")[0].childNodes[0].nodeValue).slice(0, -9) +'</div>' +
						'<div class="descripcion">'+(x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue) +'</div></div>' +
						//'<div class="duracion">'+(x[i].getElementsByTagNameNS(uri, "duration")[0].childNodes[0].nodeValue) +'</div>' +
						'<div class="audio"><audio src="'+ audioPod +'" preload="none" controls></div><hr>';
					
					
				document.getElementById("contenido").innerHTML= info;
			}
  };

  xmlDoc.onerror = function() {
    console.log('Algo salio mal en la respuesta CORS');
  };

  xmlDoc.send();
}
