import { getLogger } from './loggingMixin';

/**
 *  superclass to enable logging
 */

export class Loggable {
  constructor(loggerObj) {
    this.logger = getLogger().overrideLogger(loggerObj);
  }
  _logInfo(message) {
    this.logger.logInfo(message);
  }
  _logWarning(message) {
    this.logger.logWarning(message);
  }
  _logError(message) {
    this.logger.logError(message);
  }
}