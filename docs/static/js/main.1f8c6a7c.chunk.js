(this.webpackJsonpgeoapp=this.webpackJsonpgeoapp||[]).push([[0],{15:function(e){e.exports=JSON.parse('[{"id":1,"name":"Lucena","coordinates":[37.41005076407196,-4.486455917358398]},{"id":2,"name":"Montilla","coordinates":[37.586758481479116,-4.637689590454102]},{"id":3,"name":"Montoro","coordinates":[38.02551215000266,-4.383244514465331]}]')},16:function(e,t,a){e.exports=a(27)},22:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(13),c=a.n(r),o=(a(21),a(22),a(6)),m=a(7),i=a(10),u=a(9),s=a(30),d=a(29),p=(a(23),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement(s.a,{style:{width:"100%",height:"60vh"},center:[37.885963680860755,-4.774589538574219],zoom:12},l.a.createElement(d.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}))}}]),a}(l.a.Component)),E=a(15),h=function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={data:E},e}return Object(m.a)(a,[{key:"render",value:function(){var e=this.state.data;return l.a.createElement("div",null,l.a.createElement("label",null,"Municipality"),l.a.createElement("select",{className:"form-control",onChange:this.selectListChange},l.a.createElement("option",{value:""},"Selecciona un municipio"),e.map((function(e){return l.a.createElement("option",{key:e.id,value:[e.coordinates,e.name]},e.name)}))))}}]),a}(l.a.Component),b=(a(26),function(e){Object(i.a)(a,e);var t=Object(u.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(m.a)(a,[{key:"render",value:function(){return l.a.createElement("div",{className:"container-fluid"},l.a.createElement("div",{className:"row m-3"},l.a.createElement("div",{className:"col-12"},l.a.createElement("h1",{className:"text-center"},"GeoApp"))),l.a.createElement("div",{className:"row m-3"},l.a.createElement("div",{className:"col-sm-4 col-md-2"},l.a.createElement("div",{className:"form-group"},l.a.createElement(h,null)),l.a.createElement("button",{className:"btn btn-primary mb-3"},"Load")),l.a.createElement("div",{className:"col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3"},l.a.createElement(p,null))),l.a.createElement("div",{className:"row m-3"},l.a.createElement("div",{className:"col"},l.a.createElement("table",{className:"table table-striped"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"ID"),l.a.createElement("th",null,"Type"),l.a.createElement("th",null,"Name"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",null,"1"),l.a.createElement("td",null,"Type 1"),l.a.createElement("td",null,"\xc1lvaro")),l.a.createElement("tr",null,l.a.createElement("td",null,"2"),l.a.createElement("td",null,"Type 2"),l.a.createElement("td",null,"name 2")),l.a.createElement("tr",null,l.a.createElement("td",null,"3"),l.a.createElement("td",null,"Type 1"),l.a.createElement("td",null,"name 3")))))))}}]),a}(l.a.Component));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(b,null)),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.1f8c6a7c.chunk.js.map