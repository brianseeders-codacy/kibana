/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { UMServerLibs } from '../../lib/lib';
import { UMRestApiRouteFactory } from '../types';
import { API_URLS } from '../../../../../legacy/plugins/uptime/common/constants/rest_api';

export const createGetIndexPatternRoute: UMRestApiRouteFactory = (libs: UMServerLibs) => ({
  method: 'GET',
  path: API_URLS.INDEX_PATTERN,
  validate: false,
  options: {
    tags: ['access:uptime'],
  },
  handler: async ({ callES }, _context, _request, response): Promise<any> => {
    try {
      return response.ok({
        body: {
          ...(await libs.requests.getIndexPattern(callES)),
        },
      });
    } catch (e) {
      return response.internalError({ body: { message: e.message } });
    }
  },
});
