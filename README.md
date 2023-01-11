# ketch-web-api

Ketch Web API interface.

## Constructor

```typescript
import {KetchWebAPI} from '@ketch-sdk/ketch-web-api'

const baseUrl: string = 'https://global.ketchcdn.com/web/v2'

const s = new KetchWebAPI(baseUrl)
```

Create a new KetchWebAPI with the given base url

## Get the bootstrap configuration

```typescript
const request: GetBootstrapConfigurationRequest = {
  organizationCode: 'axonic',
  propertyCode: 'axonic',
}
const config: Configuration = await s.getBootstrapConfiguration(request)
```

Gets the bootstrap configuration for the specified parameters.

## Get the full configuration

```typescript
const request: GetFullConfigurationRequest = {
  organizationCode: 'axonic',
  propertyCode: 'axonic',
  environmentCode: 'production',
  jurisdictionCode: 'caccpa',
  languageCode: 'es',
}
const config: Configuration = await s.getFullConfiguration(request)
```

Gets the full configuration for the specified parameters.

## Get consent

```typescript
const request: GetConsentRequest = {
  organizationCode: 'axonic',
  // controllerCode: '', - optional controller
  propertyCode: 'axonic',
  environmentCode: 'production',
  jurisdictionCode: 'caccpa',
  identities: {
    'id1': 'val1',
  },
  purposes: {
    'analytics': {
       // allowed: 'true', - optional, pass in locally stored consent if available
       legalBasisCode: 'disclosure',
    },
  },
  // vendors: string[], - optional, list of TCF vendor ID opted out
  // collectedAt: number, - optional, UNIX timestamp in seconds when the given "allowed" consent was collected
}
const consent: GetConsentResponse = await s.getConsent(request)
```

Gets the current state of the user's consent flags.

## Set consent

```typescript
const request: SetConsentRequest = {
  organizationCode: 'axonic',
  // controllerCode: '', - optional controller
  propertyCode: 'axonic',
  environmentCode: 'production',
  jurisdictionCode: 'caccpa',
  identities: {
    'id1': 'val1',
  },
  purposes: {
    'analytics': {
      allowed: 'false',
      legalBasisCode: 'consent_optin',
    },
  },
  // vendors: string[], - optional, list of TCF vendor ID opted out
  collectedAt: 2141412414,
}
await s.setConsent(request)
```

Sets the user's consent flags.

## Invoke right

```typescript
const request: InvokeRightRequest = {
  organizationCode: 'axonic',
  // controllerCode: '',
  propertyCode: 'axonic',
  environmentCode: 'production',
  identities: {
    'id1': 'val1',
  },
  invokedAt: 387642873,
  jurisdictionCode: 'caccpa',
  rightCode: 'erasure',
  user: {
    email: '',
    firstName: '',
    lastName: '',
    // country: '', - optional, ISO-3166 country code
    // stateRegion: '', - optional, region code
    // description: '', - optional, description entered by the data subject
    // phone: '', - optional, ITU formatted telephone number
    // postalCode: '', - optional, postal code
    // addressLine1: '', - optional, address line 1
    // addressLine2: '', - optional, address line 2
    // typeCode: '', - optional, identifier representing the data subject type specified by the user
    // typeRelationshipDetails: '', - optional, additional information provided by the user describing their relation to the business
  },
  // recaptchaToken: string - optional recaptcha token
}
await invokeRight(request)
```

Invokes the specified rights.

## Get preferences QR image

```typescript
const request: GetPreferenceQRRequest = {
  organizationCode: 'axonic',
  propertyCode: 'axonic',
  environmentCode: 'production',
  // imageSize?: number - image size in pixels such as 256
  // path?: string - path on the property's specified domain
  // backgroundColor?: string - RGB hex of the background color such as ffffff
  // foregroundColor?: string - RGB hex of the foreground color such as 990000
  // parameters: {
  //   'key': 'value',
  // } - additional querystring parameters to pass to the destination page
}
const url: string = await preferenceQR(request)
```

Get the preferences QR code image URL
