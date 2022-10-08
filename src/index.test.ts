/* eslint-disable jest/valid-expect */
jest.mock('./lib/fetch')

import fetch from './lib/fetch'

const mockFetch = jest.mocked(fetch)

import {
  getBootstrapConfiguration,
  getConsent,
  getFullConfiguration,
  getLocation,
  invokeRight,
  setConsent,
} from '../src'

const baseUrl = 'https://global.ketchcdn.com/web/v1'

describe('@ketch-com/ketch-web-api', () => {
  describe('GetLocation', () => {
    it('calls service', () => {
      const v = {
        ip: '1.2.3.5',
        countryCode: 'US',
        regionCode: 'CA',
      }
      mockFetch.mockResolvedValue(v)

      expect(getLocation(baseUrl)).resolves.toBe(v)

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('GetBootstrapConfiguration', () => {
    it('calls service', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResolvedValue(v)

      expect(
        getBootstrapConfiguration(baseUrl, {
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
        }),
      ).resolves.toBe(v)

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('GetFullConfiguration', () => {
    it('calls service', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResolvedValue(v)

      expect(
        getFullConfiguration(baseUrl, {
          languageCode: 'en-US',
          hash: '8913461971881236311',
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          environmentCode: 'foo',
          deploymentID: '',
          jurisdictionCode: 'foo',
        }),
      ).resolves.toBe(v)

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('GetConsent', () => {
    it('calls service', () => {
      const v = {
        purposes: {
          coreprodserv: {
            allowed: 'true',
          },
        },
      }
      mockFetch.mockResolvedValue(v)

      expect(
        getConsent(baseUrl, {
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          identities: {
            swb_switchbit: '2I0tgfvRzAyP7A9ma7Eqo6',
          },
          jurisdictionCode: 'default',
          purposes: {
            coreprodserv: {
              legalBasisCode: 'disclosure',
            },
            prodservenhance: {
              legalBasisCode: 'disclosure',
            },
            hschat: {
              legalBasisCode: 'disclosure',
            },
            bizsiteanalytics: {
              legalBasisCode: 'disclosure',
            },
            persads: {
              legalBasisCode: 'disclosure',
            },
            personzation: {
              legalBasisCode: 'disclosure',
            },
          },
        }),
      ).resolves.toBe(v)

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('SetConsent', () => {
    it('calls service', () => {
      mockFetch.mockResolvedValue(void 0)

      expect(
        setConsent(baseUrl, {
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          identities: {
            swb_switchbit: '2I0tgfvRzAyP7A9ma7Eqo6',
          },
          jurisdictionCode: '',
          purposes: {
            coreprodserv: {
              allowed: 'true',
              legalBasisCode: 'legitimateinterest',
            },
            prodservenhance: {
              allowed: 'true',
              legalBasisCode: 'consent_optin',
            },
            hschat: {
              allowed: 'false',
              legalBasisCode: 'consent_optin',
            },
            bizsiteanalytics: {
              allowed: 'false',
              legalBasisCode: 'consent_optin',
            },
            persads: {
              allowed: 'false',
              legalBasisCode: 'consent_optin',
            },
            personzation: {
              allowed: 'false',
              legalBasisCode: 'consent_optin',
            },
          },
          migrationOption: 1,
        }),
      ).resolves.toBe(void 0)

      expect(mockFetch).toHaveBeenCalled()
    })
  })

  describe('InvokeRight', () => {
    it('calls service', () => {
      mockFetch.mockResolvedValue(void 0)

      expect(
        invokeRight(baseUrl, {
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          identities: {
            swb_switchbit: '2I0tgfvRzAyP7A9ma7Eqo6',
          },
          jurisdictionCode: 'gdpreea',
          rightCode: 'gdpr_portability',
          user: {
            email: 'ignore.me@ketch.com',
            first: 'Just"',
            last: 'Testing',
            country: 'FR',
            stateRegion: 'France',
            description: 'Ignore me',
          },
        }),
      ).resolves.toBe(void 0)

      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
