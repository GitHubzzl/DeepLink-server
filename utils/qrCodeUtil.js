let qr_image = require('qr-image');
class QrCodeUtils {
    // 构造
    constructor() {
    }

    static getQrCodeImageFromUrl(url) {
        let temp_qrcode = qr_image.imageSync(url,{ type: 'svg' })
        return temp_qrcode
    }
}
module.exports = QrCodeUtils;
