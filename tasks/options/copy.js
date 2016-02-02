module.exports = {

  // 'grunt-contrib-copy': moves files into the output folder

  images: {
    files: [
      {
        expand: true,
        cwd: 'input/',
        dest: 'output/',
        src: 'assets/img/**/*'
      }
    ]
  },

  assets: {
    files: [
      { 
        expand: true,
        cwd: 'input/',
        dest: 'output/',
        src: 'assets/css/*.css'
      },
      { 
        expand: true,
        cwd: 'input/',
        dest: 'output/',
        src: 'assets/js/*.js' 
      },
      { 
        expand: true,
        cwd: 'input/',
        dest: 'output/',
        src: 'assets/fonts/**/*'
      }
    ]
  },

  templates: {
    options: {
      process: writeTemplateFileHints
    },
    files: [
      { 
        expand: true,
        cwd: 'input/',
        dest: 'output/',
        src: 'templates/*.hbs'
      },
      {
        expand: true,
        cwd: 'input/templates/partials/',
        dest: 'output/templates/',
        src: '**/*.hbs'
      }
    ]
  },

  others: {
    files: [
      { expand: true,
        cwd: 'input/templates/partials/',
        dest: 'output/templates/',
        src: '**/*.json'
      },
      { expand: true,
        cwd: 'input/i18n/',
        dest: 'output/i18n',
        src: '**/*.yml'
      },
      {
        expand: true,
        cwd: 'input/i18n/',
        dest: 'output/translations/',
        src: '**/*.yml',
        rename: renameI18nFiles
      }
    ]
  }

}

var writeTemplateFileHints = function(content, srcPath) {
  var cleanPath = srcPath.replace("input/templates/partials/", "").replace("input/templates/", "");
  var prepended = "<!-- start " + cleanPath + " -->\n";
  var appended = "<!-- end " + cleanPath + " -->\n";
  var lastChar = content.slice(-1);
  if (lastChar != "\n") {
    content = content + "\n";
  }
  return prepended + content + appended;
}

var renameI18nFiles = function(dest, src) {
  var locale = src.substring(0, src.indexOf('/')),
      fileName = src.substring(src.indexOf('/')),
      domain = fileName.substring(0, fileName.indexOf('.yml'));
  return dest + domain + '.' + locale + '.yml';
}