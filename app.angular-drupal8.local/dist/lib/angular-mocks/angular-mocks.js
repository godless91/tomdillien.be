!function(e,t){"use strict";function n(e){var t;if(t=e.match(a)){var n=new Date(0),o=0,i=0;return t[9]&&(o=r(t[9]+t[10]),i=r(t[9]+t[11])),n.setUTCFullYear(r(t[1]),r(t[2])-1,r(t[3])),n.setUTCHours(r(t[4]||0)-o,r(t[5]||0)-i,r(t[6]||0),r(t[7]||0)),n}return e}function r(e){return parseInt(e,10)}function o(e,t,n){var r="";for(0>e&&(r="-",e=-e),e=""+e;e.length<t;)e="0"+e;return n&&(e=e.substr(e.length-t)),r+e}function i(e,n,r,o){function i(e,n,r,o){return t.isFunction(e)?e:function(){return t.isNumber(e)?[e,n,r,o]:[200,e,n,r]}}function a(e,i,s,a,u,f,p,m,v,w){function E(e){return t.isString(e)||t.isFunction(e)||e instanceof RegExp?e:t.toJson(e)}function k(t){function r(){var n=t.response(e,i,s,u,t.params(i));D.$$respHeaders=n[2],a(g(n[0]),g(n[1]),D.getAllResponseHeaders(),g(n[3]||""))}function c(){for(var e=0,t=h.length;t>e;e++)if(h[e]===r){h.splice(e,1),a(-1,void 0,"");break}}return!o&&f&&(f.then?f.then(c):n(c,f)),r}var D=new c,y=d[0],T=!1;if(D.$$events=v,D.upload.$$events=w,y&&y.match(e,i)){if(!y.matchData(s))throw new Error("Expected "+y+" with different data\nEXPECTED: "+E(y.data)+"\nGOT:      "+s);if(!y.matchHeaders(u))throw new Error("Expected "+y+" with different headers\nEXPECTED: "+E(y.headers)+"\nGOT:      "+E(u));if(d.shift(),y.response)return void h.push(k(y));T=!0}for(var S,j=-1;S=l[++j];)if(S.match(e,i,s,u||{})){if(S.response)(o?o.defer:$)(k(S));else{if(!S.passThrough)throw new Error("No response defined !");r(e,i,s,a,u,f,p,m,v,w)}return}throw T?new Error("No response defined !"):new Error("Unexpected request: "+e+" "+i+"\n"+(y?"Expected "+y:"No more request expected"))}function u(e){var n={regexp:e},r=n.keys=[];return e&&t.isString(e)?(e=e.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(e,t,n,o){var i="?"===o?o:null,s="*"===o?o:null;return r.push({name:n,optional:!!i}),t=t||"",""+(i?"":t)+"(?:"+(i?t:"")+(s&&"(.+?)"||"([^/]+)")+(i||"")+")"+(i||"")}).replace(/([\/$\*])/g,"\\$1"),n.regexp=new RegExp("^"+e,"i"),n):n}function f(e){t.forEach(["GET","DELETE","JSONP","HEAD"],function(t){a[e+t]=function(n,r,o){return a[e](t,n,void 0,r,o)}}),t.forEach(["PUT","POST","PATCH"],function(t){a[e+t]=function(n,r,o,i){return a[e](t,n,r,o,i)}})}var l=[],d=[],h=[],$=t.bind(h,h.push),g=t.copy;return a.when=function(e,t,n,r,c){var a=new s(e,t,n,r,c),u={respond:function(e,t,n,r){return a.passThrough=void 0,a.response=i(e,t,n,r),u}};return o&&(u.passThrough=function(){return a.response=void 0,a.passThrough=!0,u}),l.push(a),u},f("when"),a.whenRoute=function(e,t){var n=u(t);return a.when(e,n.regexp,void 0,void 0,n.keys)},a.expect=function(e,t,n,r,o){var c=new s(e,t,n,r,o),a={respond:function(e,t,n,r){return c.response=i(e,t,n,r),a}};return d.push(c),a},f("expect"),a.expectRoute=function(e,t){var n=u(t);return a.expect(e,n.regexp,void 0,void 0,n.keys)},a.flush=function(n,r){if(r!==!1&&e.$digest(),!h.length)throw new Error("No pending request to flush !");if(t.isDefined(n)&&null!==n)for(;n--;){if(!h.length)throw new Error("No more pending request to flush !");h.shift()()}else for(;h.length;)h.shift()();a.verifyNoOutstandingExpectation(r)},a.verifyNoOutstandingExpectation=function(t){if(t!==!1&&e.$digest(),d.length)throw new Error("Unsatisfied requests: "+d.join(", "))},a.verifyNoOutstandingRequest=function(){if(h.length)throw new Error("Unflushed requests: "+h.length)},a.resetExpectations=function(){d.length=0,h.length=0},a}function s(e,n,r,o,i){function s(e){var t=e.slice(e.indexOf("?")+1).split("&");return t.sort()}function c(e){return n.slice(0,n.indexOf("?"))==e.slice(0,e.indexOf("?"))&&s(n).join()==s(e).join()}this.data=r,this.headers=o,this.match=function(n,r,o,i){return e!=n?!1:this.matchUrl(r)?t.isDefined(o)&&!this.matchData(o)?!1:!t.isDefined(i)||this.matchHeaders(i):!1},this.matchUrl=function(e){return n?t.isFunction(n.test)?n.test(e):t.isFunction(n)?n(e):n==e||c(e):!0},this.matchHeaders=function(e){return t.isUndefined(o)?!0:t.isFunction(o)?o(e):t.equals(o,e)},this.matchData=function(e){return t.isUndefined(r)?!0:r&&t.isFunction(r.test)?r.test(e):r&&t.isFunction(r)?r(e):r&&!t.isString(r)?t.equals(t.fromJson(t.toJson(r)),t.fromJson(e)):r==e},this.toString=function(){return e+" "+n},this.params=function(e){function r(){var r={};if(!n||!t.isFunction(n.test)||!i||0===i.length)return r;var o=n.exec(e);if(!o)return r;for(var s=1,c=o.length;c>s;++s){var a=i[s-1],u=o[s];a&&u&&(r[a.name||a]=u)}return r}function o(){var n,r,o={},i=e.indexOf("?")>-1?e.substring(e.indexOf("?")+1):"";return t.forEach(i.split("&"),function(e){if(e&&(n=e.replace(/\+/g,"%20").split("="),r=s(n[0]),t.isDefined(r))){var i=t.isDefined(n[1])?s(n[1]):!0;hasOwnProperty.call(o,r)?t.isArray(o[r])?o[r].push(i):o[r]=[o[r],i]:o[r]=i}}),o}function s(e){try{return decodeURIComponent(e)}catch(t){}}return t.extend(o(),r())}}function c(){c.$$lastInstance=this,this.open=function(e,t,n){this.$$method=e,this.$$url=t,this.$$async=n,this.$$reqHeaders={},this.$$respHeaders={}},this.send=function(e){this.$$data=e},this.setRequestHeader=function(e,t){this.$$reqHeaders[e]=t},this.getResponseHeader=function(e){var n=this.$$respHeaders[e];return n?n:(e=t.lowercase(e),(n=this.$$respHeaders[e])?n:(n=void 0,t.forEach(this.$$respHeaders,function(r,o){n||t.lowercase(o)!=e||(n=r)}),n))},this.getAllResponseHeaders=function(){var e=[];return t.forEach(this.$$respHeaders,function(t,n){e.push(n+": "+t)}),e.join("\n")},this.abort=t.noop,this.$$events={},this.addEventListener=function(e,n){t.isUndefined(this.$$events[e])&&(this.$$events[e]=[]),this.$$events[e].push(n)},this.upload={$$events:{},addEventListener:this.addEventListener}}t.mock={},t.mock.$BrowserProvider=function(){this.$get=function(){return new t.mock.$Browser}},t.mock.$Browser=function(){var e=this;this.isMock=!0,e.$$url="http://server/",e.$$lastUrl=e.$$url,e.pollFns=[],e.$$completeOutstandingRequest=t.noop,e.$$incOutstandingRequestCount=t.noop,e.onUrlChange=function(t){return e.pollFns.push(function(){e.$$lastUrl===e.$$url&&e.$$state===e.$$lastState||(e.$$lastUrl=e.$$url,e.$$lastState=e.$$state,t(e.$$url,e.$$state))}),t},e.$$applicationDestroyed=t.noop,e.$$checkUrlChange=t.noop,e.deferredFns=[],e.deferredNextId=0,e.defer=function(t,n){return n=n||0,e.deferredFns.push({time:e.defer.now+n,fn:t,id:e.deferredNextId}),e.deferredFns.sort(function(e,t){return e.time-t.time}),e.deferredNextId++},e.defer.now=0,e.defer.cancel=function(n){var r;return t.forEach(e.deferredFns,function(e,t){e.id===n&&(r=t)}),t.isDefined(r)?(e.deferredFns.splice(r,1),!0):!1},e.defer.flush=function(n){if(t.isDefined(n))e.defer.now+=n;else{if(!e.deferredFns.length)throw new Error("No deferred tasks to be flushed");e.defer.now=e.deferredFns[e.deferredFns.length-1].time}for(;e.deferredFns.length&&e.deferredFns[0].time<=e.defer.now;)e.deferredFns.shift().fn()},e.$$baseHref="/",e.baseHref=function(){return this.$$baseHref}},t.mock.$Browser.prototype={poll:function(){t.forEach(this.pollFns,function(e){e()})},url:function(e,n,r){return t.isUndefined(r)&&(r=null),e?(this.$$url=e,this.$$state=t.copy(r),this):this.$$url},state:function(){return this.$$state},notifyWhenNoOutstandingRequests:function(e){e()}},t.mock.$ExceptionHandlerProvider=function(){var e;this.mode=function(t){switch(t){case"log":case"rethrow":var n=[];e=function(e){if(1==arguments.length?n.push(e):n.push([].slice.call(arguments,0)),"rethrow"===t)throw e},e.errors=n;break;default:throw new Error("Unknown mode '"+t+"', only 'log'/'rethrow' modes are allowed!")}},this.$get=function(){return e},this.mode("rethrow")},t.mock.$LogProvider=function(){function e(e,t,n){return e.concat(Array.prototype.slice.call(t,n))}var n=!0;this.debugEnabled=function(e){return t.isDefined(e)?(n=e,this):n},this.$get=function(){var r={log:function(){r.log.logs.push(e([],arguments,0))},warn:function(){r.warn.logs.push(e([],arguments,0))},info:function(){r.info.logs.push(e([],arguments,0))},error:function(){r.error.logs.push(e([],arguments,0))},debug:function(){n&&r.debug.logs.push(e([],arguments,0))}};return r.reset=function(){r.log.logs=[],r.info.logs=[],r.warn.logs=[],r.error.logs=[],r.debug.logs=[]},r.assertEmpty=function(){var e=[];if(t.forEach(["error","warn","info","log","debug"],function(n){t.forEach(r[n].logs,function(r){t.forEach(r,function(t){e.push("MOCK $log ("+n+"): "+String(t)+"\n"+(t.stack||""))})})}),e.length)throw e.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),e.push(""),new Error(e.join("\n---------\n"))},r.reset(),r}},t.mock.$IntervalProvider=function(){this.$get=["$browser","$rootScope","$q","$$q",function(e,n,r,o){var i=[],s=0,c=0,a=function(a,u,f,l){function d(){if(m.notify(g++),f>0&&g>=f){var r;m.resolve(g),t.forEach(i,function(e,t){e.id===v.$$intervalId&&(r=t)}),t.isDefined(r)&&i.splice(r,1)}p?e.defer.flush():n.$apply()}var h=arguments.length>4,$=h?Array.prototype.slice.call(arguments,4):[],g=0,p=t.isDefined(l)&&!l,m=(p?o:r).defer(),v=m.promise;return f=t.isDefined(f)?f:0,v.then(null,null,h?function(){a.apply(null,$)}:a),v.$$intervalId=s,i.push({nextTime:c+u,delay:u,fn:d,id:s,deferred:m}),i.sort(function(e,t){return e.nextTime-t.nextTime}),s++,v};return a.cancel=function(e){if(!e)return!1;var n;return t.forEach(i,function(t,r){t.id===e.$$intervalId&&(n=r)}),t.isDefined(n)?(i[n].deferred.reject("canceled"),i.splice(n,1),!0):!1},a.flush=function(e){for(c+=e;i.length&&i[0].nextTime<=c;){var t=i[0];t.fn(),t.nextTime+=t.delay,i.sort(function(e,t){return e.nextTime-t.nextTime})}return e},a}]};var a=/^(-?\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;t.mock.TzDate=function(e,r){var i=new Date(0);if(t.isString(r)){var s=r;if(i.origDate=n(r),r=i.origDate.getTime(),isNaN(r))throw{name:"Illegal Argument",message:"Arg '"+s+"' passed into TzDate constructor is not a valid date string"}}else i.origDate=new Date(r);var c=new Date(r).getTimezoneOffset();i.offsetDiff=60*c*1e3-1e3*e*60*60,i.date=new Date(r+i.offsetDiff),i.getTime=function(){return i.date.getTime()-i.offsetDiff},i.toLocaleDateString=function(){return i.date.toLocaleDateString()},i.getFullYear=function(){return i.date.getFullYear()},i.getMonth=function(){return i.date.getMonth()},i.getDate=function(){return i.date.getDate()},i.getHours=function(){return i.date.getHours()},i.getMinutes=function(){return i.date.getMinutes()},i.getSeconds=function(){return i.date.getSeconds()},i.getMilliseconds=function(){return i.date.getMilliseconds()},i.getTimezoneOffset=function(){return 60*e},i.getUTCFullYear=function(){return i.origDate.getUTCFullYear()},i.getUTCMonth=function(){return i.origDate.getUTCMonth()},i.getUTCDate=function(){return i.origDate.getUTCDate()},i.getUTCHours=function(){return i.origDate.getUTCHours()},i.getUTCMinutes=function(){return i.origDate.getUTCMinutes()},i.getUTCSeconds=function(){return i.origDate.getUTCSeconds()},i.getUTCMilliseconds=function(){return i.origDate.getUTCMilliseconds()},i.getDay=function(){return i.date.getDay()},i.toISOString&&(i.toISOString=function(){return o(i.origDate.getUTCFullYear(),4)+"-"+o(i.origDate.getUTCMonth()+1,2)+"-"+o(i.origDate.getUTCDate(),2)+"T"+o(i.origDate.getUTCHours(),2)+":"+o(i.origDate.getUTCMinutes(),2)+":"+o(i.origDate.getUTCSeconds(),2)+"."+o(i.origDate.getUTCMilliseconds(),3)+"Z"});var a=["getUTCDay","getYear","setDate","setFullYear","setHours","setMilliseconds","setMinutes","setMonth","setSeconds","setTime","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setYear","toDateString","toGMTString","toJSON","toLocaleFormat","toLocaleString","toLocaleTimeString","toSource","toString","toTimeString","toUTCString","valueOf"];return t.forEach(a,function(e){i[e]=function(){throw new Error("Method '"+e+"' is not implemented in the TzDate mock")}}),i},t.mock.TzDate.prototype=Date.prototype,t.mock.animate=t.module("ngAnimateMock",["ng"]).config(["$provide",function(e){e.factory("$$forceReflow",function(){function e(){e.totalReflows++}return e.totalReflows=0,e}),e.factory("$$animateAsyncRun",function(){var e=[],t=function(){return function(t){e.push(t)}};return t.flush=function(){if(0===e.length)return!1;for(var t=0;t<e.length;t++)e[t]();return e=[],!0},t}),e.decorator("$$animateJs",["$delegate",function(e){var t=[],n=function(){var n=e.apply(e,arguments);return n&&t.push(n),n};return n.$closeAndFlush=function(){t.forEach(function(e){e.end()}),t=[]},n}]),e.decorator("$animateCss",["$delegate",function(e){var t=[],n=function(n,r){var o=e(n,r);return t.push(o),o};return n.$closeAndFlush=function(){t.forEach(function(e){e.end()}),t=[]},n}]),e.decorator("$animate",["$delegate","$timeout","$browser","$$rAF","$animateCss","$$animateJs","$$forceReflow","$$animateAsyncRun","$rootScope",function(e,n,r,o,i,s,c,a,u){var f={queue:[],cancel:e.cancel,on:e.on,off:e.off,pin:e.pin,get reflows(){return c.totalReflows},enabled:e.enabled,closeAndFlush:function(){this.flush(!0),i.$closeAndFlush(),s.$closeAndFlush(),this.flush()},flush:function(e){u.$digest();var t,n=!1;do t=!1,o.queue.length&&(o.flush(),t=n=!0),a.flush()&&(t=n=!0);while(t);if(!n&&!e)throw new Error("No pending animations ready to be closed or flushed");u.$digest()}};return t.forEach(["animate","enter","leave","move","addClass","removeClass","setClass"],function(t){f[t]=function(){return f.queue.push({event:t,element:arguments[0],options:arguments[arguments.length-1],args:arguments}),e[t].apply(e,arguments)}}),f}])}]),t.mock.dump=function(e){function n(e){var o;return t.isElement(e)?(e=t.element(e),o=t.element("<div></div>"),t.forEach(e,function(e){o.append(t.element(e).clone())}),o=o.html()):t.isArray(e)?(o=[],t.forEach(e,function(e){o.push(n(e))}),o="[ "+o.join(", ")+" ]"):o=t.isObject(e)?t.isFunction(e.$eval)&&t.isFunction(e.$apply)?r(e):e instanceof Error?e.stack||""+e.name+": "+e.message:t.toJson(e,!0):String(e),o}function r(e,n){n=n||"  ";var o=[n+"Scope("+e.$id+"): {"];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&!i.match(/^(\$|this)/)&&o.push("  "+i+": "+t.toJson(e[i]));for(var s=e.$$childHead;s;)o.push(r(s,n+"  ")),s=s.$$nextSibling;return o.push("}"),o.join("\n"+n)}return n(e)},t.mock.$HttpBackendProvider=function(){this.$get=["$rootScope","$timeout",i]},t.mock.$TimeoutDecorator=["$delegate","$browser",function(e,n){function r(e){var n=[];return t.forEach(e,function(e){n.push("{id: "+e.id+", time: "+e.time+"}")}),n.join(", ")}return e.flush=function(e){n.defer.flush(e)},e.verifyNoPendingTasks=function(){if(n.deferredFns.length)throw new Error("Deferred tasks to flush ("+n.deferredFns.length+"): "+r(n.deferredFns))},e}],t.mock.$RAFDecorator=["$delegate",function(e){var t=function(e){var n=t.queue.length;return t.queue.push(e),function(){t.queue.splice(n,1)}};return t.queue=[],t.supported=e.supported,t.flush=function(){if(0===t.queue.length)throw new Error("No rAF callbacks present");for(var e=t.queue.length,n=0;e>n;n++)t.queue[n]();t.queue=t.queue.slice(n)},t}];var u;t.mock.$RootElementProvider=function(){this.$get=["$injector",function(e){return u=t.element("<div ng-app></div>").data("$injector",e)}]},t.mock.$ControllerDecorator=["$delegate",function(e){return function(n,r,o,i){if(o&&"object"==typeof o){var s=e(n,r,!0,i);return t.extend(s.instance,o),s()}return e(n,r,o,i)}}],t.mock.$ComponentControllerProvider=["$compileProvider",function(e){this.$get=["$controller","$injector","$rootScope",function(e,t,n){return function(r,o,i,s){var c=t.get(r+"Directive"),a=c.filter(function(e){return e.controller&&e.controllerAs&&"E"===e.restrict});if(0===a.length)throw new Error("No component found");if(a.length>1)throw new Error("Too many components found");var u=a[0];return o=o||{},o.$scope=o.$scope||n.$new(!0),e(u.controller,o,i,s||u.controllerAs)}}]}],t.module("ngMock",["ng"]).provider({$browser:t.mock.$BrowserProvider,$exceptionHandler:t.mock.$ExceptionHandlerProvider,$log:t.mock.$LogProvider,$interval:t.mock.$IntervalProvider,$httpBackend:t.mock.$HttpBackendProvider,$rootElement:t.mock.$RootElementProvider,$componentController:t.mock.$ComponentControllerProvider}).config(["$provide",function(e){e.decorator("$timeout",t.mock.$TimeoutDecorator),e.decorator("$$rAF",t.mock.$RAFDecorator),e.decorator("$rootScope",t.mock.$RootScopeDecorator),e.decorator("$controller",t.mock.$ControllerDecorator)}]),t.module("ngMockE2E",["ng"]).config(["$provide",function(e){e.decorator("$httpBackend",t.mock.e2e.$httpBackendDecorator)}]),t.mock.e2e={},t.mock.e2e.$httpBackendDecorator=["$rootScope","$timeout","$delegate","$browser",i],t.mock.$RootScopeDecorator=["$delegate",function(e){function t(){for(var e,t=0,n=[this.$$childHead];n.length;)for(e=n.shift();e;)t+=1,n.push(e.$$childHead),e=e.$$nextSibling;return t}function n(){for(var e,t=this.$$watchers?this.$$watchers.length:0,n=[this.$$childHead];n.length;)for(e=n.shift();e;)t+=e.$$watchers?e.$$watchers.length:0,n.push(e.$$childHead),e=e.$$nextSibling;return t}var r=Object.getPrototypeOf(e);return r.$countChildScopes=t,r.$countWatchers=n,e}],!function(n){function r(){this.shared=!1,this.sharedError=null,this.cleanupAfterEach=function(){return!this.shared||this.sharedError}}if(n){var o=null,i=new r,s=[],a=function(){return!!o};t.mock.$$annotate=t.injector.$$annotate,t.injector.$$annotate=function(e){return"function"!=typeof e||e.$inject||s.push(e),t.mock.$$annotate.apply(this,arguments)};var f=e.module=t.mock.module=function(){function e(){if(o.$injector)throw new Error("Injector already created, can not register a module!");var e,r=o.$modules||(o.$modules=[]);t.forEach(n,function(n){e=t.isObject(n)&&!t.isArray(n)?["$provide",function(e){t.forEach(n,function(t,n){e.value(n,t)})}]:n,o.$providerInjector?o.$providerInjector.invoke(e):r.push(e)})}var n=Array.prototype.slice.call(arguments,0);return a()?e():e};f.$$beforeAllHook=e.before||e.beforeAll,f.$$afterAllHook=e.after||e.afterAll,f.$$currentSpec=function(e){return 0===arguments.length?e:void(o=e)},f.sharedInjector=function(){if(!f.$$beforeAllHook||!f.$$afterAllHook)throw Error("sharedInjector() cannot be used unless your test runner defines beforeAll/afterAll");var e=!1;f.$$beforeAllHook(function(){if(i.shared)throw i.sharedError=Error("sharedInjector() cannot be called inside a context that has already called sharedInjector()"),i.sharedError;e=!0,o=this,i.shared=!0}),f.$$afterAllHook(function(){e?(i=new r,f.$$cleanup()):i.sharedError=null})},f.$$beforeEach=function(){if(i.shared&&o&&o!=this){var e=o;o=this,t.forEach(["$injector","$modules","$providerInjector","$injectorStrict"],function(t){o[t]=e[t],e[t]=null})}else o=this,u=null,s=[]},f.$$afterEach=function(){i.cleanupAfterEach()&&f.$$cleanup()},f.$$cleanup=function(){var e=o.$injector;if(s.forEach(function(e){delete e.$inject}),t.forEach(o.$modules,function(e){e&&e.$$hashKey&&(e.$$hashKey=void 0)}),o.$injector=null,o.$modules=null,o.$providerInjector=null,o=null,e){var n=e.get("$rootElement"),r=n&&n[0],i=u?[u[0]]:[];!r||u&&r===u[0]||i.push(r),t.element.cleanData(i);var a=e.get("$rootScope");a&&a.$destroy&&a.$destroy()}t.forEach(t.element.fragments,function(e,n){delete t.element.fragments[n]}),c.$$lastInstance=null,t.forEach(t.callbacks,function(e,n){delete t.callbacks[n]}),t.callbacks.counter=0},(e.beforeEach||e.setup)(f.$$beforeEach),(e.afterEach||e.teardown)(f.$$afterEach);var l=function(e,t){this.message=e.message,this.name=e.name,e.line&&(this.line=e.line),e.sourceId&&(this.sourceId=e.sourceId),e.stack&&t&&(this.stack=e.stack+"\n"+t.stack),e.stackArray&&(this.stackArray=e.stackArray)};l.prototype.toString=Error.prototype.toString,e.inject=t.mock.inject=function(){function e(){var e=o.$modules||[],i=!!o.$injectorStrict;e.unshift(["$injector",function(e){o.$providerInjector=e}]),e.unshift("ngMock"),e.unshift("ng");var s=o.$injector;s||(i&&t.forEach(e,function(e){"function"==typeof e&&t.injector.$$annotate(e)}),s=o.$injector=t.injector(e,i),o.$injectorStrict=i);for(var c=0,a=n.length;a>c;c++){o.$injectorStrict&&s.annotate(n[c]);try{s.invoke(n[c]||t.noop,this)}catch(u){if(u.stack&&r)throw new l(u,r);throw u}finally{r=null}}}var n=Array.prototype.slice.call(arguments,0),r=new Error("Declaration Location");if(!r.stack)try{throw r}catch(i){}return a()?e.call(o):e},t.mock.inject.strictDi=function(e){function t(){if(e!==o.$injectorStrict){if(o.$injector)throw new Error("Injector already created, can not modify strict annotations");o.$injectorStrict=e}}return e=arguments.length?!!e:!0,a()?t():t}}}(e.jasmine||e.mocha)}(window,window.angular);