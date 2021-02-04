enum ExperienceType {
  CONSENT_DISCLOSURE,
  PREFERENCE,
}

enum ExperienceDefault {
  BANNER = 1,
  MODAL,
}

enum ExperienceButtonDestination {
  GOTO_MODAL = 1,
  GOTO_PREFERENCE,
}

enum MigrationOption {
  MIGRATE_DEFAULT,
  MIGRATE_NEVER,
  MIGRATE_FROM_ALLOW,
  MIGRATE_FROM_DENY,
  MIGRATE_ALWAYS,
}

enum CookieDuration {
  SESSION = 1,
  PERSISTENT,
}

enum CookieProvenance {
  FIRST_PARTY = 1,
  THIRD_PARTY,
}

enum CookieCategory {
  STRICTLY_NECESSARY = 1,
  FUNCTIONAL,
  PERFORMANCE,
  MARKETING,
}

interface Error {
  code: string;
  interface: string;
  status: number;
}

interface ErrorResponse {
  error: Error;
}

interface IPLanguage {
  code: string;
  name: string;
  native: string;
}

interface IPLocation {
  geonameId: number;
  capital: string;
  languages: IPLanguage[];
  countryFlag: string;
  countryFlagEmoji: string;
  countryFlagEmojiUnicode: string;
  callingCode: string;
  isEU: boolean;
}

interface IPInfo {
  ip: string;
  hostname: string;
  continentCode: string;
  continentName: string;
  countryCode: string;
  countryName: string;
  regionCode: string;
  regionName: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: IPLocation;
}

interface GetLocationRequest {
  IP: string;
}

interface GetLocationResponse {
  location: IPInfo;
}

interface PurposeLegalBasis {
  legalBasisCode: string;
}

interface PurposeAllowed {
  allowed: string;
}

interface PurposeAllowedLegalBasis {
  allowed: string;
  legalBasisCode: string;
}

interface GetConsentRequest {
  organizationCode: string;
  controllerCode?: string;
  applicationCode: string;
  applicationEnvironmentCode: string;
  identities: string[];
  purposes: {[key: string]: PurposeLegalBasis};
}

interface GetConsentResponse {
  purposes: {[key: string]: PurposeAllowed};
}

interface SetConsentRequest {
  organizationCode: string;
  controllerCode?: string;
  applicationCode: string;
  applicationEnvironmentCode: string;
  identities: string[];
  collectedAt?: number;
  policyScopeCode: string;
  migrationOption: MigrationOption;
  purposes: {[key: string]: PurposeAllowedLegalBasis};
}

interface User {
  email: string;
  first: string;
  last: string;
  country: string;
  stateRegion: string;
  description: string;
}

interface InvokeRightRequest {
  organizationCode: string;
  controllerCode?: string;
  applicationCode: string;
  applicationEnvironmentCode: string;
  identities: string[];
  invokedAt?: number;
  policyScopeCode: string;
  rightCodes: string[];
  user: User;
}

interface GetFullConfigurationRequest {
  organizationCode: string;
  appCode: string;
  envCode: string;
  hash: string;
  deploymentID: string;
  policyScopeCode: string;
  languageCode: string;
}

interface Organization {
  code?: string;
}

interface PolicyScopeInfo {
  code?: string;
  defaultScopeCode?: string;
  variable?: string;
  scopes?: {[key: string]: string};
}

interface Application {
  code?: string;
  name?: string;
  platform?: string;
}

interface Environment {
  code: string;
  pattern?: string;
  hash?: string;
}

interface Deployment {
  code: string;
  version: number;
}

interface Cookie {
  name: string;
  code: string;
  host: string;
  duration: CookieDuration;
  provenance: CookieProvenance;
  category: CookieCategory;
  description: string;
  serviceProvider: string;
  latest: boolean;
  version: number;
}

interface Purpose {
  code: string;
  name?: string;
  description?: string;
  legalBasisCode: string;
  requiresOptIn?: boolean;
  allowsOptOut?: boolean;
  requiresPrivacyPolicy?: boolean;
  cookies: Cookie[];
}

interface Identity {
  type: string;
  variable: string;
}

interface PolicyDocument {
  code: string;
  version: number;
  url: string;
}

interface Banner {
  title: string;
  footerDescription: string;
  agreement: string;
  buttonText: string;
  secondaryButtonText: string;
  secondaryButtonDestination: ExperienceButtonDestination;
}

interface Modal {
  title: string;
  bodyTitle: string;
  bodyDescription: string;
  footerDescription: string;
  agreement: string;
  buttonText: string;
}

interface JIT {
  title: string;
  bodyDescription: string;
  acceptButtonText: string;
  declineButtonText: string;
  moreInfoText: string;
  moreInfoDestination: ExperienceButtonDestination;
}

interface ConsentExperiences {
  banner: Banner;
  modal: Modal;
  jit: JIT;
}

interface RightsTab {
  tabName: string;
  bodyTitle: string;
  bodyDescription: string;
  buttonText: string;
  agreement: string;
}

interface ConsentsTab {
  tabName: string;
  bodyTitle: string;
  bodyDescription: string;
  buttonText: string;
  agreement: string;
}

interface OverviewTab {
  tabName: string;
  bodyTitle: string;
  bodyDescription: string;
}

interface Preference {
  title: string;
  rights: RightsTab;
  consents: ConsentsTab;
  overview: OverviewTab;
}

interface ConsentExperience {
  code: string;
  version: number;
  banner: Banner;
  modal: Modal;
  jit: JIT;
  experienceDefault: ExperienceDefault;
}

interface PreferenceExperience {
  code: string;
  version: number;
  title: string;
  rights: RightsTab;
  consents: ConsentsTab;
  overview: OverviewTab;
}

interface Right {
  code: string;
  name: string;
  description: string;
}

interface Experience {
  consent?: ConsentExperience;
  preference?: PreferenceExperience;
}

interface Theme {
  code: string;
  name: string;
  description: string;
  bannerBackgroundColor: string;
  lightboxRibbonColor: string;
  formHeaderColor: string;
  statusColor: string;
  highlightColor: string;
  feedbackColor: string;
}

interface Configuration {
  language?: string;
  organization?: Organization;
  app?: Application;
  environments?: Environment[];
  environment?: Environment;
  policyScope?: PolicyScopeInfo;
  identities?: {[key: string]: Identity};
  deployment?: Deployment;
  regulations: string[];
  rights?: Right[];
  purposes?: Purpose[];
  experiences?: Experience;
  services?: {[key: string]: string};
  options?: {[key: string]: string};
  privacyPolicy: PolicyDocument;
  termsOfService: PolicyDocument;
  theme: Theme;
  scripts: string[];
}
