(function($, undefined) {

    $.FUI = $.FUI || {};
    if ($.FUI.version) {
        return;
    }
    $.extend($.FUI, {
        version: "FVersion@",

        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91, // COMMAND
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93, // COMMAND_RIGHT
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91 // COMMAND
        }
    });

// plugins
    $.fn.extend({
        propAttr: $.fn.prop || $.fn.attr,

        _focus: $.fn.focus,
        focus: function(delay, fn) {
            return typeof delay === "number" ?
                    this.each(function() {
                        var elem = this;
                        setTimeout(function() {
                            $(elem).focus();
                            if (fn) {
                                fn.call(elem);
                            }
                        }, delay);
                    }) :
                    this._focus.apply(this, arguments);
        },

        scrollParent: function() {
            var scrollParent;
            if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
                scrollParent = this.parents().filter(
                        function() {
                            return (/(relative|absolute|fixed)/).test($.curCSS(this, 'position', 1)) && (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                        }).eq(0);
            } else {
                scrollParent = this.parents().filter(
                        function() {
                            return (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
                        }).eq(0);
            }

            return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
        },

        zIndex: function(zIndex) {
            if (zIndex !== undefined) {
                return this.css("zIndex", zIndex);
            }

            if (this.length) {
                var elem = $(this[ 0 ]), position, value;
                while (elem.length && elem[ 0 ] !== document) {
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
            }

            return 0;
        },

        disableSelection: function() {
            return this.bind(( $.support.selectstart ? "selectstart" : "mousedown" ) +
                    ".ui-disableSelection", function(event) {
                event.preventDefault();
            });
        },

        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        }
    });

    $.each([ "Width", "Height" ], function(i, name) {
        var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
                type = name.toLowerCase(),
                orig = {
                    innerWidth: $.fn.innerWidth,
                    innerHeight: $.fn.innerHeight,
                    outerWidth: $.fn.outerWidth,
                    outerHeight: $.fn.outerHeight
                };

        function reduce(elem, size, border, margin) {
            $.each(side, function() {
                size -= parseFloat($.curCSS(elem, "padding" + this, true)) || 0;
                if (border) {
                    size -= parseFloat($.curCSS(elem, "border" + this + "Width", true)) || 0;
                }
                if (margin) {
                    size -= parseFloat($.curCSS(elem, "margin" + this, true)) || 0;
                }
            });
            return size;
        }

        $.fn[ "inner" + name ] = function(size) {
            if (size === undefined) {
                return orig[ "inner" + name ].call(this);
            }

            return this.each(function() {
                $(this).css(type, reduce(this, size) + "px");
            });
        };

        $.fn[ "outer" + name] = function(size, margin) {
            if (typeof size !== "number") {
                return orig[ "outer" + name ].call(this, size);
            }

            return this.each(function() {
                $(this).css(type, reduce(this, size, true, margin) + "px");
            });
        };
    });
            $.registerWidgetEvent = function(type, special) {
                var types = type.split(",");
                if (types) {
                    for (var i = 0; i < types.length; i++) {
                        if (!$.event.special[type]) {
                            if (!special) {
                                $.event.special[types[i]] = {
                                    setup:function() {
                                        return true;
                                    }
                                };
                            } else {
                                $.event.special[types[i]] = special;
                            }
                        }
                        ;
                    }
                }
            };

// selectors
    function focusable(element, isTabIndexNotNaN) {
        var nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            var map = element.parentNode,
                    mapName = map.name,
                    img;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return ( /input|select|textarea|button|object/.test(nodeName)
                ? !element.disabled
                : "a" == nodeName
                ? element.href || isTabIndexNotNaN
                : isTabIndexNotNaN)
            // the element and all of its ancestors must be visible
                && visible(element);
    }

    function visible(element) {
        return !$(element).parents().andSelf().filter(
                function() {
                    return $.curCSS(this, "visibility") === "hidden" ||
                            $.expr.filters.hidden(this);
                }).length;
    }

    $.extend($.expr[ ":" ], {
        data: function(elem, i, match) {
            return !!$.data(elem, match[ 3 ]);
        },

        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"),
                    isTabIndexNaN = isNaN(tabIndex);
            return ( isTabIndexNaN || tabIndex >= 0 ) && focusable(element, !isTabIndexNaN);
        }
    });

// support
    $(function() {
        var body = document.body,
                div = body.appendChild(div = document.createElement("div"));

        // access offsetHeight before setting the style to prevent a layout bug
        // in IE 9 which causes the elemnt to continue to take up space even
        // after it is removed from the DOM (#8026)
        div.offsetHeight;

        $.extend(div.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });

        $.support.minHeight = div.offsetHeight === 100;
        $.support.selectstart = "onselectstart" in div;

        // set display to none to avoid a layout bug in IE
        // http://dev.jquery.com/ticket/4014
        body.removeChild(div).style.display = "none";
    });


// deprecated
    $.extend($.FUI, {
        // $.FUI.plugin is deprecated.  Use the proxy pattern instead.
        plugin: {
            add: function(module, option, set) {
                var proto = $.FUI[ module ].prototype;
                for (var i in set) {
                    proto.plugins[ i ] = proto.plugins[ i ] || [];
                    proto.plugins[ i ].push([ option, set[ i ] ]);
                }
            },
            call: function(instance, name, args) {
                var set = instance.plugins[ name ];
                if (!set || !instance.element[ 0 ].parentNode) {
                    return;
                }

                for (var i = 0; i < set.length; i++) {
                    if (instance.options[ set[ i ][ 0 ] ]) {
                        set[ i ][ 1 ].apply(instance.element, args);
                    }
                }
            }
        },

        // will be deprecated when we switch to jQuery 1.4 - use jQuery.contains()
        contains: function(a, b) {
            return document.compareDocumentPosition ?
                    a.compareDocumentPosition(b) & 16 :
                    a !== b && a.contains(b);
        },

        // only used by resizable
        hasScroll: function(el, a) {

            //If overflow is hidden, the element might have extra content, but the user wants to hide it
            if ($(el).css("overflow") === "hidden") {
                return false;
            }

            var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
                    has = false;

            if (el[ scroll ] > 0) {
                return true;
            }

            el[ scroll ] = 1;
            has = ( el[ scroll ] > 0 );
            el[ scroll ] = 0;
            return has;
        },

        // these are odd functions, fix the API or move into individual plugins
        isOverAxis: function(x, reference, size) {
            //Determines when x coordinate is over "b" element axis
            return ( x > reference ) && ( x < ( reference + size ) );
        },
        isOver: function(y, x, top, left, height, width) {
            //Determines when x, y coordinates is over "b" element
            return $.FUI.isOverAxis(y, top, height) && $.FUI.isOverAxis(x, left, width);
        }
    });
    //保存浏览器信息
    var FUI_B = {};
    $(function() {
        var browser = $.browser;
        if (browser.msie) {
            FUI_B["isIE"] = true;
            var version = browser.version;
            if (version.contains("6")) {
                FUI_B["isIE6"] = true;
                FUI_B["isIE7"] = false;
                FUI_B["isIE8"] = false;
            }
            if (version.contains("7")) {
                FUI_B["isIE7"] = true;
                FUI_B["isIE6"] = false;
                FUI_B["isIE8"] = false;
            }
            if (version.contains("8")) {
                FUI_B["isIE8"] = true;
                FUI_B["isIE6"] = false;
                FUI_B["isIE7"] = false;
            }
        } else {
            FUI_B["isIE"] = false;
            FUI_B["isIE6"] = false;
            FUI_B["isIE7"] = false;
            FUI_B["isIE8"] = false;
        }
        if (browser.webkit) {
            FUI_B["isChrome"] = true;
        } else {
            FUI_B["isChrome"] = false;
        }
        if (browser.mozilla) {
            FUI_B["isMozilla"] = true;
        } else {
            FUI_B["isMozilla"] = false;
        }
    });
    //FUI的公共方法
    $.extend($.FUI, {
        fetchNumber :function(s) {
            if (!s)  return s;
            var number = s.replace(/[^\d]/g, "");
            return number ? parseInt(number) : number;
        },
        //浏览器判断
        ENV : {
            get:function(t) {
                return FUI_B[t];
            }
        },
        //替换样式
        replaceClass : function(el, cls) {
           this.getElement(el).className = cls;
        },
        addClass:function(e, cls) {
	        var o = this.getElement(e);
	        var cn = o.className;
	        if (cn.indexOf(cls) !== -1)return;
	        cn.length == 0 ? cn = cls : cn += (" " + cls);
	        o.className = cn;
	    },
	    removeClass:function(e, cls) {
	        var o = this.getElement(e);
	        var cn = o.className;
	        if (cn.indexOf(cls) === -1)return;
	        var cns = cn.split(" "),len = cns.length;
	        for (var i = 0; i < len; i++) {
	            if (cns[i] == cls) {
	                cns.splice(i, 1);
	                break;
	            }
	        }
	        o.className = cns.join(" ");
	    },
        getElement:function(e) {
            var o = undefined;
            switch (typeof e) {
                case "string" :o = document.getElementById(e);
                    break;
                default :o = e;
            }
            return o;
        },
        isArray : function(v){
           return  Object.prototype.toString.apply(v) == "[object Array]" ;
        }
    });

//封装jQuery对象的公共方法
//元素不可选
    var R = function() {
        return false;
    };

//元素可选
    String.prototype.contains = function(s) {
        return this.indexOf(s) !== -1;
    };
})(jQuery);


(function( $, undefined ) {
    if($.browser.msie && $.browser.version == '6.0'){
        document.execCommand("BackgroundImageCache", false, true);
    }
if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			try {
				$( elem ).triggerHandler( "remove" );
			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						try {
							$(this).triggerHandler("remove");
						// http://bugs.jquery.com/ticket/8235
						} catch( e ) {}
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();

	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		// prevent calls to internal methods
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;

				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
                var instance = $.data( this, name );
                if ( instance ) {
                    instance.option( options || {} )._init();
                } else {
                    $.data( this, name, new object( options, this ) );
                }
            });
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		
		$.data( element, this.widgetName, this );
		this.element = $( element );
       
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions()
            );
        $.extend(this.options,options);

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});
        if(window['FUI_debug']) {
             var widgetId = this.element.attr ('id');
            this.addModule(this.widgetName,widgetId,this);
        }
		this._create();
		//this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
        if(window['FUI_debug']){
            var widgetId = this.element.attr('id');
            this.removeModule(this.widgetName,widgetId);
        }
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];
		
		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	},
	
	setSize : function(w, h) {
		// no effect in default, sub widget can override this function for specific purpose
	},
    addModule : function(group,widgetId,widgetObj){
        if(!group || !widgetId ||!widgetObj){
            return ;
        }
        var FUIWidgets = window['FUIWidgets'];
        FUIWidgets[group] = FUIWidgets[group] || {};
        var widget =  FUIWidgets[group][widgetId] ;
        if(!widget) {
             FUIWidgets[group][widgetId] = widgetObj;
        } else {
            throw Error("已存在相同id的"+group+"，请先销毁原先的"+group);
        }
    },
    removeModule : function(group,widgetId){
        if(!group || !widgetId){
            return ;
        }
        var FUIWidgets = window['FUIWidgets'];
        delete  FUIWidgets[group][widgetId];
    }
};
$.registerWidgetEvent("remove");

//新增全部变量，debug模式下保存组件对象，用于检测组件是否销毁。
window['FUIWidgets'] = {};


})( jQuery );

(function($) {

	// 绑定jquery对象的fui对象，用于事件绑定和逻辑处理
	$.widget("FUI.HsMessage", {
	    options : {
	    	onBntClick : null,
	    	onCloseClick : null
	    },
	    
	    _create : function() {
	    	this.options.id = this.element.attr("id");
	    },
	    
	    _init : function() {
	    	var self = this;
	    	var selfEl = this.element;
	    	if (!$Component.hasFType(selfEl, "FPopupBox")) {
	    		// 如果还没有初始化popuoBox
	    		selfEl.FPopupBox({position:{left:"center", top:"center"}, zIndex:20001});
	    	}
	    	// 绑定事件
	    	self._bindEvent();
	    },
	    
	    destroy : function() {
		    var op = this.options;
		    if (op._dragable) {
		    	op._dragable.stop();
		    	op._dragable.destroy();
			    op._dragable = null;
		    }
		    // 调用父类的销毁方法
		    $.Widget.prototype.destroy.call(this);
	    },
	    
	    _bindEvent : function() {
	    	var op = this.options;
	    	var self = this;
	    	var selfEl = this.element;
	    	// 绑定按钮的事件
	    	self._bindBntsEvent();
	    	// 绑定右上角的关闭按钮事件
	    	self._bindCloseBntEvent();
	    	// 绑定标题事件，移动
	    	//self._bindHeaderEvent();
	    },
	    
	    _bindBntsEvent : function() {
	    	var self = this;
	    	var bnts = [self._getOkEl(), self._getYesEl(), self._getNoEl(), self._getCancelEl()];
	    	var bntStrs = ["ok", "yes", "no", "cancel"];
	    	for (var i=0; i<bnts.length; i++) {
	    		var bntStr = bntStrs[i];
	    		var func = $.proxy(self.options, "onBntClick", bntStr);
	    		bnts[i].FSimpleButton({
	    			onClick : func
	    		});
	    	}
	    },
	    
	    _bindCloseBntEvent : function() {
	    	var self = this;
	    	var el = self._getCloseIconEl();
	    	el.hover(function() {
	    		$(this).addClass("f-tool-closethick").removeClass("f-tool-close");
	    	}, function() {
    		  	$(this).removeClass("f-tool-closethick").addClass("f-tool-close");
    		}).mousedown(function(e) {
    			e.stopPropagation(); // 防止因为点击按钮出现 窗口移动的虚框
    		}).click(function() {
    			self.options.onCloseClick();
    		});
	    },
	    
	    _bindHeaderEvent : function() {
	    	var self = this;
	    	var op = this.options;
	    	var selfEl = this.element;
	    	var headerEl = self._getHeaderEl();
	    	op._dragable = new $.Dragable(op.id+"-header", op.id);
	    },
	    
	    _getHeaderEl : function() {
	    	var op = this.options;
	    	var el = op._headerEl;
	    	if (!el) {
		    	var selfEl = this.element;
	    		op._headerEl = el = $I(op.id + "-header");
	    	}
	    	return el;
	    },
	    
	    _getCloseIconEl : function() {
	    	var op = this.options;
	    	var el = op._closeEl;
	    	if (!el) {
	    		op._closeEl = el = $I(op.id + "-closeIcon");
	    	}
	    	return el;
	    },
	    
	    _getOkEl : function() {
	    	var op = this.options;
	    	var el = op._okBntEl;
	    	if (!el) {
	    		el = op._okBntEl = $I(op.id + "-okBnt");
	    	}
	    	return el;
	    },
	    
	    _getCancelEl : function() {
	    	var op = this.options;
	    	var el = op._cancelBntEl;
	    	if (!el) {
	    		el = op._cancelBntEl = $I(op.id + "-cancelBnt");
	    	}
	    	return el;
	    },
	    
	    _getYesEl : function() {
	    	var op = this.options;
	    	var el = op._yesBntEl;
	    	if (!el) {
	    		el = op._yesBntEl = $I(op.id + "-yesBnt");
	    	}
	    	return el;
	    },
	    
	    _getNoEl : function() {
	    	var op = this.options;
	    	var el = op._noBntEl;
	    	if (!el) {
	    		el = op._noBntEl = $I(op.id + "-noBnt");
	    	}
	    	return el;
	    },
	    
	    show : function(op) {
	    	this.element.FPopupBox("show", op);
	    },
	    
	    hide : function(op) {
	    	this.element.FPopupBox("hide", op);
	    }
	});

	$.HsMessage =  {
		_status : {
			// 窗口打开的类型: alert(ok), confirm(yes no), prompt(ok cancel),
			// mutilinePrompt(ok cancel), YNC(yes no cancel)
			type : "",
			choise : "",
			text : "" // 如果是prompt或者mutiLinePrompt则返回其中的文本内容
		},
		
		// 如果在没有关闭msg的情况下，再次弹出msg，则将msg的环境缓存，再本次msg关闭之后再弹出
		_cmdQueue : [],
		_isShow : false,
		
		_options : {
		},

		// 按钮标示
		OK :			0x0001,
		OKCANCEL :		0x1001,
		YES :			0x0010,
		NO : 			0x0100,
		YESNO :			0x0110,
		CANCEL :		0x1000,
		YESNOCANCEL:	0x1110,
		
		// 图标标示
		INFO : "f-message-icon-info",
		QUESTION : "f-message-icon-question",
		WARNING : "f-message-icon-warning",
		ERROR : "f-message-icon-error",

		alert : function(title, msg, callback) {
			var self = this;
			self.show({
				title : title,
				msg : msg,
				callback : callback,
				buttons : self.OK,
				width : "400px"
			});
		},

		confirm : function(title, msg, callback) {
			var self = this;
			self.show({
				title : title,
				msg : msg,
				callback : callback,
				buttons : self.YESNO,
				icon : self.QUESTION,
				width : "400px"
			});
		},

		prompt : function(title, msg, callback) {
			var self = this;
			self.show({
				title : title,
				msg : msg,
				callback : callback,
				buttons : self.OKCANCEL,
				prompt : true,
				width : "400px"
			});
		},


		show : function(op) {
			var self = this;
			var msgEl = self._getMessageEl(); // 必须在前面调用
			
			if (self._isShow) {
				self._cmdQueue.push(op);
				return;
			}
			self._isShow = true;
			
			// 修改标题
			var title = op.title || "&nbsp;";
			self._getElement("title").html(title);
			// 重置按钮
			var bntCount = self._resetButtons(op.buttons, op.buttonTexts);
			
			// 调整message的大小
			var width = "400px";
			if (op.width) {
				width = op.width;
			} else {
				if (bntCount == 1) {
					width = "400px";
				} else if (bntCount == 2) {
					width = "400px";
				} else if (bntCount >= 3) {
					width = "400px";
				}
			}
			msgEl.width(width);
			
			// 重置body内容
			self._resetBody(op, width);
			
			// 是否有右上角的关闭按钮
			var iconEl = self._getElement("closeIcon");
			if (op.closeIcon === false) {
				iconEl.css("display", "none");
			} else {
				iconEl.css("display", "block");
			}
			
			// 显示message
			self._showMask();
            var btns = op.buttons ;
			msgEl.HsMessage("show", {
				show : {
					callback : function() {
						$(document).bind("keydown.HsMessage", function(e) {
                            var keyCode =  e.keyCode ;
                            var target = e.target ;
                            var nodeName = target.nodeName;
                            //esc退出
							if (keyCode == 27) {
                                if(btns == self.OK ||btns == self.OKCANCEL) {
                                    self._bntClick("cancel");
                                } else if(btns == self.YESNO){
                                    self._bntClick("no");
                                }
                                //事件屏蔽代码必须写在里面，否则prompt的输入框不允许输入任何值
                                e.stopPropagation();
                                return false ;
							} else if (keyCode == 13 ){
                                if('input' != nodeName.toLowerCase() ){
                                    if(btns == self.OK || btns == self.OKCANCEL) { //回车 确认
                                        self._bntClick("ok");
                                    } else if(btns == self.YESNO){
                                        self._bntClick("yes");
                                    }
                                    //事件屏蔽代码必须写在里面，否则prompt的输入框不允许输入任何值
                                    e.stopPropagation();
                                    return false ;
                                }
                            }
						});
					}
				},
				hide : {
					callback : function() {
						self._hideMask();
						$(document).unbind("keydown.HsMessage");
						self._status.text = self._getElement("promptInput").val();
						if ($.isFunction(op.callback)) {
							op.callback(self._status.choise, self._status.text);
						}
						self._isShow = false;
						self._processQueue(); // 处理在弹出框过程中弹出来的框
					}
				}
			});
		},
		
		_processQueue : function() {
			var self = this;
			var queue = self._cmdQueue;
			if (queue.length == 0) {
				return;
			}
			self.show(queue.shift());
		},
		
		_showMask : function() {
			$("body").doMask("please choose!", {showImg:false});
		},
		
		_hideMask : function() {
			$("body").doUnMask();
		},
		
		hide : function() {
			var self = this;
			var msgEl = self._getMessageEl(); // 必须在前面调用
			msgEl.HsMessage("hide");
		},
		
		_resetBody : function(op, width) {
			width = parseInt(width);
			var self = this;
			var tipIcon = op.icon;
			var msg = op.msg || "&nbsp;";
			var contentEl = self._getElement("content");
			var iconContentEl = self._getElement("iconContent");
			var promptEl = self._getElement("prompt");
			if (op.prompt == true) {
				contentEl.css("display", "none");
				promptEl.css("display", "block");
				iconContentEl.css("display", "none");
				self._getElement("promptMsg").html(msg);
				self._getElement("promptInput").val("");
			} else if (tipIcon) { // 有icon的内容
				var icons = [self.INFO, self.QUESTION, self.WARNING, self.ERROR];
				contentEl.css("display", "none");
				promptEl.css("display", "none");
				iconContentEl.css("display", "block");
				// 设置图标
				var iconEl = self._getElement("tipIcon");
				iconEl.removeClass(icons.join(" "));
				iconEl.addClass(tipIcon);
				// 设置内容
				var content = self._getElement("tipContent");
				if (!isNaN(width)) {
					content.width(width-20-50);
				}
				// end add 
				content.html(msg);
			} else {
				contentEl.css("display", "block");
				promptEl.css("display", "none");
				iconContentEl.css("display", "none");
				self._getElement("content").html(msg);
			}
		},
		
		_resetButtons : function(buttons, buttonTexts) {
			var self = this;
			buttons = buttons || 0;
			if (buttons == 0) {
				var el = self._getElement("buttonGroup");
				el.css("display", "none");
				return 0;
			} else {
				buttonTexts = buttonTexts || {};
				self._getElement("buttonGroup").css("display", "block");
				var iconCount = 0;
				$.each(["ok", "yes", "no", "cancel"], function(i, name) {
					var el = self._getElement(name+"Bnt-wrapper");
					if (buttons & self[name.toUpperCase()]) {
						if (buttonTexts[name]) {
							self._getElement(name+"Bnt").text(buttonTexts[name]);
						}
						el.parent().show();
						iconCount ++ ;
					} else {
						el.parent().hide();
					}
				});
				return iconCount;
			}
		},
	    
	    _getElement : function(name) {
	    	var op = this._options;
	    	var el = op["_obj" + name + "El"];
	    	if (el) {
	    		return el;
	    	} else {
	    		el = op["_obj" + name + "El"] = $I(op.id + "-" + name);
	    	}
	    	return el;
	    },

		_bntClick : function(choice) {
			var self = this;
			self._status.choise = choice;
			self.hide();
		},
		
		_getMessageEl : function() {
			var self = this;
			var op = self._options;
			if (op.id) {
				return $I(op.id);
			} else {
				var id = $Utils.genId("f-message");
				var html = self._generateHtml({
					id : id,
					title : ("HsMessage" + $Utils.UID)
				});
				$("body").append(html);
				$I(id).HsMessage({
			    	onBntClick : function(choise) {
			    		self._bntClick(choise);
			    	},
			    	onCloseClick : function() {
			    		self._bntClick("cancel");
			    	}
				});
				op.id = id;
			}
			return $("#"+id);
		},
		
		_generateHtml : function(op) {
			var self = this;
			var id = op.id || $Utils.genId("f-message"); // 0
			var width = op.width || "350px"; // 1
			var title = op.title || "&nbsp;"; // 2
			var bodyContent = self._genContentHtml(id); // 3
			var buttonGroup = self._genButtonGroup(id); // 4
			
			var template = "\
			<div id='{0}' class='f-message f-popupMessage f-widget f-corner-all' style='width:{1};'> \
			  <div id='{0}-header' class='f-popupMessage-header f-form-unselectable f-message-header' onselectstart='return false;'> \
			  	<span id='{0}-title'>{2}</span> \
			    <span id='{0}-closeIcon' class='f-popupMessage-icon f-tool f-tool-close'>&nbsp;</span> \
			  </div> \
			  <div id='{0}-body' class='f-popupMessage-body'><div  style='float:left;margin-right:5px; '><img src='../../../images/icon-warning.gif'/></div>{3}</div> \
			  {4} \
			</div>";
			return $Utils.format(template, id, width, title, bodyContent, buttonGroup);
		},
		
		_genContentHtml : function(id) {
			var template = "";
			// 生成alert的内容div
			template += " \
				<div id='{0}-content' style='margin-bottom:5px;'>&nbsp;</div> \
			";
			// 生成含有图标内容的div
			template += "\
				<div id='{0}-iconContent'>\
					<div id='{0}-tipIcon' style='width:50px;height:35px;float:left;' class='f-message-icon-question'>&nbsp;</div>\
					<div id='{0}-tipContent' style='float:center'>&nbsp;</div>\
					<div class='f-form-clear'></div>\
				</div>";
			// 生成输入框
			template += " \
				<div id='{0}-prompt'> \
					<div id='{0}-promptMsg' style='margin-bottom:3px;'>&nbsp;</div> \
					<input type='text' class='f-textInput f-textField' id='{0}-promptInput' style='margin-bottom:5px;'> \
				</div>";
			
			// 生成prompt内容的div
			// 生成mutiPrompt内容的div
			return $Utils.format(template, id);
		},
		
		_genButtonGroup : function(id) {
			var self = this;
			return  $.FUI.FButtonGroup.generateHtml({
		    	id : id+"-buttonGroup",
				toolspacing : "2",
				style : "margin-top: 5px;",
				items : [
				    $.FUI.FSimpleButton.generateHtml({
				    	text : "确定",
				    	id : id+"-okBnt",
				    	height : "22px",
				    	style : "margin: 0px 3px"
				    }),
				    $.FUI.FSimpleButton.generateHtml({
				    	text : "是",
					    id : id+"-yesBnt",
				    	height : "22px",
				    	style : "margin: 0px 3px"
				    }),
				    $.FUI.FSimpleButton.generateHtml({
				    	text : "否",
					    id : id+"-noBnt",
				    	height : "22px",
				    	style : "margin: 0px 3px"
				    }),
				    $.FUI.FSimpleButton.generateHtml({
				    	text : "取消",
					    id : id+"-cancelBnt",
				    	height : "22px",
				    	style : "margin: 0px 3px"
				    })
				 ]
			});
		}
	};
})(jQuery);

(function($, undefined) {
    String.prototype.endWith = function(str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length) {
            return false;
        }
        return this.substring(this.length - str.length) == str;
    };
    String.prototype.startWith = function(str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length) {
            return false;
        }
        return this.substr(0, str.length) == str;
    };
    String.prototype.replaceAll = function(s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    };
    $.fn.closeSelect = function() {
        if ($.browser.mozilla) {
            this.css('-moz-user-select', 'none');
        } else if ($.browser.webkit) {
            this.css('-webkit-user-select', 'none');
        } else {
            this.bind("selectstart.fuiSelect", function() {
                return false;
            });
        }
        return this;
    };
    $.fn.openSelect = function() {
        if ($.browser.mozilla) {
            this.css('-moz-user-select', 'auto');
        } else if ($.browser.webkit) {
            this.css('-webkit-user-select', 'auto');
        } else {
            this.unbind("selectstart.fuiSelect");
        }
        return this;
    };

    function IndexMap() {
        // data
        this.elements = new Array();

        //获取MAP元素个数
        this.size = function() {
            return this.elements.length;
        };

        //判断MAP是否为空
        this.isEmpty = function() {
            return (this.elements.length < 1);
        };

        //删除MAP所有元素
        this.clear = function() {
            this.elements = new Array();
        };

        // 销毁所有元素，此map实例将不可再被使用
        this.destroy = function() {
            this.elements = null;
        };

        //向MAP中增加元素（key, value) ，如果以前已经存在，则返回以前存在的值
        this.put = function(_key, _value) {
            var last = this.remove(_key); // 移除以前的
            this.elements.push({
                key : _key,
                value : _value
            });
            return last;
        };

        //向MAP中指定索引（从0开始）增加元素（key, value) ，请慎重使用，此方法不会检测key值重复
        this.insert = function(index, _key, _value) {
            this.elements.splice(index, 0, {
                key : _key,
                value : _value
            });
        };

        //删除指定KEY的元素，成功则返回以前的值，否则返回null
        this.remove = this.removeByKey = function(_key) {
            var value = null;
            var elements = this.elements;
            var length = this.elements.length;
            for (i = 0; i < length; i++) {
                if (elements[i].key == _key) {
                    value = this.removeByIndex(i).value;
                    break;
                }
            }
            return value;
        };

        // 删除指定索引的元素，如果成功则返回相应的键值对，否则返回null
        this.removeByIndex = function(_index) {
            if (_index < 0 || _index >= this.elements.length) {
                return null;
            }
            var result = this.elements[_index];
            this.elements.splice(_index, 1);
            return result;
        };

        //获取指定KEY的元素值VALUE，失败返回NULL
        this.get = this.getByKey = function(_key) {
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
            return null;
        };

        //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
        this.element = this.getByIndex = function(_index) {
            if (_index < 0 || _index >= this.elements.length) {
                return null;
            }
            return this.elements[_index];
        }

        //判断MAP中是否含有指定KEY的元素
        this.containsKey = function(_key) {
            var bln = false;
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].key == _key) {
                    bln = true;
                }
            }
            return bln;
        }

        //判断MAP中是否含有指定VALUE的元素
        this.containsValue = function(_value) {
            var bln = false;
            for (i = 0; i < this.elements.length; i++) {
                if (this.elements[i].value == _value) {
                    bln = true;
                }
            }
            return bln;
        }

        //获取MAP中所有VALUE的数组（ARRAY）
        this.values = function() {
            var arr = new Array();
            for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].value);
            }
            return arr;
        };

        //获取MAP中所有KEY的数组（ARRAY）
        this.keys = function() {
            var arr = new Array();
            for (i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i].key);
            }
            return arr;
        };

        this.indexOf = function(_key) {
            var elements = this.elements;
            var length = this.elements.length;
            for (i = 0; i < length; i++) {
                if (this.elements[i].key == _key) {
                    return i;
                }
            }
            return -1;
        }
    }

    ;

    var DOC = document;
    var isStrict = DOC.compatMode == "CSS1Compat";
    var FUI = {};
    FUI.Utils = {

        getJRESList : function(result) {
            //如果传入的值为空，则返回null
            if (!result) {
                return null;
            }
            var data = result.data;
            if (!data) {
                return null;
            }
            return  data;
        },
       
        getJRESObject : function(result) {
            //如果传入的值为空，则返回null
            if (!result) {
                return  null;
            }
            var data = result.data;
            if (!data) {
                return null;
            } else {
                if ($.isArray(data)) {
                    return data[0];
                } else {
                    return data;
                }
            }

        },
        $I : function(id) {
            return $("#" + id);
        },
        fetchNumber :function(s) {
            if (!s)  return s;
            var number = s.replace(/[^\d]/g, "");
            return number ? parseInt(number) : number;
        },
   
        replaceClass : function(e, cls) {
            this.getElement(e).className = cls;
        },
      
        addClass:function(e, cls) {
            var o = this.getElement(e);
            if (!o) {
                return;
            }
            var cn = o.className;
            if (cn.indexOf(cls) !== -1)return;
            cn.length == 0 ? cn = cls : cn += (" " + cls);
            o.className = cn;
        },
        removeClass:function(e, cls) {
            var o = this.getElement(e);
            if (!o) {
                return;
            }
            var cn = o.className;
            if (cn.indexOf(cls) === -1)return;
            var cns = cn.split(" "),len = cns.length;
            for (var i = 0; i < len; i++) {
                if (cns[i] == cls) {
                    cns.splice(i, 1);
                    break;
                }
            }
            o.className = cns.join(" ");
        },
        getElement:function(e) {
            var o = undefined;
            switch (typeof e) {
                case "string" :o = document.getElementById(e);
                    break;
                default :o = e;
            }
            return o;
        },
        
        doMask : function(text, options) {
            $('body').doMask(text, options);
        },
      
        doUnMask : function() {
            $('body').doUnMask();
        },
     
        apply :function(obj, config, defaults) {
            if (defaults) {
                this.apply(obj, defaults);
            }
            if (obj && config && typeof config == 'object') {
                for (var p in config) {
                    obj[p] = config[p];
                }
            }
            return obj;

        },
        /**
         * json对象属性拷贝，config对象中的属性不会覆盖obj对象中的属性
         * @param obj
         * @param config
         */
        applyIf : function(obj, config) {
            if (obj && config && typeof config == 'object') {
                for (var p in config) {
                    if (obj[p] === null || obj[p] === undefined) {
                        obj[p] = config[p];
                    }
                }
            }
            return obj;
        },
        /**
         * 判断一下情况，valu值是否为null 、undefined、 数组是否为空、字符串是否为''
         * @param value
         */
        isEmpty : function(value) {
            return value === null || value === undefined
                    || ($.isArray(value) && value.length == 0)
                    || value === '';
        } ,
        stopPropagation:function(e) {
            if (e && e.stopPropagation) {
                //支持w3c的stopPropagation()方法
                e.stopPropagation();
            } else {
                //使用ie的方式取消冒泡
                window.event.cancelBubble = true;
            }
        },
        convert : function(value, type) {
            var result;
            if (this.isEmpty(type)) {
                return value;
            }
            type = type.toLowerCase();
            if (type == 'string') {
                return '' + value;
            } else if (type == 'number') {
                return parseInt(value, 10);

            } else if (type == 'boolean') {
                return !!type;
            } else if (type == 'float') {
                return parseFloat(value)
            } else {
                return value;
            }

        },
        getContextPath : function() {
            return window['FUIContextPath'];
        },

        _regExpPercentage : /^\d{1,3}(\.(\d)*)?%$/,
        // 判断一个字符串是否是百分数形式，比如"40%"、"32.5%"等则直接返回，否则返回null
        getPercentage : function(str) {
            var result = FUI.Utils._regExpPercentage.exec(str);
            if (result) {
                return result[0];
            } else {
                return null;
            }
        },
        _regExpPixelSize : /(^\d+(\.\d+)?)(px)?$/,
        getPixelSize : function(str) {
            var result = FUI.Utils._regExpPixelSize.exec(str);
            if (result) {
                return result[0];
            } else {
                return null;
            }
        },

        IndexMap : function() {
            return new IndexMap();
        },

        // 判断对象是否是数组
        isArray : function(obj) {
            return (typeof obj == 'object') && obj.constructor == Array;
        },

        // 判断对象是否是字符串
        isString : function(str) {
            return (typeof str == 'string') && str.constructor == String;
        },

        // 判断对象是否是数值
        isNumber : function(obj) {
            return (typeof obj == 'number') && obj.constructor == Number;
        },

        // 判断对象是否是日期对象
        isDate : function(obj) {
            return (typeof obj == 'object') && obj.constructor == Date;
        },

        // 判断传入对象是否是jquery对象
        isJQueryObj : function(obj) {
            return (typeof obj == 'object') && obj.constructor == jQuery;
        },

        format : function(format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/\{(\d+)\}/g, function(m, i) {
                return args[i];
            });
        },
        transUrl : function(url) {
            //正则判断是不是http开始。或www开始。
            var urlRegex = "^((https|http|ftp|rtsp|mms)?:"
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                    + "[a-z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,4})?" // 端口- :80
                    + "((/?)|" // a slash isn't required if there is no file name
                    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var regex = new RegExp(urlRegex);
            if (regex.test(url)) {
                return url;
            } else if (url.indexOf("/") !== 0) {
                url = this.getContextPath() + "/" + url;
            }
            return url;
        },
        /* end by qudc */

        // 生成唯一ID的基数
        UID : 0,
        genId : function(name) {
            var ID = this.UID ++;
            var suffix = "-webgen-" + ID;
            if (name != null && name.length != 0) {
                return (name + suffix);
            } else {
                return ("f-comp" + suffix);
            }
        },
        destroyIframe : function(iframeId) {
            var ifm = document.getElementById(iframeId);
            if (ifm && ifm.contentWindow) {
                ifm.src = "about:blank";
                ifm.contentWindow.document.write('');
                ifm.contentWindow.close();
                ifm.parentNode.removeChild(ifm);
                ifm = null;
            }
        },
        /**
         * 获取当前视窗的高度
         */
        getViewportHeight: function() {
            return $.browser.msie ?
                    (isStrict ? DOC.documentElement.clientHeight : DOC.body.clientHeight) :
                    self.innerHeight;
        },
        /**
         * 获取当前视窗的宽度
         */
        getViewportWidth : function() {
            return !isStrict && !$.browser.opera ? DOC.body.clientWidth :
                    $.browser.msie ? DOC.documentElement.clientWidth : self.innerWidth;
        },

        getAlignXY : function(targetEl, selfEl, listWidth, listHeight) {
            var UTILS = window["$Utils"];
            var offset = targetEl.offset(),inputX = offset.left,inputY = offset.top,inputHeight = targetEl.outerHeight(),
                    lWidth = listWidth || selfEl.outerWidth(),
                    lHeight = listHeight || selfEl.outerHeight();

            var doc = document, docElement = doc.documentElement, docBody = doc.body;
            var scrollX = (docElement.scrollLeft || docBody.scrollLeft || 0) ,
                    scrollY = (docElement.scrollTop || docBody.scrollTop || 0);

            var viewHeight = UTILS.getViewportHeight();
            var viewWidth = UTILS.getViewportWidth();
            var top = 0;
            var left = 0;
            //如果组件下方放置不下列表，则放到组件上方
            if (inputY + inputHeight + lHeight > viewHeight + scrollY) {
                top = inputY - lHeight;
            } else {
                top = inputY + inputHeight;
            }

            if (inputX + lWidth > viewWidth + scrollX) {
                left = viewWidth + scrollX - lWidth;
            } else {
                left = inputX;
            }
            return {top:top,left:left};

        },
        convertArrayToJSON : function(arr) {
            if ($.isArray(arr) && arr.length > 0) {
                var record = arr[0];
                var result;
                var keyArr = [];
                for (var o in record) {
                    keyArr.push(o);
                }
                var arrLen = arr.length;
                var keyArrLen = keyArr.length;
                //按照key值遍历
                for (var i = 0; i < keyArrLen; i++) {
                    var key = keyArr[i];
                    var resultArr = [];
                    for (var j = 0; j < arrLen; j++) {
                        var value = arr[j][key];
                        value = (value === undefined) ? "" : value ;
                        resultArr.push(value);
                    }
                    result = result || {};
                    result[key] = resultArr;
                }
                return  result;
            } else {
                return null;
            }
        },
        sortData : function(arr,property,dir){
            if(!$.isArray(arr) || !property ){
                return ;
            }
            var dsc = String(dir).toUpperCase() == 'DESC' ? -1 :1;
            var sortFn = function(a,b){
                var v1 = a[property];
                var v2 = b[property];
                var v =  v1>v2?1:(v1<v2?-1:0);
                return v*dsc;
            }
            var result = arr.sort(sortFn);
            return result ;
        }
    };
    FUI.Component = {
        // 判断组件是否采用指定的ftype初始化过
        hasFType : function(compEl, ftype) {
            var cache = $.data(compEl.get(0)); // 从jquery的缓存中获取该对象绑定的对象缓存
            if (cache && ftype && cache[ftype]) {
                return true;
            } else {
                return false;
            }
        },

        // 从指定的jquery对象查找第一个拥有methodName的FUI对象的ftype，如果没有找到则返回空字符串""
        getFType : function(compEl, methodName) {
            if (!methodName || methodName.startWith("_")) {
                return "";
            }
            var ftype = "";
            var cache = $.data(compEl.get(0)); // 从jquery的缓存中获取该对象绑定的对象缓存
            var lastFType = cache["ftype"];
            if (cache && lastFType && $.isFunction((cache[lastFType] || {})[methodName])) {
                return lastFType; // 最后一个就是满足要求的，就不要遍历了
            }
            if (cache) {
                for (var typeName in cache) {
                    if ($.isFunction((cache[typeName] || {})[methodName])) {
                        ftype = typeName;
                        break; // 找到了含有指定方法的组件
                    }
                }
            }
            return ftype;
        },

        // 判断一个(jquery)对象对应的FUI组件对象是否有指定的方法，如果存在并且方法名不以下划线"_"开头返回true，否则返回false
        hasFunc : function(compEl, funcName) {
            if (this.getFType(compEl, funcName)) {
                return true;
            }
            return false;
        },
      
        tryCall : function(compEl, funcName) {
            var result = {};
            result.ftype = this.getFType(compEl, funcName);
            result.hasFunc = false;
            result.result = null;

            if (result.ftype) {
                result.hasFunc = true;
                result.result = compEl[result.ftype].apply(compEl, Array.prototype.slice.call(arguments, 1));
            }
            return result;
        }
    };

    window["$I"] = FUI.Utils.$I;
    window["$Utils"] = FUI.Utils;
    window["$Component"] = FUI.Component;

     //页面滚动时，自动隐藏下拉框列表以及日期框列表
    var scrollHandler =false ;
    var isScrolling =  false ;
    var mouseScrollFn =  function(e) {
        //触发FCombo组件的下拉列表隐藏
         var event =  e || window.event;
        if(!isScrolling) {
            var target =  event.srcElement ? event.srcElement : event.target,className =  $(target).get(0).className;
            if(className.indexOf('f-combo-list-') == -1){
                //鼠标滚动不在下拉列表区域，则直接隐藏下拉列表
                $(document).trigger('mousedown.FCombo');
                //$dp.hide();
            }
            isScrolling = true ;
        }
        if(scrollHandler) {
            clearTimeout(scrollHandler);
            scrollHandler = false ;
        }
        scrollHandler =  setTimeout(function(){
            isScrolling = false;
        },100);
    }
    $(function(){
        if (document.addEventListener) {
            if($.browser.mozilla){
        		 document.addEventListener('DOMMouseScroll', mouseScrollFn, false);
        	}else {
        		 document.addEventListener('mousewheel', mouseScrollFn, false);
        	}
        }  else {
            //ie
            window.onmousewheel = document.onmousewheel = mouseScrollFn;
        }
    });
})(jQuery);
(function($, undefined) {
	$.registerWidgetEvent("onClick");
	$.widget("FUI.FButton", {
	    options : {
	        height : 24,
	        width : 75,
	        iconCls : null,
	        onClick : null,

	        // 是否是禁用状态
	        _disabled : false,
	        // 缓存jQuery对象：button
	        _objButton : null,
	        // button修饰框框
	        _objSelfEl : null,
            menu :null
	    },
	    _create : function() {
		    // 初始化ID
		    var ID = this.element.attr("id");
		    this.options.id = ID;
		    // 缓存jquery对象
		    var selfEl = this.element;
		    var options = this.options;
		    options._objSelfEl = $I(ID + "-bnt-table");
		    options._objButton = $I(ID);
		    options._disabled = options._objSelfEl.hasClass("f-item-disabled");

		    // 绑定事件
		    this._bindEvent();
	    },
	    _init : function() {
	    },
	    _bindEvent : function() {
		    var self = this;
		    var op = self.options;
		    var selfEl = op._objSelfEl;

		    // 绑定over事件
		    selfEl.hover(function() {
			    if (!self.isDisabled()) {
				    selfEl.addClass("f-btn-over");
			    }
		    }, function() {
			    if (!self.isDisabled()) {
				    selfEl.removeClass("f-btn-over");
			    }
		    });

		    // 绑定鼠标事件
		    selfEl.mousedown(function() {
			    if (!self.isDisabled()) {
				    selfEl.addClass("f-btn-click");
			    }
		    });
		    // 绑定鼠标松开事件
		    selfEl.mouseleave(function() {
			    if (!self.isDisabled()) {
				    selfEl.removeClass("f-btn-click");
			    }
		    });
		    // 绑定鼠标松开事件
		    selfEl.mouseup(function() {
			    if (!self.isDisabled()) {
				    selfEl.removeClass("f-btn-click");
			    }
		    });
		    // 绑定点击事件
		    selfEl.click(function() {
			    self.click();
		    });
	    },
	    // 对象销毁方法
	    destroy : function() {
		    // 取消绑定的事件
	    	this.options._objSelfEl.unbind();
		    this.element.unbind();
		    this.options._objButton = null;
		    this.options._objSelfEl = null;
		    // 调用父类的销毁方法
		    $.Widget.prototype.destroy.call(this);
	    },

	    click : function() {
		    var self = this;
		    var op = self.options;
            var menu =  op.menu ;

            if (!self.isDisabled()) {
                if(menu){
                    var id =  op.id ;
                    $I(menu).FMenu('show',{attach:'#'+id+'-bnt-table'});
                } else {
                    // 如果有注册的点击事件，则先调用注册的点击事件
                    var canGo = true;
                    if ($.isFunction(op.onClick)) {
                        var result = op.onClick.call(self);
                        canGo = (result === false) ? false : true;
                    }
                    // 触发其他注册方式的点击事件
                    if (canGo) {
                        this.element.triggerHandler("onClick");
                    }
                }
		    }
	    },
	    disable : function(disabled) {
		    var op = this.options;
		    var selfEl = op._objSelfEl;
		    if (disabled === false) {
			    op._disabled = false;
			    selfEl.removeClass("f-btn-over f-btn-click f-item-disabled");
			    op._objButton.attr("disabled", false);
		    } else {
			    op._disabled = true;
			    selfEl.removeClass("f-btn-over f-btn-click");
			    selfEl.addClass("f-item-disabled");
			    op._objButton.attr("disabled", true);
		    }
	    },
	    setText : function(text) {
		    if (text) {
			    this.options._objButton.html(text);
		    }
	    },
	    isDisabled : function() {
		    return this.options._disabled;
	    },
	    setDisabled : function(disabled) {
		    var op = this.options;
		    var selfEl = op._objSelfEl;
		    if (disabled === false) {
			    op._disabled = false;
			    selfEl.removeClass("f-btn-over f-btn-click f-item-disabled");
			    op._objButton.attr("disabled", false);
		    } else {
			    op._disabled = true;
			    selfEl.removeClass("f-btn-over f-btn-click");
			    selfEl.addClass("f-item-disabled");
			    op._objButton.attr("disabled", true);
		    }
	    },
	  
	    setVisible : function(visible) {
		    var op = this.options;
		    var selfEl = op._objSelfEl;
		    if (visible === false) {
		    	op._objSelfEl.hide();
		    } else {
		    	op._objSelfEl.show();
		    }
	    },
	    setIcons : function(iconCls) {
		    var op = this.options;
		    var selfEl = op._objSelfEl;
		    var btnEl = op._objButton;

		    // 防止重复设置样式
		    if (iconCls == op.iconCls) {
			    return;
		    }

		    // 移除button原有样式
		    if (op.iconCls) {
			    btnEl.removeClass(op.iconCls);
		    }
		    if (!iconCls || $.trim(iconCls) == "") {
			    selfEl.addClass("f-btn-noicon").removeClass("f-btn-text-icon");
			    // add 20130123 hanyin 删除清空样式记录
			    op.iconCls = "";
			    // end add 20130123 hanyin
		    } else {
			    selfEl.removeClass("f-btn-noicon").addClass("f-btn-text-icon");
			    btnEl.addClass(iconCls);
			    // 保存为当前的样式
			    op.iconCls = iconCls;
		    }
	    },
	    setSize : function(w, h) {
		    var selfEl = this.options._objSelfEl;;
		    selfEl.width(w);
		    selfEl.height(h);
	    }
	});

	$.widget("FUI.FSimpleButton", {
	    options : {
	        height : 24,
	        width : 75,
	        onClick : null,
	        _disabled : false
	    },

	    _create : function() {
		    // 初始化ID
		    this.options.id = this.element.attr("id");
		    this.options._disabled = this._getBoxEl().hasClass("f-state-disabled");

		    // 绑定事件
		    this._bindEvent();
	    },

	    _init : function() {
	    },

	    _getBoxEl : function() {
	    	var op = this.options;
	    	var boxEl = op._objBoxEl;
	    	if (!boxEl) {
	    		boxEl = op._objBoxEl = this._getButtonEl().parent().parent();
	    	}
	    	return boxEl;
	    },

	    _getButtonEl : function() {
	    	return this.element;
	    },

	    _bindEvent : function() {
		    var self = this;
		    var op = self.options;
		    var boxEl = self._getBoxEl();
		    var bntEl = self._getButtonEl();

		    boxEl.hover(function() {
		    	if (self.disabled()) {
		    		return;
		    	}
		    	boxEl.addClass("f-state-hover");
			}, function() {
		    	if (self.disabled()) {
		    		return;
		    	}
				boxEl.removeClass("f-state-hover f-state-active");
			}).mousedown(function() {
		    	if (self.disabled()) {
		    		return;
		    	}
				boxEl.addClass("f-state-active");
			}).mouseup(function() {
		    	if (self.disabled()) {
		    		return;
		    	}
				boxEl.removeClass("f-state-active");
			}).click(function() {
				self.click();
			});

		    bntEl.focus(function() {
		    	if (self.disabled()) {
		    		return;
		    	}
		    	boxEl.addClass("f-state-focus");
			}).blur(function() {
		    	if (self.disabled()) {
		    		return;
		    	}
				boxEl.removeClass("f-state-focus");
			});
	    },

	    // 对象销毁方法
	    destroy : function() {
		    // 取消绑定的事件
	    	this._getBoxEl().unbind();
	    	this._getButtonEl().unbind();
	    	this.options._objBoxEl = null;
		    // 调用父类的销毁方法
		    $.Widget.prototype.destroy.call(this);
	    },

	    click : function() {
		    var self = this;
		    var op = self.options;
		    if (!self.disabled()) {
			    // 如果有注册的点击事件，则先调用注册的点击事件
			    var canGo = true;
			    if ($.isFunction(op.onClick)) {
				    // setTimeout(function() {
				    var result = op.onClick.call(self);
				    canGo = (result === false) ? false : true;
				    // }, 0);
			    }
			    // 触发其他注册方式的点击事件
			    if (canGo) {
				    this.element.triggerHandler("onClick");
			    }
		    }
	    },

	    disabled : function(disabled) {
		    var op = this.options;
		    if (arguments.length === 0) {
		    	return op._disabled;
		    }
		    var boxEl = this._getBoxEl();
		    var bntEl = this._getButtonEl();
		    if (disabled === false) {
			    op._disabled = false;
			    boxEl.removeClass("f-state-hover f-state-active f-state-focus f-state-disabled");
			    bntEl.attr("disabled", false);
		    } else {
			    op._disabled = true;
			    boxEl.removeClass("f-state-hover f-state-active");
			    boxEl.addClass("f-state-disabled");
			    bntEl.attr("disabled", true);
		    }
	    },

	    /**
	     * 改变按钮的text属性。
	     * @name FButton#setText
	     * @function
	     * @param text 按钮文本
	     * @example
	     * $('#btn').FButton('setText','按钮text');
	     */
	    setText : function(text) {
		    if (text) {
			    this._getButtonEl().html(text);
		    } else {
			    this._getButtonEl().html("&nbsp;");
		    }
	    }
	});

	$.FUI.FSimpleButton = $.FUI.FSimpleButton || {};
	$.FUI.FSimpleButton.generateHtml = function(op) {
		var id = op.id || $Utils.genId("f-button"); // 0
		var text = op.text || ("Button" + $Utils.UID); // 1
		var width = op.width || "75px"; // 2
		var height = op.height || "22px"; // 3
		var leftIconCls = op.leftIconCls; //4
		var rightIconCls = op.rightIconCls; // 5
		var onClick = op.onClick || ""; // 6
		var tabIndex = op.tabIndex || 0; // 7
		var disabled = op.disabled || false; // 8

		var iWidth = parseInt(width); // 9
		var iHeight = parseInt(height); // 10
		var iLineHeight = iHeight/2 -1; // 11

		var bntStyle = "width:"+iWidth+"px;"; // 12
		bntStyle += "height:"+iHeight+"px;";
		bntStyle += "line-height:"+iHeight+"px;";
		bntStyle += "margin-top:-"+(iLineHeight+2)+"px;";

		var boxStyle = op.style || ""; // 13

		var template = "\
			<div id='{0}-wrapper' style='{13}' class='f-button f-widget f-form-unselectable' onselectstart='return false;'> \
			<div class='f-button-box'  style='width:{9}px;height:{10}px'> \
			   <div class='f-button-t' style='line-height:{iLineHeight}px'>&nbsp;</div> \
			   <button id='{0}' hidefocus='true' class='f-button-text' style='text-align:center;{12}' \
			   	tabIndex={7}'> \
			   	{1} \
			   </button> \
			</div></div>";
    	return $Utils.format(template, id, text, width, height, leftIconCls, rightIconCls, onClick,
    			tabIndex, disabled, iWidth, iHeight, iLineHeight, bntStyle, boxStyle);
	};
})(jQuery);

/**
 * 提示文字固定的数据加载遮盖层
 * 
 * @author 周智星
 *使用方法:打开遮盖 $.iMask.setMask() 关闭遮盖 $.iMask.close();
 * 
 */
(function($){  
        var define = {  
            maskid                : 'jquery_imask',  
            opacity                : 0.8,  
            z                    : 10000,  
            bgcolor                : '#808080',  
            status                : 0,  
            status_info         : '正在请求，请稍后 ...',  
            status_style_info     : ''  
        };  
              
        var op = $.extend(define);  
        function getStatusInfo(){  
            var info;  
            if(op.status_style_info){  
                info = op.status_style_info;  
            }else{  
                info = '<div  style="position: relative; left: 500px; top: 300px;font-size:14px; color:#FFFFFF;"><img src="../../../images/grid-loading.gif" width="16" height="16">' + op.status_info+ '</div>';
            }  
            return info;          
        };
          
        function freshStatusInfo(options){  
            $("#" + op.maskid).html(getStatusInfo());  
        }  
          
        $.iMask = {  
            setMask: function(options){  
                op = $.extend(options);  
                var    div_e = '<div id="' + op.maskid + '">' + getStatusInfo() + '</div>';  
                $(div_e).appendTo(document.body).css({  
                    position: 'absolute',  
                    top: '0px',  
                    left: '0px',  
                    'z-index': op.z,  
                    width: $(document).width(),  
                    height: $(document).height(),  
                    'background-color': op.bgcolor,  
                    opacity: 0  
                }).fadeIn('slow', function(){  
                    $(this).fadeTo('slow', op.opacity);  
                }).click(function(){  
                    freshStatusInfo();  
                    if(op.status != 0){  
                        $(this).fadeTo('slow', 0, function(){  
                            $(this).remove();  
                        });  
                    }  
                });  
            },  
              
            setStatus: function(options){  
                op = $.extend(options);  
            },  
            close: function(){  
                $("#" + op.maskid).remove(); 
            },
              
            callMask: function(){  
                $("#" + op.maskid).click();  
            },  
      
            sleep: function(timeout) {  
                var loop = true;  
                var current = new Date();  
                var now;  
                var cTimestamp = current.getTime();  
                while (loop) {  
                    now = new Date();  
                    nTimestamp = now.getTime();  
                    if (nTimestamp - cTimestamp > timeout) {  
                        loop = false;  
                    }  
                }  
            },  
            freshStatusInfo: freshStatusInfo  
        };  
    })(jQuery);
    
(function($) {
	$.FUI.FToolGroup = $.FUI.FToolGroup || {};
	$.FUI.FToolGroup.generateHtml = function(op) {
		var id = op.id || $Utils.genId("f-toolGroup"); // 0
		var style = op.style || ""; // 1
		var classes = op.classes || ""; // 2
		var width = op.width || "auto"; // 3
		var height = op.height || "auto"; // 4
		var toolAlign = op.toolAlign || "center"; //5
		var toolspacing = op.toolspacing || "2"; // 6
		var toolpadding = op.toolpadding || "0"; // 7
		var nested = ""; // 8
		
		function genItemHtml(item) {
			var html = "<td class='f-tool-cell'>" + item + "</td>"; 
			return html;
		}
		
		var items = op.items;
		for (var i=0; i<items.length; i++) {
			nested += genItemHtml(items[i]);
		}
		
		var template = "\
			<div id='{0}' class='f-toolGroup f-tools-{5} {2}' style='{1}'> \
				<table cellspacing='{6}' cellpadding='{7}' \
						style='height:{4};width:{3};' class='f-toolGroup-ct'> \
					<tbody><tr>{8}</tr> \
					</tbody> \
				</table> \
			</div>\
		";
		return $Utils.format(template, id, style, classes, width, height, 
				toolAlign, toolspacing, toolpadding, nested);
	};

	$.FUI.FButtonGroup = $.FUI.FButtonGroup || {};
	$.FUI.FButtonGroup.generateHtml = function(op) {
		op.id = op.id || $Utils.genId("f-buttonGroup");
		op.classes = (op.classes || "") + " f-buttonGroup ";
		op.toolAlign = op.buttonAlign;
		return $.FUI.FToolGroup.generateHtml(op);
	};
	
})(jQuery);
    
/**
 * 提示文字自定义的数据加载遮盖层
 * 
 * @author 周智星
 *使用方法:打开遮盖 $("body").doMask('正在提交,请稍后...');//提示内容自定义  关闭遮盖 $("body").doUnMask();
 * 
 */
(function($, undefined) {


    var UTILS = window['$Utils'];

    /**
     *  生成遮罩的html机构
     * @param text
     * @param options
     */
    function generateMaskHtml(text, options) {
        var id = options && options.id || 'fui' ;
        var maskBGId = id + '-mask-bg';
        var maskImgId = id + '-mask-img';
        var maskMsgId = id + '-mask-msg';
        var maskArr = [];
        //遮罩背景层
        maskArr.push('<div id="' + maskBGId + '"' + ' class="f-mask-bg"></div>');
        //遮罩层的提示图片以及提示信息
        maskArr.push('<div id="' + maskImgId + '" class="f-mask-img" style="display:none;"><div id="' + maskMsgId + '" class="">');
        maskArr.push(text || window["$i18n"].mask.defaultMsg);
        maskArr.push('</div></div>');
        return maskArr.join('');
    }


    /**
     * 隐藏所有的原生select组件
     */
    function hiddenAllSelectEl() {
        if (window["hasHidden"] === true) {
            return;
        }
        var i = 0;
        var j = 0;
        var es;            //var es = vForm.elements;  //获取表单中所有的元素
        var hiddenArrayList = window['hiddenArrayList'] || [];
        window['hiddenArrayList'] = hiddenArrayList;
        window["hasHidden"] = true;
        var selectEls = $('select');
        var selectLen = selectEls.length;
        for (var i = 0; i < selectLen; i++) {
            var selectDom =selectEls.get(i);
            var selectStyle = selectDom.style ;
            if (selectStyle.display == "none" || selectStyle.display == "block") {
            } else {
                selectStyle.display = "none";
                hiddenArrayList.push(selectDom); //直接将对象的引用保存到链表中
            }
        }
    }

    //回复隐藏的select框
    function showAllSelectEl() {
        if (window["hasHidden"] === false) {
            return;
        }
        //todo 是否真的要隐藏select ，如果有多个遮罩层 处理需要谨慎
        var mask = $("#win-mask-overlay,#dialog-mask-overlay");
        if (mask.length > 0) {
            return;
        }
        window["hasHidden"] = false;
        var hiddenArrayList = window['hiddenArrayList'];

        var length = $.isArray(hiddenArrayList) && hiddenArrayList.length || 0;
        //将隐藏链表中的元素恢复显示
        if (hiddenArrayList != null && hiddenArrayList != false && length > 0) {
            for (var i = 0; i < length; i++) {
                hiddenArrayList[i].style.display = "";   //继续隐藏
            }
        }
        hiddenArrayList = null;
        window['hiddenArrayList'] = null;
    }

    /**
     * ie6下调用 hiddenAllSelectEl方法，隐藏所有原生的select组件
     */
    function hideAllSelect() {
        if ($.browser.msie && ($.browser.version == "6.0")) {
            hiddenAllSelectEl();
        }
    }

    /**
     * ie6下调用 showAllSelectEl方法，隐藏所有原生的select组件
     */
    function showAllSelect() {
        if ($.browser.msie && ($.browser.version == "6.0")) {
            showAllSelectEl();
        }
    }

    //展现body区域的遮罩
    function _showBodyMask(text, maskId, options) {
        var maskBG = $('#' + maskId + '-mask-bg');
        if (maskBG.length == 0) {
            //生成对应的dommask的dom结构。
        	options = options || {};
        	options.id = maskId;
            var maskHtml = generateMaskHtml(text, options);
            $('body').append(maskHtml);
        }
        _resizeBodyMask(text, maskId, options);
    }

    //展现div区域的遮罩
    function _showDivMask(text, maskId, options) {
        var maskBGId = maskId + '-mask-bg';

        var maskBG = $('#' + maskBGId);
        if (maskBG.length == 0) {
            //生成对应的dommask的dom结构。
            var options = {id :maskId};
            var maskHtml = generateMaskHtml(text, options);
            $('body').append(maskHtml);
        }
        _resizeDivMask(text, maskId, options);
    }

    //调整body区域的遮罩
    function _resizeBodyMask(text, maskId, options) {
        //查找遮罩相关的元素
        var maskBG = $('#' + maskId + '-mask-bg');
        var maskImg = $('#' + maskId + '-mask-img');
        var maskMsg = $('#' + maskId + '-mask-msg');

        var isBoxModel = jQuery.support.boxModel;
        var documentElement = document.documentElement;

        //可视区域的宽度
        var w = isBoxModel && documentElement.clientWidth ||document.body.clientWidth;
        //可是区域的高度
        var h = isBoxModel && documentElement.clientHeight ||document.body.clientHeight;
        //滚动条的水平偏移量
        var scrollLeft = isBoxModel && documentElement.scrollLeft || document.body.scrollLeft;
        //滚动条的垂直偏移量
        var scrollTop = isBoxModel && documentElement.scrollTop || document.body.scrollTop;


        //设置背景阴影的宽高
        var bw = (w + scrollLeft) + 'px';
        var bh = (h + scrollTop) + 'px';
        maskBG.css('width', bw);
        maskBG.css('height', bh);


        //设置消息提示信息内容
        maskMsg.html(text);

        //遮罩图片的宽度
        var imgW = maskImg.outerWidth(true);
        //遮罩图片的高度
        var imgH = maskImg.outerHeight(true);

        //设置遮罩图片的相对位置
        var px = ((w - imgW) / 2 + scrollLeft) + 'px';
        var py = ((h - imgH) / 2 + scrollTop) + 'px';
        maskImg.css('left', px);
        maskImg.css('top', py);

        maskBG.css('display', '');
        //设置背景阴影和遮罩图片显现
        if ((options || {})["showImg"] === false) {
        	return;
        }
        maskImg.css('display', '');
    }

    //调整div区域的遮罩
    function _resizeDivMask(text, maskId, options) {

        var element = $('#' + maskId);
        //查找遮罩相关的元素
        var maskBG = $('#' + maskId + '-mask-bg');
        var maskImg = $('#' + maskId + '-mask-img');
        var maskMsg = $('#' + maskId + '-mask-msg');

        //计算所需遮罩的宽度
        var w = element.outerWidth(true);
        //计算所需遮罩的高度
        var h = element.outerHeight(true);
        //滚动条的水平偏移量
        var scrollLeft = element.scrollLeft();
        //滚动条的垂直偏移量
        var scrollTop = element.scrollTop();


        //计算遮罩阴影的宽高
        var bw = w + 'px';
        var bh = h + 'px';
        maskBG.css('width', bw);
        maskBG.css('height', bh);

        //计算并设置遮罩阴影的相对偏移量。
        var offset = element.offset();
        var left = offset.left;
        var top = offset.top;
        maskBG.css('left', left);
        maskBG.css('top', top);

        maskMsg.html(text);

        //计算遮罩图片的宽度
        var imgW = maskImg.outerWidth(true);
        //计算遮罩图片的高度
        var imgH = maskImg.outerHeight(true);

        //计算并设置遮罩图片的偏移量
        var px = (left + (w - imgW) / 2 ) + 'px';
        var py = (top + (h - imgH) / 2 ) + 'px';
        maskImg.css('left', px);
        maskImg.css('top', py);

        maskBG.css('display', '');
        if ((options || {})["showImg"] === false) {
        	return;
        }
        maskImg.css('display', '');
    }

    /**
     * 遮罩某个指定的div
     * @name FMask#doMask
     * @param  text  遮罩提示信息（类型：String）
     * @function
     * @return void
     * @example
     */
    $.fn.doMask = function(text, options) {
        var element = $(this);
        hideAllSelect();
        //遮罩整个页面
        if (element.is('body')) {
            _showBodyMask(text, 'fui', options);
        } else {
            var id = element.attr('id');
            _showDivMask(text, id, options);

        }
    };

    /**
     * 去除某个指定div的遮罩
     * @name FMask#doUnMask
     * @function
     * @return void
     * @exampl
     */
    $.fn.doUnMask = function() {
        var element = $(this);
        showAllSelect();
        //取消整个body区域的遮罩
        if (element.is('body')) {
            var maskBG = element.find('>#fui-mask-bg');
            if (maskBG.length > 0) {
                var maskImg = element.find('>#fui-mask-img');
                maskImg.css('display', 'none');
                maskBG.css('display', 'none');
            }
            showAllSelect();
        } else {
            //取消制定div区域的遮罩
            var id = element.attr('id');
            var maskBGId = id + '-mask-bg';
            var maskImgId = id + '-mask-img';
            var maskBG = $('#' + maskBGId);
            if (maskBG.length > 0) {
                var maskImg = $('#' + maskImgId);
                maskImg.css('display', 'none');
                maskBG.css('display', 'none');
            }
            showAllSelect();
        }
    };
})(jQuery);

(function($) {
	$.widget("FUI.FPopupBox", {
	    options : {
	        width: null,
	        height: null,
	        attach: null,
	        direction: "down,up",
	        offset: {top:300,left:500},
	        position: "absolute",
	        // 如果出现碰撞检测失败，"fit"则尝试自适应展开，"none"则强制采用第一个正确的方向展开
	        collision: "fit",
	        // 显示的动画选项，和jquery的animate函数的方法一致 {styles,speed,easing,callback}
	        // 也可以是jqueryui提供的通用方法比如"fadeOut"、“slideUp”等
	        show : null,
	        // 显示的动画选项，和jquery的animate函数的方法一致 {styles,speed,easing,callback}
	        // 也可以是jqueryui提供的通用方法比如"fadeIn"、“slideDown”等
	        hide : null,
	        
	        _objPopup : null,
	        _isValid : false,
	    	// 当前菜单被打开之后，初始化选项
	    	_curOptions : null
	    },
	    _create : function() {
		    // 初始化ID
		    var ID = this.element.attr("id");
		    var op = this.options;
		    op.id = ID;
		    op._objPopup = $I(ID);
		    if (op._objPopup.size() != 0) {
		    	op._isValid = true;
		    }
	    },
	    _init : function() {
	    },
	    destroy : function() {
	    	var op = this.options;
	    	this.options._curOptions = null;

	    	for (var name in op) {
	    		op[name] = null;
	    	}
			$.Widget.prototype.destroy.call(this);
	    },
	    
	    show : function(op, callback, force) {
	    	if (!this.options._isValid) {
	    		return;
	    	}
	    	op = op || {};
	    	// force true表示忽略组件的默认值，否则会将传入的op与默认值合并
	    	var option = this._uniformOption(op, force);
	    	this.options._curOptions = option;
	    	//{ 20121129 hanyin 将回调放到showOpts中
	    	option.show = $.extend({}, (op.show || {}));
	    	option.show.callback = callback || (op.show || {}).callback;
	    	//} 

	    	var showMode = this._parseShowMode(option);
	    	var result = false;
	    	if (showMode === "ATTACH") {
	    		var attachEl = option.attach;
	    		if (!$Utils.isJQueryObj(option.attach)) { // 如果传入的不是jquery对象，则认为是选择器
		    		attachEl = $(option.attach);
	    		}
	    		if (attachEl.size() == 0) {
	    			return false;
	    		}
		    	// 依附组件相对于document的位置
		    	var attachOffset = attachEl.offset();
		    	// 依附组件的大小
		    	var attachSize = this._calAttachSize(attachEl);
		    	// 外框容器的大小，用于检测碰撞
		    	var containerBox = this._calContainerBox(option.container);
	    		var realOffset = this._calAttachMode(attachOffset, attachSize,
	    				option.size, option.direction, option.offset, containerBox, option.collision);
	    		result = this._showAbsolute(realOffset);
	    	} else if (showMode === "ABSOLUTE") {
		    	// 依附组件相对于document的位置
		    	var attachOffset = {left:option.position.left, top:option.position.top};
		    	// 依附组件的大小
		    	var attachSize = {height:0,width:0};
		    	// 外框容器的大小，用于检测碰撞
		    	var containerBox = this._calContainerBox(option.container);
		    	if (attachOffset.left == "center") {
		    		// x-min = max-(x+lenght) -> x=(max+min-lenght)/2
		    		attachOffset.left = (containerBox.minX + containerBox.maxX - option.size.width)/2;
		    	}
		    	if (attachOffset.top == "center") {
		    		// x-min = max-(x+lenght) -> x=(max+min-lenght)/2
		    		attachOffset.top = (containerBox.minY + containerBox.maxY - option.size.height)/2;
		    	}
	    		var realOffset = this._calAttachMode(attachOffset, attachSize, 
	    				option.size, option.direction, option.offset, containerBox, option.collision);
	    		result = this._showAbsolute(realOffset);
	    	} else if (showMode === "FIXED") {
	    		result = this._calFixedMode(option.size, option.offset);
	    	} else { // 显示在屏幕正中间
	    		result = this._calOtherMode(option);
	    	}
	    	return result;
	    },

	    _calAttachMode : function(attachOffset, attachSize, size, direction, offset, containerBox, collision) {
	    	offset = offset || {left:0,top:0};
	    	direction = direction || ['down', 'up'];
	    	if (direction.length == 0) {
	    		direction = ['down', 'up', "right", "upright", "left", "upleft"];
	    	}

	    	// 遍历所有的方向
	    	var resultDirection = null;
	    	var firstValidDirection = null
	    	var resultPos = null;
	    	for (var i=0; i<direction.length; i++) {
	    		var dir = direction[i].toLowerCase();
	    		var tryFunc = this["_try" + dir];
	    		if ($.isFunction(tryFunc)) {
	    			if (firstValidDirection == null) {
	    				firstValidDirection = dir;
	    			}
	    			var result = tryFunc.call(this, attachOffset, attachSize, size, containerBox);
	    			if (result === false) {
	    				continue;
	    			} else {
	    				resultDirection = dir;
	    				resultPos = result;
	    				break;
	    			}
	    		}
	    	}
	    	// 如果所有的方向都不能满足碰撞检测，则选取第一个有效的方向，如果没有合适的方向，则抛出异常
	    	if (resultDirection == null) {
	    		if (firstValidDirection != null) {
	    			resultDirection = firstValidDirection;
	    			resultPos = this["_cal" + firstValidDirection](attachOffset, attachSize, size, containerBox, collision);
	    	    	if (collision == "fit") {
	    	    		result = this._adjustPos(resultPos, size, containerBox);
	    	    	}
	    		} else {
	    			throw new Error("FPopupBox: no valid direction");
	    		}
	    	}
	    	var result = null;
	    	if (resultPos != null) {
			    var resultOffset = this._parseRealOffset(offset, resultDirection);
			    result = this._calRealOffset(resultPos, resultOffset);
	    	}
	    	return result;
	    },
	    
	    _adjustPos : function(pos, size, containerBox) {
	    	var minX = pos.left;
	    	var minY = pos.top;
	    	var maxX = minX + size.width;
	    	var maxY = minY + size.height;
	    	if (minX < containerBox.minX) {
	    		pos.left = containerBox.minX;
	    	} else if (maxX > containerBox.maxX) {
	    		pos.left = containerBox.maxX - size.width;
	    	}
	    	if (minY < containerBox.minY) {
	    		pos.top = containerBox.minY;
	    	} else if (maxY > containerBox.maxY) {
	    		pos.top = containerBox.maxY - size.height;
	    	}
	    	return pos;
	    },
	    
	    _calRealOffset : function(resultPosition, resultOffset) {
	    	var realOffset = {};
	    	realOffset.left = resultPosition.left + resultOffset.left;
	    	realOffset.top = resultPosition.top + resultOffset.top;
	    	return realOffset;
	    },
	    
	    // 计算容器的大小，返回size对象，包括属性 width和height
	    _calContainerSize : function(el) {
	    	var size = {};
	    	size.width = el.width();
	    	size.height = el.height();
	    	return size;
	    },
	    // 计算容器相对于document的最大最小位置
	    _calContainerBox : function(el) {
	    	var docEl = $(document);
	    	var winEl = $(window);
	    	if (el == null || !$Utils.isJQueryObj(el) || el.size() == 0) {
	    		el = docEl;
	    	}
	    	var box = {};
	    	if (el.get(0).window == window) {
		    	var scrollX = docEl.scrollLeft();
		    	var scrollY = docEl.scrollTop();
		    	box.minX = scrollX;
		    	box.minY = scrollY;
		    	box.maxX = scrollX + winEl.outerWidth();
		    	box.maxY = scrollY + winEl.outerHeight();
	    	} else if (el.get(0) == document) {
	    		var docWidth = docEl.width();
	    		var docHeight = docEl.height();
	    		var winWidth = winEl.width();
	    		var winHeight = winEl.height();
		    	box.minX = 0;
		    	box.minY = 0;
		    	// 适用于document比window小的情况，此时以window为准；出现滚动条则以document为准
		    	box.maxX = docWidth<winWidth?winWidth:docWidth;  
		    	box.maxY = docHeight<winHeight?winHeight:docHeight;
	    	} else {
		    	var elWidth = el.width();
		    	var elHeight = el.height();
		    	var offset = el.offset() || {left:0, top:0};
		    	box.minX = offset.left;
		    	box.minY = offset.top;
		    	box.maxX = offset.left + el.outerWidth();
		    	box.maxY = offset.top + el.outerHeight();
	    	}
	    	return box;
	    },
	    // 将向下的offset转换为相应方向的offset
	    _parseRealOffset : function(offset, direction) {
	    	var calFunc = this["_parseOffset" + direction];
	    	if ($.isFunction(calFunc)) {
	    		return calFunc.call(this, offset);
	    	}
	    	return offset;
	    },
	    
	    _parseOffsetdown : function(offset) {
	    	return offset;
	    },
	    
	    _parseOffsetup : function(offset) {
	    	var result = {};
	    	result.left = offset.left;
	    	result.top = 0-offset.top;
	    	return result;
	    },
	    
	    _parseOffsetright : function(offset) {
	    	return offset;
	    },
	    
	    _parseOffsetleft : function(offset) {
	    	var result = {};
	    	result.left = 0-offset.left;
	    	result.top = offset.top;
	    	return result;
	    },
	    
	    _trydown : function(attachOffset, attachSize, size, containerBox) {
	    	var maxY = attachOffset.top + attachSize.height + size.height;
	    	if (maxY > containerBox.maxY) {
	    		return false;
	    	}
	    	var maxX = attachOffset.left + size.width;
	    	if (maxX > containerBox.maxX) {
	    		return false;
	    	}
	    	return this._caldown(attachOffset, attachSize, size);
	    },
	    
	    _caldown : function(attachOffset, attachSize, size) {
	    	return {top:attachOffset.top+attachSize.height, left:attachOffset.left};
	    },
	    
	    _tryup : function(attachOffset, attachSize, size, containerBox) {
	    	var minY = attachOffset.top - size.height;
	    	if (minY < containerBox.minY) {
	    		return false;
	    	}
	    	var maxX = attachOffset.left + attachSize.width + size.width;
	    	if (maxX > containerBox.maxX) {
	    		return false;
	    	}
	    	return this._calup(attachOffset, attachSize, size);
	    },
	    
	    _calup : function(attachOffset, attachSize, size) {
	    	return {top:attachOffset.top-size.height, left:attachOffset.left};
	    },
	    
	    _tryright : function(attachOffset, attachSize, size, containerBox) {
	    	var maxY = attachOffset.top + size.height;
	    	if (maxY > containerBox.maxY) {
	    		return false;
	    	}
	    	var maxX = attachOffset.left + attachSize.width + size.width;
	    	if (maxX > containerBox.maxX) {
	    		return false;
	    	}
	    	return this._calright(attachOffset, attachSize, size);
	    },
	    
	    _calright : function(attachOffset, attachSize, size) {
	    	return {top:attachOffset.top, left:attachOffset.left+attachSize.width};
	    },
	    
	    _tryleft : function(attachOffset, attachSize, size, containerBox) {
	    	var maxY = attachOffset.top + size.height;
	    	if (maxY > containerBox.maxY) {
	    		return false;
	    	}
	    	var minX = attachOffset.left - size.width;
	    	if (minX < containerBox.minX) {
	    		return false;
	    	}
	    	return this._calleft(attachOffset, attachSize, size);
	    },
	    
	    _calleft : function(attachOffset, attachSize, size) {
	    	return {top:attachOffset.top, left:attachOffset.left-size.width};
	    },
	    
	    _tryupleft : function(attachOffset, attachSize, size, containerBox) {
	    	var minY = attachOffset.top - (size.height-attachSize.height);
	    	if (minY < containerBox.minY) {
	    		return false;
	    	}
	    	var minX = attachOffset.left - size.width;
	    	if (minX < containerBox.minX) {
	    		return false;
	    	}
	    	return this._callupleft(attachOffset, attachSize, size);
	    },
	    
	    _callupleft : function(attachOffset, attachSize, size) {
	    	return {top:(attachOffset.top - (size.height-attachSize.height)), left:attachOffset.left-size.width};
	    },
	    
	    _tryupright : function(attachOffset, attachSize, size, containerBox) {
	    	var minY = attachOffset.top - (size.height-attachSize.height);
	    	if (minY < containerBox.minY) {
	    		return false;
	    	}
	    	var maxX = attachOffset.left + attachSize.width + size.width;
	    	if (maxX > containerBox.maxX) {
	    		return false;
	    	}
	    	return this._callupright(attachOffset, attachSize, size);
	    },
	    
	    _callupright : function(attachOffset, attachSize, size) {
	    	return {top:(attachOffset.top - (size.height-attachSize.height)), left:attachOffset.left + attachSize.width};
	    },
	    
	    _calAttachSize : function(attachEl) {
	    	var size = {};
	    	size.width = attachEl.outerWidth(true);
	    	size.height = attachEl.outerHeight(true);
	    	return size;
	    },

	    _showAbsolute : function(offset) {
		    return this._showAt(offset, "absolute");
	    },
	    
	    // 相对于window的固定布局
	    _calFixedMode : function(size, offset) {
	    	return this._showAt(offset, "fixed");
	    },
	    
	    _showAt : function(offset, position) {
		    var op = this.options;
		    position = position || "absolute";
		    op._objPopup.css("position", position);
		    if (offset.left != null && !isNaN(offset.left)) {
			    op._objPopup.css("left", offset.left + "px");
		    } else {
			    op._objPopup.css("left", "");
		    }
		    if (offset.right != null && !isNaN(offset.right)) {
		    	op._objPopup.css("right", offset.right + "px");
		    } else {
		    	op._objPopup.css("right", "");
		    }
		    if (offset.top != null && !isNaN(offset.top)) {
		    	op._objPopup.css("top", offset.top + "px");
		    } else {
		    	op._objPopup.css("top", "");
		    }
		    if (offset.bottom != null && !isNaN(offset.bottom)) {
		    	op._objPopup.css("bottom", offset.bottom + "px");
		    } else {
		    	op._objPopup.css("bottom", "");
		    }
		    var zIndex = op.zIndex || this._getZIndex();
		    op._objPopup.css("z-index", zIndex);
		    var showOp = this.options._curOptions.show;
		    var callback = null;
		    if (showOp != null && typeof showOp === 'object') {
		    	callback = showOp["callback"];
		    	var effect = showOp["effect"];
		    	var styles = showOp["styles"];
		    	if (effect != null) {
		    		if (this._doEffectAnimate(op._objPopup, effect, showOp) === true) {
		    			return true;
		    		}
		    	} else if (styles != null) {
		    		if (this._doStylesAnimate(op._objPopup, showOp) === true) {
		    			return true;
		    		}
		    	}
		    }
	    	op._objPopup.css("display", "block");
	    	if ($.isFunction(callback)) {
	    		try {
	    			callback.call(this, op);
	    		} catch (e) {
	    			// 忽略
	    			alert(e);
	    		}
	    	}
	    	return true;
	    },
	    
	    _doEffectAnimate : function(el, effect, op) {
	    	var func = el[effect];
	    	if (func != null) {
	    		el.stop(true); // 删除动画队列，避免误操作
		    	if (effect == "fadeTo") {
		    		el[effect](op.duration, op.opacity, op.callback);
		    	} else {
		    		el[effect](op.duration, op.callback);
		    	}
		    	return true;
	    	}
	    },
	    
	    _doStylesAnimate : function(el, op) {
    		el.stop(true); // 删除动画队列，避免误操作
	    	el.animate(op.styles, op.options);
	    	return true;
	    },
	    
	    _getZIndex : function() {
	    	return WinIndex.getInstance().getIndex();
	    },
	    
	    _calOtherMode : function(op) {
	    	var position = op.position;
	    	if (position === "center") {
		    	// 外框容器的大小，用于检测碰撞
		    	var containerSize = this._calContainerSize($(window));
		    	var popupSize = op.size;
		    	var offset = {};
		    	offset.left = (containerSize.width -popupSize.width)/2;
		    	if (offset.left < 0) {
		    		offset.left = 0;
		    	}
		    	offset.top = (containerSize.height -popupSize.height)/2;
		    	if (offset.top < 0) {
		    		offset.top = 0;
		    	}
		    	this._showAt(offset, "fixed");
	    	}
	    },
	    
	    _parseShowMode : function(option) {
	    	if (option.attach != null && $.trim(option.attach).length != 0) {
	    		return "ATTACH"; // 依附于某一个组件
	    	}
	    	if (option.position != null) {
	    		var position = option.position;
	    		if (typeof position=='object' && 
	    				(position.left != null || position.top != null 
	    						|| position.bottom != null || position.right != null)) {
	    			return "ABSOLUTE"; // 绝对布局
	    		}
	    	}
	    	if (option.position === "fixed") {
	    		return "FIXED"; // 固定布局
	    	}
	    	return option.position; //未定义处理方式
	    },

	    _uniformOption : function(op, force) {
	    	op = op || {};
	    	var option = null;
	    	if (force === true) {
	    		option = $.extend(false, {}, op); // 参数浅拷贝
	    	} else {
	    		option = $.extend(false, {}, op);
	    		option = $Utils.applyIf(option, this.options); // 合并默认值
	    	}

	    	option.direction = this._parseDirection(option.direction);
	    	option.offset = this._parseOffset(option.offset);
	    	option.position = this._parsePosition(option.position);
	    	option.size = this._calPopupBoxSize(option);
	    	option.container = this._calContainer(option);
	    	return option;
	    },
	    
	    _calContainer : function(option) {
	    	var container = option.container || $(window);
	    	if ($Utils.isString(container) || !$Utils.isJQueryObj(container)) {
	    		container = $(container);
	    	}
	    	return container;
	    },
	    
	    _calPopupBoxSize : function(option) {
	    	var popupBoxEl = this.options._objPopup;
	    	var size = {};
	    	var width = parseInt(option.width || "");
	    	var height = parseInt(option.height || "");
	    	if (!isNaN(width)) {
	    		size.width = width;
	    	} else {
	    		size.width = popupBoxEl.outerWidth(true);
	    	}
	    	if (!isNaN(height)) {
	    		size.height = height;
	    	} else {
	    		size.height = popupBoxEl.outerHeight(true);
	    	}
	    	return size;
	    },
	    
	    _parseDirection : function(direction) {
	    	if (direction != null) {
	    		if ($.isArray(direction)) { // 数组则直接返回
	    			return direction;
	    		} else { // 如果是字符串则进行逗号分隔
	    			return direction.split(",");
	    		}
	    	}
	    	return null;
	    },
	    
	    _parseOffset : function(offset) {
	    	var result = {left:offset.left,top:offset.top};
	    	if (offset != null) {
	    		if (offset.left != null) {
	    			result.left = parseInt(offset.left);
	    			if (isNaN(result.left)) {
	    				result.left = 0;
	    			}
	    		} else {
	    			result.left = 0;
	    		}
	    		if (offset.top != null && offset.top) {
	    			result.top = parseInt(offset.top);
	    			if (isNaN(result.top)) {
	    				result.top = 0;
	    			}
	    		} else {
	    			result.top = 0;
	    		}
	    		return result;
	    	}
	    	return null;
	    },
	    
	    _parsePosition : function(pos) {
	    	var result = {left:pos.left,top:pos.top};
	    	if (pos != null) {
	    		if (pos.left != null && pos.left != "center") {
	    			result.left = parseInt(pos.left);
	    			if (isNaN(result.left)) {
	    				result.left = 0;
	    			}
	    		}
	    		if (pos.top != null && pos.top != "center") {
	    			result.top = parseInt(pos.top);
	    			if (isNaN(result.top)) {
	    				result.top = 0;
	    			}
	    		}
	    		return result;
	    	}
	    	return null;
	    },
	    
	    hide : function(op, callback, force) {
	    	if (!this.options._isValid) {
	    		return;
	    	}
	    	var hasHide = false;
	    	var hideOp = null;
	    	op = op || {};
	    	if (force === true) {
	    		hideOp = $.extend(false, {}, op); // 参数浅拷贝
	    	} else {
	    		hideOp = $.extend(false, {}, op);
	    		hideOp = $Utils.applyIf(hideOp, this.options._curOptions);
	    	}
	    	hideOp = hideOp.hide || {};
	    	callback = hideOp.callback = callback || hideOp.callback;

		    if (hideOp != null && typeof hideOp === 'object') {
		    	var effect = hideOp["effect"];
		    	var styles = hideOp["styles"];
		    	if (effect != null) {
		    		if (this._doEffectAnimate(this.options._objPopup, effect, hideOp) === true) {
		    			hasHide = true;
		    		}
		    	} else if (styles != null) {
		    		if (this._doStylesAnimate(this.options._objPopup, hideOp) === true) {
		    			hasHide = true;
		    		}
		    	}
		    }
		    if (!hasHide) {
		    	this.options._objPopup.hide();
		    	if ($.isFunction(callback)) {
		    		callback.call(this, op);
		    	}
		    }
	    }
	});
})(jQuery);

//拖拽插件
$.Dragable = function(targetId, widgetId) {
    this.targetId = targetId;
    this.widgetId = widgetId;
    this._init();
    this._bindEvent();

}

$.Dragable.prototype = {

    destroy : function() {

    },

    _init : function() {
        this.targetEl = $('#' + this.targetId);
        this.widgetEl = $('#' + this.widgetId);
        this.mousePos = {};
    },

    _bindEvent : function() {
        this.targetEl.mousedown($.proxy(this.onMousedown, this));
    },

    onMousedown : function(e) {

        var target = e.target;
        var className = target.className;
        if (className.indexOf('f-win-close') == -1 && className.indexOf('f-win-max') == -1 && className.indexOf('f-win-restore') == -1) {
            var w = this.widgetEl.outerWidth(true);
            var h = this.widgetEl.outerHeight(true);
            var position = this.widgetEl.position();
            var documentEl = $(document);
            var bodyEl = $('body');
            bodyEl.closeSelect();
            //生成对应的虚框
            var htmlArr = [];
             htmlArr.push('<div id="dottedLine" class="f-dotted-line" style="');
            var zIndex = parseInt(this.widgetEl.css("zIndex"));
            if (!isNaN(zIndex)) {
            	htmlArr.push('z-index:' + (zIndex+1)+";");
            }
            htmlArr.push('width:' + w + 'px;');
            htmlArr.push('height:' + h + 'px;');
            htmlArr.push('top:' + position.top + 'px;');
            htmlArr.push('left:' + position.left + 'px;');
            htmlArr.push('"></div>');
            bodyEl.append(htmlArr.join(''));

            this.dottedLineEl = $('#dottedLine');
            var pageX = e.pageX,pageY = e.pageY;
            this.mousePos = {pageX:pageX,pageY:pageY};
            documentEl.mousemove($.proxy(this.onMousemove, this));
            documentEl.one('mouseup', $.proxy(this.onMouseup, this));
        }
    },

    onMousemove : function(e) {
        var pageX = e.pageX ,pageY = e.pageY ,dottedLineEl = this.dottedLineEl,mousePos = this.mousePos;
        var ox = pageX - mousePos.pageX,oy = pageY - mousePos.pageY;

        var position = dottedLineEl.position();
        var top = position.top + oy + "px",left = position.left + ox + 'px';

        var dottedLineStyle = dottedLineEl.get(0).style;
        dottedLineStyle.top = top;
        dottedLineStyle.left = left;

        this.mousePos = {pageX:pageX,pageY:pageY};
    },

    onMouseup : function() {
        var documentEl = $(document);
        var bodyEl = $('body');
        var position = this.dottedLineEl.position();
        var widgetStyle = this.widgetEl.get(0).style;

        widgetStyle.top = position.top + 'px';
        widgetStyle.left = position.left + 'px';

        this.dottedLineEl.remove();
        this.dottedLineEl = null;
        bodyEl.openSelect();
        documentEl.unbind('mousemove');
    },

    start: function() {
        this.targetEl.mousedown($.proxy(this.onMousedown, this));
    },

    stop : function() {
        this.targetEl.unbind('mousedown', $.proxy(this.onMousedown, this));
    }
}
