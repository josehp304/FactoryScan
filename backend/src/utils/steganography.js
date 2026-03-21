import { Jimp } from 'jimp';

const END_DELIMITER = '||END||';

/**
 * Embeds a string payload into an image buffer using Basic LSB techniques.
 * Returns a new PNG Buffer.
 */
export async function embedWatermark(imageBuffer, payload) {
  try {
    const image = await Jimp.read(imageBuffer);
    const textToEmbed = payload + END_DELIMITER;
    
    let bitIndex = 0;
    const bits = [];
    
    // Convert string to bits
    for (let i = 0; i < textToEmbed.length; i++) {
        const charCode = textToEmbed.charCodeAt(i);
        for (let b = 7; b >= 0; b--) {
            bits.push((charCode >> b) & 1);
        }
    }

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        if (bitIndex < bits.length) {
            // Modify Red channel
            const bit = bits[bitIndex++];
            this.bitmap.data[idx] = (this.bitmap.data[idx] & ~1) | bit;
        }
        if (bitIndex < bits.length) {
            // Modify Green channel
            const bit = bits[bitIndex++];
            this.bitmap.data[idx + 1] = (this.bitmap.data[idx + 1] & ~1) | bit;
        }
        if (bitIndex < bits.length) {
            // Modify Blue channel
            const bit = bits[bitIndex++];
            this.bitmap.data[idx + 2] = (this.bitmap.data[idx + 2] & ~1) | bit;
        }
    });

    return await image.getBuffer('image/png');
  } catch (error) {
    console.error('Watermark embedding error:', error);
    throw error;
  }
}

/**
 * Extracts a watermark payload from an image.
 */
export async function extractWatermark(imageBuffer) {
  try {
    const image = await Jimp.read(imageBuffer);
    const bits = [];
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        bits.push(this.bitmap.data[idx] & 1);
        bits.push(this.bitmap.data[idx + 1] & 1);
        bits.push(this.bitmap.data[idx + 2] & 1);
    });

    let extractedText = '';
    for (let i = 0; i < bits.length; i += 8) {
        let charCode = 0;
        for (let b = 0; b < 8; b++) {
            charCode = (charCode << 1) | bits[i + b];
        }
        extractedText += String.fromCharCode(charCode);
        
        if (extractedText.endsWith(END_DELIMITER)) {
            return extractedText.slice(0, -END_DELIMITER.length);
        }
    }
    
    // Missing watermark delimiter
    return null;
  } catch (error) {
      console.error('Watermark extraction error:', error);
      return null;
  }
}
