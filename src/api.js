(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['http', 'graph', 'ad-account'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(
      require('./http/graph.js'),
      require('./objects/objects.js')
    );
  } else {
    root.FacebookAdsApi = factory(
      root.FbApiAssets.http.Graph,
      root.FbApiAssets.objects
    );
  }
}(this, function(Graph, objects) {
  'use strict';

  /**
   * Facebook Ads API
   * @param {string} token
   * @throws {Error} if no token is given
   */
  function FacebookAdsApi(token, locale) {
    var _this = {};
    var version = '2.2';
    locale =  locale || 'en_US';

    if (!token)
      throw new Error('Be a darling and get us a nice token, will you?');

    _this.graph = new Graph(_this);

    // Facebook Objects constructors
    var objKeys = Object.keys(objects);
    objKeys.forEach(function(object) {
      _this[object] = function() {
        var params = [_this].concat(Array.prototype.slice.call(arguments));
        return objects[object].apply({}, params);
      };
    });

    /**
     * Get API Version
     * @returns {string}
     */
    _this.getVersion = function() {
      return version;
    };

    /**
     * Get locale
     * @returns {string}
     */
    _this.getLocale = function() {
      return locale;
    };

    /**
     * Set API Token
     * @param {string}
     */
    function setToken(newToken) {
      token = newToken;
      return _this;
    }
    _this.setToken = setToken;

    /**
     * Get API Token
     * @returns {string}
     */
    _this.getToken = function() {
      return token;
    };

    return _this;
  }

  return FacebookAdsApi;
}));
