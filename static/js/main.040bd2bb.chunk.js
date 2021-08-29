(this["webpackJsonpcourse-finder"]=this["webpackJsonpcourse-finder"]||[]).push([[0],{139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(12),c=a.n(i),s=a(11),l=a(195),o=a(196),j=a(55),d=a.n(j),u=a(10),b=a(94),h=a(204),O=a(176),m=a(63),x=a(61),p=a(62),g=function(e){return Object(h.a)(Object(b.a)({palette:{type:e?"dark":"light",primary:{main:m.a[800]},secondary:{main:x.a[50]},error:{main:p.a[500]}},props:{MuiTypography:{variantMapping:{h4:"h1",h5:"h2",h6:"h3"}}}}))},v=320,f=Object(O.a)((function(e){return{root:{display:"flex"},flex:{flex:1},paginator:{justifyContent:"center",padding:"10px"},searchBox:{marginBottom:e.spacing(1),marginLeft:e.spacing(1),marginRight:e.spacing(1),"& > *":{marginTop:e.spacing(1)}},drawer:Object(u.a)({},e.breakpoints.up("md"),{width:v,flexShrink:0}),appBar:Object(u.a)({},e.breakpoints.up("md"),{width:"calc(100% - ".concat(v,"px)"),marginLeft:v}),menuButton:Object(u.a)({marginRight:e.spacing(2)},e.breakpoints.up("md"),{display:"none"}),toolbar:e.mixins.toolbar,tabs:{height:"48px"},drawerPaper:{width:v},content:{flexGrow:1,padding:e.spacing(3)},loader:{margin:e.spacing(3)},expand:{transform:"rotate(0deg)",marginLeft:"auto",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest})},expandOpen:{transform:"rotate(180deg)"},gridItem:{height:"100%"}}}),{index:1}),y=a(68),S=a.n(y),C=a(87),N=a(88),w=a.n(N),k=a(198),T=a(178),D=a(141),I=a(180),R=a(197),M=a(184),F=a(185),W=a(183),A=a(200),E=[{value:"20169",label:"'16 Fall - '17 Winter"},{value:"20175",label:"'17 Summer"},{value:"20179",label:"'17 Fall - '18 Winter"},{value:"20185",label:"'18 Summer"},{value:"20189",label:"'18 Fall - '19 Winter"},{value:"20195",label:"'19 Summer"},{value:"20199",label:"'19 Fall - '20 Winter"},{value:"20205",label:"'20 Summer"},{value:"20209",label:"'20 Fall - '21 Winter"},{value:"20215",label:"'21 Summer"},{value:"20219",label:"'21 Fall - '22 Winter"}],B=a(3),P=function(){var e=f();return Object(B.jsx)(k.a,{display:"flex",justifyContent:"center",alignItems:"center",className:e.loader,children:Object(B.jsx)(T.a,{})})},q=function(e){var t=e.setData,a=e.onCourseSelectionAction,r=Object(n.useState)(""),i=Object(s.a)(r,2),c=i[0],l=i[1],o=Object(n.useState)(E[E.length-1].value),j=Object(s.a)(o,2),d=j[0],u=j[1],b=Object(n.useState)({}),h=Object(s.a)(b,2),O=h[0],m=h[1],x=Object(n.useState)(!1),p=Object(s.a)(x,2),g=p[0],v=p[1],y=Object(n.useState)(1),N=Object(s.a)(y,2),T=N[0],q=N[1],L=Object(n.useState)(Math.ceil(Object.keys(O).length/10)),_=Object(s.a)(L,2),H=_[0],U=_[1],J=f();Object(n.useEffect)((function(){var e=function(){var e=Object(C.a)(S.a.mark((function e(){var t,a,n;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/".concat(d,"/courses?code=").concat(c),e.next=3,w.a.get(t,{headers:{}});case 3:a=e.sent,n=a.data,m(n),U(Math.ceil(Object.keys(n).length/10));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),t=function(){v(!0),q(1),e().then((function(){return v(!1)}))};if(!c||!d||O){var a=setTimeout((function(){c&&d&&t()}),500);return function(){clearTimeout(a)}}t()}),[c,d]);var Y=Object.keys(O).slice(10*(T-1),10*T).map((function(e){var n=O[e];return Object(B.jsx)(D.a,{button:!0,onClick:function(){return function(e){t(e),a()}(n)},children:Object(B.jsx)(I.a,{primary:n.courseTitle,secondary:"".concat(n.code).concat(n.section)})},e)}));return Object(B.jsxs)("div",{children:[Object(B.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(B.jsxs)(k.a,{className:J.searchBox,children:[Object(B.jsx)(R.a,{id:"year-input",select:!0,label:"Academic Year",variant:"filled",value:d,onChange:function(e){return u(e.target.value)},fullWidth:!0,children:E.map((function(e){return Object(B.jsx)(M.a,{value:e.value,children:e.label},e.value)}))}),Object(B.jsx)(R.a,{id:"code-input",label:"Course Code",variant:"filled",value:c,onChange:function(e){return l(e.target.value.toUpperCase())},fullWidth:!0})]})}),Object(B.jsx)(F.a,{}),g?Object(B.jsx)(P,{}):null,g?null:Object(B.jsxs)(n.Fragment,{children:[Object(B.jsx)(k.a,{padding:"10px",children:Object(B.jsx)(A.a,{count:H,page:T,onChange:function(e,t){q(t)},defaultPage:1,siblingCount:0,boundaryCount:1,color:"primary",classes:{ul:J.paginator}})}),Object(B.jsx)(F.a,{}),Object(B.jsx)(k.a,{children:Object(B.jsx)(W.a,{dense:!0,children:Y})})]})]})},L=a(43),_=a(2),H=a(186),U=a(187),J=a(35),Y=a(189),z=a(190),G=a(191),V=a(89),K=a.n(V),Q=a(188),X=["children","value","index"],Z=function(e){var t=e.children,a=e.value,n=e.index,r=Object(_.a)(e,X);return Object(B.jsx)("div",Object(L.a)(Object(L.a)({role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},r),{},{children:t}))},$=function(e){var t=e.title,a=e.subtitle,r=e.children,i=Object(n.useState)(!1),c=Object(s.a)(i,2),l=c[0],o=c[1];return Object(B.jsxs)(H.a,{variant:"outlined",children:[Object(B.jsx)(U.a,{action:Object(B.jsx)(Q.a,{onClick:function(){o(!l)},"aria-expanded":l,"aria-label":"show more",children:Object(B.jsx)(K.a,{})}),title:Object(B.jsx)(J.a,{variant:"h6",children:t}),subheader:Object(B.jsx)(J.a,{variant:"body1",children:a})}),Object(B.jsx)(Y.a,{in:l,timeout:"auto",unmountOnExit:!0,children:Object(B.jsx)(z.a,{children:r})})]})},ee=function(e){var t=e.sectionCode,a=e.meetingData,r=f(),i=Number(a.enrollmentCapacity)-Number(a.actualEnrolment),c=Number(a.actualWaitlist),l=(i>0?"Remaining spots: "+String(i):"Y"===a.waitlist?"Waitlist size: "+String(c):"Full, no waitlisting allowed")+" (capacity: ".concat(a.enrollmentCapacity,")"),o=function(e){var t=e.schedule;return Object(B.jsxs)(G.a,{container:!0,children:[Object(B.jsx)(J.a,{variant:"body1",children:"Schedule:"}),Object.entries(t).map((function(e){var t,a=e[1],n=function(e){switch(e){case"MO":return"Mon";case"TU":return"Tue";case"WE":return"Wed";case"TH":return"Thu";case"FR":return"Fri";case null:return"N/A";default:return e+": this date is unformatted; please report this to the developer."}}(a.meetingDay),r=null!==a.meetingStartTime&&null!==a.meetingEndTime?"".concat(a.meetingStartTime,"-").concat(a.meetingEndTime):null,i=(t=a).assignedRoom1||t.assignedRoom2?t.assignedRoom1&&t.assignedRoom2?t.assignedRoom1===t.assignedRoom2?t.assignedRoom1:t.assignedRoom1+"/"+t.assignedRoom2:t.assignedRoom1?t.assignedRoom1:t.assignedRoom2:null;return Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)(J.a,{variant:"body1",children:"".concat(n).concat(null!=r?" ".concat(r):""," @ ").concat(null!=i?i:"N/A")})})}))]})};return Object(B.jsxs)(H.a,{variant:"outlined",className:r.gridItem,children:[Object(B.jsx)(U.a,{title:Object(B.jsx)(J.a,{variant:"h6",color:i>0?"initial":"error",children:t}),subheader:Object(B.jsxs)(n.Fragment,{children:[Object(B.jsx)(J.a,{variant:"body1",children:l}),null!==a.online?Object(B.jsx)(J.a,{variant:"body1",children:"Delivery mode: ".concat(a.online)}):null]})}),Object(B.jsx)(z.a,{children:Object(B.jsxs)(G.a,{container:!0,spacing:2,children:[Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)(J.a,{variant:"body1",children:"Instructor(s): ".concat(function(e){if(d.a.isEmpty(e))return"Not available yet";for(var t="",a=0,n=Object.entries(e);a<n.length;a++){var r=Object(s.a)(n[a],2)[1];t+=r.firstName,t+=". ",t+=r.lastName,t+=", "}return t.substring(0,t.length-2)}(a.instructors))})}),Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)(o,{schedule:a.schedule})})]})})]})},te=function(e){var t=e.courseData,a=e.selectedIndex;return Object(B.jsxs)(n.Fragment,{children:[Object(B.jsx)(Z,{value:a,index:0,children:Object(B.jsx)(ae,{courseData:t})}),Object(B.jsx)(Z,{value:a,index:1,children:Object(B.jsx)(ne,{courseData:t})})]})},ae=function(e){var t=e.courseData,a=f();return 0===Object.keys(t).length?Object(B.jsx)(J.a,{variant:"h6",children:"Search for a course for data to show up here!"}):Object(B.jsxs)(G.a,{container:!0,className:a.root,spacing:1,children:[Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)(J.a,{variant:"h4",children:t.courseTitle})}),Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)(J.a,{variant:"body1",dangerouslySetInnerHTML:{__html:t.courseDescription}})}),Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)($,{title:"Additional course information:",subtitle:"Pre/co-requisites, exclusions and recommended preparation",children:Object(B.jsxs)(n.Fragment,{children:[Object(B.jsx)(J.a,{variant:"body2",paragraph:!0,children:"Pre-requisites: ".concat(t.prerequisite?t.prerequisite:"N/A")}),Object(B.jsx)(J.a,{variant:"body2",paragraph:!0,children:"Co-requisites: ".concat(t.corequisite?t.corequisite:"N/A")}),Object(B.jsx)(J.a,{variant:"body2",paragraph:!0,children:"Exclusions: ".concat(t.exclusion?t.exclusion:"N/A")}),Object(B.jsx)(J.a,{variant:"body2",children:"Recommended preparation: ".concat(t.recommendedPreparation?t.recommendedPreparation:"N/A")})]})})}),Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsxs)($,{title:"Breadth & distribution classifications:",children:[Object(B.jsx)(J.a,{variant:"body2",paragraph:!0,children:"Breadth categories: ".concat(t.breadthCategories)}),Object(B.jsx)(J.a,{variant:"body2",paragraph:!0,children:"Distribution categories: ".concat(t.distributionCategories?t.distributionCategories:"N/A")})]})}),t.webTimetableInstructions?Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)($,{title:"Timetable instructions:",children:Object(B.jsx)(J.a,{variant:"body2",dangerouslySetInnerHTML:{__html:t.webTimetableInstructions}})})}):null,t.deliveryInstructions?Object(B.jsx)(G.a,{item:!0,xs:12,children:Object(B.jsx)($,{title:"Delivery instructions:",children:Object(B.jsx)(J.a,{variant:"body2",dangerouslySetInnerHTML:{__html:t.deliveryInstructions}})})}):null]})},ne=function(e){var t=e.courseData,a=f();return Object(B.jsx)("div",{className:a.root,children:Object(B.jsx)(G.a,{container:!0,spacing:2,children:Object.keys(t.meetings).map((function(e){return Object(B.jsx)(G.a,{item:!0,xs:12,md:6,lg:3,children:Object(B.jsx)(ee,{sectionCode:e,meetingData:t.meetings[e]})})}))})})},re=a(203),ie=a(202);function ce(e){var t=e.children,a=e.mobileOpen,n=e.setMobileOpen,r=f(),i=Object(B.jsx)("div",{children:t});return Object(B.jsx)("div",{className:r.root,children:Object(B.jsxs)("nav",{className:r.drawer,"aria-label":"search",children:[Object(B.jsx)(ie.a,{mdUp:!0,implementation:"css",children:Object(B.jsx)(re.a,{variant:"temporary",anchor:"left",open:a,onClose:function(){n(!a)},classes:{paper:r.drawerPaper},ModalProps:{keepMounted:!0},children:i})}),Object(B.jsx)(ie.a,{smDown:!0,implementation:"css",children:Object(B.jsx)(re.a,{classes:{paper:r.drawerPaper},variant:"permanent",open:!0,children:i})})]})})}var se=a(193),le=a(90),oe=a.n(le),je=a(92),de=a.n(je),ue=a(93),be=a.n(ue),he=a(205),Oe=a(199),me=a(194),xe=a(192);function pe(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var ge=function(e){var t=e.title,a=e.showTabs,n=e.mobileOpen,r=e.setMobileOpen,i=e.dark,c=e.setDark,s=e.index,l=e.setIndex,o=f();return Object(B.jsxs)(xe.a,{position:"fixed",className:o.appBar,children:[Object(B.jsxs)(se.a,{children:[Object(B.jsx)(Q.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:function(){r(!n)},className:o.menuButton,children:Object(B.jsx)(oe.a,{})}),Object(B.jsx)(J.a,{variant:"h6",className:o.flex,children:t}),Object(B.jsx)(he.a,{title:"Toggle light/dark theme",children:Object(B.jsx)(Q.a,{color:"inherit","aria-label":"toggle theme",onClick:function(){return c(!i)},children:i?Object(B.jsx)(de.a,{}):Object(B.jsx)(be.a,{})})})]}),a?Object(B.jsxs)(Oe.a,{value:s,onChange:function(e,t){l(t)},variant:"fullWidth","aria-label":"course information",children:[Object(B.jsx)(me.a,Object(L.a)({label:"Course Info"},pe(0))),Object(B.jsx)(me.a,Object(L.a)({label:"Meeting Sections"},pe(1)))]}):null]})},ve=function(){var e=Object(n.useState)({}),t=Object(s.a)(e,2),a=t[0],i=t[1],c=r.a.useState(!1),j=Object(s.a)(c,2),u=j[0],b=j[1],h=r.a.useState(!0),O=Object(s.a)(h,2),m=O[0],x=O[1],p=Object(n.useState)(!1),v=Object(s.a)(p,2),y=v[0],S=v[1],C=r.a.useState(0),N=Object(s.a)(C,2),w=N[0],k=N[1];Object(n.useEffect)((function(){S(!d.a.isEmpty(a))}),[a]);var T=f();return Object(B.jsxs)(l.a,{theme:g(m),children:[Object(B.jsx)(o.a,{}),Object(B.jsxs)("div",{className:T.root,children:[Object(B.jsx)(ge,{title:y?"".concat(a.code).concat(a.section):"Course Finder 2",showTabs:y,mobileOpen:u,setMobileOpen:b,dark:m,setDark:x,index:w,setIndex:k}),Object(B.jsx)(ce,{children:Object(B.jsx)(q,{setData:function(e){return i(e)},onCourseSelectionAction:b}),mobileOpen:u,setMobileOpen:b}),Object(B.jsxs)("main",{className:T.content,children:[Object(B.jsx)("div",{className:T.toolbar}),y?Object(B.jsxs)(n.Fragment,{children:[Object(B.jsx)("div",{className:T.tabs}),Object(B.jsx)(te,{courseData:a,selectedIndex:w})]}):null]})]})]})};c.a.render(Object(B.jsx)(ve,{}),document.getElementById("root"))}},[[139,1,2]]]);
//# sourceMappingURL=main.040bd2bb.chunk.js.map