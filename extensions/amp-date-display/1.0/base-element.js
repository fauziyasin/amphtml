import Mustache from 'mustache';

import {parseDateAttrs as parseDateAttrsBase} from '#core/dom/parse-date-attributes';

import {PreactBaseElement} from '#preact/base-element';
import {createParseAttrsWithPrefix} from '#preact/parse-props';

import {BentoDateDisplay} from './component';

export class BaseElement extends PreactBaseElement {
  /** @override */
  checkPropsPostMutations() {
    const template = this.element.querySelector('template')./*OK*/ innerHTML;

    this.mutateProps({
      'render': (data) => {
        const output = Mustache.render(template, {
          year: data.year,
          month: data.month,
          day: data.day,
        });
        console.log(template, data, output);
        return {'__html': output};
      },
    });
  }
}

/** @override */
BaseElement['Component'] = BentoDateDisplay;

/** @override */
BaseElement['props'] = {
  'datetime': {
    attrs: ['datetime', 'timestamp-ms', 'timestamp-seconds', 'offset-seconds'],
    parseAttrs: parseDateAttrs,
  },
  'displayIn': {attr: 'display-in'},
  'locale': {attr: 'locale'},
  'localeOptions': createParseAttrsWithPrefix('data-options-'),
};

/** @override */
BaseElement['layoutSizeDefined'] = true;

/** @override */
BaseElement['lightDomTag'] = 'div';

/** @override */
BaseElement['usesTemplate'] = true;

/**
 * @param {!Element} element
 * @return {?number}
 * @throws {UserError} when attribute values are missing or invalid.
 * @visibleForTesting
 */
export function parseDateAttrs(element) {
  return parseDateAttrsBase(element, [
    'datetime',
    'timestamp-ms',
    'timestamp-seconds',
  ]);
}
