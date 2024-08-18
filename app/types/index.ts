export type HeaderLink = { name: string; href: string };

export type State = {
	errors?: Record<string, string[]>;
	message?: string | null;
};

export type Status = "active" | "all" | "expired" | "draft";

export type Supplier = {
	name: string;
};

export type Contract = {
	id: string;
	requestDate: string;
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
