(this.webpackJsonpboreal=this.webpackJsonpboreal||[]).push([[0],{168:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(42),c=n.n(i),o=n(11),s=n(19),l=n(219),u=n(220),j=n(229),d=n(221),b=n(241),O=n(231),h=n(38),x=n.n(h),p=n(230),m=n(114),f=n(44),g=n(102),v=n(45),y=function(){var e=360;return{flex:{flex:1},paginator:{justifyContent:"center",padding:"4px"},drawerWidth:e,drawer:{width:{md:e},flexShrink:{md:0}},appBar:{width:{md:"calc(100% - ".concat(e,"px)")},ml:{md:"".concat(e,"px")}},menuButton:{marginRight:2,display:{md:"none"}},tabs:{height:"48px"},drawerPaper:{width:e},content:{flexGrow:1,padding:3},contentWrapper:{flexGrow:1,paddingLeft:3,paddingRight:3,paddingTop:5,paddingBottom:5,marginLeft:"".concat(e,"px")},contentMobileWrapper:{flexGrow:1,paddingLeft:3,paddingRight:3,paddingTop:5,paddingBottom:5},loader:{padding:3},gridItem:{height:"100%"}}},C=n(80),k=n.n(C),S=n(104),w=n(105),T=n.n(w),E=n(232),I=n(212),M=n(223),W=n(235),P=n(236),B=n(237),R=n(224),D=n(234),F=n(226),N=n(238),A=n(106),q=n.n(A),L=n(50),G=n(2),Q=function(){var e=y();return Object(G.jsx)(O.a,{display:"flex",justifyContent:"center",alignItems:"center",sx:e.loader,children:Object(G.jsx)(E.a,{})})},_=function(e){var t=e.searchTermControl,n=e.onButtonClick,r=Object(o.a)(t,2),a=r[0],i=r[1];return Object(G.jsx)("form",{noValidate:!0,autoComplete:"off",children:Object(G.jsxs)(I.a,{spacing:1,children:[Object(G.jsx)(M.a,{id:"code-input",label:"Course Code",variant:"filled",placeholder:"Quick search",value:a,onChange:function(e){return i(e.target.value.toUpperCase())},fullWidth:!0,size:"small",flex:1}),Object(G.jsx)(W.a,{variant:"caption",children:"Quick search shows courses for the current year. For more options, use advanced search."}),Object(G.jsx)(P.a,{variant:"outlined",color:"inherit",startIcon:Object(G.jsx)(q.a,{}),component:L.b,to:"/search",onClick:n,children:"Advanced Search"})]})})},H=function(e){var t=e.loading,n=e.data,r=e.onCourseClick,a=e.pageControl,i=e.itemsPerPage,c=e.noOfPages;if(t)return Object(G.jsx)(Q,{});if(null===n||x.a.isEmpty(n))return Object(G.jsxs)(I.a,{spacing:1,justifyContent:"center",alignItems:"center",children:[Object(G.jsx)(B.a,{flexItem:!0}),Object(G.jsx)(W.a,{variant:"body2",children:"Start searching to see courses here!"})]});var s=y(),l=Object(o.a)(a,2),u=l[0],j=l[1];return Object(G.jsxs)(I.a,{spacing:1,children:[Object(G.jsx)(B.a,{}),Object(G.jsx)(R.a,{count:c,page:u,onChange:function(e,t){j(t)},defaultPage:1,siblingCount:0,boundaryCount:1,color:"primary",sx:{ul:s.paginator}}),Object(G.jsx)(B.a,{}),Object(G.jsx)(D.a,{dense:!0,children:Object.keys(n).slice((u-1)*i,u*i).map((function(e){var t=n[e];return Object(G.jsx)(F.a,{button:!0,onClick:function(){return r(t)},children:Object(G.jsx)(N.a,{primary:t.courseTitle,secondary:"".concat(t.code).concat(t.section)})},e)}))})]})},z=function(e){var t=e.setData,n=e.onCourseSelectionAction,a=e.onButtonClick,i=Object(r.useState)(""),c=Object(o.a)(i,2),s=c[0],l=c[1],u=Object(r.useRef)(0),j=Object(r.useState)({}),d=Object(o.a)(j,2),b=d[0],O=d[1],h=Object(r.useState)(!1),x=Object(o.a)(h,2),p=x[0],m=x[1],f=Object(r.useState)(1),g=Object(o.a)(f,2),v=g[0],y=g[1],C=Object(r.useState)(Math.ceil(Object.keys(b).length/10)),w=Object(o.a)(C,2),E=w[0],M=w[1];return Object(r.useEffect)((function(){var e=function(){var e=Object(S.a)(k.a.mark((function e(t){var n,r,a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://ionice.herokuapp.com/https://timetable.iit.artsci.utoronto.ca/api/20219/courses?code=".concat(s),e.next=3,T.a.get(n,{headers:{}});case 3:r=e.sent,a=r.data,u.current===t&&(O(a),M(Math.ceil(Object.keys(a).length/10)));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t=function(){u.current+=1,m(!0),y(1),e(u.current).then((function(){return m(!1)}))};if(!s||b){var n=setTimeout((function(){s&&t()}),500);return function(){clearTimeout(n)}}t()}),[s]),Object(G.jsxs)(I.a,{flex:1,spacing:1,children:[Object(G.jsx)(_,{searchTermControl:[s,l],onButtonClick:a}),Object(G.jsx)(H,{loading:p,data:b,onCourseClick:function(e){t(e),n()},pageControl:[v,y],noOfPages:E,itemsPerPage:10})]})},Y=n(218),J=n(239),U=n(240),V=n(228),K=n(108),X=n.n(K),Z=n(79),$=n.n(Z),ee=n(109),te=n.n(ee),ne=function(e){var t=e.label,n=e.icon,r=e.right,a=void 0===r?null:r,i=e.to,c=void 0===i?null:i,o=e.onClick,s=void 0===o?null:o;return Object(G.jsx)(F.a,{children:Object(G.jsxs)(Y.a,{component:L.b,to:c,onClick:s,children:[Object(G.jsx)(J.a,{children:n}),Object(G.jsx)(N.a,{primary:t}),a]})})},re=function(e){var t=e.children,n=e.mobileClose;return Object(G.jsxs)(D.a,{dense:!0,children:[Object(G.jsx)(U.a,{id:"site-functions",children:"Site functions"}),Object(G.jsx)(ne,{label:"Favourites",icon:Object(G.jsx)($.a,{}),to:"/favorites",onClick:n}),Object(G.jsx)(ne,{label:"Timetable",icon:Object(G.jsx)(X.a,{}),to:"/timetable",onClick:n}),Object(G.jsx)(ne,{label:"Settings",icon:Object(G.jsx)(te.a,{}),to:"/settings",onClick:n}),Object(G.jsx)(U.a,{id:"search",children:"Search"}),Object(G.jsx)(F.a,{children:t})]})},ae=function(e){var t=e.children,n=e.navControl,r=e.mobile,a=Object(o.a)(n,2),i=a[0],c=a[1],s=y(),l=function(e){return{mobileSx:{display:{xs:"block",md:"none"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:e}},permanentSx:{display:{xs:"none",md:"block"},"& .MuiDrawer-paper":{boxSizing:"border-box",width:e}}}}(s.drawerWidth),u=l.mobileSx,j=l.permanentSx,d=function(){c(!i)};return Object(G.jsx)(O.a,{sx:s.drawer,"aria-label":"search",children:Object(G.jsxs)(V.a,{variant:r?"temporary":"permanent",open:!r||i,onClose:r?d:null,ModalProps:{keepMounted:!0},sx:r?u:j,children:[Object(G.jsx)(b.a,{}),Object(G.jsx)(B.a,{}),Object(G.jsx)(re,{children:t,mobileClose:r?d:null})]})})},ie=n(222),ce=n(242),oe=n(243),se=n(112),le=n.n(se),ue=n(110),je=n.n(ue),de=n(111),be=n.n(de),Oe=function(e){var t=e.title,n=e.navControl,r=e.themeControl,a=(e.favoriteControl,e.mobile),i=Object(o.a)(r,2),c=i[0],s=i[1],l=Object(o.a)(n,2),u=l[0],j=l[1],d=function(){j(!u)},O=y(),h=function(){return Object(G.jsx)(ie.a,{title:"Toggle theme",children:Object(G.jsx)(ce.a,{color:"inherit","aria-label":"toggle theme",onClick:function(){return s(!c)},children:c?Object(G.jsx)(je.a,{}):Object(G.jsx)(be.a,{})})})},x=function(){return a?Object(G.jsx)(ce.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:d,sx:O.menuButton,children:Object(G.jsx)(le.a,{})}):null},p=function(){return Object(G.jsx)(W.a,{variant:"h6",sx:O.flex,children:t})};return Object(G.jsx)(oe.a,{position:"fixed",sx:O.appBar,children:Object(G.jsxs)(b.a,{children:[Object(G.jsx)(x,{}),Object(G.jsx)(p,{}),Object(G.jsx)(h,{})]})})},he=n(247),xe=n(244),pe=n(245),me=n(246),fe=n(113),ge=n.n(fe),ve=function(e){if(x.a.isEmpty(e))return"TBA";var t="";return Object.entries(e).forEach((function(e){var n=Object(o.a)(e,2)[1],r=n.lastName,a=n.firstName;t+=a+". "+r+", "})),t.substring(0,t.length-2)},ye=function(e,t){var n=e.meetingDay,r=e.meetingStartTime,a=e.meetingEndTime,i=e.assignedRoom1,c=e.assignedRoom2,o=function(e,t){switch(e){case"MO":return t?"Mon":"M";case"TU":return t?"Tue":"T";case"WE":return t?"Wed":"W";case"TH":return t?"Thu":"R";case"FR":return t?"Fri":"F";default:return null}}(n,t),s=t?r+" \u2013 "+a:r.replace(":","")+"\u2013"+a.replace(":","");if(!t)return o+" "+s;var l=function(e,t){return e||t?e&&t?e===t?e:e+"/"+t:e||t:"TBA"}(i,c);return o+" "+s+" "+(t?"at ":"")+l},Ce=function(e,t,n,r,a){var i=Number(e)-Number(t);return a?i>0?"Remaining capacity: ".concat(i+" out of "+e):r?"Waitlist: ".concat(n," (capacity: ").concat(e,")"):"Full, no waitlisting. (capacity: ".concat(e,")"):i>0?"Available: "+i:r?"Waitlist: "+n:"Full, no waitlisting"},ke=function(e,t){switch(e){case"CLASS":return"In person";case"ONLSYNC":return t?"Online \u2014 Synchronous":"Online Sync";case"ONLASYNC":return t?"Online \u2014 Asynchronous":"Online Async";default:return null}},Se=function(e){switch(e){case"P":return"Priority: Some students are given priority access until a specific date.";case"E":return"Enrol at Department: Students must contact the sponsoring Department to enrol.";case"AE":return"Department Approval Required: Students must request enrolment on ACORN and await Departmental review of their request.";case"PE":return"Priority, then Enrol at Department: Some students are given priority access until a specific date, after which time another group of students is also able to enrol by contacting the sponsoring Department.";case"R1":return"Restricted: Course/section is restricted at all times for specific students.";case"R2":return"Restricted: Course/section is restricted to a group of students until a specific date, after which time another group of students is also able to enrol.";default:return""}},we=function(e){var t=e.meeting,n=e.onClick,r=t.schedule,a=t.instructors,i=t.teachingMethod,c=t.sectionNumber,s=t.enrollmentCapacity,l=t.actualEnrolment,u=t.actualWaitlist,j=t.waitlist,d=t.deliveryMode,b=t.enrollmentIndicator,O=t.enrollmentControls,h=t.cancel,x=function(){if(h)return Object(G.jsx)(W.a,{variant:"body2",children:"Cancelled"});var e=!1;return Object(G.jsxs)(I.a,{spacing:1,direction:"row",divider:Object(G.jsx)(B.a,{orientation:"vertical",flexItem:!0}),children:[Object(G.jsx)(W.a,{variant:"body2",children:Ce(s,l,u,j,e)}),Object(G.jsx)(W.a,{variant:"body2",children:ke(d,e)}),Object(G.jsx)(W.a,{variant:"body2",children:ve(a)}),Object.entries(r).map((function(t){var n=Object(o.a)(t,2),r=n[0],a=n[1];return"-"===r?null:Object(G.jsx)(W.a,{variant:"body2",children:ye(a,e)},r)})),Object(G.jsx)(W.a,{variant:"body2",children:b})]})},p="".concat(i+c);return Object(G.jsx)(F.a,{disableGutters:!0,children:Object(G.jsx)(Y.a,{onClick:function(){var e=!0;n({section:p,instructors:ve(a),meetings:Object.entries(r).filter((function(e){return"-"!==Object(o.a)(e,1)[0]})).map((function(t){var n=Object(o.a)(t,2)[1];return ye(n,e)})),delivery:ke(d,e),priority:Se(b),capacity:Ce(s,l,u,j,e),priorityGroups:O.map((function(e){return function(e){var t=e.postCode,n=e.postName,r=e.restrictedGroup,a=r?"Group ".concat(r," \u2014 "):"";if(t&&n)return a+t+" "+n;var i=e.yearOfStudy,c=e.primaryOrgName,o=e.secondaryOrgName,s=e.assocOrgName,l=e.adminOrgName||o||"";return a+(c?c+": ":"")+(i&&"*"!==i?"Year ".concat(i," "):"")+(l||s||"")}(e)}))})},children:Object(G.jsxs)(I.a,{children:[Object(G.jsx)(N.a,{primary:p}),Object(G.jsx)(x,{})]})})})},Te=function(e){var t=e.data,n=e.onListEntryClick;return Object(G.jsx)(D.a,{dense:!0,children:Object.entries(t).map((function(e){var t=Object(o.a)(e,2),r=t[0],a=t[1];return Object(G.jsx)(we,{meeting:a,onClick:n},r)}))})},Ee=function(e){var t=e.data,n=t.instructors,a=t.meetings,i=t.delivery,c=t.priority,s=t.capacity,l=t.priorityGroups,u=Object(r.useState)(!1),j=Object(o.a)(u,2),d=j[0],b=j[1];return Object(G.jsx)(xe.a,{children:Object(G.jsxs)(I.a,{spacing:2,divider:Object(G.jsx)(B.a,{}),children:[Object(G.jsx)(W.a,{variant:"body1",children:"Instructors: ".concat(n)}),Object(G.jsx)(W.a,{variant:"body1",children:"Delivery mode: ".concat(i)}),Object(G.jsx)(W.a,{variant:"body1",children:s}),Object(G.jsxs)(I.a,{children:[Object(G.jsx)(W.a,{variant:"body1",paragraph:!0,children:"Meetings:"}),a.map((function(e){return Object(G.jsx)(W.a,{variant:"body2",children:e},e)}))]}),c?Object(G.jsxs)(I.a,{children:[Object(G.jsx)(W.a,{variant:"body1",paragraph:!0,children:"Enrollment priority:"}),Object(G.jsx)(W.a,{variant:"body2",children:c})]}):null,x.a.isEmpty(l)?null:Object(G.jsxs)(I.a,{children:[Object(G.jsxs)(I.a,{direction:"row",spacing:1,alignItems:"center",paddingBottom:1,children:[Object(G.jsx)(W.a,{variant:"body1",children:"Priority student groups:"}),Object(G.jsx)(ce.a,{onClick:function(){return b(!d)},children:Object(G.jsx)(ge.a,{sx:{transform:d?"rotate(-180deg)":"rotate(0)",transition:"0.2s"}})})]}),Object(G.jsx)(I.a,{sx:{display:d?"block":"none"},children:l.map((function(e,t){return Object(G.jsx)(W.a,{variant:"body2",children:e},t)}))})]})]})})},Ie=function(e){var t=e.data,n=Object(r.useState)(!1),a=Object(o.a)(n,2),i=a[0],c=a[1],s=Object(r.useState)({section:"",instructors:"",meetings:[],delivery:"",priority:"",capacity:"",priorityGroups:[]}),l=Object(o.a)(s,2),u=l[0],j=l[1];if(!t)return null;return Object(G.jsxs)(I.a,{children:[Object(G.jsx)(W.a,{variant:"h5",paragraph:!0,children:"Meeting Sections"}),Object(G.jsx)(Te,{data:t,onListEntryClick:function(e){c(!0),j(e)}}),Object(G.jsxs)(pe.a,{open:i,onClose:function(){return c(!1)},maxWidth:"sm",fullWidth:!0,children:[Object(G.jsx)(me.a,{children:u.section}),Object(G.jsx)(Ee,{data:u})]})]})},Me=function(e){var t=e.subheader;return Object(G.jsx)(W.a,{variant:"h5",paragraph:!0,children:t})},We=function(e){var t=e.title;return Object(G.jsx)(W.a,{variant:"h4",children:t})},Pe=function(e){var t=e.prerequisite;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Pre-requisites: ".concat(t)}):null},Be=function(e){var t=e.corequisite;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Co-requisites: ".concat(t)}):null},Re=function(e){var t=e.exclusion;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Exclusions: ".concat(t)}):null},De=function(e){var t=e.recommendedPreparation;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Recommended preparation: ".concat(t)}):null},Fe=function(e){var t=e.breadthCategories;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Breadth categories: ".concat(t)}):null},Ne=function(e){var t=e.distributionCategories;return t?Object(G.jsx)(W.a,{variant:"body1",children:"Distribution categories: ".concat(t)}):null},Ae=function(e){var t=e.webTimetableInstructions;return t?Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(W.a,{variant:"body1",children:"Timetable instructions:"}),Object(G.jsx)(W.a,{variant:"body1",dangerouslySetInnerHTML:{__html:t}})]}):null},qe=function(e){var t=e.deliveryInstructions;return t?Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(W.a,{variant:"body1",children:"Delivery instructions:"}),Object(G.jsx)(W.a,{variant:"body1",dangerouslySetInnerHTML:{__html:t}})]}):null},Le=function(e){var t,n=e.data,r=n.courseTitle,a=n.courseDescription,i=n.prerequisite,c=n.corequisite,o=n.exclusion,s=n.recommendedPreparation,l=n.breadthCategories,u=n.distributionCategories,j=n.webTimetableInstructions,d=n.deliveryInstructions,b=n.meetings;return Object(G.jsx)(he.a,{maxWidth:"lg",children:Object(G.jsxs)(I.a,{spacing:3,divider:Object(G.jsx)(B.a,{}),children:[Object(G.jsx)(We,{title:r}),(t=a,t?Object(G.jsx)(W.a,{variant:"body1",dangerouslySetInnerHTML:{__html:t}}):null),i||c||o||s?Object(G.jsxs)(I.a,{spacing:1,children:[Object(G.jsx)(Me,{subheader:"Enrollment limitations"}),Object(G.jsx)(Pe,{prerequisite:i}),Object(G.jsx)(Be,{corequisite:c}),Object(G.jsx)(Re,{exclusion:o}),Object(G.jsx)(De,{recommendedPreparation:s})]}):null,l||u?Object(G.jsxs)(I.a,{spacing:1,children:[Object(G.jsx)(Me,{subheader:"Breadth classifications"}),Object(G.jsx)(Fe,{breadthCategories:l}),Object(G.jsx)(Ne,{distributionCategories:u})]}):null,j||d?Object(G.jsxs)(I.a,{spacing:1,children:[Object(G.jsx)(Me,{subheader:"Additional instructions"}),Object(G.jsx)(Ae,{webTimetableInstructions:j}),Object(G.jsx)(qe,{deliveryInstructions:d})]}):null,Object(G.jsx)(Ie,{data:b})]})})},Ge=function(){var e=y(),t=Object(s.a)(),n=a.a.useState(!1),i=Object(o.a)(n,2),c=i[0],h=i[1],C=a.a.useState(!1),k=Object(o.a)(C,2),S=k[0],w=k[1],T=Object(l.a)(t.breakpoints.down("md")),E=Object(r.useState)({}),I=Object(o.a)(E,2),M=I[0],W=I[1],P=Object(r.useState)(!1),B=Object(o.a)(P,2),R=B[0],D=B[1];Object(r.useEffect)((function(){D(!x.a.isEmpty(M))}),[M]),Object(r.useEffect)((function(){var e=localStorage.getItem("darkMode");e?h("dark"===e):localStorage.setItem("darkMode","light")}),[]),Object(r.useEffect)((function(){localStorage.setItem("darkMode",c?"dark":"light")}),[c]);var F;return Object(G.jsx)(u.a,{injectFirst:!0,children:Object(G.jsxs)(j.a,{theme:(F=c,Object(p.a)(Object(m.a)({palette:{mode:F?"dark":"light",primary:{main:f.a[800]},secondary:{main:g.a[50]},error:{main:v.a[500]}},typography:{fontFamily:["Roboto","Quicksand"].join(",")},components:{MuiTypography:{defaultProps:{variantMapping:{h4:"h1",h5:"h2",h6:"h3"}},styleOverrides:{h3:{fontFamily:"Quicksand",fontWeight:300},h4:{fontFamily:"Quicksand",fontWeight:300},h5:{fontFamily:"Quicksand",fontWeight:400},h6:{fontFamily:"Quicksand",fontWeight:400}}}}}))),children:[Object(G.jsx)(d.a,{}),Object(G.jsx)(Oe,{title:R?"".concat(M.code).concat(M.section):"Boreal",navControl:[S,w],themeControl:[c,h],mobile:T}),Object(G.jsx)(ae,{mobile:T,navControl:[S,w],children:Object(G.jsx)(z,{setData:function(e){W(e)},onCourseSelectionAction:w,onButtonClick:function(){return w(!S)}})}),Object(G.jsx)(b.a,{}),Object(G.jsx)(O.a,{sx:T?e.contentMobileWrapper:e.contentWrapper,children:Object(G.jsx)(Le,{data:M})})]})})};c.a.render(Object(G.jsx)(L.a,{children:Object(G.jsx)(Ge,{})}),document.getElementById("root"))}},[[168,1,2]]]);
//# sourceMappingURL=main.689663e9.chunk.js.map