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

  // identityPriority is a map from the identity space code to the priority that should be used to resolve consent conflict
  // lower values take top priority
  // if an identity space codes is not in the identityPriority map then it is the last priority
  identityPriority: { [key: string]: number }
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

  // typeCode is the identifier representing the data subject type specified by the user
  typeCode?: string

  // typeRelationshipDetails is additional information provided by the user describing their relation to the business
  typeRelationshipDetails?: string
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

  // the data subject types for which the purpose is relevant. If this list is empty then the purpose applies to all data subject types
  dataSubjectTypeCodes?: string[]
}

export interface CanonicalPurpose {
  code: string
  name: string
  purposeCodes?: string[]
}

// IdentityLocation is the location on the page from which to retrieve identity information
export enum IdentityType {
  IDENTITY_TYPE_UNDEFINED = "",
  IDENTITY_TYPE_DATA_LAYER = "dataLayer",
  IDENTITY_TYPE_WINDOW = "window",
  IDENTITY_TYPE_COOKIE = "cookie",
  IDENTITY_TYPE_MANAGED = "managedCookie", // this is created if necessary and stored in a cookie with the associated name
  IDENTITY_TYPE_LOCAL_STORAGE = "localStorage",
  IDENTITY_TYPE_SESSION_STORAGE = "sessionStorage",
  IDENTITY_TYPE_QUERY_STRING = "queryString",
}

// IdentityFormat is the encoding of the string identity value
export enum IdentityFormat {
  IDENTITY_FORMAT_UNDEFINED = "",
  IDENTITY_FORMAT_STRING = "string",
  IDENTITY_FORMAT_JSON = "json",
  IDENTITY_FORMAT_JWT = "jwt",
  IDENTITY_FORMAT_QUERY = "query",
  IDENTITY_FORMAT_SEMICOLON = "semicolon",
}

// Identity represents all the metadata for an identifier on the page
export interface Identity {

  // type is the location on the page from which to retrieve identity information
  type: IdentityType

  // variable is the name to look up the identity value in the specified location
  variable: string

  // format is the encoding of the value
  format: IdentityFormat

  // key is the identifier to find the identity within the value
  // if the format is IDENTITY_FORMAT_STRING then key will be undefined
  key?: string

  // priority of the identity for consent conflict resolution
  priority?: number
}

export interface PolicyDocument {
  code: string
  version: number
  url: string
}

export enum SwitchTextRenderLogic {
  // SWITCH_TEXT_RENDER_ALL always renders the switch text regardless of state
  SWITCH_TEXT_RENDER_ALL = 1,
  // SWITCH_TEXT_RENDER_LEGAL_BASIS renders the switch text only if different from the legal basis default
  SWITCH_TEXT_RENDER_LEGAL_BASIS = 2,
  // SWITCH_TEXT_RENDER_CHANGE renders the switch only if the user changes the state of the switch
  SWITCH_TEXT_RENDER_CHANGE = 3,
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
  // this optionally overrides the standard title
  consentTitle?: string

  // hideConsentTitle determines whether the consent title should be hidden. Default is to show
  hideConsentTitle?: boolean

  // hideLegalBases determines whether the legal bases should be hidden. Default is to show
  hideLegalBases?: boolean

  // switchOnText overrides the standard text for a consent switch in the on state
  switchOnText?: string

  // switchOffText overrides the standard text for a consent switch in the off state
  switchOffText?: string

  // switchTextRenderLogic determines the logic for showing the switch text
  switchTextRenderLogic?: SwitchTextRenderLogic

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
  // this optionally overrides the standard title
  consentTitle?: string

  // hideConsentTitle determines whether the consent title should be hidden. Default is to show
  hideConsentTitle?: boolean

  // hideLegalBases determines whether the legal bases should be hidden. Default is to show
  hideLegalBases?: boolean

  // switchOnText overrides the standard text for a consent switch in the on state
  switchOnText?: string

  // switchOffText overrides the standard text for a consent switch in the off state
  switchOffText?: string

  // switchTextRenderLogic determines the logic for showing the switch text
  switchTextRenderLogic?: SwitchTextRenderLogic

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

  // the data subject types for which the right is relevant. If this list is empty then the right applies to all data subject types
  dataSubjectTypeCodes?: string[]
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
  // modalSwitchOnColor is the color of the consent switch in the on state for the modal
  // this overrides standard theme colors
  modalSwitchOnColor?: string
  // modalSwitchOffColor is the color of the consent switch in the off state for the modal
  // this overrides standard theme colors
  modalSwitchOffColor?: string

  formHeaderBackgroundColor: string
  formHeaderContentColor?: string
  formContentColor: string
  formButtonColor: string
  // formSwitchOnColor is the color of the consent switch in the on state for the form
  // this overrides standard theme colors
  formSwitchOnColor?: string
  // formSwitchOffColor is the color of the consent switch in the off state for the form
  // this overrides standard theme colors
  formSwitchOffColor?: string
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
  UsesNonCookieAccess?: boolean // deprecated

  // replaces UsesNonCookieAccess
  usesNonCookieAccess?: boolean
}

// DataSubjectType represents user defined data subject types with code as the unique identifier
export interface DataSubjectType {
  code: string
  name: string

  // requiresUserInput is true if additional information must be requested to describe the data subject relation
  requiresUserInput: boolean
}

// Stack represents a grouping of purposes to be displayed in an experience
export interface Stack {
  // name of the stack to be displayed
  name: string

  // list of purpose codes that are members of the stack
  purposeCodes: string[]
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

  // dataSubjectTypes is the list of data subject types relevant for this configuration
  dataSubjectTypes?: DataSubjectType[]

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
