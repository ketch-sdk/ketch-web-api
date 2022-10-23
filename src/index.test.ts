/* eslint-disable jest/valid-expect */
import {KetchWebAPI} from "./index"
import mockFetch from "jest-fetch-mock";

mockFetch.enableMocks();

beforeEach(() => {
  mockFetch.resetMocks();
})

const baseUrl = 'https://global.ketchcdn.com/web/v2'
const api = new KetchWebAPI(baseUrl)
const getOptions = {"credentials": "omit", "headers": {"Accept": "application/json"}, "method": "GET", "mode": "cors"}
// const postOptions = {"credentials": "omit", "headers": {"Accept": "application/json"}, "method": "POST", "mode": "cors"}

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

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/boot.json', getOptions)
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

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/foo/8913461971881236311/foo/en-US/config.json', getOptions)
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

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/config/switchbitcorp/foo/config.json', getOptions)
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
        "body": "{\"organizationCode\":\"switchbitcorp\",\"propertyCode\":\"switchbit\",\"environmentCode\":\"production\",\"identities\":{\"swb_switchbit\":\"2I0tgfvRzAyP7A9ma7Eqo6\"},\"jurisdictionCode\":\"default\",\"purposes\":{\"coreprodserv\":{\"legalBasisCode\":\"disclosure\"},\"prodservenhance\":{\"legalBasisCode\":\"disclosure\"},\"hschat\":{\"legalBasisCode\":\"disclosure\"},\"bizsiteanalytics\":{\"legalBasisCode\":\"disclosure\"},\"persads\":{\"legalBasisCode\":\"disclosure\"},\"personzation\":{\"legalBasisCode\":\"disclosure\"}}}",
        "credentials": "omit",
        "headers": {"Accept": "application/json", "Content-Type": "application/json"},
        "method": "POST",
        "mode": "cors"
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/consent/switchbitcorp/get', options)
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
          migrationOption: 1,
        }),
      ).resolves.toStrictEqual(undefined)

      const options = {
        "body": "{\"organizationCode\":\"switchbitcorp\",\"propertyCode\":\"switchbit\",\"environmentCode\":\"production\",\"identities\":{\"swb_switchbit\":\"2I0tgfvRzAyP7A9ma7Eqo6\"},\"jurisdictionCode\":\"\",\"purposes\":{\"coreprodserv\":{\"allowed\":\"true\",\"legalBasisCode\":\"legitimateinterest\"},\"prodservenhance\":{\"allowed\":\"true\",\"legalBasisCode\":\"consent_optin\"},\"hschat\":{\"allowed\":\"false\",\"legalBasisCode\":\"consent_optin\"},\"bizsiteanalytics\":{\"allowed\":\"false\",\"legalBasisCode\":\"consent_optin\"},\"persads\":{\"allowed\":\"false\",\"legalBasisCode\":\"consent_optin\"},\"personzation\":{\"allowed\":\"false\",\"legalBasisCode\":\"consent_optin\"}},\"migrationOption\":1}",
        "credentials": "omit",
        "headers": {"Accept": "application/json", "Content-Type": "application/json"},
        "method": "POST",
        "mode": "cors"
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/consent/switchbitcorp/update', options)
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
            first: 'Just"',
            last: 'Testing',
            country: 'FR',
            stateRegion: 'France',
            description: 'Ignore me',
          },
        }),
      ).resolves.toStrictEqual(undefined)

      const options = {
        "body": "{\"organizationCode\":\"switchbitcorp\",\"propertyCode\":\"switchbit\",\"environmentCode\":\"production\",\"identities\":{\"swb_switchbit\":\"2I0tgfvRzAyP7A9ma7Eqo6\"},\"jurisdictionCode\":\"gdpreea\",\"rightCode\":\"gdpr_portability\",\"user\":{\"email\":\"ignore.me@ketch.com\",\"first\":\"Just\\\"\",\"last\":\"Testing\",\"country\":\"FR\",\"stateRegion\":\"France\",\"description\":\"Ignore me\"}}",
        "credentials": "omit",
        "headers": {"Accept": "application/json", "Content-Type": "application/json"},
        "method": "POST",
        "mode": "cors"
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/rights/switchbitcorp/invoke', options)
    })
  })

  describe('preferenceQR', () => {
    it('calls service', () => {
      expect(api.preferenceQR({
        organizationCode: 'switchbitcorp',
        propertyCode: 'switchbit',
        environmentCode: 'production',
        imageSize: 1024,
        path: '/policy.html',
        backgroundColor: 'white',
        foregroundColor: 'black',
        parameters: {'foo': 'bar'},
      })).resolves.toStrictEqual('https://global.ketchcdn.com/web/v2/qr/switchbitcorp/switchbit/preferences.png?env=production&size=1024&path=%2Fpolicy.html&bgcolor=white&fgcolor=black&foo=bar')
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
            'mykey': 'myvalue',
          },
          user_agent: 'myagent',
        }),
      ).resolves.toStrictEqual(undefined)

      const options = {
        "body": "{\"type\":\"sometype\",\"url\":\"https://localhost/\",\"age\":1,\"body\":{\"mykey\":\"myvalue\"},\"user_agent\":\"myagent\"}",
        "credentials": "omit",
        "headers": {"Accept": "application/json", "Content-Type": "application/json"},
        "method": "POST",
        "mode": "cors"
      }

      expect(mockFetch).toHaveBeenCalledWith('https://global.ketchcdn.com/web/v2/report/mychannel', options)
    })
  })
})
