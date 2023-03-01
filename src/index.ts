import {
  Configuration,
  GetBootstrapConfigurationRequest,
  GetConsentRequest,
  GetConsentResponse,
  GetFullConfigurationRequest,
  GetLocationResponse,
  GetPreferenceQRRequest,
  GetSubscriptionConfigurationRequest,
  GetSubscriptionConfigurationResponse,
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

  /**
   * Create a new KetchWebAPI with the given base url
   *
   * @param baseUrl The base url of the Ketch Web API
   */
  constructor(baseUrl: string) {
    this._baseUrl = baseUrl
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
  ): Promise<GetSubscriptionConfigurationResponse> {
    const resp = await this.get(
      `/config/${request.organizationCode}/${request.propertyCode}/${request.languageCode}/subscriptions.json`,
    )
    return resp as GetSubscriptionConfigurationResponse
  }

  /**
   *  Gets the current state of the user's consent flags.
   *
   * @param request The user consent request
   */
  async getConsent(request: GetConsentRequest): Promise<GetConsentResponse> {
    const resp = await this.post(`/consent/${request.organizationCode}/get`, request)
    return resp as GetConsentResponse
  }

  /**
   * Sets the user's consent flags.
   *
   * @param request The use consent request
   */
  async setConsent(request: SetConsentRequest): Promise<void> {
    await this.post(`/consent/${request.organizationCode}/update`, request)
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
  async invokeRight(request: InvokeRightRequest): Promise<void> {
    await this.post(`/rights/${request.organizationCode}/invoke`, request)
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
    return fetch(this._baseUrl + url, this.fetchOptions('GET')).then(x => x.json())
  }

  private async post(url: string, request: any): Promise<any> {
    return fetch(this._baseUrl + url, this.fetchOptions('POST', request)).then(x => x.json())
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
