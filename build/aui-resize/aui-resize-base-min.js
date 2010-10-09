AUI.add("aui-resize-base",function(AV){var AD=AV.Lang,H=AD.isArray,l=AD.isBoolean,f=AD.isString,Aj=AD.trim,Q=AV.Array.indexOf,AP=".",c=",",Z=" ",Y="active",v="activeHandle",AM="activeHandleEl",k="all",AX="autoHide",Ah="bottom",AY="className",Ae="cursor",P="diagonal",Af="dotted",AR="dragCursor",F="grip",AF="gripsmall",n="handle",u="handles",AL="hidden",D="horizontal",AJ="icon",h="inner",G="left",AZ="margin",X="node",Ag="nodeName",AC="none",Ac="offsetHeight",i="offsetWidth",K="parentNode",S="position",Ai="proxy",Am="proxyEl",N="relative",w="resize",V="resizing",M="right",W="static",O="top",x="vertical",Aa="wrap",b="wrapper",AS="wrapTypes",s="resize:mouseUp",e="resize:resize",o="resize:align",Ab="resize:end",AA="resize:start",AE="t",Ao="tr",AH="r",Ak="br",AT="b",An="bl",AO="l",Ap="tl",AQ=function(A){return(A instanceof AV.Node);},Aq=function(A){return n+A.toUpperCase();},d=function(){return Array.prototype.slice.call(arguments).join(Z);},AN=AV.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),q=AV.ClassNameManager.getClassName,At=q(AJ),Al=q(AJ,AF,P,Ak),z=q(AJ,F,Af,D),AI=q(AJ,F,Af,x),m=q(w),t=q(w,n),AK=q(w,n,Y),J=q(w,n,h),Ad=q(w,n,h,"{handle}"),Ar=q(w,n,"{handle}"),I=q(w,AL,u),g=q(w,Ai),j=q(w,b),y=d(At,Al),p=d(At,z),U=d(At,AI),E=/^(t|tr|b|bl|br|tl)$/i,AB=/^(tl|l|bl)$/i,AU=/^(tl|t|tr)$/i,r=/^(bl|br|l|r|tl|tr)$/i,AW='<div class="'+d(t,Ar)+'">'+'<div class="'+d(J,Ad)+'"></div>'+"</div>",AG='<div class="'+g+'"></div>',As='<div class="'+j+'"></div>',a=[AE,Ao,AH,Ak,AT,An,AO,Ap];var C=AV.Component.create({NAME:w,ATTRS:{activeHandle:{value:null,validator:f},activeHandleEl:{value:null,validator:AQ},autoHide:{value:false,validator:l},handles:{setter:function(L){var A=this;var B=[];if(H(L)){B=L;}else{if(f(L)){if(L.toLowerCase()==k){B=a;}else{AV.each(L.split(c),function(Au,T){var R=Aj(Au);if(Q(a,R)>-1){B.push(R);}});}}}return B;},value:k},node:{setter:AV.one},proxy:{value:false,validator:l},proxyEl:{setter:AV.one,valueFn:function(){return AV.Node.create(AG);}},resizing:{value:false,validator:l},wrap:{setter:function(R){var A=this;var L=A.get(X);var T=L.get(Ag);var B=A.get(AS);if(B.test(T)){R=true;}return R;},value:false,validator:l},wrapTypes:{readOnly:true,value:/canvas|textarea|input|select|button|img/i},wrapper:{setter:function(){var A=this;var B=A.get(X);var L=B;if(A.get(Aa)){L=AV.Node.create(As);B.placeBefore(L);L.append(B);A._copyStyles(B,L);B.setStyles({position:W,left:0,top:0});}return L;},value:null,writeOnce:true}},EXTENDS:AV.Base,prototype:{CSS_INNER_HANDLE_MAP:{r:U,l:U,t:p,b:p,br:y},changeHeightHandles:false,changeLeftHandles:false,changeTopHandles:false,changeWidthHandles:false,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){var A=this;A.info={};A.originalInfo={};A.get(X).addClass(m);A.renderer();},renderUI:function(){var A=this;A._renderHandles();A._renderProxy();},bindUI:function(){var A=this;A._createEvents();A._bindDD();A._bindHandle();},syncUI:function(){var A=this;A._setHideHandlesUI(A.get(AX));},destructor:function(){var A=this;var B=A.get(X);var L=A.get(b);AV.Event.purgeElement(L,true);A.eachHandle(function(R){A.delegate.dd.destroy();R.remove(true);});if(A.get(Aa)){B.setStyles({margin:L.getStyle(AZ),position:L.getStyle(S)});L.placeBefore(B);L.remove(true);}B.removeClass(m);B.removeClass(I);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},eachHandle:function(B){var A=this;AV.each(A.get(u),function(L,R){var T=A.get(Aq(L));B.apply(A,[T,L,R]);});},_bindDD:function(){var A=this;A.delegate=new AV.DD.Delegate({bubbleTargets:A,container:A.get(b),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:true,move:false},nodes:AP+t,target:false});A.on("drag:drag",A._handleResizeEvent);A.on("drag:dropmiss",A._handleMouseUpEvent);A.on("drag:end",A._handleResizeEndEvent);A.on("drag:start",A._handleResizeStartEvent);},_bindHandle:function(){var A=this;var B=A.get(b);B.on("mouseenter",AV.bind(A._onWrapperMouseEnter,A));B.on("mouseleave",AV.bind(A._onWrapperMouseLeave,A));B.delegate("mouseenter",AV.bind(A._onHandleMouseEnter,A),AP+t);B.delegate("mouseleave",AV.bind(A._onHandleMouseLeave,A),AP+t);},_createEvents:function(){var A=this;var B=function(L,R){A.publish(L,{defaultFn:R,queuable:false,emitFacade:true,bubbles:true,prefix:w});};B(AA,this._defResizeStartFn);B(e,this._defResizeFn);B(o,this._defResizeAlignFn);B(Ab,this._defResizeEndFn);B(s,this._defMouseUpFn);},_renderHandles:function(){var A=this;var B=A.get(b);A.eachHandle(function(L){B.append(L);});},_renderProxy:function(){var A=this;var B=A.get(Am);A.get(b).get(K).append(B.hide());},_buildHandle:function(B){var A=this;var L=AV.Node.create(AV.substitute(AW,{handle:B}));L.one(AP+J).addClass(A.CSS_INNER_HANDLE_MAP[B]);return L;},_checkSize:function(Au,B){var A=this;var T=A.info;var R=A.originalInfo;var L=(Au==Ac)?O:G;T[Au]=B;if(((L==G)&&A.changeLeftHandles)||((L==O)&&A.changeTopHandles)){T[L]=R[L]+R[Au]-B;}},_copyStyles:function(T,Au){var B=this;var A=T.getStyle(S).toLowerCase();if(A==W){A=N;}var R={position:A};var L={};AV.each([O,M,Ah,G],function(Aw){var Av=AZ+AN(Aw);L[Av]=Au.getStyle(Av);R[Av]=T.getStyle(Av);});Au.setStyles(R);T.setStyles(L);T.setStyles({margin:0});Au.set(Ac,T.get(Ac));Au.set(i,T.get(i));},_extractHandleName:AV.cached(function(L){var A=L.get(AY);var B=A.match(new RegExp(q(w,n,"(\\w{1,2})\\b")));return B?B[1]:null;}),_getInfo:function(T,A){var Ay=this,Aw;var Av=A.dragEvent.target;if(A){Aw=(Av.actXY.length?Av.actXY:Av.lastXY);}var R=T.getXY();var Au=R[0];var L=R[1];var B=T.get(Ac);var Ax=T.get(i);return{actXY:Aw,bottom:(L+B),left:Au,offsetHeight:B,offsetWidth:Ax,right:(Au+Ax),top:L};},_resize:function(){var B=this;var A=B.get(v);var Au=B.info;var T=B.originalInfo;var R=Au.actXY[0]-T.actXY[0];var L=Au.actXY[1]-T.actXY[1];var Av={t:function(){Au.top=T.top+L;Au.offsetHeight=T.offsetHeight-L;},r:function(){Au.offsetWidth=T.offsetWidth+R;},l:function(){Au.left=T.left+R;Au.offsetWidth=T.offsetWidth-R;},b:function(){Au.offsetHeight=T.offsetHeight+L;},tr:function(){this.t();
this.r();},br:function(){this.b();this.r();},tl:function(){this.t();this.l();},bl:function(){this.b();this.l();}};Av[A](R,L);},_setOffset:function(L,B,A){L.set(i,B);L.set(Ac,A);},_syncUI:function(){var A=this;var L=A.info;var R=A.get(b);var B=A.get(X);A._setOffset(R,L.offsetWidth,L.offsetHeight);if(A.changeLeftHandles||A.changeTopHandles){R.setXY([L.left,L.top]);}if(!R.compareTo(B)){A._setOffset(B,L.offsetWidth,L.offsetHeight);}if(AV.UA.webkit){B.setStyle(w,AC);}},_syncProxyUI:function(){var A=this;var R=A.info;var L=A.get(AM);var B=A.get(Am);var T=L.getStyle(Ae);B.show().setStyle(Ae,T);A.delegate.dd.set(AR,T);A._setOffset(B,R.offsetWidth,R.offsetHeight);B.setXY([R.left,R.top]);},_updateChangeHandleInfo:function(B){var A=this;A.changeHeightHandles=E.test(B);A.changeLeftHandles=AB.test(B);A.changeTopHandles=AU.test(B);A.changeWidthHandles=r.test(B);},_updateInfo:function(B){var A=this;A.info=A._getInfo(A.get(b),B);},_setActiveHandlesUI:function(L){var A=this;var B=A.get(AM);if(B){if(L){A.eachHandle(function(R){R.removeClass(AK);});B.addClass(AK);}else{B.removeClass(AK);}}},_setHideHandlesUI:function(B){var A=this;var L=A.get(b);if(!A.get(V)){if(B){L.addClass(I);}else{L.removeClass(I);}}},_defMouseUpFn:function(B){var A=this;A.set(V,false);},_defResizeFn:function(B){var A=this;A._handleResizeAlignEvent(B.dragEvent);if(A.get(Ai)){A._syncProxyUI();}else{A._syncUI();}},_defResizeAlignFn:function(B){var A=this;var R=A.originalInfo;A.lastInfo=A.info;A._updateInfo(B);var L=A.info;A._resize();if(!A.con){if(L.offsetHeight<=15){A._checkSize(Ac,15);}if(L.offsetWidth<=15){A._checkSize(i,15);}}},_defResizeEndFn:function(L){var A=this;var B=L.dragEvent.target;B.actXY=[];if(A.get(Ai)){A._syncProxyUI();A.get(Am).hide();}A._syncUI();A.set(v,null);A.set(AM,null);A._setActiveHandlesUI(false);},_defResizeStartFn:function(B){var A=this;A.set(V,true);A.originalInfo=A._getInfo(A.get(b),B);A._updateInfo(B);},_handleMouseUpEvent:function(A){this.fire(s,{dragEvent:A,info:this.info});},_handleResizeEvent:function(A){this.fire(e,{dragEvent:A,info:this.info});},_handleResizeAlignEvent:function(A){this.fire(o,{dragEvent:A,info:this.info});},_handleResizeEndEvent:function(A){this.fire(Ab,{dragEvent:A,info:this.info});},_handleResizeStartEvent:function(A){this.fire(AA,{dragEvent:A,info:this.info});},_onWrapperMouseEnter:function(B){var A=this;if(A.get(AX)){A._setHideHandlesUI(false);}},_onWrapperMouseLeave:function(B){var A=this;if(A.get(AX)){A._setHideHandlesUI(true);}},_onHandleMouseEnter:function(R){var B=this;var L=R.currentTarget;var A=B._extractHandleName(L);if(!B.get(V)){B.set(v,A);B.set(AM,L);B._setActiveHandlesUI(true);B._updateChangeHandleInfo(A);}},_onHandleMouseLeave:function(B){var A=this;if(!A.get(V)){A._setActiveHandlesUI(false);}}}});AV.each(a,function(A,B){C.ATTRS[Aq(A)]={setter:function(){return this._buildHandle(A);},value:null,writeOnce:true};});AV.Resize=C;},"@VERSION@",{requires:["aui-base","dd-drag","dd-delegate","dd-drop","substitute"],skinnable:true});