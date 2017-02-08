angular.module('asset-path', [])

.provider('assetPath', function() {
  var assets = {}
  var urlBase = ''

  return {
    setAssets: function(newAssets) {
      if (!(newAssets instanceof Object)) {
        throw new Error("Argument is not of type Object")
        return
      }

      // Accept either a full Rails manifest.json, or map of asset names
      if (newAssets.assets) {
        assets = newAssets.assets
      } else {
        assets = newAssets
      }
    },

    setUrlBase: function(newUrl) {
      if (newUrl.lastIndexOf('/') == newUrl.length - 1) {
        newUrl = newUrl.substr(0, newUrl.length - 1)
      }
      urlBase = newUrl
    },

    $get: function() {
      return function(filename) {
        return urlBase+'/assets/'+(assets[filename] || filename)
      }
    },

  }
})

.filter('assetPath', function(assetPath) {
  return function(filename) {
    return assetPath(filename)
  }
})

.directive('assetPath', function(assetPath) {
  return {
    restrict: 'A',
    compile: function(el, attrs) {
      el.attr('src', assetPath(attrs['assetPath']))
    }
  }
})

