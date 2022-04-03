import FingerprintJS from '@fingerprintjs/fingerprintjs'

export async function createFingerprint() {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    // This is the visitor identifier:
    return result.visitorId
}
