!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([,function(e,t,n){n(2),n(3),e.exports=n(4)},function(e,t){document.getElementById("hrefLogin").addEventListener("click",(function(e){e.target.parentNode.parentNode.parentNode.parentNode.style.display="none",e.target.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.display="block"})),document.getElementById("hrefRegister").addEventListener("click",(function(e){e.target.parentNode.parentNode.parentNode.parentNode.style.display="none",e.target.parentNode.parentNode.parentNode.parentNode.previousElementSibling.style.display="block"}))},function(e,t){document.getElementById("registerForm").addEventListener("submit",(function(e){e.preventDefault();var t=document.getElementById("reg_email").value,n=document.getElementById("reg_psw").value;if(n!=document.getElementById("reg_psw_repeat").value)return alert("Oba hasła muszą być takie same");var r=JSON.stringify({email:t,password:n}),o=new XMLHttpRequest;o.onloadend=function(){alert(this.response)},o.open("POST","http://localhost:3000/api/users/"),o.setRequestHeader("Content-type","application/json; charset=utf-8"),o.send(r)})),document.getElementById("loginForm").addEventListener("submit",(function(e){e.preventDefault();var t=document.getElementById("log_email").value,n=document.getElementById("log_psw").value,r=JSON.stringify({email:t,password:n}),o=new XMLHttpRequest;o.withCredentials=!0,o.open("POST","http://localhost:3000/api/auth"),o.setRequestHeader("Content-Type","application/json;charset=UTF-8"),o.onreadystatechange=function(){4==o.readyState&&alert(o.response)},o.send(r)}))},function(e,t,n){}]);