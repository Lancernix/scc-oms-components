"use strict";(self.webpackChunkscc_oms_components=self.webpackChunkscc_oms_components||[]).push([[576],{46576:function(A,d,o){o.r(d),o.d(d,{DatePicker:function(){return N},Foo:function(){return O},TimePicker:function(){return W}});var H=o(75590),g=o.n(H),y=o(95530),h=o.n(y),P=o(26486),V=o(87708),m=o(57689),x=o(98777),u=o.n(x);function F(e){return u().isMoment(e)?e.unix():void 0}function k(e){return u().isMoment(e)?e.valueOf():void 0}function M(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"YYYY-MM-DD HH:mm:ss";return u().isMoment(e)?e.format(n):void 0}function T(e,n){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"YYYY-MM-DD HH:mm:ss";switch(n){case"string":return M(e,t);case"secondTimestamp":return F(e);case"timestamp":return k(e);case"moment":return u().isMoment(e)?e:void 0;default:return M(e,t)}}function $(e,n){var t=n!=null?n:"YYYY-MM-DD HH:mm:ss",r=u()(e,t);return r.isValid()?r:void 0}function E(e){return Number.isInteger(e)?u().unix(e):void 0}function S(e){return Number.isInteger(e)?u()(e):void 0}function Y(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"YYYY-MM-DD HH:mm:ss";return typeof e=="string"?$(e,n):typeof e=="number"?e.toString().length<13?E(e):S(e):u().isMoment(e)?e:void 0}var B={},j=["value","onChange","valueType","format","picker"],I=["value","onChange","valueType","format"];function N(e){var n=e.value,t=e.onChange,r=e.valueType,l=r===void 0?"string":r,a=e.format,i=a===void 0?"YYYY-MM-DD HH:mm:ss":a,v=e.picker,c=h()(e,j),f=(0,m.useMemo)(function(){return Y(n,i)},[n]),C=function(s){var z=T(s,l,i);t==null||t(z)};return m.createElement(P.Z,g()({value:f,onChange:C,format:i,picker:v},c))}function W(e){var n=e.value,t=e.onChange,r=e.valueType,l=r===void 0?"string":r,a=e.format,i=a===void 0?"HH:mm:ss":a,v=h()(e,I),c=(0,m.useMemo)(function(){return Y(n,i)},[n]),f=function(D){var s=T(D,l,i);t==null||t(s)};return m.createElement(V.Z,g()({value:c,onChange:f,format:i},v))}var Z=function(n){return m.createElement("h4",null,n.title)},O=Z}}]);
