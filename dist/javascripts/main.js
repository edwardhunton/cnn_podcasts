var Ajax=function(){var a=this,b="proxy.php",c="http://rss.cnn.com/services/podcasting/studentnews/rss.xml",d=b+"?url="+encodeURIComponent(c);this.request=function(b){var c=new XMLHttpRequest;c.open("GET",d,!0),c.onreadystatechange=function(){if(4===this.readyState&&this.status>=200&&this.status<400){var c=new DOMParser;a.data=JSON.parse(this.responseText),a.data=c.parseFromString(a.data.contents,"text/xml"),b.apply(this,a.data)}},c.send(),c=null},this.returnData=function(){return void 0!==a.data?a.data:void 0}},Controller=function(a){this.buildUI=function(){a.getService("view").buildUI(a.getService("model").returnPlaylist())}},Helpers=function(){this.xmlToJson=function(a){var b={};if(1==a.nodeType){if(a.attributes.length>0){b.attributes={};for(var c=0;c<a.attributes.length;c++){var d=a.attributes.item(c);b.attributes[d.nodeName]=d.nodeValue}}}else 3==a.nodeType&&(b=a.nodeValue);if(a.hasChildNodes())for(var e=0;e<a.childNodes.length;e++){var f=a.childNodes.item(e),g=f.nodeName;if("#text"===g&&(g="text"),"undefined"==typeof b[g])b[g]=this.xmlToJson(f);else{if("undefined"==typeof b[g].push){var h=b[g];b[g]=[],b[g].push(h)}b[g].push(this.xmlToJson(f))}}return b}};document.addEventListener("DOMContentLoaded",function(){var a=function(){return{init:function(){var a=new ServiceManager;a.setService(new View(a),"view"),a.setService(new Model(a),"model"),a.setService(new Controller(a),"controller")}}},b=new a;b.init()});var Model=function(a){function b(){e=g.returnData(),d(e.childNodes[1])}function c(){b()}function d(b){f=(new Helpers).xmlToJson(b),a.getService("controller").buildUI()}var e,f;this.returnPlaylist=function(){return f};var g=new Ajax;g.request(c)},ServiceManager=function(){var a=[];this.setService=function(b,c){a[c]=b},this.getService=function(b){if(a.hasOwnProperty(b))return a[b];throw console.log(b),"Service not found"}},View=function(a){function b(a){"up"===a?i-1>=0&&i-1<playlist.channel.item.length-3?(i--,f()):i-1>=0&&i--:i+1>=0&&i+1<playlist.channel.item.length-3?(i++,f()):i+1>=0&&i+1<playlist.channel.item.length&&i++}function c(){g()}function d(){var a=document.getElementById("vid");a.paused?a.play():a.pause()}function e(){var a=document.getElementById("upArrow"),e=document.getElementById("downArrow");a.addEventListener("click",function(){b("up")}),e.addEventListener("click",function(){b("down")}),window.onkeydown=function(a){38===a.keyCode?b("up"):40===a.keyCode?b("down"):13===a.keyCode?c():32===a.keyCode&&d()}}function f(){document.getElementById("mainNav").innerHTML=null,document.getElementById("mainNav").appendChild(h(playlist))}function g(){document.getElementById("videoTitle").innerHTML=playlist.channel.item[i].title.text,document.getElementById("videoDescription").innerHTML=playlist.channel.item[i].description.text,document.getElementById("vid").src=playlist.channel.item[i].enclosure.attributes.url}function h(a){playlist=a;for(var b,c=document.createElement("ul"),d=i;d<playlist.channel.item.length;d++)b=document.createElement("li"),b.innerHTML=playlist.channel.item[d].title.text,c.appendChild(b);return c}var i=0;this.buildUI=function(a){document.getElementById("mainNav").appendChild(h(a)),document.getElementById("podcastTitle").innerHTML=a.channel.title.text,document.getElementById("podcastDescription").innerHTML=a.channel.description.text,g(),e()}};