"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _clsx = _interopRequireDefault(require("clsx"));

var _react = _interopRequireDefault(require("react"));

var _reactSwipeable = require("react-swipeable");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _lodash2 = _interopRequireDefault(require("lodash.debounce"));

var _lodash3 = _interopRequireDefault(require("lodash.isequal"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _propTypes = require("prop-types");

var _SVG = _interopRequireDefault(require("./SVG"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var screenChangeEvents = ['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'];
var imageSetType = (0, _propTypes.arrayOf)((0, _propTypes.shape)({
  srcSet: _propTypes.string,
  media: _propTypes.string
}));

function isEnterOrSpaceKey(event) {
  var key = parseInt(event.keyCode || event.which || 0, 10);
  var ENTER_KEY_CODE = 66;
  var SPACEBAR_KEY_CODE = 62;
  return key === ENTER_KEY_CODE || key === SPACEBAR_KEY_CODE;
}

var ImageGallery = /*#__PURE__*/function (_React$Component) {
  _inherits(ImageGallery, _React$Component);

  var _super = _createSuper(ImageGallery);

  // eslint-disable-next-line react/static-property-placement
  // eslint-disable-next-line react/static-property-placement
  function ImageGallery(props) {
    var _this;

    _classCallCheck(this, ImageGallery);

    _this = _super.call(this, props);
    _this.state = {
      currentIndex: props.startIndex,
      thumbsTranslate: 0,
      currentSlideOffset: 0,
      galleryWidth: 0,
      thumbnailsWrapperWidth: 0,
      thumbnailsWrapperHeight: 0,
      isFullscreen: false,
      isPlaying: false
    };
    _this.loadedImages = {};
    _this.imageGallery = _react["default"].createRef();
    _this.thumbnailsWrapper = _react["default"].createRef();
    _this.thumbnails = _react["default"].createRef();
    _this.imageGallerySlideWrapper = _react["default"].createRef(); // bindings

    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleMouseDown = _this.handleMouseDown.bind(_assertThisInitialized(_this));
    _this.handleOnSwiped = _this.handleOnSwiped.bind(_assertThisInitialized(_this));
    _this.handleScreenChange = _this.handleScreenChange.bind(_assertThisInitialized(_this));
    _this.handleSwiping = _this.handleSwiping.bind(_assertThisInitialized(_this));
    _this.onThumbnailMouseLeave = _this.onThumbnailMouseLeave.bind(_assertThisInitialized(_this));
    _this.handleImageError = _this.handleImageError.bind(_assertThisInitialized(_this));
    _this.pauseOrPlay = _this.pauseOrPlay.bind(_assertThisInitialized(_this));
    _this.renderThumbInner = _this.renderThumbInner.bind(_assertThisInitialized(_this));
    _this.renderItem = _this.renderItem.bind(_assertThisInitialized(_this));
    _this.slideLeft = _this.slideLeft.bind(_assertThisInitialized(_this));
    _this.slideRight = _this.slideRight.bind(_assertThisInitialized(_this));
    _this.toggleFullScreen = _this.toggleFullScreen.bind(_assertThisInitialized(_this));
    _this.togglePlay = _this.togglePlay.bind(_assertThisInitialized(_this)); // Used to update the throttle if slideDuration changes

    _this.unthrottledSlideToIndex = _this.slideToIndex;
    _this.slideToIndex = (0, _lodash["default"])(_this.unthrottledSlideToIndex, props.slideDuration, {
      trailing: false
    });

    if (props.lazyLoad) {
      _this.lazyLoaded = [];
    }

    return _this;
  }

  _createClass(ImageGallery, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var autoPlay = this.props.autoPlay;

      if (autoPlay) {
        this.play();
      }

      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('mousedown', this.handleMouseDown);
      this.initResizeObserver(this.imageGallerySlideWrapper);
      this.addScreenChangeEvent();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props = this.props,
          items = _this$props.items,
          lazyLoad = _this$props.lazyLoad,
          slideDuration = _this$props.slideDuration,
          startIndex = _this$props.startIndex,
          thumbnailPosition = _this$props.thumbnailPosition,
          showThumbnails = _this$props.showThumbnails;
      var currentIndex = this.state.currentIndex;
      var itemsSizeChanged = prevProps.items.length !== items.length;
      var itemsChanged = !(0, _lodash3["default"])(prevProps.items, items);
      var startIndexUpdated = prevProps.startIndex !== startIndex;
      var thumbnailsPositionChanged = prevProps.thumbnailPosition !== thumbnailPosition;
      var showThumbnailsChanged = prevProps.showThumbnails !== showThumbnails;

      if (thumbnailsPositionChanged) {
        // re-initialize resizeObserver because slides was unmounted and mounted again
        this.removeResizeObserver();
        this.initResizeObserver(this.imageGallerySlideWrapper);
      }

      if (itemsSizeChanged || showThumbnailsChanged) {
        this.handleResize();
      }

      if (prevState.currentIndex !== currentIndex) {
        this.slideThumbnailBar(prevState.currentIndex);
      } // if slideDuration changes, update slideToIndex throttle


      if (prevProps.slideDuration !== slideDuration) {
        this.slideToIndex = (0, _lodash["default"])(this.unthrottledSlideToIndex, slideDuration, {
          trailing: false
        });
      }

      if (lazyLoad && (!prevProps.lazyLoad || itemsChanged)) {
        this.lazyLoaded = [];
      }

      if (startIndexUpdated || itemsChanged) {
        // TODO: this should be fix/removed if all it is doing
        // is resetting the gallery currentIndext state
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          currentIndex: startIndex
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('mousedown', this.handleMouseDown);
      this.removeScreenChangeEvent();
      this.removeResizeObserver();

      if (this.playPauseIntervalId) {
        window.clearInterval(this.playPauseIntervalId);
        this.playPauseIntervalId = null;
      }

      if (this.transitionTimer) {
        window.clearTimeout(this.transitionTimer);
      }
    }
  }, {
    key: "onSliding",
    value: function onSliding() {
      var _this2 = this;

      var _this$state = this.state,
          currentIndex = _this$state.currentIndex,
          isTransitioning = _this$state.isTransitioning;
      var _this$props2 = this.props,
          onSlide = _this$props2.onSlide,
          slideDuration = _this$props2.slideDuration;
      this.transitionTimer = window.setTimeout(function () {
        if (isTransitioning) {
          _this2.setState({
            isTransitioning: !isTransitioning
          });

          if (onSlide) {
            onSlide(currentIndex);
          }
        }
      }, slideDuration + 50);
    }
  }, {
    key: "onThumbnailClick",
    value: function onThumbnailClick(event, index) {
      var onThumbnailClick = this.props.onThumbnailClick;
      this.slideToIndex(index, event);

      if (onThumbnailClick) {
        onThumbnailClick(event, index);
      }
    }
  }, {
    key: "onThumbnailMouseOver",
    value: function onThumbnailMouseOver(event, index) {
      var _this3 = this;

      if (this.thumbnailMouseOverTimer) {
        window.clearTimeout(this.thumbnailMouseOverTimer);
        this.thumbnailMouseOverTimer = null;
      }

      this.thumbnailMouseOverTimer = window.setTimeout(function () {
        _this3.slideToIndex(index);

        _this3.pause();
      }, 300);
    }
  }, {
    key: "onThumbnailMouseLeave",
    value: function onThumbnailMouseLeave() {
      if (this.thumbnailMouseOverTimer) {
        var autoPlay = this.props.autoPlay;
        window.clearTimeout(this.thumbnailMouseOverTimer);
        this.thumbnailMouseOverTimer = null;

        if (autoPlay) {
          this.play();
        }
      }
    }
  }, {
    key: "setScrollDirection",
    value: function setScrollDirection(dir) {
      var _this$state2 = this.state,
          scrollingUpDown = _this$state2.scrollingUpDown,
          scrollingLeftRight = _this$state2.scrollingLeftRight;

      if (!scrollingUpDown && !scrollingLeftRight) {
        if (dir === _reactSwipeable.LEFT || dir === _reactSwipeable.RIGHT) {
          this.setState({
            scrollingLeftRight: true
          });
        } else {
          this.setState({
            scrollingUpDown: true
          });
        }
      }
    }
  }, {
    key: "setThumbsTranslate",
    value: function setThumbsTranslate(thumbsTranslate) {
      this.setState({
        thumbsTranslate: thumbsTranslate
      });
    }
  }, {
    key: "setModalFullscreen",
    value: function setModalFullscreen(state) {
      var onScreenChange = this.props.onScreenChange;
      this.setState({
        modalFullscreen: state
      }); // manually call because browser does not support screenchange events

      if (onScreenChange) {
        onScreenChange(state);
      }
    }
  }, {
    key: "getThumbsTranslate",
    value: function getThumbsTranslate(indexDifference) {
      var _this$props3 = this.props,
          disableThumbnailScroll = _this$props3.disableThumbnailScroll,
          items = _this$props3.items;
      var _this$state3 = this.state,
          thumbnailsWrapperWidth = _this$state3.thumbnailsWrapperWidth,
          thumbnailsWrapperHeight = _this$state3.thumbnailsWrapperHeight;
      var totalScroll;
      var thumbElement = this.thumbnails && this.thumbnails.current;
      if (disableThumbnailScroll) return 0;

      if (thumbElement) {
        // total scroll required to see the last thumbnail
        if (this.isThumbnailVertical()) {
          if (thumbElement.scrollHeight <= thumbnailsWrapperHeight) {
            return 0;
          }

          totalScroll = thumbElement.scrollHeight - thumbnailsWrapperHeight;
        } else {
          if (thumbElement.scrollWidth <= thumbnailsWrapperWidth || thumbnailsWrapperWidth <= 0) {
            return 0;
          }

          totalScroll = thumbElement.scrollWidth - thumbnailsWrapperWidth;
        } // scroll-x required per index change


        var perIndexScroll = totalScroll / (items.length - 1);
        return indexDifference * perIndexScroll;
      }

      return 0;
    }
  }, {
    key: "getAlignmentClassName",
    value: function getAlignmentClassName(index) {
      // Necessary for lazing loading
      var currentIndex = this.state.currentIndex;
      var _this$props4 = this.props,
          infinite = _this$props4.infinite,
          items = _this$props4.items;
      var alignment = '';
      var leftClassName = 'left';
      var centerClassName = 'center';
      var rightClassName = 'right';

      switch (index) {
        case currentIndex - 1:
          alignment = " ".concat(leftClassName);
          break;

        case currentIndex:
          alignment = " ".concat(centerClassName);
          break;

        case currentIndex + 1:
          alignment = " ".concat(rightClassName);
          break;

        default:
          break;
      }

      if (items.length >= 3 && infinite) {
        if (index === 0 && currentIndex === items.length - 1) {
          // set first slide as right slide if were sliding right from last slide
          alignment = " ".concat(rightClassName);
        } else if (index === items.length - 1 && currentIndex === 0) {
          // set last slide as left slide if were sliding left from first slide
          alignment = " ".concat(leftClassName);
        }
      }

      return alignment;
    }
  }, {
    key: "getTranslateXForTwoSlide",
    value: function getTranslateXForTwoSlide(index) {
      // For taking care of infinite swipe when there are only two slides
      var _this$state4 = this.state,
          currentIndex = _this$state4.currentIndex,
          currentSlideOffset = _this$state4.currentSlideOffset,
          previousIndex = _this$state4.previousIndex;
      var indexChanged = currentIndex !== previousIndex;
      var firstSlideWasPrevSlide = index === 0 && previousIndex === 0;
      var secondSlideWasPrevSlide = index === 1 && previousIndex === 1;
      var firstSlideIsNextSlide = index === 0 && currentIndex === 1;
      var secondSlideIsNextSlide = index === 1 && currentIndex === 0;
      var swipingEnded = currentSlideOffset === 0;
      var baseTranslateX = -100 * currentIndex;
      var translateX = baseTranslateX + index * 100 + currentSlideOffset; // keep track of user swiping direction
      // important to understand how to translateX based on last direction

      if (currentSlideOffset > 0) {
        this.direction = 'left';
      } else if (currentSlideOffset < 0) {
        this.direction = 'right';
      } // when swiping between two slides make sure the next and prev slides
      // are on both left and right


      if (secondSlideIsNextSlide && currentSlideOffset > 0) {
        // swiping right
        translateX = -100 + currentSlideOffset;
      }

      if (firstSlideIsNextSlide && currentSlideOffset < 0) {
        // swiping left
        translateX = 100 + currentSlideOffset;
      }

      if (indexChanged) {
        // when indexChanged move the slide to the correct side
        if (firstSlideWasPrevSlide && swipingEnded && this.direction === 'left') {
          translateX = 100;
        } else if (secondSlideWasPrevSlide && swipingEnded && this.direction === 'right') {
          translateX = -100;
        }
      } else {
        // keep the slide on the correct side if the swipe was not successful
        if (secondSlideIsNextSlide && swipingEnded && this.direction === 'left') {
          translateX = -100;
        }

        if (firstSlideIsNextSlide && swipingEnded && this.direction === 'right') {
          translateX = 100;
        }
      }

      return translateX;
    }
  }, {
    key: "getThumbnailBarHeight",
    value: function getThumbnailBarHeight() {
      if (this.isThumbnailVertical()) {
        var gallerySlideWrapperHeight = this.state.gallerySlideWrapperHeight;
        return {
          height: gallerySlideWrapperHeight
        };
      }

      return {};
    }
  }, {
    key: "getSlideStyle",
    value: function getSlideStyle(index) {
      var _this$state5 = this.state,
          currentIndex = _this$state5.currentIndex,
          currentSlideOffset = _this$state5.currentSlideOffset,
          slideStyle = _this$state5.slideStyle;
      var _this$props5 = this.props,
          infinite = _this$props5.infinite,
          items = _this$props5.items,
          useTranslate3D = _this$props5.useTranslate3D,
          isRTL = _this$props5.isRTL;
      var baseTranslateX = -100 * currentIndex;
      var totalSlides = items.length - 1; // calculates where the other slides belong based on currentIndex
      // if it is RTL the base line should be reversed

      var translateX = (baseTranslateX + index * 100) * (isRTL ? -1 : 1) + currentSlideOffset;

      if (infinite && items.length > 2) {
        if (currentIndex === 0 && index === totalSlides) {
          // make the last slide the slide before the first
          // if it is RTL the base line should be reversed
          translateX = -100 * (isRTL ? -1 : 1) + currentSlideOffset;
        } else if (currentIndex === totalSlides && index === 0) {
          // make the first slide the slide after the last
          // if it is RTL the base line should be reversed
          translateX = 100 * (isRTL ? -1 : 1) + currentSlideOffset;
        }
      } // Special case when there are only 2 items with infinite on


      if (infinite && items.length === 2) {
        translateX = this.getTranslateXForTwoSlide(index);
      }

      var translate = "translate(".concat(translateX, "%, 0)");

      if (useTranslate3D) {
        translate = "translate3d(".concat(translateX, "%, 0, 0)");
      }

      return _objectSpread({
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        transform: translate
      }, slideStyle);
    }
  }, {
    key: "getCurrentIndex",
    value: function getCurrentIndex() {
      var currentIndex = this.state.currentIndex;
      return currentIndex;
    }
  }, {
    key: "getThumbnailStyle",
    value: function getThumbnailStyle() {
      var translate;
      var _this$props6 = this.props,
          useTranslate3D = _this$props6.useTranslate3D,
          isRTL = _this$props6.isRTL;
      var thumbsTranslate = this.state.thumbsTranslate;
      var verticalTranslateValue = isRTL ? thumbsTranslate * -1 : thumbsTranslate;

      if (this.isThumbnailVertical()) {
        translate = "translate(0, ".concat(thumbsTranslate, "px)");

        if (useTranslate3D) {
          translate = "translate3d(0, ".concat(thumbsTranslate, "px, 0)");
        }
      } else {
        translate = "translate(".concat(verticalTranslateValue, "px, 0)");

        if (useTranslate3D) {
          translate = "translate3d(".concat(verticalTranslateValue, "px, 0, 0)");
        }
      }

      return {
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        transform: translate
      };
    }
  }, {
    key: "getSlideItems",
    value: function getSlideItems() {
      var _this4 = this;

      var currentIndex = this.state.currentIndex;
      var _this$props7 = this.props,
          infinite = _this$props7.infinite,
          items = _this$props7.items,
          slideOnThumbnailOver = _this$props7.slideOnThumbnailOver,
          onClick = _this$props7.onClick,
          lazyLoad = _this$props7.lazyLoad,
          onTouchMove = _this$props7.onTouchMove,
          onTouchEnd = _this$props7.onTouchEnd,
          onTouchStart = _this$props7.onTouchStart,
          onMouseOver = _this$props7.onMouseOver,
          onMouseLeave = _this$props7.onMouseLeave,
          renderItem = _this$props7.renderItem,
          renderThumbInner = _this$props7.renderThumbInner,
          showThumbnails = _this$props7.showThumbnails,
          showBullets = _this$props7.showBullets;
      var slides = [];
      var thumbnails = [];
      var bullets = [];
      items.forEach(function (item, index) {
        var alignment = _this4.getAlignmentClassName(index);

        var originalClass = item.originalClass ? " ".concat(item.originalClass) : '';
        var thumbnailClass = item.thumbnailClass ? " ".concat(item.thumbnailClass) : '';
        var handleRenderItem = item.renderItem || renderItem || _this4.renderItem;
        var handleRenderThumbInner = item.renderThumbInner || renderThumbInner || _this4.renderThumbInner;
        var showItem = !lazyLoad || alignment || _this4.lazyLoaded[index];

        if (showItem && lazyLoad && !_this4.lazyLoaded[index]) {
          _this4.lazyLoaded[index] = true;
        }

        var slideStyle = _this4.getSlideStyle(index);

        var slide = /*#__PURE__*/_react["default"].createElement("div", {
          "aria-label": "Slide ".concat(index + 1),
          "aria-hidden": currentIndex !== index ? 'true' : 'false' // eslint-disable-next-line react/no-array-index-key
          ,
          key: "slide-".concat(item.original, "-").concat(index),
          tabIndex: "-1",
          className: "image-gallery-slide ".concat(alignment, " ").concat(originalClass),
          style: slideStyle,
          onClick: onClick,
          onKeyUp: _this4.handleSlideKeyUp,
          onTouchMove: onTouchMove,
          onTouchEnd: onTouchEnd,
          onTouchStart: onTouchStart,
          onMouseOver: onMouseOver,
          onFocus: onMouseOver,
          onMouseLeave: onMouseLeave,
          role: "button"
        }, showItem ? handleRenderItem(item) : /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            height: '100%'
          }
        }));

        if (infinite) {
          // don't add some slides while transitioning to avoid background transitions
          if (_this4.shouldPushSlideOnInfiniteMode(index)) {
            slides.push(slide);
          }
        } else {
          slides.push(slide);
        }

        if (showThumbnails) {
          var igThumbnailClass = (0, _clsx["default"])('image-gallery-thumbnail', thumbnailClass, {
            active: currentIndex === index
          });
          thumbnails.push( /*#__PURE__*/_react["default"].createElement("button", {
            // eslint-disable-next-line react/no-array-index-key
            key: "thumbnail-".concat(item.original, "-").concat(index),
            type: "button",
            tabIndex: "0",
            "aria-pressed": currentIndex === index ? 'true' : 'false',
            "aria-label": "Go to Slide ".concat(index + 1),
            className: igThumbnailClass,
            onMouseLeave: slideOnThumbnailOver ? _this4.onThumbnailMouseLeave : null,
            onMouseOver: function onMouseOver(event) {
              return _this4.handleThumbnailMouseOver(event, index);
            },
            onFocus: function onFocus(event) {
              return _this4.handleThumbnailMouseOver(event, index);
            },
            onKeyUp: function onKeyUp(event) {
              return _this4.handleThumbnailKeyUp(event, index);
            },
            onClick: function onClick(event) {
              return _this4.onThumbnailClick(event, index);
            }
          }, handleRenderThumbInner(item)));
        }

        if (showBullets) {
          // generate bullet elements and store them in array
          var bulletOnClick = function bulletOnClick(event) {
            if (item.bulletOnClick) {
              item.bulletOnClick({
                item: item,
                itemIndex: index,
                currentIndex: currentIndex
              });
            }

            return _this4.slideToIndex.call(_this4, index, event);
          };

          var igBulletClass = (0, _clsx["default"])('image-gallery-bullet', item.bulletClass, {
            active: currentIndex === index
          });
          bullets.push( /*#__PURE__*/_react["default"].createElement("button", {
            type: "button" // eslint-disable-next-line react/no-array-index-key
            ,
            key: "bullet-".concat(item.original, "-").concat(index),
            className: igBulletClass,
            onClick: bulletOnClick,
            "aria-pressed": currentIndex === index ? 'true' : 'false',
            "aria-label": "Go to Slide ".concat(index + 1)
          }));
        }
      });
      return {
        slides: slides,
        thumbnails: thumbnails,
        bullets: bullets
      };
    }
  }, {
    key: "ignoreIsTransitioning",
    value: function ignoreIsTransitioning() {
      /*
        Ignore isTransitioning because were not going to sibling slides
        e.g. center to left or center to right
      */
      var items = this.props.items;
      var _this$state6 = this.state,
          previousIndex = _this$state6.previousIndex,
          currentIndex = _this$state6.currentIndex;
      var totalSlides = items.length - 1; // we want to show the in between slides transition

      var slidingMoreThanOneSlideLeftOrRight = Math.abs(previousIndex - currentIndex) > 1;
      var notGoingFromFirstToLast = !(previousIndex === 0 && currentIndex === totalSlides);
      var notGoingFromLastToFirst = !(previousIndex === totalSlides && currentIndex === 0);
      return slidingMoreThanOneSlideLeftOrRight && notGoingFromFirstToLast && notGoingFromLastToFirst;
    }
  }, {
    key: "isFirstOrLastSlide",
    value: function isFirstOrLastSlide(index) {
      var items = this.props.items;
      var totalSlides = items.length - 1;
      var isLastSlide = index === totalSlides;
      var isFirstSlide = index === 0;
      return isLastSlide || isFirstSlide;
    }
  }, {
    key: "slideIsTransitioning",
    value: function slideIsTransitioning(index) {
      /*
      returns true if the gallery is transitioning and the index is not the
      previous or currentIndex
      */
      var _this$state7 = this.state,
          isTransitioning = _this$state7.isTransitioning,
          previousIndex = _this$state7.previousIndex,
          currentIndex = _this$state7.currentIndex;
      var indexIsNotPreviousOrNextSlide = !(index === previousIndex || index === currentIndex);
      return isTransitioning && indexIsNotPreviousOrNextSlide;
    }
  }, {
    key: "shouldPushSlideOnInfiniteMode",
    value: function shouldPushSlideOnInfiniteMode(index) {
      /*
        Push (show) slide if slide is the current slide and the next slide
        OR
        The slide is going more than one slide left or right, but not going from
        first to last and not going from last to first
         Edge case:
        If you go to the first or last slide, when they're
        not left, or right of each other they will try to catch up in the background
        so unless were going from first to last or vice versa we don't want the first
        or last slide to show up during the transition
      */
      return !this.slideIsTransitioning(index) || this.ignoreIsTransitioning() && !this.isFirstOrLastSlide(index);
    }
  }, {
    key: "slideThumbnailBar",
    value: function slideThumbnailBar(previousIndex) {
      var _this$state8 = this.state,
          thumbsTranslate = _this$state8.thumbsTranslate,
          currentIndex = _this$state8.currentIndex;

      if (currentIndex === 0) {
        this.setThumbsTranslate(0);
      } else {
        var indexDifference = Math.abs(previousIndex - currentIndex);
        var scroll = this.getThumbsTranslate(indexDifference);

        if (scroll > 0) {
          if (previousIndex < currentIndex) {
            this.setThumbsTranslate(thumbsTranslate - scroll);
          } else if (previousIndex > currentIndex) {
            this.setThumbsTranslate(thumbsTranslate + scroll);
          }
        }
      }
    }
  }, {
    key: "canSlide",
    value: function canSlide() {
      var items = this.props.items;
      return items.length >= 2;
    }
  }, {
    key: "canSlideLeft",
    value: function canSlideLeft() {
      var _this$props8 = this.props,
          infinite = _this$props8.infinite,
          isRTL = _this$props8.isRTL;
      return infinite || (isRTL ? this.canSlideNext() : this.canSlidePrevious());
    }
  }, {
    key: "canSlideRight",
    value: function canSlideRight() {
      var _this$props9 = this.props,
          infinite = _this$props9.infinite,
          isRTL = _this$props9.isRTL;
      return infinite || (isRTL ? this.canSlidePrevious() : this.canSlideNext());
    }
  }, {
    key: "canSlidePrevious",
    value: function canSlidePrevious() {
      var currentIndex = this.state.currentIndex;
      return currentIndex > 0;
    }
  }, {
    key: "canSlideNext",
    value: function canSlideNext() {
      var currentIndex = this.state.currentIndex;
      var items = this.props.items;
      return currentIndex < items.length - 1;
    }
  }, {
    key: "handleSwiping",
    value: function handleSwiping(_ref) {
      var event = _ref.event,
          absX = _ref.absX,
          dir = _ref.dir;
      var _this$props10 = this.props,
          preventDefaultTouchmoveEvent = _this$props10.preventDefaultTouchmoveEvent,
          disableSwipe = _this$props10.disableSwipe,
          stopPropagation = _this$props10.stopPropagation;
      var _this$state9 = this.state,
          galleryWidth = _this$state9.galleryWidth,
          isTransitioning = _this$state9.isTransitioning,
          scrollingUpDown = _this$state9.scrollingUpDown,
          scrollingLeftRight = _this$state9.scrollingLeftRight;
      if (disableSwipe) return;
      var swipingTransitionDuration = this.props.swipingTransitionDuration;
      this.setScrollDirection(dir);
      if (stopPropagation) event.stopPropagation();

      if ((preventDefaultTouchmoveEvent || scrollingLeftRight) && event.cancelable) {
        event.preventDefault();
      }

      if (!isTransitioning && !scrollingUpDown) {
        var side = dir === _reactSwipeable.RIGHT ? 1 : -1;
        var currentSlideOffset = absX / galleryWidth * 100;

        if (Math.abs(currentSlideOffset) >= 100) {
          currentSlideOffset = 100;
        }

        var swipingTransition = {
          transition: "transform ".concat(swipingTransitionDuration, "ms ease-out")
        };
        this.setState({
          currentSlideOffset: side * currentSlideOffset,
          slideStyle: swipingTransition
        });
      } else {
        // don't move the slide
        this.setState({
          currentSlideOffset: 0
        });
      }
    }
  }, {
    key: "sufficientSwipe",
    value: function sufficientSwipe() {
      var currentSlideOffset = this.state.currentSlideOffset;
      var swipeThreshold = this.props.swipeThreshold;
      return Math.abs(currentSlideOffset) > swipeThreshold;
    }
  }, {
    key: "handleOnSwiped",
    value: function handleOnSwiped(_ref2) {
      var event = _ref2.event,
          dir = _ref2.dir,
          velocity = _ref2.velocity;
      var _this$props11 = this.props,
          disableSwipe = _this$props11.disableSwipe,
          stopPropagation = _this$props11.stopPropagation,
          flickThreshold = _this$props11.flickThreshold;
      var _this$state10 = this.state,
          scrollingUpDown = _this$state10.scrollingUpDown,
          scrollingLeftRight = _this$state10.scrollingLeftRight;
      if (disableSwipe) return;
      var isRTL = this.props.isRTL;
      if (stopPropagation) event.stopPropagation();

      if (scrollingUpDown) {
        // user stopped scrollingUpDown
        this.setState({
          scrollingUpDown: false
        });
      }

      if (scrollingLeftRight) {
        // user stopped scrollingLeftRight
        this.setState({
          scrollingLeftRight: false
        });
      }

      if (!scrollingUpDown) {
        // don't swipe if user is scrolling
        // if it is RTL the direction is reversed
        var swipeDirection = (dir === _reactSwipeable.LEFT ? 1 : -1) * (isRTL ? -1 : 1);
        var isFlick = velocity > flickThreshold;
        this.handleOnSwipedTo(swipeDirection, isFlick);
      }
    }
  }, {
    key: "handleOnSwipedTo",
    value: function handleOnSwipedTo(swipeDirection, isFlick) {
      var _this$state11 = this.state,
          currentIndex = _this$state11.currentIndex,
          isTransitioning = _this$state11.isTransitioning;
      var slideTo = currentIndex;

      if ((this.sufficientSwipe() || isFlick) && !isTransitioning) {
        // slideto the next/prev slide
        slideTo += swipeDirection;
      } // If we can't swipe left or right, stay in the current index (noop)


      if (swipeDirection === -1 && !this.canSlideLeft() || swipeDirection === 1 && !this.canSlideRight()) {
        slideTo = currentIndex;
      }

      this.unthrottledSlideToIndex(slideTo);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown() {
      // keep track of mouse vs keyboard usage for a11y
      this.imageGallery.current.classList.add('image-gallery-using-mouse');
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      var _this$props12 = this.props,
          disableKeyDown = _this$props12.disableKeyDown,
          useBrowserFullscreen = _this$props12.useBrowserFullscreen;
      var isFullscreen = this.state.isFullscreen; // keep track of mouse vs keyboard usage for a11y

      this.imageGallery.current.classList.remove('image-gallery-using-mouse');
      if (disableKeyDown) return;
      var LEFT_ARROW = 37;
      var RIGHT_ARROW = 39;
      var ESC_KEY = 27;
      var key = parseInt(event.keyCode || event.which || 0, 10);

      switch (key) {
        case LEFT_ARROW:
          if (this.canSlideLeft() && !this.playPauseIntervalId) {
            this.slideLeft(event);
          }

          break;

        case RIGHT_ARROW:
          if (this.canSlideRight() && !this.playPauseIntervalId) {
            this.slideRight(event);
          }

          break;

        case ESC_KEY:
          if (isFullscreen && !useBrowserFullscreen) {
            this.exitFullScreen();
          }

          break;

        default:
          break;
      }
    }
  }, {
    key: "handleImageError",
    value: function handleImageError(event) {
      var onErrorImageURL = this.props.onErrorImageURL;

      if (onErrorImageURL && event.target.src.indexOf(onErrorImageURL) === -1) {
        /* eslint-disable no-param-reassign */
        event.target.src = onErrorImageURL;
        /* eslint-enable no-param-reassign */
      }
    }
  }, {
    key: "removeResizeObserver",
    value: function removeResizeObserver() {
      if (this.resizeObserver && this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current) {
        this.resizeObserver.unobserve(this.imageGallerySlideWrapper.current);
      }
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      var currentIndex = this.state.currentIndex;

      if (this.imageGallery && this.imageGallery.current) {
        this.setState({
          galleryWidth: this.imageGallery.current.offsetWidth
        });
      }

      if (this.imageGallerySlideWrapper && this.imageGallerySlideWrapper.current) {
        this.setState({
          gallerySlideWrapperHeight: this.imageGallerySlideWrapper.current.offsetHeight
        });
      }

      if (this.thumbnailsWrapper && this.thumbnailsWrapper.current) {
        if (this.isThumbnailVertical()) {
          this.setState({
            thumbnailsWrapperHeight: this.thumbnailsWrapper.current.offsetHeight
          });
        } else {
          this.setState({
            thumbnailsWrapperWidth: this.thumbnailsWrapper.current.offsetWidth
          });
        }
      } // Adjust thumbnail container when thumbnail width or height is adjusted


      this.setThumbsTranslate(-this.getThumbsTranslate(currentIndex));
    }
  }, {
    key: "initResizeObserver",
    value: function initResizeObserver(element) {
      var _this5 = this;

      this.resizeObserver = new _resizeObserverPolyfill["default"]((0, _lodash2["default"])(function (entries) {
        if (!entries) return;
        entries.forEach(function () {
          _this5.handleResize();
        });
      }, 300));
      this.resizeObserver.observe(element.current);
    }
  }, {
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      var isFullscreen = this.state.isFullscreen;

      if (isFullscreen) {
        this.exitFullScreen();
      } else {
        this.fullScreen();
      }
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (this.playPauseIntervalId) {
        this.pause();
      } else {
        this.play();
      }
    }
  }, {
    key: "handleScreenChange",
    value: function handleScreenChange() {
      /*
        handles screen change events that the browser triggers e.g. esc key
      */
      var _this$props13 = this.props,
          onScreenChange = _this$props13.onScreenChange,
          useBrowserFullscreen = _this$props13.useBrowserFullscreen;
      var fullScreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement; // check if screenchange element is the gallery

      var isFullscreen = this.imageGallery.current === fullScreenElement;
      if (onScreenChange) onScreenChange(isFullscreen);
      if (useBrowserFullscreen) this.setState({
        isFullscreen: isFullscreen
      });
    }
  }, {
    key: "slideToIndex",
    value: function slideToIndex(index, event) {
      var _this$state12 = this.state,
          currentIndex = _this$state12.currentIndex,
          isTransitioning = _this$state12.isTransitioning;
      var _this$props14 = this.props,
          items = _this$props14.items,
          slideDuration = _this$props14.slideDuration,
          onBeforeSlide = _this$props14.onBeforeSlide;

      if (!isTransitioning) {
        if (event) {
          if (this.playPauseIntervalId) {
            // user triggered event while ImageGallery is playing, reset interval
            this.pause(false);
            this.play(false);
          }
        }

        var slideCount = items.length - 1;
        var nextIndex = index;

        if (index < 0) {
          nextIndex = slideCount;
        } else if (index > slideCount) {
          nextIndex = 0;
        }

        if (onBeforeSlide && nextIndex !== currentIndex) {
          onBeforeSlide(nextIndex);
        }

        this.setState({
          previousIndex: currentIndex,
          currentIndex: nextIndex,
          isTransitioning: nextIndex !== currentIndex,
          currentSlideOffset: 0,
          slideStyle: {
            transition: "all ".concat(slideDuration, "ms ease-out")
          }
        }, this.onSliding);
      }
    }
  }, {
    key: "slideLeft",
    value: function slideLeft(event) {
      var isRTL = this.props.isRTL;

      if (isRTL) {
        this.slideNext(event);
      } else {
        this.slidePrevious(event);
      }
    }
  }, {
    key: "slideRight",
    value: function slideRight(event) {
      var isRTL = this.props.isRTL;

      if (isRTL) {
        this.slidePrevious(event);
      } else {
        this.slideNext(event);
      }
    }
  }, {
    key: "slidePrevious",
    value: function slidePrevious(event) {
      var _this6 = this;

      var _this$state13 = this.state,
          currentIndex = _this$state13.currentIndex,
          currentSlideOffset = _this$state13.currentSlideOffset,
          isTransitioning = _this$state13.isTransitioning;
      var items = this.props.items;
      var nextIndex = currentIndex - 1;
      if (isTransitioning) return;

      if (items.length === 2) {
        /*
          When there are only 2 slides fake a tiny swipe to get the slides
          on the correct side for transitioning
        */
        this.setState({
          currentSlideOffset: currentSlideOffset + 0.001,
          // this will reset once index changes
          slideStyle: {
            transition: 'none'
          } // move the slide over instantly

        }, function () {
          // add 25ms timeout to avoid delay in moving slides over
          window.setTimeout(function () {
            return _this6.slideToIndex(nextIndex, event);
          }, 25);
        });
      } else {
        this.slideToIndex(nextIndex, event);
      }
    }
  }, {
    key: "slideNext",
    value: function slideNext(event) {
      var _this7 = this;

      var _this$state14 = this.state,
          currentIndex = _this$state14.currentIndex,
          currentSlideOffset = _this$state14.currentSlideOffset,
          isTransitioning = _this$state14.isTransitioning;
      var items = this.props.items;
      var nextIndex = currentIndex + 1;
      if (isTransitioning) return;

      if (items.length === 2) {
        // same as above for 2 slides
        this.setState({
          currentSlideOffset: currentSlideOffset - 0.001,
          slideStyle: {
            transition: 'none'
          }
        }, function () {
          window.setTimeout(function () {
            return _this7.slideToIndex(nextIndex, event);
          }, 25);
        });
      } else {
        this.slideToIndex(nextIndex, event);
      }
    }
  }, {
    key: "handleThumbnailMouseOver",
    value: function handleThumbnailMouseOver(event, index) {
      var slideOnThumbnailOver = this.props.slideOnThumbnailOver;
      if (slideOnThumbnailOver) this.onThumbnailMouseOver(event, index);
    }
  }, {
    key: "handleThumbnailKeyUp",
    value: function handleThumbnailKeyUp(event, index) {
      // a11y support ^_^
      if (isEnterOrSpaceKey(event)) this.onThumbnailClick(event, index);
    }
  }, {
    key: "handleSlideKeyUp",
    value: function handleSlideKeyUp(event) {
      // a11y support ^_^
      if (isEnterOrSpaceKey(event)) {
        var onClick = this.props.onClick;
        onClick(event);
      }
    }
  }, {
    key: "isThumbnailVertical",
    value: function isThumbnailVertical() {
      var thumbnailPosition = this.props.thumbnailPosition;
      return thumbnailPosition === 'left' || thumbnailPosition === 'right';
    }
  }, {
    key: "addScreenChangeEvent",
    value: function addScreenChangeEvent() {
      var _this8 = this;

      screenChangeEvents.forEach(function (eventName) {
        document.addEventListener(eventName, _this8.handleScreenChange);
      });
    }
  }, {
    key: "removeScreenChangeEvent",
    value: function removeScreenChangeEvent() {
      var _this9 = this;

      screenChangeEvents.forEach(function (eventName) {
        document.removeEventListener(eventName, _this9.handleScreenChange);
      });
    }
  }, {
    key: "fullScreen",
    value: function fullScreen() {
      var useBrowserFullscreen = this.props.useBrowserFullscreen;
      var gallery = this.imageGallery.current;

      if (useBrowserFullscreen) {
        if (gallery.requestFullscreen) {
          gallery.requestFullscreen();
        } else if (gallery.msRequestFullscreen) {
          gallery.msRequestFullscreen();
        } else if (gallery.mozRequestFullScreen) {
          gallery.mozRequestFullScreen();
        } else if (gallery.webkitRequestFullscreen) {
          gallery.webkitRequestFullscreen();
        } else {
          // fallback to fullscreen modal for unsupported browsers
          this.setModalFullscreen(true);
        }
      } else {
        this.setModalFullscreen(true);
      }

      this.setState({
        isFullscreen: true
      });
    }
  }, {
    key: "exitFullScreen",
    value: function exitFullScreen() {
      var isFullscreen = this.state.isFullscreen;
      var useBrowserFullscreen = this.props.useBrowserFullscreen;

      if (isFullscreen) {
        if (useBrowserFullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else {
            // fallback to fullscreen modal for unsupported browsers
            this.setModalFullscreen(false);
          }
        } else {
          this.setModalFullscreen(false);
        }

        this.setState({
          isFullscreen: false
        });
      }
    }
  }, {
    key: "pauseOrPlay",
    value: function pauseOrPlay() {
      var infinite = this.props.infinite;
      var currentIndex = this.state.currentIndex;

      if (!infinite && !this.canSlideRight()) {
        this.pause();
      } else {
        this.slideToIndex(currentIndex + 1);
      }
    }
  }, {
    key: "play",
    value: function play() {
      var shouldCallOnPlay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _this$props15 = this.props,
          onPlay = _this$props15.onPlay,
          slideInterval = _this$props15.slideInterval,
          slideDuration = _this$props15.slideDuration;
      var currentIndex = this.state.currentIndex;

      if (!this.playPauseIntervalId) {
        this.setState({
          isPlaying: true
        });
        this.playPauseIntervalId = window.setInterval(this.pauseOrPlay, Math.max(slideInterval, slideDuration));

        if (onPlay && shouldCallOnPlay) {
          onPlay(currentIndex);
        }
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      var shouldCallOnPause = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var onPause = this.props.onPause;
      var currentIndex = this.state.currentIndex;

      if (this.playPauseIntervalId) {
        window.clearInterval(this.playPauseIntervalId);
        this.playPauseIntervalId = null;
        this.setState({
          isPlaying: false
        });

        if (onPause && shouldCallOnPause) {
          onPause(currentIndex);
        }
      }
    }
  }, {
    key: "isImageLoaded",
    value: function isImageLoaded(item) {
      /*
        Keep track of images loaded so that onImageLoad prop is not
        called multiple times when re-render the images
      */
      var imageExists = this.loadedImages[item.original];

      if (imageExists) {
        return true;
      } // add image as loaded


      this.loadedImages[item.original] = true;
      return false;
    }
  }, {
    key: "handleImageLoaded",
    value: function handleImageLoaded(event, item) {
      var onImageLoad = this.props.onImageLoad;
      var imageExists = this.loadedImages[item.original];

      if (!imageExists && onImageLoad) {
        this.loadedImages[item.original] = true; // prevent from call again
        // image just loaded, call onImageLoad

        onImageLoad(event);
      }
    }
  }, {
    key: "renderItem",
    value: function renderItem(item) {
      var _this10 = this;

      var isFullscreen = this.state.isFullscreen;
      var onImageError = this.props.onImageError;
      var handleImageError = onImageError || this.handleImageError;
      var itemSrc = isFullscreen ? item.fullscreen || item.original : item.original;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "spotlights-gallery",
        "data-testid": "spotlights-gallery"
      }, item.imageSet ? /*#__PURE__*/_react["default"].createElement("picture", {
        onLoad: function onLoad(event) {
          return _this10.handleImageLoaded(event, item);
        },
        onError: handleImageError
      }, item.imageSet.map(function (source, index) {
        return /*#__PURE__*/_react["default"].createElement("source", {
          // eslint-disable-next-line react/no-array-index-key
          key: "media-".concat(source.srcSet, "-").concat(index),
          media: source.media,
          srcSet: source.srcSet,
          type: source.type
        });
      }), /*#__PURE__*/_react["default"].createElement("img", {
        className: "image-gallery-image",
        alt: item.originalAlt,
        src: itemSrc
      })) : /*#__PURE__*/_react["default"].createElement("img", {
        className: "image-gallery-image",
        src: itemSrc,
        alt: item.originalAlt,
        srcSet: item.srcSet,
        sizes: item.sizes,
        title: item.originalTitle,
        onLoad: function onLoad(event) {
          return _this10.handleImageLoaded(event, item);
        },
        onError: handleImageError
      }), item.description && /*#__PURE__*/_react["default"].createElement("span", {
        className: "image-gallery-description"
      }, item.description));
    }
  }, {
    key: "renderThumbInner",
    value: function renderThumbInner(item) {
      var onThumbnailError = this.props.onThumbnailError;
      var handleThumbnailError = onThumbnailError || this.handleImageError;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-thumbnail-inner"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        className: "image-gallery-thumbnail-image",
        src: item.thumbnail,
        alt: item.thumbnailAlt,
        title: item.thumbnailTitle,
        onError: handleThumbnailError
      }), item.thumbnailLabel && /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-thumbnail-label"
      }, item.thumbnailLabel));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state15 = this.state,
          currentIndex = _this$state15.currentIndex,
          isFullscreen = _this$state15.isFullscreen,
          modalFullscreen = _this$state15.modalFullscreen,
          isPlaying = _this$state15.isPlaying;
      var _this$props16 = this.props,
          additionalClass = _this$props16.additionalClass,
          indexSeparator = _this$props16.indexSeparator,
          isRTL = _this$props16.isRTL,
          items = _this$props16.items,
          thumbnailPosition = _this$props16.thumbnailPosition,
          renderFullscreenButton = _this$props16.renderFullscreenButton,
          renderCustomControls = _this$props16.renderCustomControls,
          renderLeftNav = _this$props16.renderLeftNav,
          renderRightNav = _this$props16.renderRightNav,
          showBullets = _this$props16.showBullets,
          showFullscreenButton = _this$props16.showFullscreenButton,
          showIndex = _this$props16.showIndex,
          showThumbnails = _this$props16.showThumbnails,
          showNav = _this$props16.showNav,
          showPlayButton = _this$props16.showPlayButton,
          renderPlayPauseButton = _this$props16.renderPlayPauseButton;
      var thumbnailStyle = this.getThumbnailStyle();

      var _this$getSlideItems = this.getSlideItems(),
          slides = _this$getSlideItems.slides,
          thumbnails = _this$getSlideItems.thumbnails,
          bullets = _this$getSlideItems.bullets;

      var slideWrapperClass = (0, _clsx["default"])('image-gallery-slide-wrapper', thumbnailPosition, {
        'image-gallery-rtl': isRTL
      });

      var slideWrapper = /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.imageGallerySlideWrapper,
        className: slideWrapperClass
      }, renderCustomControls && renderCustomControls(), this.canSlide() ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, showNav && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, renderLeftNav(this.slideLeft, !this.canSlideLeft()), renderRightNav(this.slideRight, !this.canSlideRight())), /*#__PURE__*/_react["default"].createElement(_reactSwipeable.Swipeable, {
        className: "image-gallery-swipe",
        delta: 0,
        onSwiping: this.handleSwiping,
        onSwiped: this.handleOnSwiped
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-slides"
      }, slides))) : /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-slides"
      }, slides), showPlayButton && renderPlayPauseButton(this.togglePlay, isPlaying), showBullets && /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-bullets"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-bullets-container",
        role: "navigation",
        "aria-label": "Bullet Navigation"
      }, bullets)), showFullscreenButton && renderFullscreenButton(this.toggleFullScreen, isFullscreen), showIndex && /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-index"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "image-gallery-index-current"
      }, currentIndex + 1), /*#__PURE__*/_react["default"].createElement("span", {
        className: "image-gallery-index-separator"
      }, indexSeparator), /*#__PURE__*/_react["default"].createElement("span", {
        className: "image-gallery-index-total"
      }, items.length)));

      var igClass = (0, _clsx["default"])('image-gallery', additionalClass, {
        'fullscreen-modal': modalFullscreen
      });
      var igContentClass = (0, _clsx["default"])('image-gallery-content', thumbnailPosition, {
        fullscreen: isFullscreen
      });
      var thumbnailWrapperClass = (0, _clsx["default"])('image-gallery-thumbnails-wrapper', thumbnailPosition, {
        'thumbnails-wrapper-rtl': !this.isThumbnailVertical() && isRTL
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.imageGallery,
        className: igClass,
        "aria-live": "polite"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: igContentClass
      }, (thumbnailPosition === 'bottom' || thumbnailPosition === 'right') && slideWrapper, showThumbnails && /*#__PURE__*/_react["default"].createElement("div", {
        className: thumbnailWrapperClass,
        style: this.getThumbnailBarHeight()
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "image-gallery-thumbnails",
        ref: this.thumbnailsWrapper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.thumbnails,
        className: "image-gallery-thumbnails-container",
        style: thumbnailStyle,
        "aria-label": "Thumbnail Navigation"
      }, thumbnails))), (thumbnailPosition === 'top' || thumbnailPosition === 'left') && slideWrapper));
    }
  }]);

  return ImageGallery;
}(_react["default"].Component);

exports["default"] = ImageGallery;
ImageGallery.propTypes = {
  flickThreshold: _propTypes.number,
  items: (0, _propTypes.arrayOf)((0, _propTypes.shape)({
    bulletClass: _propTypes.string,
    bulletOnClick: _propTypes.func,
    description: _propTypes.string,
    original: _propTypes.string.isRequired,
    fullscreen: _propTypes.string,
    originalAlt: _propTypes.string,
    originalTitle: _propTypes.string,
    thumbnail: _propTypes.string,
    thumbnailAlt: _propTypes.string,
    thumbnailLabel: _propTypes.string,
    thumbnailTitle: _propTypes.string,
    originalClass: _propTypes.string,
    thumbnailClass: _propTypes.string,
    renderItem: _propTypes.func,
    renderThumbInner: _propTypes.func,
    imageSet: imageSetType,
    srcSet: _propTypes.string,
    sizes: _propTypes.string
  })).isRequired,
  showNav: _propTypes.bool,
  autoPlay: _propTypes.bool,
  lazyLoad: _propTypes.bool,
  infinite: _propTypes.bool,
  showIndex: _propTypes.bool,
  showBullets: _propTypes.bool,
  showThumbnails: _propTypes.bool,
  showPlayButton: _propTypes.bool,
  showFullscreenButton: _propTypes.bool,
  disableThumbnailScroll: _propTypes.bool,
  disableKeyDown: _propTypes.bool,
  disableSwipe: _propTypes.bool,
  useBrowserFullscreen: _propTypes.bool,
  preventDefaultTouchmoveEvent: _propTypes.bool,
  onErrorImageURL: _propTypes.string,
  indexSeparator: _propTypes.string,
  thumbnailPosition: (0, _propTypes.oneOf)(['top', 'bottom', 'left', 'right']),
  startIndex: _propTypes.number,
  slideDuration: _propTypes.number,
  slideInterval: _propTypes.number,
  slideOnThumbnailOver: _propTypes.bool,
  swipeThreshold: _propTypes.number,
  swipingTransitionDuration: _propTypes.number,
  onSlide: _propTypes.func,
  onBeforeSlide: _propTypes.func,
  onScreenChange: _propTypes.func,
  onPause: _propTypes.func,
  onPlay: _propTypes.func,
  onClick: _propTypes.func,
  onImageLoad: _propTypes.func,
  onImageError: _propTypes.func,
  onTouchMove: _propTypes.func,
  onTouchEnd: _propTypes.func,
  onTouchStart: _propTypes.func,
  onMouseOver: _propTypes.func,
  onMouseLeave: _propTypes.func,
  onThumbnailError: _propTypes.func,
  onThumbnailClick: _propTypes.func,
  renderCustomControls: _propTypes.func,
  renderLeftNav: _propTypes.func,
  renderRightNav: _propTypes.func,
  renderPlayPauseButton: _propTypes.func,
  renderFullscreenButton: _propTypes.func,
  renderItem: _propTypes.func,
  renderThumbInner: _propTypes.func,
  stopPropagation: _propTypes.bool,
  additionalClass: _propTypes.string,
  useTranslate3D: _propTypes.bool,
  isRTL: _propTypes.bool
};
ImageGallery.defaultProps = {
  onErrorImageURL: '',
  additionalClass: '',
  showNav: true,
  autoPlay: false,
  lazyLoad: false,
  infinite: true,
  showIndex: false,
  showBullets: false,
  showThumbnails: true,
  showPlayButton: true,
  showFullscreenButton: true,
  disableThumbnailScroll: false,
  disableKeyDown: false,
  disableSwipe: false,
  useTranslate3D: true,
  isRTL: false,
  useBrowserFullscreen: true,
  preventDefaultTouchmoveEvent: false,
  flickThreshold: 0.4,
  stopPropagation: false,
  indexSeparator: ' / ',
  thumbnailPosition: 'bottom',
  startIndex: 0,
  slideDuration: 450,
  swipingTransitionDuration: 0,
  onSlide: null,
  onBeforeSlide: null,
  onScreenChange: null,
  onPause: null,
  onPlay: null,
  onClick: null,
  onImageLoad: null,
  onImageError: null,
  onTouchMove: null,
  onTouchEnd: null,
  onTouchStart: null,
  onMouseOver: null,
  onMouseLeave: null,
  onThumbnailError: null,
  onThumbnailClick: null,
  renderCustomControls: null,
  renderThumbInner: null,
  renderItem: null,
  slideInterval: 3000,
  slideOnThumbnailOver: false,
  swipeThreshold: 30,
  renderLeftNav: function renderLeftNav(onClick, disabled) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "image-gallery-icon image-gallery-left-nav",
      disabled: disabled,
      onClick: onClick,
      "aria-label": "Previous Slide"
    }, /*#__PURE__*/_react["default"].createElement(_SVG["default"], {
      icon: "left",
      viewBox: "6 0 12 24"
    }));
  },
  renderRightNav: function renderRightNav(onClick, disabled) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "image-gallery-icon image-gallery-right-nav",
      disabled: disabled,
      onClick: onClick,
      "aria-label": "Next Slide"
    }, /*#__PURE__*/_react["default"].createElement(_SVG["default"], {
      icon: "right",
      viewBox: "6 0 12 24"
    }));
  },
  renderPlayPauseButton: function renderPlayPauseButton(onClick, isPlaying) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "image-gallery-icon image-gallery-play-button",
      onClick: onClick,
      "aria-label": "Play or Pause Slideshow"
    }, /*#__PURE__*/_react["default"].createElement(_SVG["default"], {
      strokeWidth: 2,
      icon: isPlaying ? 'pause' : 'play'
    }));
  },
  renderFullscreenButton: function renderFullscreenButton(onClick, isFullscreen) {
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "image-gallery-icon image-gallery-fullscreen-button",
      onClick: onClick,
      "aria-label": "Open Fullscreen"
    }, /*#__PURE__*/_react["default"].createElement(_SVG["default"], {
      strokeWidth: 2,
      icon: isFullscreen ? 'minimize' : 'maximize'
    }));
  }
};