import crypto from 'crypto'

export default function hashSHA512(input : string) : string {
    const hash = crypto.createHash('sha512');
    hash.update(input);
    return hash.digest('hex')
}

console.log(hashSHA512('1467635865287927'))