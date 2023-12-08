import {
  Configuration,
  GetBootstrapConfigurationRequest,
  GetConsentRequest,
  GetConsentResponse,
  GetFullConfigurationRequest,
  GetLocationResponse,
  GetPreferenceQRRequest,
  GetSubscriptionConfigurationRequest,
  SubscriptionConfiguration,
  GetSubscriptionsRequest,
  GetSubscriptionsResponse,
  SetSubscriptionsRequest,
  InvokeRightRequest,
  SetConsentRequest,
  WebReportRequest,
} from '@ketch-sdk/ketch-types'

/**
 * KetchWebAPI is a client for the Ketch Web API.
 */
export class KetchWebAPI {
  private readonly _baseUrl: string

  private readonly _fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

  /**
   * Create a new KetchWebAPI with the given base url
   *
   * @param baseUrl The base url of the Ketch Web API
   * @param fetchOverride To use a different fetch to [native Fetch API](https://mdn.io/fetch)
   */
  constructor(baseUrl: string, fetchOverride?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) {
    this._baseUrl = baseUrl
    this._fetch = fetchOverride || global.fetch
  }

  /**
   * Get location details based on the IP address.
   *
   */
  async getLocation(): Promise<GetLocationResponse> {
    const resp = await this.get(`/ip`)
    return resp as GetLocationResponse
  }

  /**
   * Gets the bootstrap configuration for the specified parameters.
   *
   * @param request The configuration request
   */
  async getBootstrapConfiguration(request: GetBootstrapConfigurationRequest): Promise<Configuration> {
    const resp = await this.get(`/config/${request.organizationCode}/${request.propertyCode}/boot.json`)
    return resp as Configuration
  }

  /**
   * Gets the full configuration for the specified parameters.
   *
   * @param request The configuration request
   */
  async getFullConfiguration(request: GetFullConfigurationRequest): Promise<Configuration> {
    let fullDetails = ''

    if (request.environmentCode && request.hash && request.jurisdictionCode && request.languageCode) {
      fullDetails = `/${request.environmentCode}/${request.hash}/${request.jurisdictionCode}/${request.languageCode}`
    }

    const resp = await this.get(`/config/${request.organizationCode}/${request.propertyCode}${fullDetails}/config.json`)
    return resp as Configuration
  }

  /**
   * Gets the subscriptions configuration for the specified parameters.
   *
   * @param request The configuration request
   */
  async getSubscriptionsConfiguration(
    request: GetSubscriptionConfigurationRequest,
  ): Promise<SubscriptionConfiguration> {
    const {
      organizationCode: orgCode,
      propertyCode: propCode,
      languageCode: langCode,
      experienceCode: expCode,
    } = request
    const resp = await this.get(`/config/${orgCode}/${propCode}/${langCode}/${expCode}/subscriptions.json`)
    return resp as SubscriptionConfiguration
  }

  /**
   *  Gets the current state of the user's consent flags.
   *
   * @param request The user consent request
   */
  async getConsent(request: GetConsentRequest): Promise<GetConsentResponse> {
    try {
      const resp: GetConsentResponse = await this.post(`/consent/${request.organizationCode}/get`, request)
      if (resp && resp.purposes && Object.keys(resp.purposes).length) return resp

      // Return request incase of 204 synthetic response
      return request as GetConsentResponse
    } catch (e) {
      // Incase of an unlikely scenario fulfill promise with request
      return request as GetConsentResponse
    }
  }

  /**
   * Sets the user's consent flags.
   *
   * @param request The use consent request
   */
  async setConsent(request: SetConsentRequest): Promise<void> {
    try {
      await this.post(`/consent/${request.organizationCode}/update`, request)
    } catch (e) {
      // Incase of an unlikely scenario fulfill promise with same value (undefined) when request succeeds
      return
    }
  }

  /**
   *  Gets the current state of the user's Subscriptions.
   *
   * @param request The user's Subscription request
   */
  async getSubscriptions(request: GetSubscriptionsRequest): Promise<GetSubscriptionsResponse> {
    const resp = await this.post(`/subscriptions/${request.organizationCode}/get`, request)
    return resp as GetSubscriptionsResponse
  }

  /**
   * Sets the user's Subscriptions.
   *
   * @param request The user's Subscriptions request
   */
  async setSubscriptions(request: SetSubscriptionsRequest): Promise<void> {
    await this.post(`/subscriptions/${request.organizationCode}/update`, request)
  }

  /**
   * Invokes the specified rights.
   *
   * @param request The request to invoke.
   */
  async invokeRight(request: InvokeRightRequest): Promise<any> {
    return this.post(`/rights/${request.organizationCode}/invoke`, request)
  }

  /**
   * Get the preferences QR code image URL
   *
   * @param request The preferences QR request
   */
  async preferenceQR(request: GetPreferenceQRRequest): Promise<string> {
    const url = new URL(`${this._baseUrl}/qr/${request.organizationCode}/${request.propertyCode}/preferences.png`)
    if (request.environmentCode) {
      url.searchParams.set('env', request.environmentCode)
    }
    if (request.imageSize) {
      url.searchParams.set('size', request.imageSize.toString())
    }
    if (request.path) {
      url.searchParams.set('path', request.path)
    }
    if (request.backgroundColor) {
      url.searchParams.set('bgcolor', request.backgroundColor)
    }
    if (request.foregroundColor) {
      url.searchParams.set('fgcolor', request.foregroundColor)
    }
    for (const k of Object.keys(request.parameters)) {
      url.searchParams.set(k, request.parameters[k])
    }
    return url.toString()
  }

  /**
   * Upload a web report
   *
   * @param channel Channel to report on
   * @param request The web report
   */
  async webReport(channel: string, request: WebReportRequest): Promise<void> {
    await this.post(`/report/${channel}`, request)
  }

  private async get(url: string): Promise<any> {
    return this._fetch(this._baseUrl + url, this.fetchOptions('GET')).then(x => x.json())
  }

  private async post(url: string, request: any): Promise<any> {
    const response = await this._fetch(this._baseUrl + url, this.fetchOptions('POST', request))

    if (!response.ok) {
      throw new Error(await response.text())
    }

    return response.json()
  }

  private fetchOptions(method: string, body?: any): RequestInit {
    const options: RequestInit = {
      method: method,
      mode: 'cors',
      credentials: 'omit',
    }

    const json = 'application/json'

    if (body) {
      options.body = JSON.stringify(body)
      options.headers = {
        Accept: json,
        'Content-Type': json,
      }
    } else {
      options.headers = {
        Accept: json,
      }
    }

    return options
  }
}
