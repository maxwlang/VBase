import * as Sentry from '@sentry/browser';
import sentryConfig from '../../config/sentry';

if (sentryConfig.enabled && sentryConfig.clienterrors) {
    Sentry.init({
        dsn: `https://${sentryConfig.key}@sentry.io/${sentryConfig.project}`,
    });
}
