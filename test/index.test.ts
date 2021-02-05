jest.mock('../src/lib/fetch');

import fetch from "../src/lib/fetch";
import {mocked} from 'ts-jest/utils';

const mockFetch = mocked(fetch);

import {
  getBootstrapConfiguration,
  getConsent,
  getFullConfiguration,
  getLocation,
  invokeRight,
  setConsent
} from "../src";

describe('@ketch-com/ketch-web-api', () => {
  describe('GetLocation', () => {
    it('calls service', () => {
      const v = {
        ip: '1.2.3.5',
        countryCode: 'US',
        regionCode: 'CA',
      };
      mockFetch.mockResolvedValue(v);

      expect(getLocation({
        IP: '1.2.3.5',
      })).resolves.toBe(v);

      expect(mockFetch).toBeCalled();
    });
  });

  describe('GetBootstrapConfiguration', () => {
    it('calls service', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      };
      mockFetch.mockResolvedValue(v);

      expect(getBootstrapConfiguration({
        organizationCode: 'switchbitcorp',
        appCode: 'switchbit',
      })).resolves.toBe(v);

      expect(mockFetch).toBeCalled();
    });
  });

  describe('GetFullConfiguration', () => {
    it('calls service', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      };
      mockFetch.mockResolvedValue(v);

      expect(getFullConfiguration({
        organizationCode: 'switchbitcorp',
        appCode: 'switchbit',
        envCode: 'production',
        hash: '8913461971881236311',
        deploymentID: '',
        policyScopeCode: 'default',
        languageCode: 'en-US',
      })).resolves.toBe(v);

      expect(mockFetch).toBeCalled();
    });
  });

  describe('GetConsent', () => {
    it('calls service', () => {
      const v = {
        'purposes': {
          'coreprodserv': {
            'allowed': 'true',
          },
        },
      };
      mockFetch.mockResolvedValue(v);

      expect(getConsent({
        organizationCode: 'switchbitcorp',
        applicationCode: 'switchbit',
        applicationEnvironmentCode: 'production',
        identities: ['srn:::::switchbitcorp:id/swb_switchbit/2I0tgfvRzAyP7A9ma7Eqo6'],
        purposes: {
          'coreprodserv': {
            'legalBasisCode': 'disclosure',
          },
          'prodservenhance': {
            'legalBasisCode': 'disclosure',
          },
          'hschat': {
            'legalBasisCode': 'disclosure',
          },
          'bizsiteanalytics': {
            'legalBasisCode': 'disclosure',
          },
          'persads': {
            'legalBasisCode': 'disclosure',
          },
          'personzation':{
            'legalBasisCode': 'disclosure',
          },
        },
      })).resolves.toBe(v);

      expect(mockFetch).toBeCalled();
    });
  });

  describe('SetConsent', () => {
    it('calls service', () => {
      mockFetch.mockResolvedValue(void(0));

      expect(setConsent({
        organizationCode: 'switchbitcorp',
        applicationCode: 'switchbit',
        applicationEnvironmentCode: 'production',
        identities: ['srn:::::switchbitcorp:id/swb_switchbit/2I0tgfvRzAyP7A9ma7Eqo6'],
        policyScopeCode: '',
        purposes: {
          "coreprodserv":{
            "allowed": 'true',
            "legalBasisCode": 'legitimateinterest',
          },
          "prodservenhance":{
            "allowed": 'true',
            "legalBasisCode": 'consent_optin',
          },
          "hschat":{
            "allowed": 'false',
            "legalBasisCode": 'consent_optin',
          },
          "bizsiteanalytics":{
            "allowed": 'false',
            "legalBasisCode": 'consent_optin',
          },
          "persads":{
            "allowed": 'false',
            "legalBasisCode": 'consent_optin',
          },
          "personzation":{
            "allowed": 'false',
            "legalBasisCode": 'consent_optin',
          }
        },
        migrationOption: 1,
      })).resolves.toBe(void(0));

      expect(mockFetch).toBeCalled();
    });
  });

  describe('InvokeRight', () => {
    it('calls service', () => {
      mockFetch.mockResolvedValue(void(0));

      expect(invokeRight({
        organizationCode: 'switchbitcorp',
        "applicationCode":"switchbit",
        "applicationEnvironmentCode":"production",
        "identities":["srn:::::switchbitcorp:id/swb_switchbit/2I0tgfvRzAyP7A9ma7Eqo6"],"policyScopeCode":"gdpreea","rightCodes":["gdpr_portability"],"user":{"email":"ignore.me@backbonelabs.io","first":"Just","last":"Testing","country":"FR","stateRegion":"France","description":"Ignore me"}
      })).resolves.toBe(void(0));

      expect(mockFetch).toBeCalled();
    });
  });
});
