interface ICartId {
  cartId: string;
}

export class Project implements ICartId {

  projectId: string;
  clusterId: string;
  campaignId: string;
  projectName: string;
  languageId: string;
  stgStatusName: string;
  pipelineFlag: boolean;
  organizationId: string;
  projectLifetimeFundingGoal: number;
  projectLifetimeRemainNeed: number;
  beforeIBibleDonationsRemainingNeed: number;
  totalPledges: number;
  totalGiven: number;
  beforeIBibleTotalGiven: number;
  iBibleOnlyTotalGiven: number;
  languageCount: number;
  isClusterFlag: boolean;
  commonFrameworkFlag: boolean;
  featuredProjectFlag: boolean;
  prayerCommitCnt: number;
  beginYr: number;
  sensitivityLevel: number;
  firstScriptureFlag: boolean;
  translationTypeWrittenTranslationFlag: boolean;
  translationTypeWrittenStoriesFlag: boolean;
  translationTypeOralTranslationFlag: boolean;
  translationTypeOralStoryingFlag: boolean;
  translationTypeSignLanguageFlag: boolean;
  translationTypeFilmFlag: boolean;
  translationTypeOtherGoalsFlag: boolean;
  goalsFullBibleFlag: boolean;
  goalsFullNTFlag: boolean;
  goalsFullOTFlag: boolean;
  goalsAGospelFlag: boolean;
  goalsGenesisFlag: boolean;
  goalsNtPortionsFlag: boolean;
  goalsOtPortionsFlag: boolean;
  goalsJesusFilmFlag: boolean;
  goalsBibleStoriesFlag: boolean;
  gathering2017Flag: boolean;
  bannerImage?: string;
  cardImage?: string;
  continent?: string;
  country?: string;
  description?: string;
  language?: string;
  meta?: any;
  population?: number;
  populationRange?: string;
  projectDialectFlag?: boolean;
  visibleFlag?: boolean;
  totalDonors?: number;

  get cartId(): string {
    return `p${this.campaignId}`;
  }

  static fromJson(json: any): Project {
    const project = new Project();

    project.projectId = json.ProjectID || '';
    project.clusterId = json.ClusterID || '';
    project.campaignId = json.CampaignID || '';
    project.projectName = json.ProjectName || '';
    project.languageId = json.LanguageID || '';
    project.stgStatusName = json.StgStatusName || '';
    project.pipelineFlag = (json.PipelineFlag === 'Y');
    project.organizationId = json.OrganizationID || '';
    project.projectLifetimeFundingGoal = json.ProjectLifetimeFundingGoal || 0;
    project.projectLifetimeRemainNeed = Math.max(0, json.ProjectLifetimeRemainNeed || 0);
    project.beforeIBibleDonationsRemainingNeed = Math.max(0, json.BeforeIBibleDonationsRemainingNeed || 0);
    project.totalPledges = json.TotalPledges || 0;
    project.totalGiven = json.TotalGiven || 0;
    project.beforeIBibleTotalGiven = json.BeforeIBibleTotalGiven || 0;
    project.iBibleOnlyTotalGiven = json.IBibleOnlyTotalGiven || 0;
    project.languageCount = json.LanguageCount || 0;
    project.isClusterFlag = json.IsClusterFlag === 'Y';
    project.commonFrameworkFlag = json.CommonFrameworkFlag === 'Y';
    project.featuredProjectFlag = json.FeaturedProjectFlag === 'Y';
    project.prayerCommitCnt = json.PrayerCommitCnt || 0;
    project.beginYr = json.BeginYr || 0;
    project.sensitivityLevel = json.SensitivityLevel || 0;
    project.firstScriptureFlag = (json.FirstScriptureFlag === 'Y');
    project.translationTypeWrittenTranslationFlag = (json.TranslationTypeWrittenTranslationFlag === 'Y');
    project.translationTypeWrittenStoriesFlag = (json.TranslationTypeWrittenStoriesFlag === 'Y');
    project.translationTypeOralTranslationFlag = (json.TranslationTypeOralTranslationFlag === 'Y');
    project.translationTypeOralStoryingFlag = (json.TranslationTypeOralStoryingFlag === 'Y');
    project.translationTypeSignLanguageFlag = (json.TranslationTypeSignLanguageFlag === 'Y');
    project.translationTypeFilmFlag = (json.TranslationTypeFilmFlag === 'Y');
    project.translationTypeOtherGoalsFlag = (json.TranslationTypeOtherGoalsFlag === 'Y');
    project.goalsFullBibleFlag = (json.FullBibleFlag === 'Y');
    project.goalsFullNTFlag = (json.GoalsFullNTFlag === 'Y');
    project.goalsFullOTFlag = (json.GoalsFullOTFlag === 'Y');
    project.goalsAGospelFlag = (json.GoalsAGospelFlag === 'Y');
    project.goalsGenesisFlag = (json.GoalsGenesisFlag === 'Y');
    project.goalsNtPortionsFlag = (json.GoalsNTPortionsFlag === 'Y');
    project.goalsOtPortionsFlag = (json.GoalsOTPortionsFlag === 'Y');
    project.goalsJesusFilmFlag = (json.GoalsJesusFilmFlag === 'Y');
    project.goalsBibleStoriesFlag = (json.GoalsBibleStoriesFlag === 'Y');
    project.gathering2017Flag = (json.Gathering2017Flag === 'Y');
    project.visibleFlag = (json.VisibleFlag === 'Y');
    project.population = json.ProjectPopulation || 0;
    project.populationRange = json.ProjectPopulationRange || '';
    project.projectDialectFlag = (json.ProjectDialectFlag === 'Y');
    project.description = json.ProjectDescriptio || '';
    project.visibleFlag = (json.VisibleFlag === 'Y');
    project.meta = {};
    project.totalDonors = json.TotalDonors || 0;
    return project;
  }

  static fromSisenseEntry(headers: string[], values: any[]): Project {
    const json: any = {};
    let i = 0;
    for (const key of headers) {
      json[key] = values[i];
      i++;
    }

    return Project.fromJson(json);
  }

  static fromSisenseResponseArray(json: any): Project[] {
    json = json || {};

    const headers = json.headers || [];
    const values = json.values || [];

    const projects = [];
    for (const value of values) {
      projects.push(Project.fromSisenseEntry(headers, value));
    }

    return projects;
  }

  copy(): Project {
    const newProj = new Project();

    const keys = Object.getOwnPropertyNames(this);
    for (const key of keys) {
      newProj[key] = this[key];
    }
    return newProj;
  }
}
