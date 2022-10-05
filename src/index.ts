import fetch from './lib/fetch'

export enum ExperienceDefault {
  BANNER = 1,
  MODAL,
}

export enum ExperienceButtonDestination {
  GOTO_MODAL = 1,
  GOTO_PREFERENCE = 2,
  REJECT_ALL = 3,
}

export enum ExperiencePrimaryButtonAction {
  SAVE_CURRENT_STATE = 1,
  ACCEPT_ALL = 2,
}

export enum MigrationOption {
  MIGRATE_DEFAULT,
  MIGRATE_NEVER,
  MIGRATE_FROM_ALLOW,
  MIGRATE_FROM_DENY,
  MIGRATE_ALWAYS,
}

export enum CookieDuration {
  SESSION = 1,
  PERSISTENT,
}

export enum CookieProvenance {
  FIRST_PARTY = 1,
  THIRD_PARTY,
}

export enum CookieCategory {
  STRICTLY_NECESSARY = 1,
  FUNCTIONAL,
  PERFORMANCE,
  MARKETING,
}

// interface Error {
//   code: string;
//   interface: string;
//   status: number;
// }
//
// interface ErrorResponse {
//   error: Error;
// }

export interface IPLanguage {
  code: string
  name: string
  native: string
}

export interface IPLocation {
  geonameId: number
  capital: string
  languages: IPLanguage[]
  countryFlag: string
  countryFlagEmoji: string
  countryFlagEmojiUnicode: string
  callingCode: string
  isEU: boolean
}

export interface IPInfo {
  ip: string
  hostname: string
  continentCode: string
  continentName: string
  countryCode: string
  countryName: string
  regionCode: string
  regionName: string
  city: string
  zip: string
  latitude: number
  longitude: number
  location: IPLocation
}

export interface GetLocationRequest {
  IP?: string
}

export interface GetLocationResponse {
  location: IPInfo
}

export interface PurposeLegalBasis {
  legalBasisCode: string
}

export interface PurposeAllowed {
  allowed: string
}

export interface PurposeAllowedLegalBasis {
  allowed: string
  legalBasisCode: string
}

export interface GetConsentRequest {
  organizationCode: string
  controllerCode?: string
  propertyCode: string
  environmentCode: string
  jurisdictionCode: string
  identities: { [key: string]: string }
  purposes: { [key: string]: PurposeLegalBasis }
}

export interface GetConsentResponse {
  purposes: { [key: string]: PurposeAllowed | string }
  vendors?: string[] // list of vendor ids for which the user has opted out
}

export interface SetConsentRequest {
  organizationCode: string
  controllerCode?: string
  propertyCode: string
  environmentCode: string
  identities: { [key: string]: string }
  collectedAt?: number
  jurisdictionCode: string
  migrationOption: MigrationOption
  purposes: { [key: string]: PurposeAllowedLegalBasis }
  vendors?: string[] // list of vendor ids for which the user has opted out
}

export interface User {
  email: string
  first: string
  last: string
  country?: string
  stateRegion?: string
  description?: string
  phone?: string
  postalCode?: string
  addressLine1?: string
  addressLine2?: string
}

export interface InvokeRightRequest {
  organizationCode: string
  controllerCode?: string
  propertyCode: string
  environmentCode: string
  identities: { [key: string]: string }
  invokedAt?: number
  jurisdictionCode: string
  rightCode: string
  user: User
}

export interface GetBootstrapConfigurationRequest {
  organizationCode: string
  propertyCode: string
}

export interface GetFullConfigurationRequest {
  organizationCode: string
  propertyCode: string
  environmentCode: string
  hash: string
  deploymentID?: string
  jurisdictionCode: string
  languageCode: string
}

export interface Organization {
  code: string
}

export interface JurisdictionInfo {
  code?: string
  defaultScopeCode?: string
  variable?: string
  scopes?: { [key: string]: string }
}

export interface Property {
  code?: string
  name?: string
  platform?: string
}

export interface Environment {
  code: string
  pattern?: string
  hash?: string
}

export interface Deployment {
  code: string
  version: number
}

export interface Cookie {
  name: string
  code: string
  host: string
  duration: CookieDuration
  provenance: CookieProvenance
  category: CookieCategory
  description: string
  serviceProvider: string
  latest: boolean
  version: number
}

export type PurposeCategory = {
  name: string
  description: string
  retentionPeriod: string
  externalTransfers: string
}

export interface Purpose {
  code: string
  name?: string
  description?: string
  legalBasisCode: string
  requiresOptIn?: boolean
  allowsOptOut?: boolean
  requiresDisplay?: boolean
  requiresPrivacyPolicy?: boolean
  cookies?: Cookie[]
  categories?: PurposeCategory[]
  tcfType?: string
  tcfID?: string
  canonicalPurposeCode?: string
  legalBasisName?: string
  legalBasisDescription?: string

  // the identifier of the stack that the purpose belongs to when displayed. If empty, this purpose belongs to no stack
  stackID?: string

  // the data subjects for which the purpose is relevant. If this list is empty, the purpose applies to all data subjects
  dataSubjectCodes?: string[]
}

export interface CanonicalPurpose {
  code: string
  name: string
  purposeCodes?: string[]
}

export interface Identity {
  type: string
  variable: string
}

export interface PolicyDocument {
  code: string
  version: number
  url: string
}

export interface Banner {
  title?: string
  footerDescription: string
  buttonText: string
  primaryButtonAction?: ExperiencePrimaryButtonAction
  secondaryButtonText?: string
  secondaryButtonDestination?: ExperienceButtonDestination

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface Modal {
  title: string
  bodyTitle?: string
  bodyDescription?: string
  buttonText: string

  // consentTitle is the heading that goes above the list of purposes
  // if not
  consentTitle?: string

  // hideConsentTitle determines whether the consent title should be hidden. Default is to show
  hideConsentTitle?: boolean

  // hideLegalBases determines whether the legal bases should be hidden. Default is to show
  hideLegalBases?: boolean

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface JIT {
  title?: string
  bodyDescription?: string
  acceptButtonText: string
  declineButtonText: string
  moreInfoText?: string
  moreInfoDestination?: ExperienceButtonDestination

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface RightsTab {
  tabName: string
  bodyTitle?: string
  bodyDescription?: string
  buttonText: string

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface ConsentsTab {
  tabName: string
  bodyTitle?: string
  bodyDescription?: string
  buttonText: string

  // consentTitle is the heading that goes above the list of purposes
  consentTitle?: string

  // hideConsentTitle determines whether the consent title should be hidden. Default is to show
  hideConsentTitle?: boolean

  // hideLegalBases determines whether the legal bases should be hidden. Default is to show
  hideLegalBases?: boolean

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface OverviewTab {
  tabName: string
  bodyTitle?: string
  bodyDescription: string

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface ConsentExperience {
  code: string
  version: number
  banner: Banner
  modal: Modal
  jit?: JIT
  experienceDefault: ExperienceDefault

  // showCloseIcon determines whether the x out icon appears in the experience. Default do not show
  showCloseIcon?: boolean

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface PreferenceExperience {
  code: string
  version: number
  title: string
  rights?: RightsTab
  consents?: ConsentsTab
  overview: OverviewTab

  // showCloseIcon determines whether the x out icon appears in the experience. Default do not show
  showCloseIcon?: boolean

  // additional extensions
  extensions?: { [key: string]: string }
}

export interface Right {
  code: string
  name: string
  description: string

  // the data subjects for which the right is relevant. If this list is empty then the right applies to all data subjects
  dataSubjectCodes?: string[]
}

export interface Experience {
  consent?: ConsentExperience
  preference?: PreferenceExperience
}

export enum BannerPosition {
  BOTTOM = 1,
  TOP = 2,
  BOTTOM_LEFT = 3,
  BOTTOM_RIGHT = 4,
}

export enum ModalPosition {
  CENTER = 1,
  LEFT_FULL_HEIGHT = 2,
  RIGHT_FULL_HEIGHT = 3,
}

export interface Theme {
  watermark?: boolean
  buttonBorderRadius: number

  bannerBackgroundColor: string
  bannerContentColor?: string
  bannerButtonColor: string
  bannerSecondaryButtonColor?: string
  bannerPosition?: BannerPosition

  modalHeaderBackgroundColor: string
  modalHeaderContentColor?: string
  modalContentColor: string
  modalButtonColor: string
  modalPosition?: ModalPosition

  formHeaderBackgroundColor: string
  formHeaderContentColor?: string
  formContentColor: string
  formButtonColor: string
}

export interface VendorPurpose {
  name: string
  legalBasis?: string // legalBasisName
}

export interface Vendor {
  id: string
  name: string
  purposes?: VendorPurpose[]
  specialPurposes?: VendorPurpose[]
  features?: VendorPurpose[]
  specialFeatures?: VendorPurpose[]
  policyUrl?: string
  cookieMaxAgeSeconds?: number
  usesCookies?: boolean
  UsesNonCookieAccess?: boolean
}

// DataSubject represents user defined data subjects with code as the unique identifier
export interface DataSubject {
  code: string
  name: string
}

// Stack represents a grouping of purposes to be displayed in an experience
export interface Stack {
  id: string
  name: string
}

export interface Configuration {
  language?: string
  organization: Organization
  property?: Property
  environments?: Environment[]
  environment?: Environment
  jurisdiction?: JurisdictionInfo
  identities?: { [key: string]: Identity }
  deployment?: Deployment
  regulations?: string[]
  rights?: Right[]
  purposes?: Purpose[]
  canonicalPurposes?: { [key: string]: CanonicalPurpose }
  experiences?: Experience
  services?: { [key: string]: string }
  options?: { [key: string]: string }
  privacyPolicy?: PolicyDocument
  termsOfService?: PolicyDocument
  theme?: Theme
  scripts?: string[]
  vendors?: Vendor[]

  // dataSubjects is the list of data subjects relevant for this configuration
  dataSubjects?: DataSubject[]

  // stacks is the list of stacks to be displayed in an experience
  stacks?: Stack[]
}

function fetchOptions(method: string, body?: any): RequestInit {
  const options: RequestInit = {
    method: method,
    mode: 'cors',
    credentials: 'omit',
  }

  if (body != null) {
    options.body = JSON.stringify(body)
    options.headers = {
      'Content-Type': 'application/json',
    }
  }

  return options
}

// Get location details based on the IP address.
export function getLocation(baseUrl: string): Promise<GetLocationResponse> {
  const url = `/ip`
  return fetch(baseUrl + url, fetchOptions('GET')).then((resp: any) => resp as GetLocationResponse)
}

// Gets the bootstrap configuration for the specified parameters.
export function getBootstrapConfiguration(
  baseUrl: string,
  request: GetBootstrapConfigurationRequest,
): Promise<Configuration> {
  const url = `/config/${request.organizationCode}/${request.propertyCode}/boot.json`
  return fetch(baseUrl + url, fetchOptions('GET')).then((resp: any) => resp as Configuration)
}

// Gets the full configuration for the specified parameters.
export function getFullConfiguration(baseUrl: string, request: GetFullConfigurationRequest): Promise<Configuration> {
  // eslint-disable-next-line max-len
  const url = `/config/${request.organizationCode}/${request.propertyCode}/${request.environmentCode}/${request.hash}/${request.jurisdictionCode}/${request.languageCode}/config.json`
  return fetch(baseUrl + url, fetchOptions('GET')).then((resp: any) => resp as Configuration)
}

// Gets the current state of the user's consent flags.
export function getConsent(baseUrl: string, request: GetConsentRequest): Promise<GetConsentResponse> {
  const url = `/consent/${request.organizationCode}/get`
  return fetch(baseUrl + url, fetchOptions('POST', request)).then((resp: any) => resp as GetConsentResponse)
}

// Sets the user's consent flags.
export function setConsent(baseUrl: string, request: SetConsentRequest): Promise<void> {
  const url = `/consent/${request.organizationCode}/update`
  return fetch(baseUrl + url, fetchOptions('POST', request)).then(() => {})
}

// Invokes the specified rights.
export function invokeRight(baseUrl: string, request: InvokeRightRequest): Promise<void> {
  const url = `/rights/${request.organizationCode}/invoke`
  return fetch(baseUrl + url, fetchOptions('POST', request)).then(() => {})
}
