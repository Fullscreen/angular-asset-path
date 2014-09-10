# Angular Asset Paths

This module exposes Rails-style `asset-path` helpers so you can link to files
without needing to litter your code with `<%= asset_path('foo.jpg') %>` calls.

## Why do I need this?

In production Rails will rename your assets with an MD5 digest, which is a
Very Good Thing (TM) for caching reasons, however it means you can no longer link
to your assets normally:

``` html
<!-- This will work fine locally, but break in production as `foo.jpg` gets
renamed to `foo-eb259cb6c992ce28a13b006c5d04b9ac.jpg`! -->
<img src="foo.jpg">

<!-- This writes the correct URL -->
<img src="<%= asset_path('foo.jpg') %>">
```

However, on the front-end, your Angular code won't know the hashed URLs for the
files you want to link to! Enter Angular Asset Path helpers.

## How do I use this?

1. Install it: `bower install --save angular-asset-path`
2. Require it in your app: `angular.module('myApp', ['asset-path'])`
3. Pass in your Rails manifest:

``` html
<!-- Drop this in the bottom of /app/views/layouts/application.html.erb -->
<script>
  angular.module('myApp', ['asset-path']).config(function(assetPathProvider) {
    assetPathProvider.setAssets(
      <%= File.read(Dir.glob('public/assets/manifest-*.json').last).html_safe rescue "{}" %>
    )
  })
</script>
```

Now, you can link to assets using either the `asset-path` directive or filter:

``` html
<!-- The `asset-path` directive will create a `src` attribute on the element: -->
<img asset-path="logo.png" width="400">

<!-- Or you can pipe the file name through the `assetPath` filter: -->
<img src="{{ 'logo.png' | assetPath }}" width="400">
```

