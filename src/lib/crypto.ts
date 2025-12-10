// SHA256 hashing 
export async function sha256Bytes(bytes: Uint8Array): Promise<Uint8Array> {
    // slice to get a plain ArrayBuffer that covers only the Uint8Array region
    const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    return new Uint8Array(hashBuffer);
  }
  
  // Convert bytes to hex string
  export function toHex(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  
  // Convert hex string to bytes
  export function fromHex(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) hex = "0" + hex;
    const out = new Uint8Array(hex.length / 2);
    for (let i = 0; i < out.length; i++) {
      out[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }
    return out;
  }
  
  // Generate a random secret (32 bytes)
  export function generateSecret(): Uint8Array {
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    return arr;
  }
  