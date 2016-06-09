function checkString(e,n,r){var t="",c=!1,i=0,s=fs.createReadStream(e,{encoding:"utf8"});s.on("close",r),s.on("error",r),s.on("readable",function(){for(;c!==!0&&null!==(t=s.read(1));)t===n.charAt(i)?i+=1:i=0,i===n.length&&(c=!0);assert.equal(!0,c),this.close()})}function runTests(){var e=dirs.dist;describe('Test if the files from the "'+e+'" directory have the expected content',function(){it('".htaccess" should have the "ErrorDocument..." line uncommented',function(n){var r="\n\nErrorDocument 404 /404.html\n\n";checkString(path.resolve(e,".htaccess"),r,n)}),it('"index.html" should contain the correct jQuery version in the CDN URL',function(n){var r="code.jquery.com/jquery-"+pkg.devDependencies.jquery+".min.js";checkString(path.resolve(e,"index.html"),r,n)}),it('"index.html" should contain the correct jQuery version in the local URL',function(n){var r="js/vendor/jquery-"+pkg.devDependencies.jquery+".min.js";checkString(path.resolve(e,"index.html"),r,n)}),it('"main.css" should contain a custom banner',function(n){var r="/*! HTML5 Boilerplate v"+pkg.version+" | "+pkg.license.type+" License | "+pkg.homepage+" */\n\n/*\n";checkString(path.resolve(e,"css/main.css"),r,n)})})}var assert=require("assert"),fs=require("fs"),path=require("path"),pkg=require("./../package.json"),dirs=pkg["h5bp-configs"].directories;runTests();