import { parser } from '../parser'

describe('parser type object', () => {
	test('ignore rows if element length is less than keys length', async () => {
		const input = `a,b,c
true,false,3

`
		expect(parser(input)).toEqual([
			{
				a: true,
				b: false,
				c: 3
			}
		])
	})

	test('parse boolean string to boolean', async () => {
		const input = `a,b,c
true,false,3`
		expect(parser(input)).toEqual([
			{
				a: true,
				b: false,
				c: 3
			}
		])
	})

	test('parse null or undefined string to null or undefined', async () => {
		const input = `a,b,c
null, undefined, 3`
		expect(parser(input)).toEqual([
			{
				a: null,
				b: undefined,
				c: 3
			}
		])
	})

	test('return empty array when first parameter is ""', async () => {
		const input = ``

		expect(parser(input)).toEqual([])
	})

	test('trim space and tab before and after string', async () => {
		const input = `a, b,   c
1	,2 , 3 2`
		expect(
			parser(input, {
				trim: true
			})
		).toEqual([
			{
				a: 1,
				b: 2,
				c: '3 2'
			}
		])
	})

	describe('parser using tab for separator', () => {
		test('parse tsv to object', async () => {
			const input = `a	b	c
1	2	3`
			expect(
				parser(input, {
					separator: '\t',
					trim: false
				})
			).toEqual([
				{
					a: 1,
					b: 2,
					c: 3
				}
			])
		})
	})

	describe('parser using trim option', () => {
		test('should not trim space and tab before and after string', async () => {
			const input = `a, b,   c
1	,2 , 3 2`
			expect(
				parser(input, {
					trim: false,
					convertNumber: false
				})
			).toEqual([
				{
					a: '1	',
					' b': '2 ',
					'   c': ' 3 2'
				}
			])
		})
	})

	describe('parser using parseNumber option', () => {
		test('should not parse number value to Number', async () => {
			const input = `a, b, c
1, 2, 3`
			expect(
				parser(input, {
					convertNumber: false
				})
			).toEqual([
				{
					a: '1',
					b: '2',
					c: '3'
				}
			])
		})
	})

	describe('parser using parseBoolean option', () => {
		test('should not convert boolean value to boolean', async () => {
			const input = `a, b, c
1, true, false`
			expect(
				parser(input, {
					convertBoolean: false
				})
			).toEqual([
				{
					a: 1,
					b: 'true',
					c: 'false'
				}
			])
		})
	})

	describe('parser using keys option', () => {
		test('use keys option for key insteadof firstline', async () => {
			const input = `a, b, c
1, true, false`
			expect(
				parser(input, {
					keys: ['aaa', 'bbb', 'ccc']
				})
			).toEqual([
				{
					aaa: 'a',
					bbb: 'b',
					ccc: 'c'
				},
				{
					aaa: 1,
					bbb: true,
					ccc: false
				}
			])
		})
	})

	describe('parser using default option', () => {
		test('return default value if value is null or undefined', async () => {
			const input = `a, b, c
, true, 1
2, , 3
4, 5,`
			expect(
				parser(input, {
					defaultValue: 'default value'
				})
			).toEqual([
				{ a: 'default value', b: true, c: 1 },
				{ a: 2, b: 'default value', c: 3 },
				{ a: 4, b: 5, c: 'default value' }
			])
		})
	})

	describe('parser using startRow option', () => {
		test('return row from start row', async () => {
			const input = `a, b, c
A, B, C
1, 2, 3`
			expect(
				parser(input, {
					startRow: 1
				})
			).toEqual([{ A: 1, B: 2, C: 3 }])
		})
	})

	describe('parser using startColumn option', () => {
		test('row has columns from start column', async () => {
			const input = `a, b, c
1, 2, 3`
			expect(
				parser(input, {
					startColumn: 1
				})
			).toEqual([{ b: 2, c: 3 }])
		})
	})

	describe('parser using startColumn and StartRow option', () => {
		test('return row from start row that has columns from start column', async () => {
			const input = `a, b, c
A, B, C
4, 5 ,6`
			expect(
				parser(input, {
					startColumn: 1,
					startRow: 1
				})
			).toEqual([{ B: 5, C: 6 }])
		})
	})

	describe('parser using numberOfColumn', () => {
		test("row's number of column is less than number Of Column", async () => {
			const input = `a, b, c
1, 2 ,3`
			expect(
				parser(input, {
					numberOfColumn: 2
				})
			).toEqual([{ a: 1, b: 2 }])
		})
	})

	describe('parser using ignoreRow.emptyRow', () => {
		test('ignore rows have every element is defaultValue', async () => {
			const input = `a	b	c	d
      1	2		3	4	
      					`
			expect(
				parser(input, {
					separator: '\t',
					startColumn: 0,
					numberOfColumn: 4,
					defaultValue: null,
					ignoreRow: {
						emptyRow: true
					}
				})
			).toEqual([{ a: 1, b: 2, c: null, d: 3 }])
		})
	})
})
