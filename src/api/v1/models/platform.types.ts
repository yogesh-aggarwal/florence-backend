export type PlatformHomeSectionSection_t = {
	name: string
	productIds: Record<string, Record<string, string[]>>[]
}
export type PlatformHomeSection_t = {
	id: "home"
	sections: Record<string, PlatformHomeSectionSection_t>
}

export type Platform_t = PlatformHomeSection_t
