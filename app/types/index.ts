export type HeaderLink = { name: string; href: string };

export type State = {
	errors?: {
		supplierId?: string[];
		isDraft?: string[];
		contractFrom?: string[];
		contractTo?: string[];
		requestDate?: string[];
		requestCompleteDate?: string[];
		serviceDescription?: string[];
		subCategory?: string[];
		serviceOwner?: string[];
		contractType?: string[];
		requestType?: string[];
		annualContractValue?: string[];
		annualContractCurrency?: string[];
		savingsValue?: string[];
		serviceCategorization?: string[];
		riskClassification?: string[];
		region?: string[];
		infoSecScope?: string[];
		infoSecAssessmentComplete?: string[];
		piiScope?: string[];
		dataPrivacyAssessmentComplete?: string[];
		sefComplete?: string[];
		reviewPeriod?: string[];
		customReviewPeriod?: string[];
		renewalStrategy?: string[];
		poRequired?: string[];
		everGreen?: string[];
		autoRenewal?: string[];
	};
	message?: string | null;
};

export type Status = "active" | "all" | "expired" | "draft";

export type Supplier = {
	name: string;
};

export type Contract = {
	id: string;
	requestDate: string;
	requestCompleteDate: string;
	supplier: Supplier;
	supplierId: string;
	description: string;
	subCategory: string;
	serviceOwner: string;
	contractFrom: string;
	contractTo: string;
	contractType: string;
	requestType: string;
	annualContractValue: number;
	annualContractCurrency: string;
	savingsValue: number;
	serviceCategory: string;
	riskClassification: string;
	region: string;
	infoSecInScope: string;
	infoSecAssessmentComplete: string;
	piiScope: string;
	privacyAssessmentComplete: string;
	sefComplete: string;
	reviewPeriod: string;
	renewalStrategy: string;
	poRequired: string;
	everGreen: string;
	autoRenewal: string;
	isDraft: string;
};

export type ContractDB = {
	requestDate?: Date | null;
	requestCompleteDate?: Date | null;
	supplierId: string;
	description?: string;
	subCategory?: string;
	serviceOwner?: string;
	contractFrom?: Date | null;
	contractTo?: Date | null;
	contractType?: string;
	requestType?: string;
	annualContractValue?: number;
	annualContractCurrency?: string;
	savingsValue?: number;
	serviceCategory?: string;
	riskClassification?: string;
	region?: string;
	infoSecInScope: boolean;
	infoSecAssessmentComplete: boolean;
	piiScope: boolean;
	privacyAssessmentComplete: boolean;
	sefComplete: boolean;
	reviewPeriod?: number;
	renewalStrategy?: string;
	poRequired: boolean;
	everGreen: boolean;
	autoRenewal: boolean;
	isDraft: boolean;
};
