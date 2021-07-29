/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * 
 * See the License for the specific language governing permissions and limitations under the License.
 */


const samplesConfig = require('../../config');
import { btoa, atob } from '../../../lib/crypto';

function getSampleConfig() {
  const sampleName = process.env.SAMPLE_NAME;
  const sampleConfig = sampleName ? samplesConfig.getSampleConfig(sampleName) : {};
  return Object.assign({}, sampleConfig);
}

function getSampleSpecs() {
  const sampleConfig = getSampleConfig();
  const specs = (sampleConfig.specs || []).map(spec => {
    return `specs/${spec}.js`;
  });
  return specs;
}

function getSampleFeatures() {
  const sampleConfig = getSampleConfig();
  const specs = (sampleConfig.features || []).map(feature => {
    return `features/${feature}.feature`;
  });
  return specs;
}

function getConfig() {
  const issuer = process.env.ISSUER;
  const orgName = issuer?.replace('https://', '').split('.').shift();
  const orgUrl = issuer.indexOf('/oauth2') > 0 ? issuer.substring(0, issuer.indexOf('/oauth2')) : issuer;
  const clientId = "0oa17suj5x9khaVH75d7"; //process.env.SPA_CLIENT_ID || process.env.CLIENT_ID;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const webClientId = process.env.WEB_CLIENT_ID || process.env.CLIENT_ID;
  const clientSecret = process.env.WEB_CLIENT_SECRET || process.env.CLIENT_SECRET;
  const a18nAPIKey = process.env.A18N_API_KEY;
  const oktaAPIKey = process.env.OKTA_API_KEY;
  const fbUsername = process.env.FB_USERNAME;
  const fbPassword = process.env.FB_PASSWORD;

  const sampleName = process.env.SAMPLE_NAME;
  const sampleConfig = getSampleConfig();
  let config = {
    sampleName,
    sampleConfig,
    issuer,
    orgUrl,
    orgName,
    clientId: sampleConfig.express ? webClientId : clientId,
    username,
    password,
    fbUsername,
    fbPassword,
    clientSecret,
    a18nAPIKey,
    oktaAPIKey,
  };

  console.log('________________________ config')
  console.log( btoa(JSON.stringify({
    WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
    SPA_CLIENT_ID: process.env.SPA_CLIENT_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    WEB_CLIENT_SECRET: process.env.WEB_CLIENT_SECRET,
  })) )

  return Object.assign({}, config);
}

export { getConfig, getSampleConfig, getSampleSpecs, getSampleFeatures };
