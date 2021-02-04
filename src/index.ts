import fetch from "./lib/fetch";

const baseUrl = 'https://global.ketchcdn.com/web/v1';

function fetchOptions(method: string, body?: any): RequestInit {
  const options: RequestInit = {
    method: method,
    mode: 'cors',
    credentials: 'omit',
  }

  if (body != null) {
    options.body = JSON.stringify(body)
    options.headers = {
      'Content-Type': 'application/json'
    }
  }

  return options
}

// Get location details based on the IP address.
export function GetLocation(request: GetLocationRequest): Promise<GetLocationResponse> {
  const url = `/ip/${request.IP}`;
  return fetch(baseUrl + url, fetchOptions('GET')).then(resp => resp as GetLocationResponse);
}

// Gets the full configuration for the specified parameters.
export function GetFullConfiguration(request: GetFullConfigurationRequest): Promise<Configuration> {
  const url = `/config/${request.organizationCode}/${request.appCode}/${request.envCode}/${request.hash}/${request.policyScopeCode}/${request.languageCode}/config.json`;
  return fetch(baseUrl + url, fetchOptions('GET')).then(resp => resp as Configuration);
}

// Gets the current state of the user's consent flags.
export function GetConsent(request: GetConsentRequest): Promise<GetConsentResponse> {
  const url = `/consent/${request.organizationCode}/get`;
  return fetch(baseUrl + url, fetchOptions('POST', request)).then(resp => resp as GetConsentResponse);
}

// Sets the user's consent flags.
export function SetConsent(request: SetConsentRequest): Promise<void> {
  const url = `/consent/${request.organizationCode}/update`;
  return fetch(baseUrl + url, fetchOptions('POST', request)).then(() => {});
}

// Invokes the specified rights.
export function InvokeRight(request: InvokeRightRequest): Promise<void> {
  const url = `/rights/${request.organizationCode}/invoke`;
  return fetch(baseUrl + url, fetchOptions('POST', request)).then(() => {});
}
