angular.module('asset-path', [])

.provider('assetPath', function() {
  var assets = {}

  return {
    setAssets: function(newAssets) {
      assets = newAssets
    },

    $get: function() {
      return function(filename) {
        return 'assets/'+(assets[filename] || filename)
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



/*



<img asset-path="assets/foo">
<div ng-style="{background-image: 'assets/foo' | asset-path }">

<div style="background-image: {{ asset-path('assets/foo') })
*/
