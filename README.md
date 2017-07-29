# pambda-pug

Pambda to render with Pug.

## Installation

```
npm i pambda-pug -S
```

## Usage

``` javascript
import { compose, createLambda } from 'pambda';
import { router } from 'pambda-router';
import { pug } from 'pambda-pug';

export const handler = createLambda(
  compose(
    pug(),
    router()
      .get('/case1', next => (event, context, callback) => {
        /*
         * If call `context.render` without renderCallback, the callback is called automatically in the pug pambda.
         */
        return context.render('case1', event.pathParameters);
      })
      .get('/case2', next => (event, context, callback) => {
        /*
         * When call `context.render` with renderCallback, the callback must be called explicitly.
         */
        return context.render('case2', event.pathParameters, (err, body) => {
          if (err) {
            return callback(err);
          }

          callback(null, {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
            },
            body,
          });
        });
      })
      .toPambda()
  )
);

```

## pug(options)

- `options.root`
    - A path of a directory to be stored template files.
- `options.ext`
    - An extension name of a template file.
- `options.pugOptions`
    - An options that are passed to pug.

## License

MIT
