/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[17],{439:function(Aa,ua,r){r.r(ua);var pa=r(1),ka=r(244);Aa=r(429);var ma=r(94);r=r(372);var ha={},da=function(aa){function x(y,h){var e=aa.call(this,y,h)||this;e.url=y;e.range=h;e.status=ka.a.NOT_STARTED;return e}Object(pa.c)(x,aa);x.prototype.start=function(y){var h=this;"undefined"===typeof ha[this.range.start]&&(ha[this.range.start]={HM:function(e){var b=atob(e),a,f=b.length;e=new Uint8Array(f);for(a=0;a<f;++a)e[a]=b.charCodeAt(a);
b=e.length;a="";for(var n=0;n<b;)f=e.subarray(n,n+1024),n+=1024,a+=String.fromCharCode.apply(null,f);h.HM(a,y)},Coa:function(){h.status=ka.a.ERROR;y({code:h.status})}},window.external.notify(this.url),this.status=ka.a.STARTED);h.pC()};return x}(Aa.ByteRangeRequest);Aa=function(aa){function x(y,h,e,b){y=aa.call(this,y,e,b)||this;y.Kx=da;return y}Object(pa.c)(x,aa);x.prototype.Ev=function(y,h){return y+"?"+h.start+"&"+(h.stop?h.stop:"")};return x}(ma.a);Object(r.a)(Aa);Object(r.b)(Aa);ua["default"]=
Aa}}]);}).call(this || window)