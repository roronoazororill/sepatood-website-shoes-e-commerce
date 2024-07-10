const MidtransClient = require('midtrans-client')

const snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MID_SECRET,
    clientKey: process.env.MID_PUBLIC
});

const createTransactionToken = async (req, res) => {
    try {
        const { orderId, totalPrice } = req.body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalPrice,
            },
            enabled_payments: ["credit_card", "cimb_clicks",
                "bca_klikbca", "bca_klikpay", "bri_epay", "echannel", "permata_va",
                "bca_va", "bni_va", "bri_va", "cimb_va", "other_va", "gopay", "indomaret",
                "danamon_online", "akulaku", "shopeepay", "kredivo", "uob_ezpay"],
        }

        const token = await snap.createTransactionToken(parameter);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTransactionToken }