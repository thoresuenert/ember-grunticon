# ember-cli-grunticon

[ember-cli][ember-cli] addon integrating [grunticon][grunticon] into the
ember build lifecycle.

## Usage

This package will load the grunticon-loader into content for head automatically.

### Install
```shell
ember install ember-grunticon
```

### Configure

Configure grunticon in your application's `ember-cli-build.js` file.  For
details, see the [`grunticon docs`][grunticon-docs] for details.

```javascript
// ember-cli-build.js
var app = new EmberApp(defaults, {
  // ...
  grunticon: {
        src: "grunticon/icons/+(*.svg|*.png)",
        dest: 'grunticon/build',
        assetPath: 'assets/icons',
        options: {
            cssprefix: ".icon--",
            customselectors: {
                "*": [".icon--$1:before"]
            },
        },
  }
  // ...
});
```

Example for css usage:

```sass
.icon {
  vertical-align: middle;
  background-position: center center;
  display: inline-block;
  &--edit {
    width: 12px;
    height: 14px;
    background-size: 100%;
  }
}
```
## General

This is my first addon for ember at all.
Feel free to open issues and i appreciate input of all type.
I dont know how to write tests for the integration yet.

[ember-cli]: https://ember-cli.com
[grunticon]: https://github.com/filamentgroup/grunticon
[grunticon-docs]: https://github.com/filamentgroup/grunticon#required-configuration-properties