/* eslint-disable jest/valid-expect */
import { ConfigurationV2 } from '@ketch-sdk/ketch-types'
import { KetchWebAPI } from './index'
import mockFetch from 'jest-fetch-mock'

mockFetch.enableMocks()

beforeEach(() => {
  mockFetch.resetMocks()
})

const baseUrl = 'https://global.ketchcdn.com/web/v2'
const api = new KetchWebAPI(baseUrl)
const getOptions = { credentials: 'omit', headers: { Accept: 'application/json' }, method: 'GET', mode: 'cors' }

const baseUrlV3 = 'https://global.ketchcdn.com/web/v3'
const apiV3 = new KetchWebAPI(baseUrlV3)

describe('@ketch-com/ketch-web-api', () => {
  describe('GetLocation', () => {
    it('calls service', () => {
      const v = {
        ip: '1.2.3.5',
        countryCode: 'US',
        regionCode: 'CA',
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(api.getLocation()).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/ip', getOptions)
    })
  })

  describe('GetBootstrapConfiguration', () => {
    it('calls service', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getBootstrapConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/boot.json',
        getOptions,
      )
    })
  })

  describe('GetFullConfiguration', () => {
    it('calls service for full configuration', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getFullConfiguration({
          languageCode: 'en-US',
          hash: '8913461971881236311',
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          environmentCode: 'foo',
          deploymentID: '',
          jurisdictionCode: 'foo',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/foo/8913461971881236311/foo/en-US/config.json',
        getOptions,
      )
    })

    it('calls service for dynamic configuration', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getFullConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/config.json',
        getOptions,
      )
    })
  })

  describe('GetFullConfigurationV3', () => {
    it('calls service for full configuration', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        apiV3.getFullConfiguration({
          languageCode: 'en-US',
          hash: '8913461971881236311',
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          environmentCode: 'foo',
          deploymentID: '',
          jurisdictionCode: 'foo',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        // eslint-disable-next-line max-len
        'https://global.ketchcdn.com/web/v3/config/switchbitcorp/foo/foo/foo/en-US/config.json?hash=8913461971881236311',
        getOptions,
      )
    })

    it('calls service for dynamic configuration', () => {
      const v = {
        language: 'en-US',
        regulations: ['gdpr'],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        apiV3.getFullConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v3/config/switchbitcorp/foo/config.json',
        getOptions,
      )
    })
  })

  describe('GetSubscriptionConfiguration', () => {
    it('calls service', () => {
      const v = {
        identities: {},
        controls: [],
        topics: [],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getSubscriptionsConfiguration({
          languageCode: 'en-US',
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          experienceCode: 'bar',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/en-US/bar/subscriptions.json',
        getOptions,
      )
    })
  })

  describe('GetConsentConfiguration - With hash', () => {
    it('calls service', () => {
      const v: ConfigurationV2 = {
        organization: {
          code: 'switchbitcorp',
        },
        formTemplates: [],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getConsentConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          envCode: 'test',
          jurisdictionCode: 'bar',
          langCode: 'en-US',
          hash: 'baz',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/test/bar/en-US/consent.json?hash=baz',
        getOptions,
      )
    })
  })

  describe('GetConsentConfiguration - Without hash', () => {
    it('calls service', () => {
      const v: ConfigurationV2 = {
        organization: {
          code: 'switchbitcorp',
        },
        formTemplates: [],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getConsentConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          envCode: 'test',
          jurisdictionCode: 'bar',
          langCode: 'en-US',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/test/bar/en-US/consent.json',
        getOptions,
      )
    })
  })

  describe('GetPreferenceConfiguration - With hash', () => {
    it('calls service', () => {
      const v: ConfigurationV2 = {
        organization: {
          code: 'switchbitcorp',
        },
        formTemplates: [],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getPreferenceConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          envCode: 'test',
          jurisdictionCode: 'bar',
          langCode: 'en-US',
          hash: 'baz',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/test/bar/en-US/preference.json?hash=baz',
        getOptions,
      )
    })
  })

  describe('GetPreferenceConfiguration - Without hash', () => {
    it('calls service', () => {
      const v: ConfigurationV2 = {
        organization: {
          code: 'switchbitcorp',
        },
        formTemplates: [],
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getPreferenceConfiguration({
          organizationCode: 'switchbitcorp',
          propertyCode: 'foo',
          envCode: 'test',
          jurisdictionCode: 'bar',
          langCode: 'en-US',
        }),
      ).resolves.toStrictEqual(v)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/test/bar/en-US/preference.json',
        getOptions,
      )
    })
  })

  describe('GetConsent', () => {
    it('calls service', () => {
      const v = {
        organizationCode: 'switchbitcorp',
        purposes: {
          coreprodserv: {
            allowed: 'true',
          },
        },
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getConsent({
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
      ).resolves.toStrictEqual(v)

      const options = {
        /*eslint-disable max-len*/
        body: '{"organizationCode":"switchbitcorp","propertyCode":"switchbit","environmentCode":"production","identities":{"swb_switchbit":"2I0tgfvRzAyP7A9ma7Eqo6"},"jurisdictionCode":"default","purposes":{"coreprodserv":{"legalBasisCode":"disclosure"},"prodservenhance":{"legalBasisCode":"disclosure"},"hschat":{"legalBasisCode":"disclosure"},"bizsiteanalytics":{"legalBasisCode":"disclosure"},"persads":{"legalBasisCode":"disclosure"},"personzation":{"legalBasisCode":"disclosure"}}}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/consent/switchbitcorp/get', options)
    })

    it('Responds with request payload incase of synthetic response', () => {
      const v = {
        purposes: {},
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      const reqPayload = {
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
      }

      expect(api.getConsent(reqPayload)).resolves.toStrictEqual(reqPayload)
    })

    it('Responds with request payload incase of network error', () => {
      const reqPayload = {
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
      }

      mockFetch.mockRejectOnce(reqPayload => Promise.resolve(reqPayload))
      expect(api.getConsent(reqPayload)).resolves.toStrictEqual(reqPayload)
    })
  })

  describe('SetConsent', () => {
    it('calls service', () => {
      mockFetch.mockResponseOnce(JSON.stringify({}))

      expect(
        api.setConsent({
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
        }),
      ).resolves.toBeUndefined()

      const options = {
        /*eslint-disable max-len*/
        body: '{"organizationCode":"switchbitcorp","propertyCode":"switchbit","environmentCode":"production","identities":{"swb_switchbit":"2I0tgfvRzAyP7A9ma7Eqo6"},"jurisdictionCode":"","purposes":{"coreprodserv":{"allowed":"true","legalBasisCode":"legitimateinterest"},"prodservenhance":{"allowed":"true","legalBasisCode":"consent_optin"},"hschat":{"allowed":"false","legalBasisCode":"consent_optin"},"bizsiteanalytics":{"allowed":"false","legalBasisCode":"consent_optin"},"persads":{"allowed":"false","legalBasisCode":"consent_optin"},"personzation":{"allowed":"false","legalBasisCode":"consent_optin"}}}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/consent/switchbitcorp/update', options)
    })

    it('Responds with undefined incase of network error', () => {
      const reqPayload = {
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
      }

      mockFetch.mockRejectOnce(() => Promise.resolve(undefined))
      expect(api.setConsent(reqPayload)).resolves.toBeUndefined()
    })
  })

  describe('GetSubscriptions', () => {
    it('calls service', () => {
      const v = {
        topics: {
          coreprodserv: {
            status: 'granted',
          },
        },
      }
      mockFetch.mockResponseOnce(JSON.stringify(v))

      expect(
        api.getSubscriptions({
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          identities: {
            swb_switchbit: '2I0tgfvRzAyP7A9ma7Eqo6',
          },
        }),
      ).resolves.toStrictEqual(v)

      const options = {
        /*eslint-disable max-len*/
        body: '{"organizationCode":"switchbitcorp","propertyCode":"switchbit","environmentCode":"production","identities":{"swb_switchbit":"2I0tgfvRzAyP7A9ma7Eqo6"}}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/subscriptions/switchbitcorp/get',
        options,
      )
    })
  })

  describe('SetSubscriptions', () => {
    it('calls service', () => {
      mockFetch.mockResponseOnce(JSON.stringify({}))

      expect(
        api.setSubscriptions({
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          identities: {
            swb_switchbit: '2I0tgfvRzAyP7A9ma7Eqo6',
          },
        }),
      ).resolves.toBeUndefined()

      const options = {
        /*eslint-disable max-len*/
        body: '{"organizationCode":"switchbitcorp","propertyCode":"switchbit","environmentCode":"production","identities":{"swb_switchbit":"2I0tgfvRzAyP7A9ma7Eqo6"}}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith(
        'https://global.ketchcdn.com/web/v2/subscriptions/switchbitcorp/update',
        options,
      )
    })
  })

  describe('InvokeRight', () => {
    it('calls service', () => {
      mockFetch.mockResponseOnce(JSON.stringify({}))

      expect(
        api.invokeRight({
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
            firstName: 'Just"',
            lastName: 'Testing',
            country: 'FR',
            stateRegion: 'France',
            description: 'Ignore me',
          },
        }),
      ).resolves.toStrictEqual({})

      const options = {
        /*eslint-disable max-len*/
        body: '{"organizationCode":"switchbitcorp","propertyCode":"switchbit","environmentCode":"production","identities":{"swb_switchbit":"2I0tgfvRzAyP7A9ma7Eqo6"},"jurisdictionCode":"gdpreea","rightCode":"gdpr_portability","user":{"email":"ignore.me@ketch.com","firstName":"Just\\"","lastName":"Testing","country":"FR","stateRegion":"France","description":"Ignore me"}}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/rights/switchbitcorp/invoke', options)
    })
  })

  describe('preferenceQR', () => {
    it('calls service', () => {
      expect(
        api.preferenceQR({
          organizationCode: 'switchbitcorp',
          propertyCode: 'switchbit',
          environmentCode: 'production',
          imageSize: 1024,
          path: '/policy.html',
          backgroundColor: 'white',
          foregroundColor: 'black',
          parameters: { foo: 'bar' },
        }),
      ).resolves.toBe(
        /*eslint-disable max-len*/
        'https://global.ketchcdn.com/web/v2/qr/switchbitcorp/switchbit/preferences.png?env=production&size=1024&path=%2Fpolicy.html&bgcolor=white&fgcolor=black&foo=bar',
      )
    })
  })

  describe('webReport', () => {
    it('calls service', () => {
      mockFetch.mockResponseOnce(JSON.stringify({}))

      expect(
        api.webReport('mychannel', {
          type: 'sometype',
          url: 'https://localhost/',
          age: 1,
          body: {
            mykey: 'myvalue',
          },
          user_agent: 'myagent',
        }),
      ).resolves.toBeUndefined()

      const options = {
        /*eslint-disable max-len*/
        body: '{"type":"sometype","url":"https://localhost/","age":1,"body":{"mykey":"myvalue"},"user_agent":"myagent"}',
        credentials: 'omit',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        method: 'POST',
        mode: 'cors',
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/report/mychannel', options)
    })
  })
})
