export type PlatformHomeSectionSection_t = {
	name: string
	productIds: Record<string, Record<string, string[]>>[]
}
export type PlatformHomeSection_t = {
	id: "home"
	sections: Record<string, PlatformHomeSectionSection_t>
}

export type PlatformCoupons_t = {
	id: "coupons"
	coupons: Record<string, number>
}

export type Platform_t = PlatformHomeSection_t | PlatformCoupons_t
