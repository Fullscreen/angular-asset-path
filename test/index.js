var manifest = {
  "files": {
    "favicon-100469fe687f4d74b413bae819ec1eab.ico": {
      "logical_path": "favicon.ico",
      "mtime": "2013-12-11T12:11:00-08:00",
      "size": 1150,
      "digest": "100469fe687f4d74b413bae819ec1eab"
    },
    "logo-eb259cb6c992ce28a13b006c5d04b9ac.png": {
      "logical_path": "logo.png",
      "mtime": "2013-11-20T11:54:01-08:00",
      "size": 218,
      "digest": "eb259cb6c992ce28a13b006c5d04b9ac"
    },
    "x-icon-976ccffdf27106457e11f69c8a4cf30c.png": {
      "logical_path": "x-icon.png",
      "mtime": "2014-01-16T16:29:09-08:00",
      "size": 595,
      "digest": "976ccffdf27106457e11f69c8a4cf30c"
    },
    "application-468dd170abbf92c95462ea71b3fe0c4c.js": {
      "logical_path": "app.js",
      "mtime": "2014-09-09T17:10:31-07:00",
      "size": 3884607,
      "digest": "468dd170abbf92c95462ea71b3fe0c4c"
    },
    "application-28fc51aaa619f21652fe590b908ffb7f.css": {
      "logical_path": "application.css",
      "mtime": "2014-09-09T17:10:27-07:00",
      "size": 800658,
      "digest": "28fc51aaa619f21652fe590b908ffb7f"
    }
  },
  "assets": {
    "favicon.ico": "favicon-100469fe687f4d74b413bae819ec1eab.ico",
    "logo.png": "logo-eb259cb6c992ce28a13b006c5d04b9ac.png",
    "x-icon.png": "x-icon-976ccffdf27106457e11f69c8a4cf30c.png",
    "application.js": "application-468dd170abbf92c95462ea71b3fe0c4c.js",
    "application.css": "application-28fc51aaa619f21652fe590b908ffb7f.css"
  }
}

describe("Angular Asset Path", function() {
  var $filter

  // Set up the provider with an entire Rails 4 manifest
  angular.module('test.fullManifest', ['asset-path']).config(function(assetPathProvider) {
    assetPathProvider.setAssets(manifest)
  })

  // Set up the provider with just the asset key from the Rails 4 manifest
  angular.module('test.justAssets', ['asset-path']).config(function(assetPathProvider) {
    assetPathProvider.setAssets(manifest.assets)
  })

  // Set up the provider with an invalid manifest
  angular.module('test.borkedAssets', ['asset-path']).config(function(assetPathProvider) {
    assetPathProvider.setAssets("bacon")
  })

  // Directive factory; returns a jQuery wrapped <img> tag with the asset-path directive on it
  function factory(name) {
    var el
    inject(function($compile, $rootScope) {
      el = $compile('<img asset-path="'+name+'">')($rootScope)
    })
    return el
  }

  it("should pass through if it has an empty manifest", function() {
    module('asset-path')
    inject(function(_$filter_) { $filter = _$filter_ })

    expect($filter('assetPath')('foo.jpg')).toEqual('/assets/foo.jpg')
  })

  it("should pass through if no file is found in the manifest", function() {
    module('asset-path')
    module('test.fullManifest')
    inject(function(_$filter_) { $filter = _$filter_ })

    expect($filter('assetPath')('foo.jpg')).toEqual('/assets/foo.jpg')
  })

  it("should return the filename from the manifest", function() {
    module('asset-path')
    module('test.fullManifest')
    inject(function(_$filter_) { $filter = _$filter_ })

    expect($filter('assetPath')('logo.png')).toEqual('/assets/'+manifest.assets['logo.png'])
  })

  it("should properly handle asset maps as well as manifests", function() {
    module('asset-path')
    module('test.justAssets')
    inject(function(_$filter_) { $filter = _$filter_ })

    expect($filter('assetPath')('logo.png')).toEqual('/assets/'+manifest.assets['logo.png'])
  })

  it("should throw an error if configured without an object", function() {
    module('asset-path')
    angular.module('test.borkedAssets', ['asset-path']).config(function(assetPathProvider) {
      expect(function() { assetPathProvider.setAssets("bacon") }).toThrow(new Error())
    })
  })

  it("should set the `src` attribute when used a a directive", function() {
    module('asset-path')
    module('test.fullManifest')

    var el = factory('foo.jpg')
    expect(el.attr('src')).toEqual('/assets/foo.jpg')
  })

  it("should look up file names from the given manifest", function() {
    module('asset-path')
    module('test.fullManifest')

    var el = factory('logo.png')
    expect(el.attr('src')).toEqual('/assets/'+manifest.assets['logo.png'])
  })
})

