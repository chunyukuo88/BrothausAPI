import { _ } from 'lodash';
import { logger as defaultLogger } from './logger';

const logger = {
  _logger: undefined,
  overrideLogger(clientLogger) {
    this._logger = clientLogger || defaultLogger;
    return this; // for chaining calls
  },
  logInfo(message) {
    this._initializeLogger();
    this._logger.logInfo && this._logger.logInfo(message);
  },
  logWarning(message) {
    this._initializeLogger();
    this._logger.logWarning && this._logger.logWarning(message);
  },
  logError(message) {
    this._initializeLogger();
    this._logger.logError && this._logger.logError(message);
  },
  _initializeLogger() {
    !this._logger && this.overrideLogger();
  },
};

export const getLogger = () => _.cloneDeep(logger); // stops mutation!