import * as moment from 'moment';

/**
 * It could be something more complicated here if there are requerements for locale.
 */
moment.locale('ru', {
  monthsShort : {
    format: 'янв_фев_мар_апр_мая_июня_июля_авг_сен_окт_ноя_дек'.split('_'),
    standalone: 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_')
  }
});