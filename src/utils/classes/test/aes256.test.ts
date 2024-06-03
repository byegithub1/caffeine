import Aes256 from '../aes256.ts'

import { assertEquals, assertRejects } from '@test'

// Define a key for testing purposes
const key: Uint8Array = crypto.getRandomValues(new Uint8Array(32)) // 256-bit key

// Define a sample message
const message: string = 'Uncomplicate JavaScript'

Deno.test('Aes256: Encrypt and Decrypt with AES-GCM', async () => {
	const algorithm = 'AES-GCM'
	const encryptedMessage = await Aes256.encrypt(message, key, algorithm)
	const decryptedMessage = await Aes256.decrypt(encryptedMessage, key, algorithm)
	assertEquals(decryptedMessage, message)
})

Deno.test('Aes256: Encrypt and Decrypt with AES-CTR', async () => {
	const algorithm = 'AES-CTR'
	const encryptedMessage = await Aes256.encrypt(message, key, algorithm)
	const decryptedMessage = await Aes256.decrypt(encryptedMessage, key, algorithm)
	assertEquals(decryptedMessage, message)
})

Deno.test('Aes256: Encrypt and Decrypt with AES-CBC', async () => {
	const algorithm = 'AES-CBC'
	const encryptedMessage = await Aes256.encrypt(message, key, algorithm)
	const decryptedMessage = await Aes256.decrypt(encryptedMessage, key, algorithm)
	assertEquals(decryptedMessage, message)
})

Deno.test('Aes256: Unsupported algorithm', async () => {
	const unsupportedAlgorithm = 'AES-XYZ' as 'AES-GCM' | 'AES-CTR' | 'AES-CBC'
	await assertRejects(
		async () => {
			await Aes256.encrypt(message, key, unsupportedAlgorithm)
		},
		Error,
		'Unsupported algorithm.',
	)
})

Deno.test('Aes256: Invalid cipher text format for AES-GCM', async () => {
	const invalidCipherText = 'invalid-cipher-text'
	await assertRejects(
		async () => {
			await Aes256.decrypt(invalidCipherText, key, 'AES-GCM')
		},
		Error,
		'Invalid cipher text format.',
	)
})

Deno.test('Aes256: Invalid cipher text format for AES-CTR', async () => {
	const invalidCipherText = 'invalid-cipher-text'
	await assertRejects(
		async () => {
			await Aes256.decrypt(invalidCipherText, key, 'AES-CTR')
		},
		Error,
		'Invalid cipher text format.',
	)
})

Deno.test('Aes256: Invalid cipher text format for AES-CBC', async () => {
	const invalidCipherText = 'invalid-cipher-text'
	await assertRejects(
		async () => {
			await Aes256.decrypt(invalidCipherText, key, 'AES-CBC')
		},
		Error,
		'Invalid cipher text format.',
	)
})
