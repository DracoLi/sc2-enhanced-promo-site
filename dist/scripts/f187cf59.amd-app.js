var requirejs,require,define;(function(global){function isFunction(a){return ostring.call(a)==="[object Function]"}function isArray(a){return ostring.call(a)==="[object Array]"}function each(a,b){if(a){var c;for(c=0;c<a.length;c+=1)if(a[c]&&b(a[c],c,a))break}}function eachReverse(a,b){if(a){var c;for(c=a.length-1;c>-1;c-=1)if(a[c]&&b(a[c],c,a))break}}function hasProp(a,b){return hasOwn.call(a,b)}function eachProp(a,b){var c;for(c in a)if(a.hasOwnProperty(c)&&b(a[c],c))break}function mixin(a,b,c,d){return b&&eachProp(b,function(b,e){if(c||!hasProp(a,e))d&&typeof b!="string"?(a[e]||(a[e]={}),mixin(a[e],b,c,d)):a[e]=b}),a}function bind(a,b){return function(){return b.apply(a,arguments)}}function scripts(){return document.getElementsByTagName("script")}function getGlobal(a){if(!a)return a;var b=global;return each(a.split("."),function(a){b=b[a]}),b}function makeContextModuleFunc(a,b,c){return function(){var d=aps.call(arguments,0),e;return c&&isFunction(e=d[d.length-1])&&(e.__requireJsBuild=!0),d.push(b),a.apply(null,d)}}function addRequireMethods(a,b,c){each([["toUrl"],["undef"],["defined","requireDefined"],["specified","requireSpecified"]],function(d){var e=d[1]||d[0];a[d[0]]=b?makeContextModuleFunc(b[e],c):function(){var a=contexts[defContextName];return a[e].apply(a,arguments)}})}function makeError(a,b,c,d){var e=new Error(b+"\nhttp://requirejs.org/docs/errors.html#"+a);return e.requireType=a,e.requireModules=d,c&&(e.originalError=c),e}function newContext(a){function p(a){var b,c;for(b=0;a[b];b+=1){c=a[b];if(c===".")a.splice(b,1),b-=1;else if(c===".."){if(b===1&&(a[2]===".."||a[0]===".."))break;b>0&&(a.splice(b-1,2),b-=2)}}}function q(a,b,c){var d,e,f,h,i,j,k,l,m,n,o,q=b&&b.split("/"),r=q,s=g.map,t=s&&s["*"];a&&a.charAt(0)==="."&&(b?(g.pkgs[b]?r=q=[b]:r=q.slice(0,q.length-1),a=r.concat(a.split("/")),p(a),e=g.pkgs[d=a[0]],a=a.join("/"),e&&a===d+"/"+e.main&&(a=d)):a.indexOf("./")===0&&(a=a.substring(2)));if(c&&(q||t)&&s){h=a.split("/");for(i=h.length;i>0;i-=1){k=h.slice(0,i).join("/");if(q)for(j=q.length;j>0;j-=1){f=s[q.slice(0,j).join("/")];if(f){f=f[k];if(f){l=f,m=i;break}}}if(l)break;!n&&t&&t[k]&&(n=t[k],o=i)}!l&&n&&(l=n,m=o),l&&(h.splice(0,m,l),a=h.join("/"))}return a}function r(a){isBrowser&&each(scripts(),function(b){if(b.getAttribute("data-requiremodule")===a&&b.getAttribute("data-requirecontext")===d.contextName)return b.parentNode.removeChild(b),!0})}function s(a){var b=g.paths[a];if(b&&isArray(b)&&b.length>1)return r(a),b.shift(),d.undef(a),d.require([a]),!0}function t(a,b,c,e){var f,g,h,i=a?a.indexOf("!"):-1,j=null,l=b?b.name:null,o=a,p=!0,r="";return a||(p=!1,a="_@r"+(m+=1)),i!==-1&&(j=a.substring(0,i),a=a.substring(i+1,a.length)),j&&(j=q(j,l,e),g=k[j]),a&&(j?g&&g.normalize?r=g.normalize(a,function(a){return q(a,l,e)}):r=q(a,l,e):(r=q(a,l,e),f=d.nameToUrl(r))),h=j&&!g&&!c?"_unnormalized"+(n+=1):"",{prefix:j,name:r,parentMap:b,unnormalized:!!h,url:f,originalName:o,isDefine:p,id:(j?j+"!"+r:r)+h}}function u(a){var b=a.id,c=h[b];return c||(c=h[b]=new d.Module(a)),c}function v(a,b,c){var d=a.id,e=h[d];hasProp(k,d)&&(!e||e.defineEmitComplete)?b==="defined"&&c(k[d]):u(a).on(b,c)}function w(a,b){var c=a.requireModules,d=!1;b?b(a):(each(c,function(b){var c=h[b];c&&(c.error=a,c.events.error&&(d=!0,c.emit("error",a)))}),d||req.onError(a))}function x(){globalDefQueue.length&&(apsp.apply(j,[j.length-1,0].concat(globalDefQueue)),globalDefQueue=[])}function y(a,b,c){var e=a&&a.map,f=makeContextModuleFunc(c||d.require,e,b);return addRequireMethods(f,d,e),f.isBrowser=isBrowser,f}function z(a){delete h[a],each(o,function(b,c){if(b.map.id===a)return o.splice(c,1),b.defined||(d.waitCount-=1),!0})}function A(a,b){var c=a.map.id,d=a.depMaps,e;if(!a.inited)return;return b[c]?a:(b[c]=!0,each(d,function(a){var d=a.id,f=h[d];if(!f)return;return!f.inited||!f.enabled?(e=null,delete b[c],!0):e=A(f,mixin({},b))}),e)}function B(a,b,c){var d=a.map.id,f=a.depMaps;if(!a.inited||!a.map.isDefine)return;return b[d]?k[d]:(b[d]=a,each(f,function(f){var g=f.id,i=h[g],j;if(e[g])return;if(i){if(!i.inited||!i.enabled){c[d]=!0;return}j=B(i,b,c),c[g]||a.defineDepById(g,j)}}),a.check(!0),k[d])}function C(a){a.check()}function D(){var a,c,e,i,j=g.waitSeconds*1e3,k=j&&d.startTime+j<(new Date).getTime(),l=[],m=!1,n=!0;if(b)return;b=!0,eachProp(h,function(b){a=b.map,c=a.id;if(!b.enabled)return;if(!b.error)if(!b.inited&&k)s(c)?(i=!0,m=!0):(l.push(c),r(c));else if(!b.inited&&b.fetched&&a.isDefine){m=!0;if(!a.prefix)return n=!1}});if(k&&l.length)return e=makeError("timeout","Load timeout for modules: "+l,null,l),e.contextName=d.contextName,w(e);n&&(each(o,function(a){if(a.defined)return;var b=A(a,{}),c={};b&&(B(b,c,{}),eachProp(c,C))}),eachProp(h,C)),(!k||i)&&m&&(isBrowser||isWebWorker)&&!f&&(f=setTimeout(function(){f=0,D()},50)),b=!1}function E(a){u(t(a[0],null,!0)).init(a[1],a[2])}function F(a,b,c,d){a.detachEvent&&!isOpera?d&&a.detachEvent(d,b):a.removeEventListener(c,b,!1)}function G(a){var b=a.currentTarget||a.srcElement;return F(b,d.onScriptLoad,"load","onreadystatechange"),F(b,d.onScriptError,"error"),{node:b,id:b&&b.getAttribute("data-requiremodule")}}var b,c,d,e,f,g={waitSeconds:7,baseUrl:"./",paths:{},pkgs:{},shim:{}},h={},i={},j=[],k={},l={},m=1,n=1,o=[];return e={require:function(a){return y(a)},exports:function(a){a.usingExports=!0;if(a.map.isDefine)return a.exports=k[a.map.id]={}},module:function(a){return a.module={id:a.map.id,uri:a.map.url,config:function(){return g.config&&g.config[a.map.id]||{}},exports:k[a.map.id]}}},c=function(a){this.events=i[a.id]||{},this.map=a,this.shim=g.shim[a.id],this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},c.prototype={init:function(a,b,c,d){d=d||{};if(this.inited)return;this.factory=b,c?this.on("error",c):this.events.error&&(c=bind(this,function(a){this.emit("error",a)})),this.depMaps=a&&a.slice(0),this.depMaps.rjsSkipMap=a.rjsSkipMap,this.errback=c,this.inited=!0,this.ignore=d.ignore,d.enabled||this.enabled?this.enable():this.check()},defineDepById:function(a,b){var c;return each(this.depMaps,function(b,d){if(b.id===a)return c=d,!0}),this.defineDep(c,b)},defineDep:function(a,b){this.depMatched[a]||(this.depMatched[a]=!0,this.depCount-=1,this.depExports[a]=b)},fetch:function(){if(this.fetched)return;this.fetched=!0,d.startTime=(new Date).getTime();var a=this.map;if(!this.shim)return a.prefix?this.callPlugin():this.load();y(this,!0)(this.shim.deps||[],bind(this,function(){return a.prefix?this.callPlugin():this.load()}))},load:function(){var a=this.map.url;l[a]||(l[a]=!0,d.load(this.map.id,a))},check:function(a){if(!this.enabled||this.enabling)return;var b,c,e=this.map.id,f=this.depExports,g=this.exports,i=this.factory;if(!this.inited)this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){this.defining=!0;if(this.depCount<1&&!this.defined){if(isFunction(i)){if(this.events.error)try{g=d.execCb(e,i,f,g)}catch(j){b=j}else g=d.execCb(e,i,f,g);this.map.isDefine&&(c=this.module,c&&c.exports!==undefined&&c.exports!==this.exports?g=c.exports:g===undefined&&this.usingExports&&(g=this.exports));if(b)return b.requireMap=this.map,b.requireModules=[this.map.id],b.requireType="define",w(this.error=b)}else g=i;this.exports=g,this.map.isDefine&&!this.ignore&&(k[e]=g,req.onResourceLoad&&req.onResourceLoad(d,this.map,this.depMaps)),delete h[e],this.defined=!0,d.waitCount-=1,d.waitCount===0&&(o=[])}this.defining=!1,a||this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}},callPlugin:function(){var a=this.map,b=a.id,c=t(a.prefix,null,!1,!0);v(c,"defined",bind(this,function(c){var e,f,i,j=this.map.name,k=this.map.parentMap?this.map.parentMap.name:null;if(this.map.unnormalized){c.normalize&&(j=c.normalize(j,function(a){return q(a,k,!0)})||""),f=t(a.prefix+"!"+j,this.map.parentMap,!1,!0),v(f,"defined",bind(this,function(a){this.init([],function(){return a},null,{enabled:!0,ignore:!0})})),i=h[f.id],i&&(this.events.error&&i.on("error",bind(this,function(a){this.emit("error",a)})),i.enable());return}e=bind(this,function(a){this.init([],function(){return a},null,{enabled:!0})}),e.error=bind(this,function(a){this.inited=!0,this.error=a,a.requireModules=[b],eachProp(h,function(a){a.map.id.indexOf(b+"_unnormalized")===0&&z(a.map.id)}),w(a)}),e.fromText=function(a,b){var c=useInteractive;c&&(useInteractive=!1),u(t(a)),req.exec(b),c&&(useInteractive=!0),d.completeLoad(a)},c.load(a.name,y(a.parentMap,!0,function(a,b,c){return a.rjsSkipMap=!0,d.require(a,b,c)}),e,g)})),d.enable(c,this),this.pluginMaps[c.id]=c},enable:function(){this.enabled=!0,this.waitPushed||(o.push(this),d.waitCount+=1,this.waitPushed=!0),this.enabling=!0,each(this.depMaps,bind(this,function(a,b){var c,f,g;if(typeof a=="string"){a=t(a,this.map.isDefine?this.map:this.map.parentMap,!1,!this.depMaps.rjsSkipMap),this.depMaps[b]=a,g=e[a.id];if(g){this.depExports[b]=g(this);return}this.depCount+=1,v(a,"defined",bind(this,function(a){this.defineDep(b,a),this.check()})),this.errback&&v(a,"error",this.errback)}c=a.id,f=h[c],!e[c]&&f&&!f.enabled&&d.enable(a,this)})),eachProp(this.pluginMaps,bind(this,function(a){var b=h[a.id];b&&!b.enabled&&d.enable(a,this)})),this.enabling=!1,this.check()},on:function(a,b){var c=this.events[a];c||(c=this.events[a]=[]),c.push(b)},emit:function(a,b){each(this.events[a],function(a){a(b)}),a==="error"&&delete this.events[a]}},d={config:g,contextName:a,registry:h,defined:k,urlFetched:l,waitCount:0,defQueue:j,Module:c,makeModuleMap:t,configure:function(a){a.baseUrl&&a.baseUrl.charAt(a.baseUrl.length-1)!=="/"&&(a.baseUrl+="/");var b=g.pkgs,c=g.shim,e=g.paths,f=g.map;mixin(g,a,!0),g.paths=mixin(e,a.paths,!0),a.map&&(g.map=mixin(f||{},a.map,!0,!0)),a.shim&&(eachProp(a.shim,function(a,b){isArray(a)&&(a={deps:a}),a.exports&&!a.exports.__buildReady&&(a.exports=d.makeShimExports(a.exports)),c[b]=a}),g.shim=c),a.packages&&(each(a.packages,function(a){var c;a=typeof a=="string"?{name:a}:a,c=a.location,b[a.name]={name:a.name,location:c||a.name,main:(a.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}}),g.pkgs=b),eachProp(h,function(a,b){!a.inited&&!a.map.unnormalized&&(a.map=t(b))}),(a.deps||a.callback)&&d.require(a.deps||[],a.callback)},makeShimExports:function(a){var b;return typeof a=="string"?(b=function(){return getGlobal(a)},b.exports=a,b):function(){return a.apply(global,arguments)}},requireDefined:function(a,b){return hasProp(k,t(a,b,!1,!0).id)},requireSpecified:function(a,b){return a=t(a,b,!1,!0).id,hasProp(k,a)||hasProp(h,a)},require:function(b,c,e,f){var g,h,i,l,m;if(typeof b=="string")return isFunction(c)?w(makeError("requireargs","Invalid require call"),e):req.get?req.get(d,b,c):(g=b,f=c,i=t(g,f,!1,!0),h=i.id,hasProp(k,h)?k[h]:w(makeError("notloaded",'Module name "'+h+'" has not been loaded yet for context: '+a)));e&&!isFunction(e)&&(f=e,e=undefined),c&&!isFunction(c)&&(f=c,c=undefined),x();while(j.length){m=j.shift();if(m[0]===null)return w(makeError("mismatch","Mismatched anonymous define() module: "+m[m.length-1]));E(m)}return l=u(t(null,f)),l.init(b,c,e,{enabled:!0}),D(),d.require},undef:function(a){x();var b=t(a,null,!0),c=h[a];delete k[a],delete l[b.url],delete i[a],c&&(c.events.defined&&(i[a]=c.events),z(a))},enable:function(a,b){var c=h[a.id];c&&u(a).enable()},completeLoad:function(a){var b,c,d,e=g.shim[a]||{},f=e.exports&&e.exports.exports;x();while(j.length){c=j.shift();if(c[0]===null){c[0]=a;if(b)break;b=!0}else c[0]===a&&(b=!0);E(c)}d=h[a];if(!b&&!k[a]&&d&&!d.inited){if(g.enforceDefine&&(!f||!getGlobal(f))){if(s(a))return;return w(makeError("nodefine","No define call for "+a,null,[a]))}E([a,e.deps||[],e.exports])}D()},toUrl:function(a,b){var c=a.lastIndexOf("."),e=null;return c!==-1&&(e=a.substring(c,a.length),a=a.substring(0,c)),d.nameToUrl(q(a,b&&b.id,!0),e)},nameToUrl:function(a,b){var c,d,e,f,h,i,j,k,l;if(req.jsExtRegExp.test(a))k=a+(b||"");else{c=g.paths,d=g.pkgs,h=a.split("/");for(i=h.length;i>0;i-=1){j=h.slice(0,i).join("/"),e=d[j],l=c[j];if(l){isArray(l)&&(l=l[0]),h.splice(0,i,l);break}if(e){a===e.name?f=e.location+"/"+e.main:f=e.location,h.splice(0,i,f);break}}k=h.join("/"),k+=b||(/\?/.test(k)?"":".js"),k=(k.charAt(0)==="/"||k.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+k}return g.urlArgs?k+((k.indexOf("?")===-1?"?":"&")+g.urlArgs):k},load:function(a,b){req.load(d,a,b)},execCb:function(a,b,c,d){return b.apply(d,c)},onScriptLoad:function(a){if(a.type==="load"||readyRegExp.test((a.currentTarget||a.srcElement).readyState)){interactiveScript=null;var b=G(a);d.completeLoad(b.id)}},onScriptError:function(a){var b=G(a);if(!s(b.id))return w(makeError("scripterror","Script error",a,[b.id]))}}}function getInteractiveScript(){return interactiveScript&&interactiveScript.readyState==="interactive"?interactiveScript:(eachReverse(scripts(),function(a){if(a.readyState==="interactive")return interactiveScript=a}),interactiveScript)}var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.0.5",commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,aps=ap.slice,apsp=ap.splice,isBrowser=typeof window!="undefined"&&!!navigator&&!!document,isWebWorker=!isBrowser&&typeof importScripts!="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1;if(typeof define!="undefined")return;if(typeof requirejs!="undefined"){if(isFunction(requirejs))return;cfg=requirejs,requirejs=undefined}typeof require!="undefined"&&!isFunction(require)&&(cfg=require,require=undefined),req=requirejs=function(a,b,c,d){var e,f,g=defContextName;return!isArray(a)&&typeof a!="string"&&(f=a,isArray(b)?(a=b,b=c,c=d):a=[]),f&&f.context&&(g=f.context),e=contexts[g],e||(e=contexts[g]=req.s.newContext(g)),f&&e.configure(f),e.require(a,b,c)},req.config=function(a){return req(a)},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),addRequireMethods(req),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=function(a){throw a},req.load=function(a,b,c){var d=a&&a.config||{},e;if(isBrowser)return e=d.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script"),e.type=d.scriptType||"text/javascript",e.charset="utf-8",e.async=!0,e.setAttribute("data-requirecontext",a.contextName),e.setAttribute("data-requiremodule",b),e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!isOpera?(useInteractive=!0,e.attachEvent("onreadystatechange",a.onScriptLoad)):(e.addEventListener("load",a.onScriptLoad,!1),e.addEventListener("error",a.onScriptError,!1)),e.src=c,currentlyAddingScript=e,baseElement?head.insertBefore(e,baseElement):head.appendChild(e),currentlyAddingScript=null,e;isWebWorker&&(importScripts(c),a.completeLoad(b))},isBrowser&&eachReverse(scripts(),function(a){head||(head=a.parentNode),dataMain=a.getAttribute("data-main");if(dataMain)return cfg.baseUrl||(src=dataMain.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath,dataMain=mainScript),dataMain=dataMain.replace(jsSuffixRegExp,""),cfg.deps=cfg.deps?cfg.deps.concat(dataMain):[dataMain],!0}),define=function(a,b,c){var d,e;typeof a!="string"&&(c=b,b=a,a=null),isArray(b)||(c=b,b=[]),!b.length&&isFunction(c)&&c.length&&(c.toString().replace(commentRegExp,"").replace(cjsRequireRegExp,function(a,c){b.push(c)}),b=(c.length===1?["require"]:["require","exports","module"]).concat(b)),useInteractive&&(d=currentlyAddingScript||getInteractiveScript(),d&&(a||(a=d.getAttribute("data-requiremodule")),e=contexts[d.getAttribute("data-requirecontext")])),(e?e.defQueue:globalDefQueue).push([a,b,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)})(this),function(){(function(){define("app",[],function(){var a,b;return $("#landing").parallax("50%",1),$("#landing .landing-vid").parallax("50%",1),$("#game").parallax("50%",.1),$("#game .vid").parallax("30%",1),$("#profile").parallax("50%",.1),$("#profile .vid").parallax("70%",1),$("#rankings").parallax("50%",.1),$("#rankings .vid").parallax("80%",1),$("#nav a").tooltip({placement:"left"}),Parse.initialize("K56c7l2dF36xoDdMsQF8KND5yHirjqUFFblHcfdO","JnFjXwGeZuvt8WVeWd0348xqXv3QzNohhiewUFdG"),a=Parse.Object.extend("NotifyEmail"),b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,$("#get_notified").submit(function(){var c,d;return c=$(this).find("#emailInput").val(),c.length===0||!b.test(c)?($(".result-msg").html("Please provide a valid email"),!1):(d=new a({email:c}),d.save(null,{success:function(a){return $(".result-msg").addClass("success").html("Email Saved"),$("#emailInput").attr("disabled",!0),$("#get_notified .submit").addClass("disabled")},error:function(a,b){return $(".result-msg").html(b.message)}}),!1)})})}).call(this),function(){define("analytics",[],function(){return $("#nav li a").click(function(){var a;return a=$(this).data("originalTitle"),mixpanel.track(""+a+" Clicked")}),$("#facebook").click(function(){return mixpanel.track("Facebook Clicked")})})}.call(this),function(){require.config({paths:{jquery:"vendor/jquery.min"}}),require(["app","analytics"],function(a){return console.log(a)})}.call(this),define("main",function(){})}();