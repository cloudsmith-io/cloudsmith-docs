import { createIconRegistry } from './util/create-icon-registry';

import { RegoIcon } from './svgs/Rego';
import { MenuIcon } from './svgs/Menu';
import { ChevronIcon } from './svgs/Chevron';
import { ChevronSmallIcon } from './svgs/ChevronSmall';
import { ArrowIcon } from './svgs/Arrow';
import { SearchIcon } from './svgs/Search';
import { ExternalIcon } from './svgs/External';
import { EditIcon } from './svgs/Edit';
import { GithubIcon } from './svgs/Github';
import { InfoIcon } from './svgs/Info';

import { UtilityDocumentationIcon } from './svgs/utility/Documentation';
import { UtilityGuideIcon } from './svgs/utility/Guide';
import { UtilityApiIcon } from './svgs/utility/Api';

import { CloseIcon } from './svgs/action/Close';
import { ActionDocumentationIcon } from './svgs/action/Documentation';
import { ActionGuideIcon } from './svgs/action/Guide';
import { ActionApiIcon } from './svgs/action/Api';
import { ActionLinkIcon } from './svgs/action/Link';
import { ActionPlayIcon } from './svgs/action/Play';
import { ActionCopyIcon } from './svgs/action/Copy';
import { ActionCheckIcon } from './svgs/action/Check';
import { ActionErrorIcon } from './svgs/action/Error';
import { EnterIcon } from './svgs/Enter';

import { FormatAlpineIcon } from './svgs/format/Alpine';
import { FormatCargoIcon } from './svgs/format/Cargo';
import { FormatChocolateyIcon } from './svgs/format/Chocolatey';
import { FormatCocoapodsIcon } from './svgs/format/Cocoapods';
import { FormatComposerIcon } from './svgs/format/Composer';
import { FormatConanIcon } from './svgs/format/Conan';
import { FormatCranIcon } from './svgs/format/Cran';
import { FormatDartIcon } from './svgs/format/Dart';
import { FormatDebIcon } from './svgs/format/Deb';
import { FormatDebianIcon } from './svgs/format/Debian';
import { FormatDockerIcon } from './svgs/format/Docker';
import { FormatGoIcon } from './svgs/format/Go';
import { FormatGradleIcon } from './svgs/format/Gradle';
import { FormatHelmIcon } from './svgs/format/Helm';
import { FormatHexIcon } from './svgs/format/Hex';
import { FormatLuarocksIcon } from './svgs/format/Luarocks';
import { FormatMavenIcon } from './svgs/format/Maven';
import { FormatNpmIcon } from './svgs/format/Npm';
import { FormatNugetIcon } from './svgs/format/Nuget';
import { FormatPowershellIcon } from './svgs/format/Powershell';
import { FormatPythonIcon } from './svgs/format/Python';
import { FormatRawIcon } from './svgs/format/Raw';
import { FormatRedhatIcon } from './svgs/format/Redhat';
import { FormatRubyIcon } from './svgs/format/Ruby';
import { FormatSbtIcon } from './svgs/format/Sbt';
import { FormatSwiftIcon } from './svgs/format/Swift';
import { FormatTerraformIcon } from './svgs/format/Terraform';
import { FormatUnityIcon } from './svgs/format/Unity';
import { FormatVagrantIcon } from './svgs/format/Vagrant';

import { HomepageDocumentationIcon } from './svgs/homepage/Documentation';
import { HomepageGuideIcon } from './svgs/homepage/Guide';
import { HomepageAPIIcon } from './svgs/homepage/API';

import { IntegrationAikidoIcon } from './svgs/integration/Aikido';
import { IntegrationAnsibleIcon } from './svgs/integration/Ansible';
import { IntegrationAWSCodeBuildIcon } from './svgs/integration/AWSCodeBuild';
import { IntegrationAzureDevOpsIcon } from './svgs/integration/AzureDevOps';
import { IntegrationBitbucketPipelinesIcon } from './svgs/integration/BitbucketPipelines';
import { IntegrationBuildkiteIcon } from './svgs/integration/Buildkite';
import { IntegrationChainguardIcon } from './svgs/integration/Chainguard';
import { IntegrationChefIcon } from './svgs/integration/Chef';
import { IntegrationCircleCIIcon } from './svgs/integration/CircleCI';
import { IntegrationDatadogIcon } from './svgs/integration/Datadog';
import { IntegrationDockerIcon } from './svgs/integration/Docker';
import { IntegrationDroneCIIcon } from './svgs/integration/DroneCI';
import { IntegrationGCPCloudBuildIcon } from './svgs/integration/GCPCloudBuild';
import { IntegrationGitHubActionsIcon } from './svgs/integration/GitHubActions';
import { IntegrationGitLabCICDIcon } from './svgs/integration/GitLabCICD';
import { IntegrationHarnessCDIcon } from './svgs/integration/HarnessCD';
import { IntegrationJenkinsIcon } from './svgs/integration/Jenkins';
import { IntegrationMicrosoftTeamsIcon } from './svgs/integration/MicrosoftTeams';
import { IntegrationOctopusDeployIcon } from './svgs/integration/OctopusDeploy';
import { IntegrationPuppetIcon } from './svgs/integration/Puppet';
import { IntegrationRenovateCLIIcon } from './svgs/integration/RenovateCLI';
import { IntegrationRoadieIcon } from './svgs/integration/Roadie';
import { IntegrationSemaphoreCIIcon } from './svgs/integration/SemaphoreCI';
import { IntegrationSlackIcon } from './svgs/integration/Slack';
import { IntegrationTeamCityIcon } from './svgs/integration/TeamCity';
import { IntegrationTerraformIcon } from './svgs/integration/Terraform';
import { IntegrationTravisCIIcon } from './svgs/integration/TravisCI';
import { IntegrationZapierIcon } from './svgs/integration/Zapier';
import { IntegrationVSCodeIcon } from './svgs/integration/VSCode';

export const iconRegistry = createIconRegistry({
  menu: MenuIcon,
  rego: RegoIcon,
  chevron: ChevronIcon,
  enter: EnterIcon,
  chevronUp: (props) => <ChevronIcon {...props} id="icon-chevron-up" chevronDirection="up" />,
  chevronRight: (props) => <ChevronIcon {...props} id="icon-chevron-right" chevronDirection="right" />,
  chevronDown: (props) => <ChevronIcon {...props} id="icon-chevron-down" chevronDirection="down" />,
  chevronLeft: (props) => <ChevronIcon {...props} id="icon-chevron-left" chevronDirection="left" />,
  chevronSmall: ChevronSmallIcon,
  chevronSmallUp: (props) => <ChevronSmallIcon {...props} id="icon-chevron-small-up" chevronDirection="up" />,
  chevronSmallRight: (props) => (
    <ChevronSmallIcon {...props} id="icon-chevron-small-right" chevronDirection="right" />
  ),
  chevronSmallDown: (props) => (
    <ChevronSmallIcon {...props} id="icon-chevron-small-down" chevronDirection="down" />
  ),
  chevronSmallLeft: (props) => (
    <ChevronSmallIcon {...props} id="icon-chevron-small-left" chevronDirection="left" />
  ),
  arrow: ArrowIcon,
  arrowUp: (props) => <ArrowIcon {...props} id="icon-arrow-up" arrowDirection="up" />,
  arrowRight: (props) => <ArrowIcon {...props} id="icon-arrow-right" arrowDirection="right" />,
  arrowDown: (props) => <ArrowIcon {...props} id="icon-arrow-down" arrowDirection="down" />,
  arrowLeft: (props) => <ArrowIcon {...props} id="icon-arrow-left" arrowDirection="left" />,
  search: SearchIcon,
  external: ExternalIcon,
  edit: EditIcon,
  github: GithubIcon,
  info: InfoIcon,
  'utility/documentation': UtilityDocumentationIcon,
  'utility/guide': UtilityGuideIcon,
  'utility/api': UtilityApiIcon,
  'action/close': CloseIcon,
  'action/documentation': ActionDocumentationIcon,
  'action/guide': ActionGuideIcon,
  'action/api': ActionApiIcon,
  'action/link': ActionLinkIcon,
  'action/play': ActionPlayIcon,
  'action/copy': ActionCopyIcon,
  'action/check': ActionCheckIcon,
  'action/error': ActionErrorIcon,
  'format/alpine': FormatAlpineIcon,
  'format/cargo': FormatCargoIcon,
  'format/chocolatey': FormatChocolateyIcon,
  'format/cocoapods': FormatCocoapodsIcon,
  'format/composer': FormatComposerIcon,
  'format/conan': FormatConanIcon,
  'format/cran': FormatCranIcon,
  'format/dart': FormatDartIcon,
  'format/deb': FormatDebIcon,
  'format/debian': FormatDebianIcon,
  'format/docker': FormatDockerIcon,
  'format/go': FormatGoIcon,
  'format/gradle': FormatGradleIcon,
  'format/helm': FormatHelmIcon,
  'format/hex': FormatHexIcon,
  'format/luarocks': FormatLuarocksIcon,
  'format/maven': FormatMavenIcon,
  'format/npm': FormatNpmIcon,
  'format/nuget': FormatNugetIcon,
  'format/powershell': FormatPowershellIcon,
  'format/python': FormatPythonIcon,
  'format/raw': FormatRawIcon,
  'format/redhat': FormatRedhatIcon,
  'format/ruby': FormatRubyIcon,
  'format/sbt': FormatSbtIcon,
  'format/swift': FormatSwiftIcon,
  'format/terraform': FormatTerraformIcon,
  'format/unity': FormatUnityIcon,
  'format/vagrant': FormatVagrantIcon,
  'homepage/documentation': HomepageDocumentationIcon,
  'homepage/guide': HomepageGuideIcon,
  'homepage/api': HomepageAPIIcon,
  'integration/aikido': IntegrationAikidoIcon,
  'integration/ansible': IntegrationAnsibleIcon,
  'integration/awscodebuild': IntegrationAWSCodeBuildIcon,
  'integration/azuredevops': IntegrationAzureDevOpsIcon,
  'integration/bitbucketpipelines': IntegrationBitbucketPipelinesIcon,
  'integration/buildkite': IntegrationBuildkiteIcon,
  'integration/chainguard': IntegrationChainguardIcon,
  'integration/chef': IntegrationChefIcon,
  'integration/circleci': IntegrationCircleCIIcon,
  'integration/datadog': IntegrationDatadogIcon,
  'integration/docker': IntegrationDockerIcon,
  'integration/droneci': IntegrationDroneCIIcon,
  'integration/gcpcloudbuild': IntegrationGCPCloudBuildIcon,
  'integration/githubactions': IntegrationGitHubActionsIcon,
  'integration/gitlabci': IntegrationGitLabCICDIcon,
  'integration/harnesscd': IntegrationHarnessCDIcon,
  'integration/jenkins': IntegrationJenkinsIcon,
  'integration/microsoftteams': IntegrationMicrosoftTeamsIcon,
  'integration/octopusdeploy': IntegrationOctopusDeployIcon,
  'integration/puppet': IntegrationPuppetIcon,
  'integration/renovatecli': IntegrationRenovateCLIIcon,
  'integration/roadie': IntegrationRoadieIcon,
  'integration/semaphoreci': IntegrationSemaphoreCIIcon,
  'integration/slack': IntegrationSlackIcon,
  'integration/teamcity': IntegrationTeamCityIcon,
  'integration/terraform': IntegrationTerraformIcon,
  'integration/travis': IntegrationTravisCIIcon,
  'integration/zapier': IntegrationZapierIcon,
  'integration/vscode': IntegrationVSCodeIcon,
});
