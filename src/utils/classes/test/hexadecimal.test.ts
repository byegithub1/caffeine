import Hexadecimal from '../hexadecimal.ts'

import { assert, assertEquals, assertNotEquals } from '@test'

Deno.test('Hexadecimal: hexDump and reverseHexDump', () => {
	const hex: string = '556e636f6d706c6963617465204a617661536372697074'
	const dump: string | boolean = Hexadecimal.hexDump(hex)
	assert(dump !== false)
	const reversedHex = Hexadecimal.reverseHexDump(dump as string)
	assertEquals(reversedHex, hex)
})

Deno.test('Hexadecimal: hexDump with invalid input', () => {
	const invalidHex: string = 'invalidhexstring'
	const dump: string | boolean = Hexadecimal.hexDump(invalidHex)
	assertEquals(dump, false)
})

Deno.test('Hexadecimal: reverseHexDump with valid input', () => {
	const validDump: string = '0000: 55 6e 63 6f 6d 70 6c 69 63 61 74 65 20 4a 61 76 61 53 63 72 69 70 74   Uncomplicate JavaScript'
	const reversedHex: string | boolean = Hexadecimal.reverseHexDump(validDump)
	assertEquals(reversedHex, '556e636f6d706c6963617465204a617661536372697074')
})

Deno.test('Hexadecimal: reverseHexDump with invalid input', () => {
	const invalidDump: string = 'invalid dump'
	const reversedHex: string | boolean = Hexadecimal.reverseHexDump(invalidDump)
	assertEquals(reversedHex, false)
})

Deno.test('Hexadecimal: randomBytes', () => {
	const size: number = 16
	const bytes: Uint8Array = Hexadecimal.randomBytes(size)
	assertEquals(bytes.length, size)
	const anotherBytes: Uint8Array = Hexadecimal.randomBytes(size)
	assertNotEquals(bytes, anotherBytes)
})

Deno.test('Hexadecimal: randomHex', () => {
	const size: number = 16
	const bytes: string = Hexadecimal.randomHex(size)
	assertEquals(bytes.length, size)
	const anotherBytes: string = Hexadecimal.randomHex(size)
	assertNotEquals(bytes, anotherBytes)
})

Deno.test('Hexadecimal: hexToBytes', () => {
	const hex: string = '556e636f6d706c6963617465'
	const expectedBytes: Array<number> = [85, 110, 99, 111, 109, 112, 108, 105, 99, 97, 116, 101]
	const bytes: Array<number> = Hexadecimal.hexToBytes(hex)
	assertEquals(bytes, expectedBytes)
})

Deno.test('Hexadecimal: uint8ArrayToHex', () => {
	const array: Uint8Array = new Uint8Array([85, 110, 99, 111, 109, 112, 108, 105, 99, 97, 116, 101])
	const expectedHex: string = '556e636f6d706c6963617465'
	const hex: string = Hexadecimal.uint8ArrayToHex(array)
	assertEquals(hex, expectedHex)
})

Deno.test('Hexadecimal: hexToUint8Array', () => {
	const hex: string = '556e636f6d706c6963617465'
	const expectedArray: Uint8Array = new Uint8Array([85, 110, 99, 111, 109, 112, 108, 105, 99, 97, 116, 101])
	const array: Uint8Array = Hexadecimal.hexToUint8Array(hex)
	assertEquals(array, expectedArray)
})
