const { __express } = require('pug');
const stack = require('callsite');
const { join, dirname } = require('path');
const { callbackify } = require('lambda-callbackify');

exports.pug = (options = {}) => {
  const {
    root = join(dirname(stack()[1].getFileName()), 'views'),
    ext = 'pug',
    pugOptions = {},
  } = options;

  return next => {
    next = callbackify(next);

    return (event, context, callback) => {
      context.render = (name, locals, renderCallback) => {
        if (typeof(locals) === 'function') {
          [locals, renderCallback] = [{}, locals];
        }

        __express(
          join(root, ext ? `${name}.${ext}` : name),
          Object.assign({}, pugOptions, locals),
          (err, body) => {
            if (err) {
              return (renderCallback || callback)(err, null);
            }

            if (renderCallback) {
              return renderCallback(null, body);
            }

            callback(null, {
              statusCode: 200,
              headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Content-Length': body.length,
              },
              body,
            });
          });
      };

      next(event, context, callback);
    };
  };
};
