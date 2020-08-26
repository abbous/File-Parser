export type CreateRows = (obj: AnyObject, elem: any, index: number) => AnyObject

export type CreateColumns = (stack: string[], elem: string, index: number) => string[]

export interface AnyObject {
	[key: string]: any
}

export interface IgnoreRowConditions {
	lackElements?: boolean
	emptyRow?: boolean
}

export interface FixedIgnoreRowConditions {
	lackElements: boolean
	emptyRow: boolean
}

export interface Options {
	separator?: string
	keys?: string[]
	type?: 'object' | 'array'
	trim?: boolean
	convertNumber?: boolean
	convertBoolean?: boolean
	defaultValue?: any
	ignoreRow?: IgnoreRowConditions
	startRow?: number
	startColumn?: number
	numberOfColumn?: number | null
}

export interface FixedOptions {
	separator: string
	keys: string[]
	type: 'object' | 'array'
	trim: boolean
	convertNumber: boolean
	convertBoolean: boolean
	defaultValue: any
	ignoreRow: FixedIgnoreRowConditions
	startRow: number
	startColumn: number
	numberOfColumn: number | null
}
