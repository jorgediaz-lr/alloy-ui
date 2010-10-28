AUI.add("aui-editor-bbcode-plugin",function(S){var F=S.Lang,O=F.isArray,P=F.isString,K=S.ClassNameManager.getClassName,J="bbcodeplugin",R="bbcode",N="quote",X=K(N),Q=K(N,"content"),Y=K(N,"title"),T="\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]",V="\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]",E="<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>",G="<(([a-z0-9]+)\\b[^>]*?style=(\"|').*?{0}\\s*:\\s*([^;\"']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>",I="(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)",M='<div class="'+X+'"><div class="'+Q+'">',H="</div></div>",D='<div class="'+Y+'">$1</div>'+M,L="<div>{0}</div>",U=new RegExp(I,"gi"),W=[{convert:[["br"]],regExp:"<{0}[^>]*>",output:"\n"},{convert:[{tags:["font-family"],source:["font"]},{tags:["font-size"],source:["size"]},{tags:["[^a-z-]*color"],source:["color"]}],regExp:G,output:"<$1>[{0}=$4]$5[/{0}]<$6>"},{convert:[{tags:["font-style"],source:["i"]},{tags:["font-weight"],source:["b"]}],regExp:G,output:"<$1>[{0}]$5[/{0}]<$6>"},{convert:[["text-decoration"]],regExp:G,output:function(){var Z="";var A=arguments[4].toLowerCase();if(A.indexOf("underline")!=-1){Z+="[u]";}else{if(A.indexOf("line-through")!=-1){Z+="[s]";}}if(Z!=""){return"<"+arguments[1]+">"+Z+arguments[5]+Z.replace("[","[/")+"<"+arguments[6]+">";}return arguments[0];}},{convert:[["margin-left"]],regExp:G,output:function(){var Z="";var a=parseInt(arguments[3],10);if(!isNaN(a)){var b=Math.floor(a/40);for(var A=0;A<b;A++){Z+="[indent]";}}Z=Z+arguments[5]+Z.replace(/\[/g,"[/");return"<"+arguments[1]+">"+Z+"<"+arguments[6]+">";}},{convert:[{tags:["font","size"],source:["size"]},{tags:["font","face"],source:["font"]}],regExp:"(<{0}\\b[^>]*{1}=(\"|')([^\"']+)(\"|')[^>]*>)([\\s\\S]*?)(</{0}>)",output:"$1[{0}=$3]$5[/{0}]$6"},{convert:[["text-align"]],regExp:G,output:"<$1>[$4]$5[/$4]<$6>"},{convert:[["span"]],regExp:E,output:"$2"},{convert:[["blockquote"]],regExp:E,output:"[indent]$2[/indent]"},{convert:[["b"],["strong"]],regExp:E,output:"[b]$2[/b]"},{convert:[["i"],["em"]],regExp:E,output:"[i]$2[/i]"},{convert:[["u"]],regExp:E,output:"[u]$2[/u]"},{convert:[["s"],["strike"]],regExp:E,output:"[s]$2[/s]"},{convert:[["img"]],regExp:"(<a[^>]*>)?<{0}\\b[^>]*src=(\"|')([^\"']+)(\"|')[^>]*>(</a>)?",output:"[img]$3[/img]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')mailto:([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[email=$2]$4[/email]"},{convert:[["a"]],regExp:"<{0}\\b[^>]*href=(\"|')([^\"']+)(\"|')[^>]*>([\\s\\S]*?)</{0}>",output:"[url=$2]$4[/url]"},{convert:[["center"]],regExp:E,output:"[center]$2[/center]"},{convert:[["ul"]],regExp:E,output:"[list]$2[/list]"},{convert:[["ol"]],regExp:E,output:"[list=1]$2[/list]"},{convert:[["li"]],regExp:E,output:"[*]$2"},{convert:[["code"]],regExp:E,output:"[code]$2[/code]"},{convert:[["quote"]],regExp:"<div\\b[^>]*class=(\"|')_"+X+"s*[^\"']*(\"|')[^>]*>([\\s\\S]*?)</div>",output:"$3"},{convert:[["div"]],regExp:E,output:"$2\n"},{convert:[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],regExp:E,output:"[b]$2[/b]\n"},{convert:[["p"]],regExp:E,output:"$2\n\n"},{convert:[{tags:["list","left|center|right"],source:["list"]}],regExp:"(\\[{0}[^\\]]*\\])\\s*\\[({1})\\]([\\s\\S]*?)\\[/\\2\\]\\s*\\[/{0}\\]",output:"[$2]$1$3[/{0}][/$2]"}],C=[{convert:[{tags:["b"],source:["b"]},{tags:["i"],source:["i"]},{tags:["u"],source:["u"]},{tags:["s"],source:["s"]},{tags:["code"],source:["code"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[{tags:["color"],source:["color"]}],regExp:T,output:'<span style="{0}: $3;">$4</span>'},{convert:[{tags:["font"],source:["face"]},{tags:["size"],source:["size"]}],regExp:T,output:'<font {0}="$3">$4</font>'},{convert:[["img"]],regExp:V,output:'<img src="$2" alt="" />'},{convert:[{tags:["email"],source:["mailto:"]},{tags:["url"],source:[""]}],regExp:T,output:'<a href="{0}$3">$4</a>'},{convert:[["list"]],regExp:"\\[({0}(=1)?)]([\\s\\S]*?)\\[\\/{0}\\]",output:function(){var a="";if(arguments[1]=="list=1"){a+="<ol>";}else{a+="<ul>";}var A=F.trim(arguments[3]).split("[*]");for(var Z=1;Z<A.length;Z++){a+="<li>"+A[Z]+"</li>";}if(arguments[1]=="list=1"){a+="</ol>";}else{a+="</ul>";}return a;}},{convert:[{tags:["indent"],source:["blockquote"]}],regExp:V,output:"<{0}>$2</{0}>"},{convert:[["left"],["center"],["right"]],regExp:V+"\n?",output:'<div style="text-align: $1;">$2</div>'},{convert:[["\n"]],regExp:"{0}",output:"<br />"}];var B=S.Component.create({NAME:J,NS:R,EXTENDS:S.Plugin.Base,ATTRS:{host:{value:false}},prototype:{initializer:function(){var A=this;A.afterHostMethod("getContent",A.getBBCode,A);A.get("host").on("contentChange",A._contentChange,A);},getBBCode:function(){var A=this;var c=A.get("host");var Z;var b=c.constructor.prototype.getContent.apply(c,arguments);var d=S.Node.create(F.sub(L,[b]));var a=function(m,g,e){var h;var l=m;do{if(l){h=l;}l=l.one("div."+Q);}while(l);var k=h.get("parentNode");var j=k.previous();var i="["+N;if(j&&j.hasClass(Y)){var f=j.html();f=f.replace(U,"");i+="="+(f.charAt(f.length-1)==":"?f.substring(0,f.length-1):j.html());j.remove(true);}i+="]"+h.html()+"[/"+N+"]";k.html(i);k.removeClass(N);k.addClass("_"+N);};while(Z=d.all("div."+X)){if(!Z.size()){break;}Z.each(a);}b=d.html();b=A._parseTagExpressions(W,b);b=b.replace(U,"");return new S.Do.AlterReturn(null,b);},getContentAsHtml:function(){var A=this;var Z=A.get("host");return Z.constructor.prototype.getContent.apply(Z,arguments);},_contentChange:function(a){var A=this;var Z=a.newVal;Z=Z.replace(/\[quote=([^\]]*)\]/gi,M);Z=Z.replace(/\[quote\]/gi,D);Z=Z.replace(/\[\/quote\]/gi,H);Z=A._parseTagExpressions(C,Z);a.newVal=Z;a.stopImmediatePropagation();},_parseTagExpressions:function(k,e){var h=this;var d;var g;var A;var Z;var l;for(var c=0;c<k.length;c++){d=k[c];g=d.convert;Z=g.length;for(var b=0;b<Z;b++){var a=d.output;A=g[b];if(O(A)){l=A;}else{l=A.tags;if(P(a)){a=F.sub(a,A.source);}}var f=F.sub(d.regExp,l);e=e.replace(new RegExp(f,"gi"),a);}}return e;}}});S.namespace("Plugin").EditorBBCode=B;},"@VERSION@",{requires:["aui-base","editor-base"]});