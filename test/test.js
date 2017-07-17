const test = require('tape');
const { pug } = require('..');

test('test', t => {
  t.plan(4);

  const pambda = pug();

  const lambda = pambda((event, context, callback) => {
    context.render('test');
  });

  lambda({}, {}, (err, result) => {
    t.error(err);
    
    t.equal(result.statusCode, 200);
    t.ok(result.body);
    t.ok(result.body.indexOf('pug'));
  });
});
