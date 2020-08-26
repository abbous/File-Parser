import isNumber = require('is-number')
import { FixedOptions } from './interface'

export const shapeData = (str: string, options: FixedOptions): any => {
	const { trim } = options
	const value = trim ? trimString(str) : str
	return convertStringToCorrectType(value, options)
}

export const isBoolean = (value: string): boolean => {
	return value === 'true' || value === 'false'
}

export const convertStringToCorrectType = (str: string, options: FixedOptions): any => {
	const { convertNumber, convertBoolean, defaultValue } = options
	if (isNumber(str) && convertNumber) return parseInt(str)
	if (isBoolean(str) && convertBoolean) return str === 'true'
	if (str === 'null') return null
	if (str === 'undefined') return undefined
	return str === '' ? defaultValue : str
}

export const trimString = (str: string): string => {
	return str.replace(/^\s*/, '').replace(/\s*$/, '')
}

export const trimUnnecessaryElement = (elements: string[], startPosition: number): string[] => {
	let i = 0

	while (i < startPosition) {
		elements.splice(0, 1)
		i++
	}
	return elements
}

export const isNeededElement = (options: FixedOptions, index: number): boolean => {
	const { startColumn, numberOfColumn } = options
	if (index < startColumn) return false
	if (!!numberOfColumn && numberOfColumn <= index) return false
	return true
}
