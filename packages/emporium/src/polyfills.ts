/**
 * Polyfill stable language features. These imports will be optimized by `@babel/preset-env`.
 *
 * See: https://github.com/zloirock/core-js#babel
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';


// Ultra hacky bootstrap support (?)
// https://stackoverflow.com/questions/50264344/aws-sdk-crash-after-updating-from-angular5-to-angular6
(window as any).global = window;
